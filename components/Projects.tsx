'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'

const projects = [
  {
    title: 'Stock Return Forecaster with Deep Learning',
    description: 'Architected and trained a Long Short-Term Memory (LSTM) neural network to forecast future stock returns based on historical time-series price data. Implemented a data processing workflow to structure sequential stock data, normalizing features and creating sliding windows suitable for training a recurrent neural network. Developed the deep learning model using Keras, stacking multiple LSTM and Dropout layers to effectively capture temporal dependencies and prevent overfitting, saving the final trained model as an H5 file.',
    technologies: ['Python', 'TensorFlow', 'Keras', 'Scikit-learn', 'Pandas'],
    image: '/stockprediction.png',
    github: 'https://github.com/Arnavsharma2/StockReturnPrediction',
    live: '#',
    showLive: false
  },
  {
    title: 'Customer Churn Predictor',
    description: 'Built a classification model to predict customer churn for a telecommunications company, enabling proactive retention strategies by identifying at-risk customers with optimal accuracy for the dataset provided. Leveraged the PyCaret AutoML library to accelerate the end-to-end machine learning workflow, from data preparation and feature engineering to model training and performance evaluation. Analyzed and visualized key features influencing churn using Plotly, delivering actionable insights into customer behavior and demographics.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Plotly', 'PyCaret'],
    image: '/Churn.png',
    github: 'https://github.com/Arnavsharma2/CustomerChurnPredictor',
    live: '#',
    showLive: false
  },
  {
    title: 'House Price Prediction Model',
    description: 'Developed a predictive model to forecast house sale prices by analyzing a dataset of over 1,400 properties and 80 distinct features, delivering results with 80% accuracy. Engineered a data preprocessing pipeline to handle missing values, encode categorical data, and scale numerical features, preparing the dataset for optimal model performance. Trained and evaluated multiple regression algorithms, including Linear Regression, Ridge, Lasso, and XGBoost, identifying the most accurate model and serializing it for future deployment using Pickle.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'XGBoost', 'Matplotlib'],
    image: '/housingpriceprediction.png',
    github: 'https://github.com/Arnavsharma2/HousingPricePrediction',
    live: '#',
    showLive: false
  },
  {
    title: 'PSU Menu Analyzer Website',
    description: 'A full-stack web application that scrapes and analyzes Penn State University dining menus. Features AI-powered nutritional analysis using Google Gemini API, real-time menu scraping, dietary preference filtering, and CSV export functionality for comprehensive nutritional data.',
    technologies: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript', 'Google Gemini API', 'Web Scraping'],
    image: '/psu-menu-analyzer.png',
    github: 'https://github.com/Arnavsharma2/PSUMenuAnalyzerWebsite',
    live: 'https://psumenuanalyzerwebsite-production-e586.up.railway.app/'
  },
  {
    title: 'Chat With My Resume',
    description: 'An intelligent resume chatbot built with Retrieval-Augmented Generation (RAG) technology. Allows users to have natural conversations about professional background, skills, and experience through an AI-powered interface that understands context and provides detailed responses.',
    technologies: ['Python', 'LangChain', 'OpenAI API', 'ChromaDB', 'FAISS', 'Flask', 'RAG'],
    image: '/api/placeholder/400/300',
    github: 'https://github.com/Arnavsharma2/Chat-With-my-Resume',
    live: '#'
  }
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            03.
          </h2>
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-300 mb-4">
            Projects
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/20 overflow-hidden">
                {project.image && project.image !== '/api/placeholder/400/300' ? (
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    fill
                    className="object-cover"
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
                  className={`absolute inset-0 bg-gradient-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center ${
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
                <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors duration-200">
                  {project.title}
                </h4>
                
                <p className="text-gray-300 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
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
