'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'

const projects = [
  {
    title: 'Stock Return Forecaster',
    description: 'A deep learning model that predicts future stock returns using LSTM neural networks trained on historical price data. Built it processes data over 1000+ stocks to identify patterns and predict market movements.',
    technologies: ['Python', 'TensorFlow', 'Keras', 'Scikit-learn', 'Pandas'],
    image: '/stockprediction.png',
    github: 'https://github.com/Arnavsharma2/StockReturnPrediction',
    live: '#',
    showLive: false,
    category: 'ml-ai'
  },
  {
    title: 'Customer Churn Predictor',
    description: 'A machine learning system that identifies customers likely to cancel their services using classification algorithms. Analyzes customer data and provides insights for retention strategies.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Plotly', 'PyCaret'],
    image: '/Churn.png',
    github: 'https://github.com/Arnavsharma2/CustomerChurnPredictor',
    live: '#',
    showLive: false,
    category: 'ml-ai'
  },
  {
    title: 'House Price Prediction Model',
    description: 'A predictive model that estimates house sale prices by analyzing over 1,400 properties with 80+ features. Trains multiple regression algorithms to achieve 80% accuracy in price forecasting, potentially projecting better accuracy with more data. ',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'XGBoost', 'Matplotlib'],
    image: '/housingpriceprediction.png',
    github: 'https://github.com/Arnavsharma2/HousingPricePrediction',
    live: '#',
    showLive: false,
    category: 'ml-ai'
  },
  {
    title: 'Blackjack Machine Learning Analysis',
    description: 'An ML analysis of blackjack simulation data using ensemble methods to predict optimal player actions. Trained on 500k samples with multiple algorithms including Logistic Regression, Random Forest, XGBoost, and Neural Networks. Features strategy visualization heatmaps and win probability prediction.',
    technologies: ['Python', 'Scikit-learn', 'XGBoost', 'Neural Networks', 'Pandas', 'Jupyter', 'Matplotlib'],
    image: '/blackj.png',
    github: 'https://github.com/Arnavsharma2/Blackjack-Analysis',
    live: '#',
    showLive: false,
    category: 'ml-ai'
  },
  {
    title: 'Gesture Volume Control',
    description: 'A real-time computer vision application that controls system volume using hand gestures. Utilizes MediaPipe hand tracking to measure the distance between thumb and index finger, sending terminal commands to adjust Mac volume dynamically based on pinch distance.',
    technologies: ['Python', 'OpenCV', 'MediaPipe', 'NumPy', 'macOS'],
    image: '/gestureVolControl.png',
    github: 'https://github.com/Arnavsharma2/Gesture-Volume-Control',
    live: '#',
    showLive: false,
    category: 'cv'
  },
  {
    title: 'Virtual Background Application',
    description: 'A real-time virtual background application that removes webcam backgrounds and replaces them with custom images. Built using cvzone\'s SelfiSegmentation and OpenCV for video capture and background removal. ',
    technologies: ['Python', 'OpenCV', 'cvzone', 'SelfiSegmentation'],
    image: '/VirtualBackground.png',
    github: 'https://github.com/Arnavsharma2/Virtual-Background',
    live: '#',
    showLive: false,
    category: 'cv'
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
    title: 'Chat With My Resume',
    description: 'An intelligent resume chatbot that allows natural conversations about professional background and experience. Built with Retrieval-Augmented Generation (RAG) technology using LangChain and OpenAI API for responses.',
    technologies: ['Python', 'LangChain', 'OpenAI API', 'ChromaDB', 'FAISS', 'Flask', 'RAG'],
    image: '/chatwresume.png',
    github: 'https://github.com/Arnavsharma2/Chat-With-my-Resume',
    live: '#',
    showLive: false,
    category: 'web-app'
  }
]

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'ml-ai', label: 'ML & AI' },
  { id: 'cv', label: 'Computer Vision' },
  { id: 'web-scraping', label: 'Web Scraping' },
  { id: 'web-app', label: 'Web Applications' }
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory)

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

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/50'
                  : 'bg-white text-primary-700 hover:bg-accent-100 hover:text-accent-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
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
