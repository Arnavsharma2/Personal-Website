'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'

const projects = [
  {
    title: 'Real-Time ASL Learning Platform',
    description: 'A real-time ASL learning platform with 98.98% accuracy PyTorch neural network converted to ONNX for <50ms browser inference. Features MediaPipe hand tracking for 60 FPS sign recognition of all 26 alphabet signs, FastAPI backend with Supabase database, user authentication, lesson modules, interactive quizzes, and progress tracking.',
    technologies: ['Next.js', 'React', 'Python', 'PyTorch', 'FastAPI', 'TypeScript', 'ONNX Runtime', 'MediaPipe', 'Supabase', 'PostgreSQL'],
    image: '/image copy.png',
    github: 'https://github.com/Arnavsharma2/ASL-Learning-Platform',
    live: 'https://asl-learning-platform-psi.vercel.app/',
    showLive: true,
    category: 'web-app'
  },
  {
    title: 'Resume Chatbot',
    description: 'An intelligent resume chatbot that allows natural conversations about professional background and experience. Built with Retrieval-Augmented Generation (RAG) technology using LangChain and OpenAI API for responses.',
    technologies: ['Python', 'LangChain', 'OpenAI API', 'ChromaDB', 'FAISS', 'Flask', 'RAG'],
    image: '/chatwresume.png',
    github: 'https://github.com/Arnavsharma2/Chat-With-my-Resume',
    live: '#',
    showLive: false,
    category: 'web-app'
  },
  {
    title: 'Predictive Modeling Projects',
    description: 'A comprehensive portfolio of machine learning projects demonstrating expertise in predictive modeling techniques. Includes House Price Prediction using regression models, Customer Churn Prediction with classification algorithms, Stock Return Forecasting using LSTM neural networks and time series analysis, and Blackjack Strategy Analysis with ensemble methods. Each project features data loading, feature engineering, model training with scikit-learn/XGBoost/TensorFlow, evaluation metrics, and trained model outputs.',
    technologies: ['Python', 'Scikit-learn', 'TensorFlow', 'Keras', 'XGBoost', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter Notebook'],
    image: '/Predictive-Modeling-Implementations.png',
    github: 'https://github.com/Arnavsharma2/Predictive-Modeling-Projects',
    live: '#',
    showLive: false,
    category: 'ml-ai'
  },
  {
    title: 'AI Movie Recommendation Engine',
    description: 'A movie recommendation platform powered by Google Gemini AI that provides personalized movie suggestions through an interactive questionnaire. Features watch history tracking, OMDB API integration for movie metadata, and a responsive UI built with Next.js and Tailwind CSS.',
    technologies: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Google Gemini API', 'OMDB API', 'Node.js', 'localStorage'],
    image: '/image.png',
    github: 'https://github.com/Arnavsharma2/Movie-Suggestion',
    live: 'https://movie-suggestion-8ty3.onrender.com/',
    showLive: true,
    category: 'web-app'
  },
  {
    title: 'PSU Menu Analyzer Website',
    description: 'A full-stack web application that scrapes Penn State dining menus and provides AI-powered nutritional analysis. Features real-time menu updates, dietary filtering, and CSV export using Google Gemini API.',
    technologies: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript', 'Google Gemini API', 'BeautifulSoup'],
    image: '/psu-menu-analyzer.png',
    github: 'https://github.com/Arnavsharma2/PSUMenuAnalyzerWebsite',
    live: 'https://psumenu.com',
    category: 'web-app'
  },
  {
    title: 'AI-Powered Reddit Post Analyzer',
    description: 'A Python tool that scrapes and analyzes up to 5,000 Reddit posts from financial subreddits to track market sentiment. Uses Google Gemini API for NLP classification and summary generation, with Pandas for data processing and structuring insights.',
    technologies: ['Python', 'Google Gemini API', 'PRAW', 'Pandas', 'NLP'],
    image: '/analyse.png',
    github: 'https://github.com/Arnavsharma2/Reddit-Scraper-and-AI-Analysis',
    live: '#',
    showLive: false,
    category: 'web-scraping'
  },
  {
    title: 'SubReddit Monitor & Notification Tool',
    description: 'An automated monitoring bot that streams Reddit posts in real-time using PRAW library and identifies relevant financial discussions. Sends instant email notifications via SMTP when keyword matches are found, enabling real-time market sentiment tracking.',
    technologies: ['Python', 'PRAW', 'SMTP'],
    image: '/monitor.png',
    github: 'https://github.com/Arnavsharma2/SubReddit-Monitor',
    live: '#',
    showLive: false,
    category: 'web-scraping'
  }
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 relative min-h-screen flex items-center overflow-hidden pb-32">
      {/* Background Image with parallax effect */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/calvin-hobbes-snow-white-calvin-hobbes-snow-white.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Cool overlay effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-accent-900/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      
      {/* Animated overlay for depth */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          {/* Subtle backdrop blur for header */}
          <div className="absolute inset-0 -z-10 bg-black/20 backdrop-blur-sm rounded-2xl -m-4" />
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            03.
          </h2>
          <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4 drop-shadow-lg">
            Projects
          </h3>
          <div className="w-24 h-1 bg-accent-400 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group bg-white/20 backdrop-blur-md rounded-xl overflow-hidden border border-white/30 hover:bg-white/30 hover:shadow-lg hover:shadow-white/20 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-50 overflow-hidden group-hover:from-primary-200 group-hover:to-primary-100 transition-all duration-300">
                {project.image && project.image !== '/api/placeholder/400/300' ? (
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    onError={(e) => {
                      // Fallback to letter if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className={`absolute inset-0 bg-gray-200/20 flex items-center justify-center ${
                    project.image && project.image !== '/api/placeholder/400/300' ? 'hidden' : ''
                  }`}
                >
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
                  {project.showLive !== false && (
                    <a
                      href={project.live}
                      className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-6 h-6 text-white" />
                    </a>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-accent-300 transition-colors duration-200 drop-shadow-md">
                  {project.title}
                </h4>
                
                <p className="text-white/90 leading-relaxed mb-4 drop-shadow-md">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium hover:bg-white/30 border border-white/30 transition-colors duration-200"
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
