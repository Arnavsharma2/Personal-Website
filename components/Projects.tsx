'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    title: 'Automated Predictive Modeling Platform',
    description: 'Full-stack ML platform with FastAPI/Next.js serving real-time inference. AutoPreprocessor, Bayesian optimization, SHAP/LIME explainability, and MLOps workflows.',
    technologies: ['Python', 'FastAPI', 'Next.js', 'PostgreSQL', 'Redis', 'Docker'],
    image: '/automatedModeling.png',
    github: 'https://github.com/Arnavsharma2/Predictive-Modeling-Automation',
    live: 'https://automated-predictive-modeling.vercel.app/',
  },
  {
    title: 'Real-Time ASL Learning Platform',
    description: '98.98% accuracy PyTorch model converted to ONNX for <50ms browser inference. MediaPipe hand tracking at 60 FPS with interactive lessons and progress tracking.',
    technologies: ['PyTorch', 'ONNX', 'MediaPipe', 'Next.js', 'FastAPI', 'Supabase'],
    image: '/image copy.png',
    github: 'https://github.com/Arnavsharma2/ASL-Learning-Platform',
    live: 'https://asl-learning-platform-psi.vercel.app/',
  },
  {
    title: 'Resume Chatbot',
    description: 'RAG-powered chatbot using LangChain and OpenAI API for natural conversations about professional background with vector similarity search.',
    technologies: ['Python', 'LangChain', 'OpenAI API', 'ChromaDB', 'Flask'],
    image: '/chatwresume.png',
    github: 'https://github.com/Arnavsharma2/Chat-With-my-Resume',
  },
  {
    title: 'AI Movie Recommendation Engine',
    description: 'Personalized movie suggestions powered by Google Gemini AI with interactive questionnaire, watch history tracking, and OMDB API integration.',
    technologies: ['Next.js', 'TypeScript', 'Gemini API', 'OMDB API'],
    image: '/image.png',
    github: 'https://github.com/Arnavsharma2/Movie-Suggestion',
    live: 'https://movie-suggestion-8ty3.onrender.com/',
  },
  {
    title: 'PSU Menu Analyzer',
    description: 'Scrapes Penn State dining menus and provides AI-powered nutritional analysis with dietary filtering and CSV export.',
    technologies: ['Python', 'Flask', 'Gemini API', 'BeautifulSoup'],
    image: '/psu-menu-analyzer.png',
    github: 'https://github.com/Arnavsharma2/PSUMenuAnalyzerWebsite',
    live: 'https://psumenu.com',
  },
  {
    title: 'AI Reddit Post Analyzer',
    description: 'Analyzes up to 5,000 Reddit posts from financial subreddits for market sentiment using NLP classification and summary generation.',
    technologies: ['Python', 'Gemini API', 'PRAW', 'Pandas'],
    image: '/analyse.png',
    github: 'https://github.com/Arnavsharma2/Reddit-Scraper-and-AI-Analysis',
  },
  {
    title: 'SubReddit Monitor',
    description: 'Real-time Reddit streaming bot with instant email notifications for keyword matches, enabling automated market sentiment tracking.',
    technologies: ['Python', 'PRAW', 'SMTP'],
    image: '/monitor.png',
    github: 'https://github.com/Arnavsharma2/SubReddit-Monitor',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="projects" ref={ref} className="min-h-screen bg-black relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            Projects
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-white/40 text-lg mb-16 max-w-xl"
          >
            Selected work in machine learning, full-stack development, and AI applications.
          </motion.p>

          {/* Project grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className="group relative bg-white/[0.03] rounded-xl border border-white/[0.06] overflow-hidden hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300"
              >
                {/* Project image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Links overlay */}
                  <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-black/60 backdrop-blur-sm rounded-full text-white/70 hover:text-white transition-colors"
                      aria-label="GitHub"
                    >
                      <Github size={14} />
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-black/60 backdrop-blur-sm rounded-full text-white/70 hover:text-white transition-colors"
                        aria-label="Live demo"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono text-white/25 px-2 py-0.5 rounded-full border border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom contact */}
          <motion.div
            variants={itemVariants}
            className="mt-20 pt-12 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <p className="text-white/30 text-sm">
              Built by Arnav Sharma
            </p>
            <div className="flex items-center gap-6">
              <a
                href="mailto:aqs7726@psu.edu"
                className="text-white/30 hover:text-white text-sm transition-colors"
              >
                aqs7726@psu.edu
              </a>
              <a
                href="https://drive.google.com/file/d/1A5zfUUEOFgZhPxz9mkOv06x54-4syNir/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white text-sm font-mono transition-colors"
              >
                Resume
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
