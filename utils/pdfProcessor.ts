// In-memory cache for resume text (Vercel compatible)
let cachedResumeText: string | null = null

/**
 * Extract text content from the resume PDF or environment variable
 */
export async function extractResumeText(): Promise<string> {
  try {
    // Check if we have cached text
    if (cachedResumeText) {
      return cachedResumeText
    }

    // First, try to get resume content from environment variable (Vercel compatible)
    const envResumeContent = process.env.RESUME_CONTENT
    if (envResumeContent) {
      console.log('Using resume content from environment variable')
      cachedResumeText = envResumeContent
      return envResumeContent
    }

    // Fallback: Try to read from PDF file (may not work on Vercel)
    try {
      const { readFileSync, existsSync, statSync } = await import('fs')
      const { join } = await import('path')
      
      const RESUME_PDF_PATH = join(process.cwd(), 'public', 'RAG Resume.pdf')
      
      if (!existsSync(RESUME_PDF_PATH)) {
        console.warn('Resume PDF not found, using fallback content')
        return getFallbackResumeText()
      }

      const dataBuffer = readFileSync(RESUME_PDF_PATH)
      const pdfParse = require('pdf-parse')
      const pdfData = await pdfParse(dataBuffer)
      
      const cleanedText = cleanExtractedText(pdfData.text)
      cachedResumeText = cleanedText
      
      console.log('Successfully extracted resume text from PDF')
      return cleanedText
    } catch (pdfError) {
      console.warn('PDF processing failed, using fallback content:', pdfError)
      return getFallbackResumeText()
    }

  } catch (error) {
    console.error('Error extracting text from resume:', error)
    return getFallbackResumeText()
  }
}

/**
 * Clean and format the extracted PDF text
 */
function cleanExtractedText(text: string): string {
  return text
    // Remove excessive whitespace
    .replace(/\s+/g, ' ')
    // Remove page numbers and headers/footers
    .replace(/\d+\s*$/gm, '')
    // Clean up bullet points
    .replace(/•\s*/g, '- ')
    .replace(/◦\s*/g, '  - ')
    // Remove extra line breaks
    .replace(/\n\s*\n/g, '\n')
    // Trim whitespace
    .trim()
}

// Removed file saving for Vercel compatibility

/**
 * Get fallback resume text if PDF processing fails
 */
function getFallbackResumeText(): string {
  return `Arnav Sharma - Resume Information

EDUCATION:
- Bachelor of Science in Computer Science, Penn State University (Expected Graduation: 2026)
- Minor in Artificial Intelligence
- Currently pursuing degree with focus on AI/ML and software development

CURRENT POSITION:
- Software Engineering Intern at Wefire (January 2025 - November 2025)
- Location: Hayward, CA
- Focus: Reddit data analysis and monitoring solutions for financial sentiment tracking

PROFESSIONAL EXPERIENCE:

1. Wefire - Software Engineering Intern (January 2025 - November 2025)
   - Developed and deployed advanced Python-based programs that transformed 5,000+ Reddit posts into actionable financial insights
   - Built AI-powered Reddit post analyzer using Python and Google Gemini API for sentiment analysis
   - Created high-performance real-time monitoring infrastructure using PRAW tracking brand mentions and sales keywords
   - Implemented automated SMTP notification pipeline generating 500+ instant alerts during 24-hour testing periods
   - Technologies: Python, Google Gemini API, PRAW, Pandas, SMTP, NLP, Data Processing
   - Impact: Resulted in 40% faster customer response times and enhanced brand reputation management

TECHNICAL SKILLS:
Programming Languages: Python, JavaScript, TypeScript, Java, C++
Web Technologies: Next.js, React.js, Node.js, Express.js, Flask, HTML, CSS, Tailwind CSS
Machine Learning: PyTorch, TensorFlow, Keras, Scikit-learn, Pandas, NumPy, XGBoost, ONNX Runtime
AI/ML Tools: LangChain, OpenAI API, Google Gemini API, PRAW, PyCaret, MediaPipe
Data Processing: Pandas, NumPy, Matplotlib, Plotly
Databases: Supabase, PostgreSQL, ChromaDB, FAISS
Other: Git, Docker, Web Scraping, NLP, LSTM, RAG, Vector Databases, FastAPI

PROJECTS:

1. Real-Time ASL Learning Platform
   - Built real-time ASL learning platform with 98.98% accuracy PyTorch neural network
   - Converted model to ONNX format for <50ms client-side browser inference with WebGL GPU acceleration
   - Implemented real-time hand tracking using MediaPipe processing 21 hand landmarks (63 features) from webcam
   - Achieved 60 FPS sign recognition for all 26 alphabet signs
   - Developed FastAPI backend with Supabase (PostgreSQL) database
   - Features: User authentication, lesson modules, interactive quiz system, and progress tracking dashboard
   - Technologies: Next.js, React, Python, PyTorch, FastAPI, TypeScript, ONNX Runtime, MediaPipe, Supabase, PostgreSQL
   - GitHub: https://github.com/Arnavsharma2/ASL-Learning-Platform
   - Website: https://asl-learning-platform-psi.vercel.app/

2. Resume Chatbot
   - Intelligent resume chatbot using Retrieval-Augmented Generation (RAG) technology
   - Natural conversations about professional background and experience
   - AI-powered interface with context understanding using LangChain and OpenAI API
   - Technologies: Python, LangChain, OpenAI API, ChromaDB, FAISS, Flask, RAG

3. Predictive Modeling Projects (Portfolio)
   - Comprehensive portfolio of machine learning projects demonstrating predictive modeling expertise
   - House Price Prediction: Regression models analyzing 1,400+ properties with 80+ features, achieving 80% accuracy
   - Customer Churn Prediction: Classification algorithms for telecommunications customer retention
   - Stock Return Forecasting: LSTM neural networks and time series analysis processing 1000+ stocks
   - Blackjack Strategy Analysis: Ensemble methods trained on 500k samples with multiple algorithms
   - Each project features data loading, feature engineering, model training, evaluation metrics, and trained outputs
   - Technologies: Python, Scikit-learn, TensorFlow, Keras, XGBoost, Pandas, NumPy, Matplotlib, Jupyter Notebook

4. AI Movie Recommendation Engine
   - Movie recommendation platform powered by Google Gemini AI
   - Provides personalized movie suggestions through interactive questionnaire
   - Features watch history tracking, OMDB API integration for movie metadata
   - Responsive UI built with Next.js and Tailwind CSS
   - Technologies: Next.js, TypeScript, React, Tailwind CSS, Google Gemini API, OMDB API, Node.js

5. PSU Menu Analyzer Website
   - Full-stack web application for Penn State dining menu analysis
   - Features AI-powered nutritional analysis using Google Gemini API
   - Real-time menu scraping and dietary preference filtering
   - CSV export functionality
   - Technologies: Python, Flask, HTML, CSS, JavaScript, Google Gemini API, BeautifulSoup

6. AI-Powered Reddit Post Analyzer
   - Python tool that scrapes and analyzes up to 5,000 Reddit posts from financial subreddits
   - Tracks market sentiment using Google Gemini API for NLP classification and summary generation
   - Data processing and structuring insights with Pandas
   - Technologies: Python, Google Gemini API, PRAW, Pandas, NLP

7. SubReddit Monitor & Notification Tool
   - Automated monitoring bot that streams Reddit posts in real-time using PRAW library
   - Identifies relevant financial discussions and sends instant email notifications via SMTP
   - Enables real-time market sentiment tracking with keyword matching
   - Technologies: Python, PRAW, SMTP

PERSONAL INTERESTS:
- Machine Learning and AI applications
- Full-stack web development
- Data science and analytics
- Natural language processing
- Building conversational AI systems
- Cooking and trying new recipes
- Fitness and gym (2+ years)
- Board games and competitive gaming

CAREER GOALS:
- Pursue opportunities in Machine Learning Engineering
- Focus on AI/ML applications and data science
- Build innovative solutions that solve real-world problems
- Continue learning and growing in the tech industry
- Contribute to meaningful projects in AI and software development

CONTACT INFORMATION:
- Email: aqs7726@psu.edu
- GitHub: https://github.com/Arnavsharma2
- LinkedIn: https://linkedin.com/in/arnav-sharma2
- Resume: Available via Google Drive link`
}

/**
 * Force refresh of resume text (useful for updates)
 */
export async function refreshResumeText(): Promise<string> {
  cachedResumeText = null
  return await extractResumeText()
}
