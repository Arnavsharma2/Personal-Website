'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Building2, Calendar, MapPin } from 'lucide-react'
import Image from 'next/image'

interface Experience {
  company: string
  position: string
  duration: string
  location: string
  description: string
  projects?: {
    title: string
    description: string
    github: string
  }[]
}

const experiences: Experience[] = [
  {
    company: 'Wefire',
    position: 'Software Engineering Intern',
    duration: 'January 2025 - November 2025',
    location: 'Hayward, CA',
    description: 'Developed and deployed advanced Python-based programs that transformed 5,000+ Reddit posts into actionable financial insights, driving company publicity initiatives through sentiment analysis powered by Google Gemini API and Pandas. Created a high-performance real-time monitoring infrastructure using PRAW tracking brand mentions and sales keywords across multiple subreddits, generating 500+ instant alerts through an automated SMTP pipeline during 24-hour testing periods, resulting in 40% faster customer response times and enhanced brand reputation management.'
  }
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with parallax effect */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://www.themarysue.com/wp-content/uploads/2014/02/calvinandhobbes.jpg?resize=640%2C480)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Cool overlay effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-accent-900/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      
      {/* Animated overlay for depth */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          {/* Subtle backdrop blur for header */}
          <div className="absolute inset-0 -z-10 bg-black/20 backdrop-blur-sm rounded-2xl -m-4" />
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            02.
          </h2>
          <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4 drop-shadow-lg">
            Experience
          </h3>
          <div className="w-24 h-1 bg-accent-400 mx-auto"></div>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative"
            >
              {/* Subtle backdrop blur for experience card */}
              <div className="absolute inset-0 -z-10 bg-black/20 backdrop-blur-sm rounded-2xl -m-4" />
              
              <div className="flex items-start gap-8">
                {/* Logo and Timeline */}
                <div className="flex flex-col items-center flex-shrink-0">
                  {/* Company Logo */}
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-[3px] border-white/30 shadow-xl relative">
                    <Image 
                      src="/wefirelogo.jpeg" 
                      alt="WeFIRE Logo"
                      fill
                      className="rounded-full object-cover"
                    />
                    {/* Fallback CSS Logo */}
                    <div className="hidden w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                      <div className="text-white font-bold text-sm leading-tight text-center">
                        <div className="font-normal">We</div>
                        <div className="font-black">FIRE</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline Line */}
                  {index < experiences.length - 1 && (
                    <div className="w-1 h-24 bg-white/30 mt-4"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <div>
                        <h4 className="text-2xl font-bold text-white mb-1 drop-shadow-md">
                          {exp.position}
                        </h4>
                        <p className="text-xl font-semibold text-accent-400 mb-2 drop-shadow-md">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-sm text-white/80">
                        {exp.duration}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-white/80 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/90 leading-relaxed mb-6 text-lg drop-shadow-md">
                    {exp.description}
                  </p>
                  
                  {/* Projects */}
                  {exp.projects && (
                    <div className="space-y-4 mb-6">
                      {exp.projects.map((project, projectIndex) => (
                        <div key={projectIndex} className="bg-white/20 backdrop-blur-md rounded-xl p-5 border border-white/30 hover:bg-white/30 transition-all duration-300">
                          <div className="flex items-start justify-between mb-3">
                            <h5 className="text-lg font-semibold text-white">
                              {project.title}
                            </h5>
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent-300 hover:text-accent-200 transition-colors duration-200 text-sm font-medium"
                            >
                              View on GitHub →
                            </a>
                          </div>
                          <p className="text-white/90 leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resume Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a 
            href="https://drive.google.com/file/d/1A5zfUUEOFgZhPxz9mkOv06x54-4syNir/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View full resume
          </a>
        </motion.div>
      </div>
    </section>
  )
}
