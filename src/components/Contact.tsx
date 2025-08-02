import React from 'react';
import Links from './Links';
import { motion, type Variants } from 'framer-motion';

// Animations for staggered reveal
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Adjust stagger timing for a smooth flow
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

export default function Connect() {
  const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;

  return (
    <motion.section
      id="connect"
      className="py-16 px-6 text-white max-w-6xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="text-center mb-12">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-purple-300 drop-shadow-[0_2px_6px_rgba(186,147,255,0.4)] mb-4"
          variants={itemVariants}
        >
          Let's Connect
        </motion.h1>
        <motion.p
          className="text-xl text-white/80"
          variants={itemVariants}
        >
          Feel free to reach out, or connect with me on any of my profiles below.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Column: Links */}
        <motion.div variants={itemVariants}>
          <Links />
        </motion.div>

        {/* Right Column: Contact Form & Resume */}
        <div className="space-y-12">
          {/* Get In Touch Form */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-semibold text-purple-300 mb-6 drop-shadow-[0_2px_4px_rgba(186,147,255,0.2)]">
              Get In Touch
            </h2>
            <form
              action="https://formspree.io/f/xqaldqlj"
              method="POST"
              className="space-y-4 text-black"
            >
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full p-3 rounded-lg bg-white/90 outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows={5}
                className="w-full p-3 rounded-lg bg-white/90 outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-400 text-white font-semibold px-6 py-2 rounded-full transition-all flex items-center justify-center gap-2"
              >
                Send Message
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </button>
            </form>
          </motion.div>

          {/* View My Resume */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-semibold text-purple-300 mb-6 drop-shadow-[0_2px_4px_rgba(186,147,255,0.2)]">
              View My Resume
            </h2>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-full transition-all shadow-lg"
            >
              Download Resume
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 11.586V4a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}