'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

interface ExperienceItem {
  company: string
  role: string
  date: string
  location: string
  color: string
  initials: string
  logo?: string
  description?: string[]
}

const experiences: ExperienceItem[] = [
  {
    company: 'WeFIRE',
    role: 'Data Science Intern',
    date: '01/2025 - 11/2025',
    location: 'Hayward, California',
    color: '#FF6F00',
    initials: 'WF',
    logo: '/wefirelogo.jpeg',
    description: [
      'Led 0-1 development of automated market intelligence software',
    ],
  },
]

const extracurriculars: ExperienceItem[] = [
  {
    company: 'Nittany AI Alliance',
    role: 'Software Developer',
    date: '09/2024 - Present',
    location: 'University Park, PA',
    color: '#3b82f6',
    initials: 'NAI',
    description: [
      'Developing AI-powered applications for Penn State community',
    ],
  },
  {
    company: 'Google Developer Student Club',
    role: 'Member',
    date: '09/2024 - Present',
    location: 'University Park, PA',
    color: '#4285f4',
    initials: 'GDSC',
    description: [
      'Participating in workshops and collaborative projects',
    ],
  },
]

function ExperienceCard({ item, index }: { item: ExperienceItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="experience-card"
    >
      <button
        className="experience-card-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="experience-left">
          <div
            className="experience-logo"
            style={{ backgroundColor: item.color }}
          >
            {item.logo ? (
              <Image 
                src={item.logo} 
                alt={item.company} 
                width={32} 
                height={32} 
                className="experience-logo-img"
              />
            ) : (
              <span className="experience-logo-text">{item.initials}</span>
            )}
          </div>
          <div className="experience-info">
            <h3 className="experience-company">{item.company}</h3>
            <p className="experience-role">{item.role}</p>
          </div>
        </div>
        <div className="experience-right">
          <div className="experience-meta">
            <span className="experience-date">{item.date}</span>
            <span className="experience-location">{item.location}</span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={16} className="experience-chevron" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && item.description && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="experience-details"
          >
            <div className="experience-description-plain">
              {item.description.map((desc, i) => (
                <p key={i}>{desc}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [activeTab, setActiveTab] = useState<'experience' | 'extracurriculars'>('experience')

  const items = activeTab === 'experience' ? experiences : extracurriculars

  return (
    <section id="experience" ref={ref} className="experience-section">
      <div className="section-container">
        <div className="experience-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-title"
          >
            ~/what i&apos;ve done
          </motion.h2>

          {/* 
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="experience-tabs"
          >
            <button
              className={`exp-tab ${activeTab === 'experience' ? 'active' : ''}`}
              onClick={() => setActiveTab('experience')}
            >
              Experience
            </button>
            <button
              className={`exp-tab ${activeTab === 'extracurriculars' ? 'active' : ''}`}
              onClick={() => setActiveTab('extracurriculars')}
            >
              Extracurriculars
            </button>
          </motion.div>
          */}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="experience-list"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {items.map((item, i) => (
                <ExperienceCard key={item.company} item={item} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
