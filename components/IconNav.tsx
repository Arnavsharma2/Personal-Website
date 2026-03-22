'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Home, Briefcase, FolderOpen, Mail, Linkedin, Github, Sun, Moon } from 'lucide-react'

const navItems = [
  { icon: Home, label: 'Home', href: '#home' },
  { icon: Briefcase, label: 'Experience', href: '#experience' },
  { icon: FolderOpen, label: 'Projects', href: '#projects' },
  { icon: Mail, label: 'Contact', href: '#contact' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/arnav-sharma2/', external: true },
  { icon: Github, label: 'GitHub', href: 'https://github.com/Arnavsharma2', external: true },
]

export default function IconNav() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'contact']
      const scrollPos = window.scrollY + 200

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const { offsetTop, offsetHeight } = el
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, '_blank', 'noopener,noreferrer')
      return
    }
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="icon-nav-wrapper"
    >
      <div className="icon-nav-pill">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = !item.external && item.href === `#${activeSection}`
          return (
            <span key={item.label} style={{ display: 'contents' }}>
              {index === 3 && <div className="icon-nav-divider" />}
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-nav-btn"
                  aria-label={item.label}
                  title={item.label}
                >
                  <Icon size={16} />
                </a>
              ) : (
                <button
                  onClick={() => handleClick(item.href)}
                  className={`icon-nav-btn ${isActive ? 'active' : ''}`}
                  aria-label={item.label}
                  title={item.label}
                >
                  <Icon size={16} />
                </button>
              )}
            </span>
          )
        })}
      </div>
    </motion.nav>
  )
}
