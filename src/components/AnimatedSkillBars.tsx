import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface Skill {
  name: string;
  level: number; // 0-100
  color: string;
}

interface SkillCategory {
  category: string;
  icon: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    category: 'Backend Development',
    icon: '⚙️',
    skills: [
      { name: 'Java', level: 95, color: 'from-orange-500 to-red-500' },
      { name: 'Spring Boot', level: 90, color: 'from-green-500 to-emerald-500' },
      { name: 'REST APIs', level: 92, color: 'from-blue-500 to-cyan-500' },
      { name: 'Hazelcast', level: 80, color: 'from-blue-600 to-indigo-500' },
    ],
  },
  {
    category: 'Frontend & Testing',
    icon: '🎨',
    skills: [
      { name: 'Angular', level: 82, color: 'from-red-500 to-pink-500' },
      { name: 'React', level: 75, color: 'from-cyan-400 to-blue-500' },
      { name: 'JUnit/Mockito', level: 85, color: 'from-green-500 to-teal-500' },
      { name: 'Tailwind CSS', level: 80, color: 'from-teal-400 to-cyan-500' },
    ],
  },
  {
    category: 'DevOps & Tools',
    icon: '🛠️',
    skills: [
      { name: 'Git/GitLab', level: 90, color: 'from-orange-600 to-red-600' },
      { name: 'Docker', level: 78, color: 'from-blue-400 to-blue-600' },
      { name: 'Splunk', level: 75, color: 'from-green-400 to-emerald-500' },
      { name: 'MySQL/MongoDB', level: 82, color: 'from-blue-500 to-indigo-500' },
    ],
  },
  {
    category: 'Competitive Programming',
    icon: '🏆',
    skills: [
      { name: 'Data Structures', level: 95, color: 'from-purple-500 to-indigo-500' },
      { name: 'Algorithms', level: 93, color: 'from-pink-500 to-rose-500' },
      { name: 'Problem Solving', level: 95, color: 'from-green-400 to-teal-500' },
      { name: 'System Design', level: 78, color: 'from-amber-500 to-orange-500' },
    ],
  },
];

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

const SkillBar: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-300">{skill.name}</span>
        <span className="text-xs text-gray-500">{skill.level}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{
            delay: index * 0.1 + 0.3,
            duration: 1,
            ease: "easeOut"
          }}
        />
      </div>
    </motion.div>
  );
};

const CircularProgress: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (skill.level / 100) * circumference;

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="relative w-24 h-24">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-800"
          />
          {/* Progress circle */}
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.3, duration: 1.5, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-white">{skill.level}%</span>
        </div>
      </div>
      <span className="mt-2 text-sm text-gray-300 text-center">{skill.name}</span>
    </motion.div>
  );
};

export default function AnimatedSkillBars() {
  return (
    <motion.section
      className="py-16 px-6 max-w-6xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-purple-300 text-center mb-4 drop-shadow-[0_2px_6px_rgba(186,147,255,0.4)]"
        variants={itemVariants}
      >
        Technical Skills
      </motion.h2>

      <motion.p
        className="text-center text-gray-400 mb-12"
        variants={itemVariants}
      >
        Proficiency levels across different domains
      </motion.p>

      {/* Skill Bars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>{category.icon}</span>
              {category.category}
            </h3>
            {category.skills.map((skill, skillIndex) => (
              <SkillBar
                key={skill.name}
                skill={skill}
                index={categoryIndex * 4 + skillIndex}
              />
            ))}
          </motion.div>
        ))}
      </div>

      {/* Circular Progress for Top Skills */}
      <motion.div
        className="mt-16"
        variants={itemVariants}
      >
        <h3 className="text-2xl font-bold text-purple-300 text-center mb-8">
          Core Competencies
        </h3>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { name: 'Backend', level: 92, color: 'from-purple-500 to-indigo-500' },
            { name: 'Frontend', level: 80, color: 'from-cyan-500 to-blue-500' },
            { name: 'DevOps', level: 78, color: 'from-orange-500 to-yellow-500' },
            { name: 'DSA', level: 95, color: 'from-green-500 to-teal-500' },
            { name: 'System Design', level: 78, color: 'from-pink-500 to-rose-500' },
          ].map((skill, index) => (
            <CircularProgress key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        className="mt-12 text-center text-sm text-gray-500"
        variants={itemVariants}
      >
        <p>
          💡 Skill levels are self-assessed based on project experience and proficiency
        </p>
      </motion.div>
    </motion.section>
  );
}
