import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaCode, FaTrophy } from 'react-icons/fa';

interface TimelineItem {
  id: number;
  type: 'work' | 'education' | 'project' | 'achievement';
  title: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies?: string[];
}

// Real experience data
const timelineData: TimelineItem[] = [
  {
    id: 1,
    type: 'work',
    title: 'Software Development Engineer',
    organization: 'BNY (Bank of New York Mellon)',
    location: 'Pune, India',
    startDate: '2023',
    endDate: 'Present',
    description: [
      'Developed robust web applications with 2+ years experience in Java Spring Boot',
      'Led 6-month migration from Spring Boot to internal enterprise framework, including Java 11 to 21 upgrade and remediation of 650+ vulnerabilities',
      'Developed 10+ APIs in a hackathon including a chatbot API and microservice template consuming GitLab APIs',
      'Implemented Hazelcast caching for external APIs, improving performance by 15% and efficiency by 20%',
      'Built cron job for Splunk logs retention, auto-compressing and pushing archives to data lake',
      'Enhanced frontend accessibility for visual readers using Angular',
    ],
    technologies: ['Java', 'Spring Boot', 'Angular', 'Hazelcast', 'Splunk', 'Docker', 'GitLab'],
  },
  {
    id: 2,
    type: 'work',
    title: 'DSA Mentor',
    organization: 'VNIT (Visvesvaraya National Institute of Technology)',
    location: 'Nagpur, India',
    startDate: '2022',
    endDate: '2023',
    description: [
      'Mentored students from various colleges on Data Structures and Algorithms',
      'Personally recommended by college professors for teaching excellence',
      'Designed and delivered comprehensive sessions covering the entire DSA syllabus',
    ],
    technologies: ['C++', 'Java', 'Python', 'DSA'],
  },
  {
    id: 3,
    type: 'education',
    title: 'Bachelor of Technology',
    organization: 'VNIT Nagpur',
    location: 'Nagpur, India',
    startDate: '2019',
    endDate: '2023',
    description: [
      'Major in Computer Science & Engineering',
      'JEE Mains: 99.63 percentile (AIR 4449 among 12 lakh candidates)',
      'President of Cyclists of VNIT, member of Chess Club & Photography Club',
    ],
  },
  {
    id: 4,
    type: 'achievement',
    title: 'Competitive Programming Excellence',
    organization: 'Multiple Platforms',
    startDate: '2020',
    endDate: 'Present',
    description: [
      '5★ on CodeChef (2098), Expert on Codeforces (1617), Guardian on LeetCode (2293 - top 0.7%)',
      'Solved 4000+ DSA problems across platforms with 404-day LeetCode streak',
      'Institute Rank 1 on GFG, Rank 18 on HackerRank',
      '3x under 50 world rank in CodeChef Starters, 10+ times under 100 AIR in LeetCode contests',
      'Recognized as highest-rated competitive programmer of college',
    ],
    technologies: ['C++', 'Java', 'Python', 'Algorithms'],
  },
  {
    id: 5,
    type: 'project',
    title: 'Chess Lens (Final Year Project)',
    organization: 'Mobile Application',
    startDate: '2022',
    endDate: '2023',
    description: [
      'Developed mobile app to convert 3D chess images to 2D representations',
      'Integrated Stockfish engine for real-time analysis and strategic insights',
      'Used YOLO v8 for precise chess piece detection and classification',
    ],
    technologies: ['Python', 'YOLO v8', 'Computer Vision', 'Stockfish'],
  },
  {
    id: 6,
    type: 'project',
    title: 'Chess Heat Map',
    organization: 'Web Application',
    startDate: '2023',
    endDate: '2024',
    description: [
      'Built full-stack web app using Java Spring Boot and Angular',
      'Consumed Lichess API to fetch and visualize games as heatmaps',
      'Implemented advanced filtering by year, variations for deeper analysis',
    ],
    technologies: ['Java', 'Spring Boot', 'Angular', 'Lichess API'],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const getIcon = (type: TimelineItem['type']) => {
  switch (type) {
    case 'work':
      return FaBriefcase;
    case 'education':
      return FaGraduationCap;
    case 'project':
      return FaCode;
    case 'achievement':
      return FaTrophy;
    default:
      return FaBriefcase;
  }
};

const getIconColor = (type: TimelineItem['type']) => {
  switch (type) {
    case 'work':
      return 'bg-purple-500';
    case 'education':
      return 'bg-blue-500';
    case 'project':
      return 'bg-green-500';
    case 'achievement':
      return 'bg-yellow-500';
    default:
      return 'bg-purple-500';
  }
};

export default function ExperienceTimeline() {
  return (
    <motion.section
      className="py-16 px-6 max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-purple-300 text-center mb-4 drop-shadow-[0_2px_6px_rgba(186,147,255,0.4)]"
        variants={itemVariants}
      >
        Experience & Education
      </motion.h2>

      <motion.p
        className="text-center text-gray-400 mb-12"
        variants={itemVariants}
      >
        My professional journey so far
      </motion.p>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-green-500" />

        {timelineData.map((item, index) => {
          const Icon = getIcon(item.type);
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={item.id}
              className={`relative flex items-start mb-12 ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              variants={itemVariants}
            >
              {/* Icon */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10">
                <motion.div
                  className={`w-8 h-8 rounded-full ${getIconColor(item.type)} flex items-center justify-center shadow-lg`}
                  whileHover={{ scale: 1.2 }}
                >
                  <Icon className="w-4 h-4 text-white" />
                </motion.div>
              </div>

              {/* Content Card */}
              <div
                className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                  isEven ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto'
                }`}
              >
                <motion.div
                  className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:border-purple-500 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  {/* Date Badge */}
                  <div className={`flex items-center gap-2 mb-2 ${isEven ? 'md:justify-end' : ''}`}>
                    <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {item.startDate} — {item.endDate}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-purple-400 font-medium mb-1">{item.organization}</p>
                  {item.location && (
                    <p className="text-gray-500 text-sm mb-3">{item.location}</p>
                  )}

                  {/* Description */}
                  <ul className={`space-y-1 text-gray-300 text-sm ${isEven ? 'md:text-right' : ''}`}>
                    {item.description.map((desc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className={`text-purple-400 mt-1 ${isEven ? 'md:order-2' : ''}`}>•</span>
                        <span className={isEven ? 'md:order-1' : ''}>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  {item.technologies && (
                    <div className={`flex flex-wrap gap-2 mt-4 ${isEven ? 'md:justify-end' : ''}`}>
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded-full bg-white/10 text-gray-300 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
