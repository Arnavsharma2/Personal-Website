'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Building2, Calendar, MapPin } from 'lucide-react'

const experiences = [
  {
    company: 'Apple',
    position: 'SWE Intern',
    duration: 'June 2024 - September 2024',
    location: 'Cupertino, CA',
    description: 'I developed a MongoDB-based plugin in Golang, reducing server metadata search time from 30 to 1.5 seconds. This optimized storage move operations to decrease server disruption time by 18 hours monthly across 2,000+ moves. Additionally, I architected a REST API with Go ent for Choria integration, streamlining server interactions and reducing development time by 85%.',
    technologies: ['Golang', 'MongoDB', 'REST API', 'Choria', 'Go ent']
  },
  {
    company: 'GalaxySDK',
    position: 'SWE Intern',
    duration: 'June 2023 - August 2023',
    location: 'Remote',
    description: 'I developed an inviting onboarding page, boosting user experience and increasing monthly signed-in users by 20%. Next, I built a robust Flask, OpenAI, and Firebase backend for a GPT-powered chat game from scratch. After, I worked on 8 tickets to optimize UI/UX, leading to an enhanced interface and resolution of customer concerns.',
    technologies: ['Flask', 'OpenAI', 'Firebase', 'Python', 'UI/UX']
  },
  {
    company: 'Salubrity',
    position: 'SWE Intern',
    duration: 'June 2022 - August 2022',
    location: 'Remote',
    description: 'I built a Flask backend using Python and Selenium to pull out scrape 70k+ datapoints, helping identify businesses that would benefit from Salubrity\'s services, and leading to an expansion from 1 to 10 cities. I also set up an internal tool using a NGINX server backend with a HTML/CSS/JS frontend to find potential business prospects for future growth.',
    technologies: ['Flask', 'Python', 'Selenium', 'NGINX', 'HTML/CSS/JS']
  },
  {
    company: 'Gardeneur',
    position: 'SWE Intern',
    duration: 'January 2022 - May 2022',
    location: 'Remote',
    description: 'I led a team of 3 in creating a ML plant detection app. I used Tensorflow to train a deep learning model to detect plants using 25 GB of raw image data, achieving 96% accuracy across 50 categories. I created a React Native mobile app and embedded this model to work in real time on smartphones.',
    technologies: ['TensorFlow', 'React Native', 'Machine Learning', 'Python', 'Mobile Development']
  }
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
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

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* Company Info */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-white mb-1">
                      {exp.position}
                    </h4>
                    <p className="text-lg font-medium text-gray-300 mb-2">
                      {exp.company}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="lg:w-2/3">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm font-medium hover:bg-white/20 transition-colors duration-200"
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
          <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            View full resume
          </button>
        </motion.div>
      </div>
    </section>
  )
}
