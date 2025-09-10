'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const technologies = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js',
  'Python', 'TensorFlow', 'MongoDB', 'PostgreSQL', 'AWS',
  'Docker', 'Git', 'Tailwind CSS', 'Framer Motion', 'Three.js'
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            01.
          </h2>
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-300 mb-4">
            About Me
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              Hey! I'm Your Name, and I'm currently pursuing a Bachelor's Degree of Science in Computer Science at [Your University]. 
              I'm passionate about creating innovative solutions through technology and love the entire process of taking an idea 
              from ideation to design to production.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              My favorite part of programming is creating apps and websites, like this one! I love the whole process of taking an idea 
              from ideation to design to production. I also find competitive programming pretty fun. Finally, I love using AI models 
              to solve interesting and complex problems.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              Outside of programming, I love a good day outdoors. I often go out with friends and family. I also really like playing 
              [your hobby], and have been doing it for a few years. I'm down for a game anytime of the day!
            </p>
          </motion.div>

          {/* Profile Photo and Technologies */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Profile Photo Placeholder */}
            <div className="relative">
              <div className="w-64 h-64 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-6xl font-bold text-white">YN</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900"></div>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-4 text-center">
                Some technologies I like to work with
              </h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                    className="px-3 py-1 bg-white/10 backdrop-blur-sm text-gray-300 rounded-full text-sm font-medium hover:bg-white/20 transition-colors duration-200"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
