'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react'

const socialLinks = [
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:your.email@example.com',
    color: 'hover:text-red-400'
  },
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/yourusername',
    color: 'hover:text-gray-300'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/in/yourusername',
    color: 'hover:text-blue-400'
  },
  {
    name: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com/yourusername',
    color: 'hover:text-blue-400'
  }
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            04.
          </h2>
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-300 mb-4">
            Contact
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center space-y-8"
        >
          <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            If you have opportunities or are interested in collaboration, please email me. 
            You can also connect on social media for questions or just to say hi! My inbox 
            is always open, and I'll try to get back as soon as possible.
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`group flex items-center space-x-2 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300 ${social.color}`}
              >
                <social.icon className="w-5 h-5" />
                <span className="font-medium">{social.name}</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </motion.a>
            ))}
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-12 border-t border-white/10"
          >
            <p className="text-gray-400 text-sm">
              © Your Name 2024. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              This site is built from scratch with Next.js, Tailwind CSS, and Framer Motion.{' '}
              <a 
                href="https://github.com/yourusername/personal-website" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors duration-200"
              >
                View the source code on Github
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
