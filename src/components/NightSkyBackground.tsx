import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface NightSkyBackgroundProps {
  className?: string;
}

export default function NightSkyBackground({ className = '' }: NightSkyBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const meteorsRef = useRef<THREE.Group | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const frameIdRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    setIsMobile(window.innerWidth < 768);

    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000814, 1);
    
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;
    
    mountRef.current.appendChild(renderer.domElement);

    // Create starfield using built-in materials
    const createStars = () => {
      const starCount = isMobile ? 800 : 1500;
      const positions = new Float32Array(starCount * 3);

      for (let i = 0; i < starCount; i++) {
        // Distribute stars in a large sphere around the camera
        positions[i * 3] = (Math.random() - 0.5) * 2000;     // x
        positions[i * 3 + 1] = (Math.random() - 0.5) * 2000; // y
        positions[i * 3 + 2] = (Math.random() - 0.5) * 2000; // z
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      // Use PointsMaterial instead of custom shader for better compatibility
      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 2,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8
      });

      const stars = new THREE.Points(geometry, material);
      starsRef.current = stars;
      scene.add(stars);
    };

    // Inside NightSkyBackground.tsx, in the useEffect hook
    // Create shooting meteors using simple geometry
    const createMeteors = () => {
      const meteors = new THREE.Group();
      const meteorCount = isMobile ? 5 : 10;
      
      for (let i = 0; i < meteorCount; i++) {
        const trailGeometry = new THREE.BufferGeometry();
        const trailPositions = new Float32Array(6);
        trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
        
        const trailMaterial = new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.6
        });
        
        const meteorTrail = new THREE.Line(trailGeometry, trailMaterial);
        
        // --- START OF FIX ---
        const startX = (Math.random() - 0.5) * 1000;
        const startY = Math.random() * 200 + 300; // Force meteors to start high up
        const startZ = (Math.random() - 0.5) * 1000;
        
        meteorTrail.position.set(startX, startY, startZ);
        (meteorTrail as any).velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 4,
          -Math.random() * 6 - 2,
          (Math.random() - 0.5) * 4
        );
        (meteorTrail as any).life = 0;
        (meteorTrail as any).maxLife = 100 + Math.random() * 100;
        (meteorTrail as any).startPos = new THREE.Vector3(startX, startY, startZ);
        
        meteors.add(meteorTrail);
      }
      
      meteorsRef.current = meteors;
      scene.add(meteors);
    };

    // Initialize elements
    createStars();
    createMeteors();

    camera.position.set(0, 0, 1);

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    // Resize handler
    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;

      // Rotate stars slowly
      if (starsRef.current) {
        starsRef.current.rotation.x = time * 0.01;
        starsRef.current.rotation.y = time * 0.02;
        
        // Add subtle mouse interaction
        starsRef.current.rotation.x += mouseRef.current.y * 0.1;
        starsRef.current.rotation.y += mouseRef.current.x * 0.1;
      }

      // Update meteors
      if (meteorsRef.current) {
        meteorsRef.current.children.forEach((meteor) => {
          const meteorData = meteor as any;
          const line = meteor as THREE.Line;
          
          meteorData.life += 1;
          
          if (meteorData.life > meteorData.maxLife) {
            // Reset meteor
            meteor.position.copy(meteorData.startPos);
            meteorData.life = 0;
            (line.material as THREE.LineBasicMaterial).opacity = 0;
          } else {
            // Move meteor
            meteor.position.add(meteorData.velocity);
            
            // Update trail
            const positions = line.geometry.attributes.position.array as Float32Array;
            const currentPos = meteor.position;
            const trailPos = currentPos.clone().sub(meteorData.velocity.clone().multiplyScalar(5));
            
            // Set trail points
            positions[0] = trailPos.x;
            positions[1] = trailPos.y;
            positions[2] = trailPos.z;
            positions[3] = currentPos.x;
            positions[4] = currentPos.y;
            positions[5] = currentPos.z;
            
            line.geometry.attributes.position.needsUpdate = true;
            
            // Fade in/out
            const lifeFactor = meteorData.life / meteorData.maxLife;
            let opacity;
            if (lifeFactor < 0.1) {
              opacity = lifeFactor / 0.1;
            } else if (lifeFactor > 0.8) {
              opacity = (1 - lifeFactor) / 0.2;
            } else {
              opacity = 1;
            }
            
            (line.material as THREE.LineBasicMaterial).opacity = opacity * 0.6;
          }
        });
      }

      // Subtle camera movement based on mouse
      if (camera) {
        camera.position.x += (mouseRef.current.x * 5 - camera.position.x) * 0.05;
        camera.position.y += (mouseRef.current.y * 5 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js objects
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          }
        }
      });
      
      renderer.dispose();
    };
  }, [isMobile]);

  return (
    <div 
      ref={mountRef} 
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ 
        pointerEvents: 'none',
        background: 'linear-gradient(to bottom, #000814 0%, #001122 50%, #000814 100%)'
      }}
    />
  );
}