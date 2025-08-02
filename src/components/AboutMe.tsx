import React from 'react';
import { motion, type Variants } from 'framer-motion';

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

// List of interests
const interests = [
  'Writing technical blogs on Medium',
  'Chess, Badminton, and Piano',
  'Cycling, Dancing, and Photography',
  'Reading and listening to classical music',
  'Exploring cutting-edge AI/ML advancements'
];

export default function AboutMe() {
  return (
    <section id="about" className="max-w-6xl mx-auto py-16 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"> {/* Change is here */}
        {/* Left Column: Image with animation */}
        <motion.div
          className="flex justify-center md:justify-end md:sticky md:top-20" // Optional: makes the image sticky on desktop
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
            <motion.ul className="list-disc list-inside text-lg text-gray-200 leading-relaxed space-y-2" variants={containerVariants}>
              {interests.map((interest, index) => (
                <motion.li key={index} variants={itemVariants}>
                  {interest}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}