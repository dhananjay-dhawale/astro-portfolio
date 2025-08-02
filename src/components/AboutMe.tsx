import React from 'react';
import { motion, type Variants } from 'framer-motion';

const dpUrl = `${import.meta.env.BASE_URL}dp.jpeg`;

// Animations for staggered reveal
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Adjust stagger timing for a smooth flow
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

// Skills data for the list
const coreSkills = [
  'Java',
  'Spring Boot',
  'Angular',
  'React',
  'PostgreSQL',
  'MongoDB',
  'Docker',
];

export default function AboutMe() {
  return (
    <section id="about" className="max-w-6xl mx-auto py-16 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Image with animation */}
        <motion.div
          className="flex justify-center md:justify-end"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src={dpUrl}
            alt="Dhananjay Dhawale"
            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full shadow-lg border-4 border-purple-400"
          />
        </motion.div>

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
            I'm a passionate software developer who loves building clean backends and smooth user experiences. I currently work with **Spring Boot** and **Angular**, and I'm always exploring new tools and frameworks to push my limits.
          </motion.p>

          <motion.p
            className="text-lg text-gray-200 leading-relaxed"
            variants={itemVariants}
          >
            My background in **competitive programming** sharpens how I approach code—focusing on logic, performance, and clarity. Beyond code, you'll find me experimenting with frameworks like **Astro** and **React**, or playing a game of chess to stay sharp.
          </motion.p>

          {/* Skills with a custom stagger animation */}
          <motion.div variants={containerVariants}>
            <motion.h2
              className="text-2xl font-bold text-purple-300 mb-4 drop-shadow-[0_2px_6px_rgba(186,147,255,0.4)]"
              variants={itemVariants}
            >
              Core Skills
            </motion.h2>
            <motion.div
              className="flex flex-wrap gap-2"
              variants={containerVariants}
              initial="hidden"
              whileInView="show" // Use whileInView to trigger animation as it comes into view
              viewport={{ once: true, amount: 0.5 }}
            >
              {coreSkills.map((skill) => (
                <motion.span
                  key={skill}
                  className="px-4 py-2 bg-white/10 rounded-full text-sm text-gray-300 transition duration-200 hover:bg-purple-500 hover:text-white hover:scale-105"
                  variants={itemVariants}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}