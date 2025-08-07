import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { FaChessPawn, FaBlog, FaMicrophoneAlt, FaPalette, FaBicycle, FaCamera, FaMusic, FaBookReader } from 'react-icons/fa';
import Terminal from './Terminal'; // Import the new Terminal component

const dpUrl = `${import.meta.env.BASE_URL}dp.jpeg`;

// Animations for staggered reveal
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
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

// Structured skills data for a more organized display
const skillData = {
  'Programming Languages': ['Java', 'C', 'C++', 'Python', 'SQL'],
  'Frameworks/Libraries': ['Spring Boot', 'JUnit', 'Mockito', 'Postman', 'Insomnia', 'Hazelcast', 'React', 'Angular', 'Tailwind CSS'],
  'Database/DevOps': ['MySQL', 'MongoDB', 'Git', 'GitLab', 'Docker', 'Splunk', 'AWS'],
  'Concepts': ['OOPs', 'DSA', 'OS', 'CN', 'System Design', 'Agile Methodologies', 'Software Development Life Cycle (SDLC)'],
  'AI/ML': ['Computer Vision', 'Machine Learning', 'Large Language Models (LLMs)', 'Prompt Engineering'],
};

// Updated interests data with icons
const interests = [
  { name: 'Writing technical blogs on Medium', icon: FaBlog },
  { name: 'Chess, Badminton, and Piano', icon: FaChessPawn },
  { name: 'Cycling, Dancing, and Photography', icon: FaCamera },
  { name: 'Reading and listening to classical music', icon: FaMusic },
  { name: 'Exploring cutting-edge AI/ML advancements', icon: FaMicrophoneAlt },
];

export default function AboutMe() {
  return (
    <section id="about" className="max-w-6xl mx-auto py-16 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Column: Terminal component */}
        <div className="flex justify-center md:justify-end md:sticky md:top-20 md:pr-12">
            <Terminal />
        </div>

        {/* Right Column: Text & Skills with staggered animation */}
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-purple-300 drop-shadow-[0_2px_6px_rgba(186,147,255,0.4)]"
            variants={itemVariants}
          >
            Full-Stack Developer
          </motion.h1>

          <motion.p
            className="text-lg text-gray-200 leading-relaxed"
            variants={itemVariants}
          >
            I'm a passionate software developer who loves building clean backends and smooth user experiences. I currently work with <strong>Spring Boot</strong> and <strong>Angular</strong>, and I'm always exploring new tools and frameworks to push my limits.
          </motion.p>

          <motion.p
            className="text-lg text-gray-200 leading-relaxed"
            variants={itemVariants}
          >
            My background in <strong>competitive programming</strong> sharpens how I approach code—focusing on logic, performance, and clarity. Beyond code, you'll find me experimenting with frameworks like <strong>Astro</strong> and <strong>React</strong>, or playing a game of chess to stay sharp.
          </motion.p>
          
          {/* Skills with a custom stagger animation */}
          <motion.div variants={containerVariants}>
            <motion.h2
              className="text-2xl font-bold text-purple-300 mb-4 drop-shadow-[0_2px_6px_rgba(186,147,255,0.4)]"
              variants={itemVariants}
            >
              Core Skills
            </motion.h2>
            <div className="space-y-4">
              {Object.entries(skillData).map(([category, skills]) => (
                <div key={category}>
                  <motion.h3 className="text-lg font-semibold text-gray-300 mb-2" variants={itemVariants}>
                    {category}
                  </motion.h3>
                  <motion.div
                    className="flex flex-wrap gap-2"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    {skills.map((skill) => (
                      <motion.span
                        key={skill}
                        className="px-4 py-2 bg-white/10 rounded-full text-sm text-gray-300 transition duration-200 hover:bg-purple-500 hover:text-white hover:scale-105"
                        variants={itemVariants}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Interests section */}
          <motion.div variants={containerVariants}>
            <motion.h2
              className="text-2xl font-bold text-purple-300 mb-4 drop-shadow-[0_2px_6px_rgba(186,147,255,0.4)]"
              variants={itemVariants}
            >
              Extracurricular & Interests
            </motion.h2>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" variants={containerVariants}>
              {interests.map((interest, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/20 hover:border-purple-500 transition-all duration-300 transform hover:scale-105"
                  variants={itemVariants}
                >
                  <interest.icon className="h-6 w-6 text-purple-400" />
                  <span className="text-lg text-gray-200">{interest.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}