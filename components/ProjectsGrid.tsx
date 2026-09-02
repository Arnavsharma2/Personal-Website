'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { ExternalLink, Github } from 'lucide-react'

interface ProjectItem {
  title: string
  description: string
  technologies: string[]
  github: string
  image?: string
  placeholder?: string
  gradient?: string
  live?: string
}

const projects: ProjectItem[] = [
  {
    title: 'CacheForge',
    description: '2-bit KV-cache quantization for LLM inference with custom CUDA kernels; 2.6x lower peak memory and up to 3.47x higher throughput.',
    technologies: ['python', 'pytorch', 'cuda', 'c++', 'flashattention'],
    placeholder: 'CF',
    gradient: 'linear-gradient(135deg, #171A2B 0%, #4355DB 100%)',
    github: 'https://github.com/Arnavsharma2/CacheForge',
  },
  {
    title: 'Benchseed',
    description: 'Parallel, constant-memory TPC-H data generation in Rust with Arrow and Parquet; byte-for-byte parity in CI and 14.4x faster than DuckDB at 100 GB.',
    technologies: ['rust', 'arrow', 'parquet', 'python', 'cli'],
    placeholder: 'BS',
    gradient: 'linear-gradient(135deg, #132A24 0%, #2F855A 100%)',
    github: 'https://github.com/Arnavsharma2/benchseed',
  },
  {
    title: 'Threadwave',
    description: 'Pure-Go real-time collaboration with Yjs-compatible CRDTs, WebSockets, SQLite, and NATS/JetStream, verified across 158 cross-language fixtures.',
    technologies: ['go', 'crdts', 'websockets', 'sqlite', 'nats'],
    placeholder: 'TW',
    gradient: 'linear-gradient(135deg, #2D1B33 0%, #9F5FBD 100%)',
    github: 'https://github.com/Arnavsharma2/threadwave',
  },
  {
    title: 'Automated Predictive Modeling',
    description: 'full-stack ML platform with real-time inference and explainability',
    technologies: ['nextjs', 'python', 'fastapi'],
    image: '/automatedModeling.png',
    github: 'https://github.com/Arnavsharma2/Predictive-Modeling-Automation',
    live: 'https://automated-predictive-modeling.vercel.app/',
  },
  {
    title: 'ASL Learning Platform',
    description: '98.98% accuracy model with real-time hand tracking in-browser',
    technologies: ['pytorch', 'mediapipe', 'nextjs'],
    image: '/image copy.png',
    github: 'https://github.com/Arnavsharma2/ASL-Learning-Platform',
    live: 'https://asl-learning-platform-psi.vercel.app/',
  },
  {
    title: 'PSU Dining AI',
    description: 'AI-powered dining menu nutritional analysis',
    technologies: ['python', 'flask', 'gemini api'],
    image: '/psu-menu-analyzer.png',
    github: 'https://github.com/Arnavsharma2/PSUMenuAnalyzerWebsite',
    live: 'https://psumenu.com',
  },

  {
    title: 'Resume Chatbot',
    description: 'RAG-powered chatbot for conversations about my background',
    technologies: ['python', 'langchain', 'openai'],
    image: '/chatwresume.png',
    github: 'https://github.com/Arnavsharma2/Chat-With-my-Resume',
  },
  {
    title: 'Reddit Post Analyzer',
    description: 'AI classification and summarization for financial subreddit posts',
    technologies: ['python', 'gemini api', 'httpx'],
    image: '/analyse.png',
    github: 'https://github.com/Arnavsharma2/Reddit-Scraper-and-AI-Analysis',
  },
]

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="project-card"
    >
      {/* Project image */}
      <div className="project-card-image">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="220px"
          />
        ) : (
          <div
            className="project-card-placeholder"
            style={{ background: project.gradient }}
            aria-hidden="true"
          >
            <span>{project.placeholder}</span>
          </div>
        )}
        {/* Link icons overlay */}
        <div className="project-card-links">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-icon"
            aria-label="GitHub"
          >
            <Github size={14} />
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-icon"
              aria-label="Live demo"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="project-card-content">
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-desc">{project.description}</p>
        <div className="project-card-tags">
          {project.technologies.map((tech) => (
            <span key={tech} className="project-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="projects" ref={ref} className="projects-section">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          ~/projects
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="projects-scroll-container"
      >
        <div className="projects-scroll">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
