'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const scrollToAbout = () => {
    const element = document.getElementById('about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl sm:text-2xl text-gray-300 font-medium mb-2"
            >
              Hey there! I'm
            </motion.h2>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 bg-clip-text text-transparent leading-tight mb-2"
            >
              Arnav Sharma
            </motion.h1>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-2xl sm:text-3xl lg:text-4xl text-gray-300 font-medium"
            >
              I like building AI-powered applications and full-stack solutions
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-8"
            >
              <button
                onClick={scrollToAbout}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                See my experience
                <ChevronDown className="ml-2 h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>

          {/* 3D Design - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center lg:justify-end group"
          >
            <div className="relative w-[500px] h-[500px] cursor-pointer">
              {/* Main 3D Cube with enhanced interactivity */}
              <motion.div 
                className="absolute inset-0 transform rotate-12 group-hover:rotate-6 group-hover:scale-105 transition-all duration-1000"
                whileHover={{ 
                  rotate: [12, 6, 12],
                  scale: [1, 1.05, 1]
                }}
                animate={{
                  rotate: [12, 15, 12],
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl border border-purple-400/30 shadow-2xl backdrop-blur-sm group-hover:shadow-purple-500/25 group-hover:shadow-3xl transition-all duration-500">
                  {/* Inner cube layers with hover effects */}
                  <motion.div 
                    className="absolute inset-4 bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-xl border border-purple-300/20 group-hover:from-purple-500/40 group-hover:to-blue-500/40 transition-all duration-500"
                    whileHover={{ scale: 1.05 }}
                  ></motion.div>
                  <motion.div 
                    className="absolute inset-8 bg-gradient-to-br from-purple-700/40 to-blue-700/40 rounded-lg border border-purple-200/20 group-hover:from-purple-600/50 group-hover:to-blue-600/50 transition-all duration-500"
                    whileHover={{ scale: 1.1 }}
                  ></motion.div>
                  
                  {/* Interactive floating elements */}
                  <motion.div 
                    className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-60 cursor-pointer"
                    whileHover={{ 
                      scale: 1.3,
                      rotate: 360,
                      opacity: 1
                    }}
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  ></motion.div>
                  
                  <motion.div 
                    className="absolute bottom-12 right-12 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-50 cursor-pointer"
                    whileHover={{ 
                      scale: 1.4,
                      rotate: -360,
                      opacity: 1
                    }}
                    animate={{
                      y: [0, 8, 0],
                      x: [0, 5, 0]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  ></motion.div>
                  
                  <motion.div 
                    className="absolute top-1/2 right-8 w-8 h-8 bg-gradient-to-br from-purple-300 to-blue-300 rounded-full opacity-40 cursor-pointer"
                    whileHover={{ 
                      scale: 1.5,
                      rotate: 180
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  ></motion.div>
                </div>
              </motion.div>

              {/* Enhanced floating geometric shapes */}
              <motion.div 
                className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-500/40 to-blue-500/40 rounded-lg transform rotate-45 cursor-pointer"
                whileHover={{ 
                  scale: 1.2,
                  rotate: 90,
                  backgroundColor: "rgba(147, 51, 234, 0.6)"
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [45, 90, 45]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
              
              <motion.div 
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-500/40 to-purple-500/40 rounded-full cursor-pointer"
                whileHover={{ 
                  scale: 1.3,
                  backgroundColor: "rgba(59, 130, 246, 0.6)"
                }}
                animate={{
                  y: [0, 15, 0],
                  x: [0, -10, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              ></motion.div>
              
              <motion.div 
                className="absolute top-1/3 -left-8 w-12 h-12 bg-gradient-to-br from-purple-400/50 to-blue-400/50 rounded-lg transform rotate-12 cursor-pointer"
                whileHover={{ 
                  scale: 1.4,
                  rotate: 45
                }}
                animate={{
                  rotate: [12, 30, 12],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              ></motion.div>

              {/* Interactive code-like elements */}
              <motion.div 
                className="absolute top-16 left-16 text-white/20 font-mono text-xs cursor-pointer"
                whileHover={{ 
                  scale: 1.5,
                  color: "rgba(255, 255, 255, 0.8)"
                }}
                animate={{
                  opacity: [0.2, 0.6, 0.2]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                <div>&lt;/&gt;</div>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-20 right-16 text-white/20 font-mono text-xs cursor-pointer"
                whileHover={{ 
                  scale: 1.5,
                  color: "rgba(147, 51, 234, 0.8)"
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  x: [0, 5, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: 1
                }}
              >
                <div>AI</div>
              </motion.div>
              
              <motion.div 
                className="absolute top-1/2 left-8 text-white/20 font-mono text-xs cursor-pointer"
                whileHover={{ 
                  scale: 1.5,
                  color: "rgba(59, 130, 246, 0.8)"
                }}
                animate={{
                  opacity: [0.2, 0.7, 0.2],
                  y: [0, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 2
                }}
              >
                <div>ML</div>
              </motion.div>

              {/* Enhanced interactive elements */}
              <motion.div 
                className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full cursor-pointer"
                whileHover={{ 
                  scale: 2.5,
                  rotate: 360,
                  backgroundColor: "rgba(251, 191, 36, 0.9)"
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>

              <motion.div 
                className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-green-400 to-teal-400 rounded-full cursor-pointer"
                whileHover={{ 
                  scale: 3,
                  rotate: -180,
                  backgroundColor: "rgba(34, 197, 94, 0.9)"
                }}
                animate={{
                  x: [0, 15, 0],
                  y: [0, -8, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8
                }}
              ></motion.div>

              {/* New interactive elements */}
              <motion.div 
                className="absolute top-1/4 left-4 w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-400 rounded-lg cursor-pointer"
                whileHover={{ 
                  scale: 1.8,
                  rotate: 45,
                  backgroundColor: "rgba(244, 114, 182, 0.9)"
                }}
                animate={{
                  rotate: [0, 90, 0],
                  y: [0, -12, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }}
              ></motion.div>

              <motion.div 
                className="absolute bottom-1/4 right-4 w-7 h-7 bg-gradient-to-br from-cyan-400 to-sky-400 rounded-full cursor-pointer"
                whileHover={{ 
                  scale: 2.2,
                  rotate: -90,
                  backgroundColor: "rgba(34, 211, 238, 0.9)"
                }}
                animate={{
                  x: [0, -12, 0],
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2
                }}
              ></motion.div>

              <motion.div 
                className="absolute top-1/2 right-8 w-5 h-5 bg-gradient-to-br from-emerald-400 to-green-400 rounded-full cursor-pointer"
                whileHover={{ 
                  scale: 2.8,
                  rotate: 180,
                  backgroundColor: "rgba(16, 185, 129, 0.9)"
                }}
                animate={{
                  y: [0, 10, 0],
                  x: [0, 8, 0],
                  rotate: [0, 360, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6
                }}
              ></motion.div>

              {/* Interactive connection lines */}
              <motion.div 
                className="absolute top-1/3 left-1/3 w-1 h-20 bg-gradient-to-b from-purple-400 to-blue-400 cursor-pointer"
                whileHover={{ 
                  scaleY: 1.5,
                  opacity: 1
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scaleY: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }}
              ></motion.div>

              <motion.div 
                className="absolute bottom-1/3 right-1/3 w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 cursor-pointer"
                whileHover={{ 
                  scaleX: 1.5,
                  opacity: 1
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scaleX: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
              ></motion.div>

              {/* Floating particles */}
              <motion.div 
                className="absolute top-8 left-1/2 w-2 h-2 bg-white/60 rounded-full cursor-pointer"
                whileHover={{ 
                  scale: 3,
                  opacity: 1
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.1
                }}
              ></motion.div>

              <motion.div 
                className="absolute bottom-8 right-1/2 w-2 h-2 bg-white/60 rounded-full cursor-pointer"
                whileHover={{ 
                  scale: 3,
                  opacity: 1
                }}
                animate={{
                  y: [0, 20, 0],
                  x: [0, -10, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.7
                }}
              ></motion.div>

              <motion.div 
                className="absolute top-1/2 left-8 w-2 h-2 bg-white/60 rounded-full cursor-pointer"
                whileHover={{ 
                  scale: 3,
                  opacity: 1
                }}
                animate={{
                  x: [0, 15, 0],
                  y: [0, -15, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.4
                }}
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/60"
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  )
}
