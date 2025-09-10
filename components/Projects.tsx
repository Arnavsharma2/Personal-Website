'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    title: 'Handscript',
    description: 'A web app that helps users learn American Sign Language with real time translation, instruction, and feedback.',
    technologies: ['TensorFlow', 'React.js', 'AWS', 'Flask'],
    image: '/api/placeholder/400/300',
    github: '#',
    live: '#'
  },
  {
    title: 'Chatter',
    description: 'An app for messaging your friends and family with a visually aesthetic design.',
    technologies: ['React.js', 'MongoDB', 'Express', 'NodeJS'],
    image: '/api/placeholder/400/300',
    github: '#',
    live: '#'
  },
  {
    title: 'Community Connect',
    description: 'A social media app that connects the community through recycling by various rewards systems and social features.',
    technologies: ['React Native', 'Firebase', 'CSS', 'Node'],
    image: '/api/placeholder/400/300',
    github: '#',
    live: '#'
  },
  {
    title: 'ML Research',
    description: 'Reducing algorithmic bias in imbalanced datasets through conditional synthetic image generation.',
    technologies: ['TensorFlow', 'Pandas', 'Seaborn', 'Numpy'],
    image: '/api/placeholder/400/300',
    github: '#',
    live: '#'
  }
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            03.
          </h2>
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-300 mb-4">
            Projects
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white/80">
                    {project.title.charAt(0)}
                  </span>
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <a
                    href={project.github}
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href={project.live}
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors duration-200">
                  {project.title}
                </h4>
                
                <p className="text-gray-300 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm font-medium hover:bg-white/20 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
