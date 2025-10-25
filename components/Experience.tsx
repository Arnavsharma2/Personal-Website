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
    duration: 'January 2025 - Present',
    location: 'Hayward, CA',
    description: 'Developed and deployed advanced Python-based programs that transformed 5,000+ Reddit posts into actionable financial insights, driving company publicity initiatives through sentiment analysis powered by Google Gemini API and Pandas. Created a high-performance real-time monitoring infrastructure using PRAW tracking brand mentions and sales keywords across multiple subreddits, generating 500+ instant alerts through an automated SMTP pipeline during 24-hour testing periods, resulting in 40% faster customer response times and enhanced brand reputation management.'
  }
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-accent-600 mb-4">
            02.
          </h2>
          <h3 className="text-2xl sm:text-3xl font-semibold text-primary-900 mb-4">
            Experience
          </h3>
          <div className="w-24 h-1 bg-accent-500 mx-auto"></div>
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
              <div className="flex items-start gap-8">
                {/* Logo and Timeline */}
                <div className="flex flex-col items-center flex-shrink-0">
                  {/* Company Logo */}
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center border-4 border-gray-800 shadow-xl relative">
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
                    <div className="w-1 h-24 bg-gray-200 mt-4"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <div>
                        <h4 className="text-2xl font-bold text-primary-900 mb-1">
                          {exp.position}
                        </h4>
                        <p className="text-xl font-semibold text-accent-600 mb-2">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-sm text-primary-600">
                        {exp.duration}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-primary-600 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-primary-700 leading-relaxed mb-6 text-lg">
                    {exp.description}
                  </p>
                  
                  {/* Projects */}
                  {exp.projects && (
                    <div className="space-y-4 mb-6">
                      {exp.projects.map((project, projectIndex) => (
                        <div key={projectIndex} className="bg-accent-100 rounded-xl p-5 border border-accent-200 hover:bg-accent-200 transition-all duration-300">
                          <div className="flex items-start justify-between mb-3">
                            <h5 className="text-lg font-semibold text-primary-900">
                              {project.title}
                            </h5>
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent-600 hover:text-accent-700 transition-colors duration-200 text-sm font-medium"
                            >
                              View on GitHub →
                            </a>
                          </div>
                          <p className="text-primary-700 leading-relaxed">
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
            href="https://drive.google.com/file/d/1iTAfWiDSwpUaJAQZzH0g8bCpY1kccbOo/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-accent-500 text-white hover:bg-accent-600 font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
          >
            View full resume
          </a>
        </motion.div>
      </div>
    </section>
  )
}
