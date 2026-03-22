'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import ParticleField from './ParticleField'

export default function Hero() {
  return (
    <section id="home" className="hero-section relative overflow-hidden bg-black">
      {/* Gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-black to-black" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/[0.07] rounded-full blur-[120px]" />
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-violet-500/[0.05] rounded-full blur-[100px]" />
        <div className="absolute top-10 right-1/4 w-[350px] h-[350px] bg-indigo-500/[0.04] rounded-full blur-[100px]" />
      </div>

      {/* Interactive particle canvas */}
      <ParticleField />

      {/* Content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold tracking-tighter text-white"
        >
          Arnav Sharma
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 text-lg sm:text-xl text-white/50 max-w-lg mx-auto font-light"
        >
          Software engineer building intelligent systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10 flex items-center gap-4"
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-white text-black font-medium rounded-full text-sm hover:bg-white/90 transition-colors"
          >
            View Projects
          </button>
          <a
            href="https://drive.google.com/file/d/1A5zfUUEOFgZhPxz9mkOv06x54-4syNir/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-white/10 text-white font-medium rounded-full text-sm hover:bg-white/20 transition-colors border border-white/10"
          >
            Resume
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="cursor-pointer text-white/20"
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
