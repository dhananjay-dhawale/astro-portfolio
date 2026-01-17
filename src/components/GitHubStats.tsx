import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { FaGithub, FaCode, FaFire, FaStar } from 'react-icons/fa';

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

interface GitHubStatsProps {
  username?: string;
}

interface ImageCardProps {
  src: string;
  alt: string;
  title: string;
  icon: React.ReactNode;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, title, icon }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="p-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:border-purple-500 transition-all duration-300">
      <div className="flex items-center gap-2 mb-3 text-purple-300">
        {icon}
        <span className="font-semibold">{title}</span>
      </div>
      {!loaded && !error && (
        <div className="flex items-center justify-center h-32 text-gray-500">
          <div className="animate-pulse">Loading...</div>
        </div>
      )}
      {error ? (
        <div className="flex flex-col items-center justify-center h-32 text-gray-500">
          <FaGithub className="w-8 h-8 mb-2 opacity-50" />
          <p className="text-sm">Stats temporarily unavailable</p>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`w-full transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
};

export default function GitHubStats({ username = 'dhananjay-dhawale' }: GitHubStatsProps) {
  // Using only profile-details card (most reliable)
  const profileDetailsUrl = `https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${username}&theme=tokyonight`;

  return (
    <motion.section
      className="py-16 px-6 max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-purple-300 text-center mb-4 drop-shadow-[0_2px_6px_rgba(186,147,255,0.4)]"
        variants={itemVariants}
      >
        <FaGithub className="inline-block mr-3 mb-1" />
        GitHub Activity
      </motion.h2>

      <motion.p
        className="text-center text-gray-400 mb-8"
        variants={itemVariants}
      >
        My open source contributions and coding activity
      </motion.p>

      {/* Profile Details - Full Width */}
      <motion.div className="flex justify-center" variants={itemVariants}>
        <div className="p-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:border-purple-500 transition-all duration-300 w-full">
          <img
            src={profileDetailsUrl}
            alt="GitHub profile overview with contribution graph"
            className="w-full"
            loading="lazy"
          />
        </div>
      </motion.div>

      {/* GitHub Profile Link */}
      <motion.div className="mt-8 text-center" variants={itemVariants}>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit my GitHub profile (opens in new tab)"
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-full transition-all"
        >
          <FaGithub className="w-5 h-5" />
          View Full Profile
        </a>
      </motion.div>
    </motion.section>
  );
}
