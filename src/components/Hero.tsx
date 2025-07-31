// src/components/Hero.tsx
import React from 'react';
// import { motion, type Variants } from 'framer-motion'; // Temporarily comment out Framer Motion import

export default function Hero() {
  return (
    <section
      className="min-h-0 sm:min-h-[70vh] flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-black via-slate-900 to-black pt-2 pb-2 sm:pt-8 sm:pb-8 relative overflow-hidden"
      id="hero"
    >
      <div
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-2xl w-full border border-white/10"
      >
        <h2 
          className="text-4xl sm:text-6xl font-bold text-sky-400 mb-4 drop-shadow-md leading-tight"
        >
          <span
          >
            Hi, I'm
          </span>
          {' '}
          <span
          >
            Dhananjay
          </span>
          <span 
            className="inline-block ml-2 text-6xl sm:text-7xl md:text-8xl"
          >
            👋
          </span>
        </h2>

        <p 
          className="text-lg sm:text-xl text-white/80 leading-relaxed"
        >
          <span>I'm a </span>
          <span className="text-sky-300 font-medium">software developer</span>
          <span> specializing in </span>
          <span className="text-sky-300 font-medium">java</span>
          <span>,{' '}</span>
          <span className="text-sky-300 font-medium">spring boot</span>
          <span>, and{' '}</span>
          <span className="text-sky-300 font-medium">angular</span>
          <span> — with a love for competitive programming and building clean web experiences.</span>
        </p>

    
        <div className="mt-8">
          <a
            href="#projects"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-black bg-sky-400 hover:bg-sky-300 transform hover:scale-105 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            Explore My Work
            <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}