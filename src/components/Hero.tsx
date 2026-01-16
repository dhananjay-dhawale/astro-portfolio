import { motion, type Variants } from 'framer-motion';

const textRevealVariants: Variants = {
  hidden: { opacity: 0, y: 50, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)' },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};


export default function Hero() {
  return (
    <section
      className="flex flex-col items-center text-center px-4 py-8 relative"
      id="hero"
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2
          className="text-4xl sm:text-6xl font-bold text-purple-300 mb-4 leading-tight drop-shadow-[0_2px_8px_rgba(186,147,255,0.4)]"
        >
          <motion.span
            variants={textRevealVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="inline-block overflow-hidden"
          >
            Hi, I'm Dhananjay 👋
          </motion.span>
        </h2>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <a
            href={`${import.meta.env.BASE_URL}about`}
            aria-label="Learn more about me"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-black bg-purple-400 hover:bg-purple-300 transform hover:scale-105 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-black"
          >
            Know More About Me
            <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}