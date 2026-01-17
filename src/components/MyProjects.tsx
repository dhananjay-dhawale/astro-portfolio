import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

// Project data
const projects = [
  {
    title: 'Chess Analytics',
    description: 'Full-stack chess analytics app to analyze PGN files from Chess.com and Lichess. Upload 10-30k games, view calendar heatmaps, and track win/loss/draw stats with filtering by time control, color, and account.',
    technologies: ['Java 21', 'Spring Boot', 'React', 'TypeScript', 'SQLite'],
    githubLink: 'https://github.com/dhananjay-dhawale/chess-analytics',
    demoLink: 'https://chess-analytics-frontend.onrender.com/'
  },
  {
    title: 'Twitter Voice Notes Extension',
    description: 'Chrome extension adding WhatsApp-style voice messaging to Twitter DMs. Features real-time waveform visualization, 0.5s processing time (40x faster than typical), and seamless native UI integration.',
    technologies: ['JavaScript', 'Chrome APIs', 'Web Audio API', 'Canvas'],
    githubLink: 'https://github.com/dhananjay-dhawale/twitter-voice-note-extension',
    demoLink: 'https://github.com/dhananjay-dhawale/twitter-voice-note-extension'
  },
  {
    title: 'CP Templates',
    description: 'Collection of optimized competitive programming templates used to solve 4000+ DSA problems. Includes data structures, algorithms, and commonly used code snippets.',
    technologies: ['C++', 'Algorithms', 'Data Structures'],
    githubLink: 'https://github.com/dhananjay-dhawale/CP-templates',
    demoLink: 'https://github.com/dhananjay-dhawale/CP-templates'
  },
  {
    title: 'Portfolio Website',
    description: 'This portfolio! Built with Astro and React featuring an interactive terminal, live GitHub/Lichess stats, animated skill visualizations, and experience timeline.',
    technologies: ['Astro', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    githubLink: 'https://github.com/dhananjay-dhawale/astro-portfolio',
    demoLink: 'https://dhananjay-dhawale.github.io/astro-portfolio/'
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
                aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-purple-500 hover:bg-purple-400 transition-all"
              >
                <FaGithub aria-hidden="true" />
                GitHub
              </a>
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} live demo (opens in new tab)`}
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