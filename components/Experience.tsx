'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Building2, Calendar, MapPin } from 'lucide-react'
import Image from 'next/image'

const experiences = [
  {
    company: 'Wefire',
    position: 'Software Engineering Intern',
    duration: 'January 2025 - Present',
    location: 'Hayward, CA',
    description: 'Developed comprehensive Reddit data analysis and monitoring solutions for financial sentiment tracking and market intelligence.',
    technologies: ['Python', 'Google Gemini API', 'PRAW', 'Pandas', 'SMTP', 'NLP', 'Data Processing', 'Web Scraping', 'Real-time Processing', 'Automation', 'Monitoring'],
    projects: [
      {
        title: 'AI-Powered Reddit Post Analyzer',
        description: 'Developed a robust scraping tool in Python to collect and analyze up to 5,000 posts from targeted subreddits, automating the process of gathering user sentiment. Integrated the Google Gemini API to perform complex NLP tasks, automatically classifying each post by financial domain and question type, and generating concise summaries. Engineered a data processing pipeline using Pandas to systematically structure the raw scraped data and AI-generated insights.',
        github: 'https://github.com/Arnavsharma2/Reddit-Scraper-and-AI-Analysis'
      },
      {
        title: 'SubReddit Monitor & Notification Tool',
        description: 'Engineered an automated bot to monitor Reddit posts in real-time by streaming data from specified subreddits using the PRAW library. Implemented a keyword-matching system to instantly identify relevant posts and developed a notification pipeline that sends detailed email alerts via SMTP. Features real-time data streaming, intelligent filtering algorithms, and multi-channel notification delivery.',
        github: 'https://github.com/Arnavsharma2/SubReddit-Monitor'
      }
    ]
  }
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            02.
          </h2>
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-300 mb-4">
            Experience
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
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
                    <div className="w-1 h-24 bg-gradient-to-b from-purple-500 to-blue-500 mt-4"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <div>
                        <h4 className="text-2xl font-bold text-white mb-1">
                          {exp.position}
                        </h4>
                        <p className="text-xl font-semibold text-purple-400 mb-2">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-sm text-gray-400">
                        {exp.duration}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-gray-400 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                    {exp.description}
                  </p>
                  
                  {/* Projects */}
                  {exp.projects && (
                    <div className="space-y-4 mb-6">
                      {exp.projects.map((project, projectIndex) => (
                        <div key={projectIndex} className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/50 hover:bg-gray-800/50 transition-all duration-300">
                          <div className="flex items-start justify-between mb-3">
                            <h5 className="text-lg font-semibold text-white">
                              {project.title}
                            </h5>
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-400 hover:text-purple-300 transition-colors duration-200 text-sm font-medium"
                            >
                              View on GitHub →
                            </a>
                          </div>
                          <p className="text-gray-300 leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700/50 transition-colors duration-200 border border-gray-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
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
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View full resume
          </a>
        </motion.div>
      </div>
    </section>
  )
}
