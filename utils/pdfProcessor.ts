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
- Software Engineering Intern at Wefire (January 2025 - Present)
- Location: Hayward, CA
- Focus: Reddit data analysis and monitoring solutions for financial sentiment tracking

PROFESSIONAL EXPERIENCE:

1. Wefire - Software Engineering Intern (January 2025 - Present)
   - Developed comprehensive Reddit data analysis and monitoring solutions
   - Built AI-powered Reddit post analyzer using Python and Google Gemini API
   - Created automated bot for real-time Reddit monitoring with PRAW library
   - Implemented keyword-matching system and SMTP notification pipeline
   - Technologies: Python, Google Gemini API, PRAW, Pandas, SMTP, NLP, Data Processing

TECHNICAL SKILLS:
Programming Languages: Python, JavaScript, Java, C++
Web Technologies: React.js, Node.js, Express.js, Flask, HTML, CSS
Machine Learning: TensorFlow, Keras, Scikit-learn, Pandas, NumPy, XGBoost
AI/ML Tools: LangChain, OpenAI API, PRAW, PyCaret
Data Processing: Pandas, NumPy, Matplotlib, Plotly
Other: Git, Docker, Web Scraping, NLP, LSTM, RAG

PROJECTS:

1. Stock Return Forecaster with Deep Learning
   - Architected and trained LSTM neural network for stock return prediction
   - Implemented data processing workflow for time-series data
   - Used Keras with multiple LSTM and Dropout layers
   - Technologies: Python, TensorFlow, Keras, Scikit-learn, Pandas

2. Customer Churn Predictor
   - Built classification model for telecommunications customer churn prediction
   - Leveraged PyCaret AutoML for end-to-end ML workflow
   - Analyzed key features using Plotly for actionable insights
   - Technologies: Python, Scikit-learn, Pandas, Plotly, PyCaret

3. House Price Prediction Model
   - Developed predictive model for house sale prices with 80% accuracy
   - Engineered data preprocessing pipeline for 1,400+ properties
   - Trained multiple regression algorithms (Linear, Ridge, Lasso, XGBoost)
   - Technologies: Python, Scikit-learn, Pandas, XGBoost, Matplotlib

4. PSU Menu Analyzer Website
   - Full-stack web application for Penn State dining menu analysis
   - Features AI-powered nutritional analysis using Google Gemini API
   - Real-time menu scraping and dietary preference filtering
   - Technologies: Python, Flask, HTML, CSS, JavaScript, Google Gemini API

5. Chat With My Resume
   - Intelligent resume chatbot using RAG technology
   - Natural conversations about professional background and skills
   - AI-powered interface with context understanding
   - Technologies: Python, LangChain, OpenAI API, ChromaDB, FAISS, Flask

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
