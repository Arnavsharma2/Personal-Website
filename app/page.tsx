'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import ChatResumeSidebar from '@/components/ChatResumeSidebar'
import { useVisitTracker } from '@/hooks/useVisitTracker'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  
  // Track visits (invisible to users)
  useVisitTracker()

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects']
      const scrollPosition = window.scrollY + 100

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          const isLastSection = i === sections.length - 1
          
          if (isLastSection) {
            if (scrollPosition >= offsetTop - 200) {
              setActiveSection(section)
              break
            }
          } else {
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section)
              break
            }
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="bg-black">
      <Navigation activeSection={activeSection} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-black"
      >
        <Hero />
        <About />
        <Experience />
        <Projects />
      </motion.div>
      
      {/* Resume Chatbot Sidebar */}
      <ChatResumeSidebar />
      
    </main>
  )
}
