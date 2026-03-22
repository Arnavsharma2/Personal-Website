'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="contact" ref={ref} className="contact-section">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          ~/contact
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="contact-content"
        >
          <p>
            &lt;<a href="mailto:arnav.sh2264@gmail.com" className="contact-link">arnav.sh2264@gmail.com</a>&gt;
          </p>
          <p className="contact-secondary">
            or say hi on{' '}
            <a
              href="https://www.linkedin.com/in/arnav-sharma2/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              linkedin
            </a>
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="site-footer"
      >
        <p>&copy; 2026</p>
      </motion.footer>
    </section>
  )
}
