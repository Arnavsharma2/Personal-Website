'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, Github, Linkedin, Instagram, ExternalLink } from 'lucide-react'

const socialLinks = [
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:aqs7726@psu.edu',
    color: 'text-red-400 hover:text-red-300'
  },
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/Arnavsharma2',
    color: 'text-gray-300 hover:text-white'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/in/arnav-sharma2',
    color: 'text-blue-400 hover:text-blue-300'
  },
  {
    name: 'Discord',
    icon: 'discord',
    href: 'https://discord.com/users/1408270730801451115',
    color: 'text-purple-400 hover:text-purple-300'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://instagram.com/arnav.s.7',
    color: 'text-pink-400 hover:text-pink-300'
  }
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
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
            is always open, and I&apos;ll try to get back as soon as possible.
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-4 overflow-x-auto pb-2">
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
                className={`group flex items-center space-x-2 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-gray-800 hover:bg-gray-800/50 transition-all duration-300 ${social.color} whitespace-nowrap`}
              >
                {social.name === 'Discord' ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                ) : (
                  <social.icon className="w-5 h-5" />
                )}
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
            className="pt-12 border-t border-gray-800"
          >
            <p className="text-gray-400 text-sm">
              © Arnav Sharma 2025. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              This site is built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion.{' '}
              <a 
                href="https://github.com/Arnavsharma2/personal-website" 
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
