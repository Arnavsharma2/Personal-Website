'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'

const projects = [
  {
    title: 'Stock Return Forecaster with Deep Learning',
    description: 'A deep learning model that predicts future stock returns using LSTM neural networks trained on historical price data. Built it processes data over 1000+ stocks to identify patterns and predict market movements.',
    technologies: ['Python', 'TensorFlow', 'Keras', 'Scikit-learn', 'Pandas'],
    image: '/stockprediction.png',
    github: 'https://github.com/Arnavsharma2/StockReturnPrediction',
    live: '#',
    showLive: false
  },
  {
    title: 'Customer Churn Predictor',
    description: 'A machine learning system that identifies customers likely to cancel their services using classification algorithms. Analyzes customer data and provides insights for retention strategies.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Plotly', 'PyCaret'],
    image: '/Churn.png',
    github: 'https://github.com/Arnavsharma2/CustomerChurnPredictor',
    live: '#',
    showLive: false
  },
  {
    title: 'House Price Prediction Model',
    description: 'A predictive model that estimates house sale prices by analyzing over 1,400 properties with 80+ features. Trains multiple regression algorithms to achieve 80% accuracy in price forecasting, potentially projecting better accuracy with more data. ',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'XGBoost', 'Matplotlib'],
    image: '/housingpriceprediction.png',
    github: 'https://github.com/Arnavsharma2/HousingPricePrediction',
    live: '#',
    showLive: false
  },
  {
    title: 'PSU Menu Analyzer Website',
    description: 'A full-stack web application that scrapes Penn State dining menus and provides AI-powered nutritional analysis. Features real-time menu updates, dietary filtering, and CSV export using Google Gemini API.',
    technologies: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript', 'Google Gemini API', 'Web Scraping'],
    image: '/psu-menu-analyzer.png',
    github: 'https://github.com/Arnavsharma2/PSUMenuAnalyzerWebsite',
    live: 'https://psumenu.com'
  },
  {
    title: 'Chat With My Resume',
    description: 'An intelligent resume chatbot that allows natural conversations about professional background and experience. Built with Retrieval-Augmented Generation (RAG) technology using LangChain and OpenAI API for responses.',
    technologies: ['Python', 'LangChain', 'OpenAI API', 'ChromaDB', 'FAISS', 'Flask', 'RAG'],
    image: '/chatwresume.png',
    github: 'https://github.com/Arnavsharma2/Chat-With-my-Resume',
    live: '#',
    showLive: false
  }
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-accent-600 mb-4">
            03.
          </h2>
          <h3 className="text-2xl sm:text-3xl font-semibold text-primary-900 mb-4">
            Projects
          </h3>
          <div className="w-24 h-1 bg-accent-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group bg-white rounded-xl overflow-hidden border border-primary-200 hover:shadow-lg hover:shadow-primary-200/50 transition-all duration-300 ring-2 ring-primary-700/60 hover:ring-primary-800/80"
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
                <h4 className="text-xl font-semibold text-primary-900 mb-3 group-hover:text-accent-600 transition-colors duration-200">
                  {project.title}
                </h4>
                
                <p className="text-primary-700 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-accent-200 text-accent-800 rounded-full text-sm font-medium hover:bg-accent-300 transition-colors duration-200"
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
