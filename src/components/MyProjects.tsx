import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

// Placeholder data for projects
const projects = [
  {
    title: 'First Portfolio',
    description: 'We all have watched angela yu web dev bootcamp, havent we? this is my first portfolio built using her course.',
    technologies: ['Html', 'Css', 'Js'],
    githubLink: 'https://github.com/dhananjay-dhawale/Portfolio',
    demoLink: 'https://dhananjay-dhawale.github.io/Portfolio/'
  },
  {
    title: 'Chess Heat Map',
    description: 'Personal project which i have been trying to build for a long time, hopefully it will be done soon.',
    technologies: ['Java', 'Spring Boot', 'Angular'],
    githubLink: '#',
    demoLink: '#'
  },
  {
    title: 'Project Find Me a GF',
    description: 'Project gamma is an e-commerce platform developed with a focus on user experience and performance. It includes features like a shopping cart and a secure payment gateway.',
    technologies: ['TypeScript', 'Node.js', 'Express', 'PostgreSQL'],
    githubLink: '#',
    demoLink: '#'
  }
];

// Animations for staggered reveal
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

// Text reveal animation for the headline
const textRevealVariants: Variants = {
  hidden: { opacity: 0, y: 50, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)' },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function MyProjects() {
  return (
    <section id="projects" className="py-20 px-6 text-white max-w-6xl mx-auto">
      <motion.h2
        className="text-4xl sm:text-5xl font-bold mb-12 text-purple-300 text-center drop-shadow-[0_2px_6px_rgba(186,147,255,0.4)] overflow-hidden"
        variants={textRevealVariants}
        initial="hidden"
        animate="visible"
      >
        My Projects
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="flex flex-col p-6 rounded-xl border border-white/20 hover:border-purple-500 transition-all duration-300 transform hover:scale-105"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-white/70 mb-4 flex-grow">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map(tech => (
                <span key={tech} className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80 border border-white/10">
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-auto flex gap-4">
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-purple-500 hover:bg-purple-400 transition-all"
              >
                <FaGithub />
                GitHub
              </a>
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-white/10 hover:bg-white/20 transition-all"
              >
                Live Demo
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}