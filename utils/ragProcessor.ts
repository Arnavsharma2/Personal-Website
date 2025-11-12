// RAG (Retrieval-Augmented Generation) processor for resume chatbot
// This replaces the simple text-based approach with a sophisticated RAG system

interface RAGDocument {
  page_content: string
  metadata: {
    chunk_id: number
    source: string
    page_number: number
  }
}

interface RAGResponse {
  response: string
  sources?: RAGDocument[]
  confidence?: number
}

// In-memory vector store simulation (for Vercel compatibility)
class InMemoryVectorStore {
  private documents: RAGDocument[] = []
  private embeddings: number[][] = []

  async addDocuments(documents: RAGDocument[]): Promise<void> {
    this.documents = documents
    // Generate simple embeddings (in production, use OpenAI embeddings)
    this.embeddings = await this.generateEmbeddings(documents)
  }

  private async generateEmbeddings(documents: RAGDocument[]): Promise<number[][]> {
    // Simple TF-IDF based similarity for demo (in production, use OpenAI embeddings)
    // In a production environment, you would use:
    // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    // const embeddings = await openai.embeddings.create({...})
    return documents.map(() => Array(384).fill(0).map(() => Math.random()))
  }

  async similaritySearch(query: string, k: number = 3): Promise<RAGDocument[]> {
    // Simple keyword-based search for demo
    const queryLower = query.toLowerCase()
    const scoredDocs = this.documents.map(doc => ({
      doc,
      score: this.calculateSimilarity(queryLower, doc.page_content.toLowerCase())
    }))

    return scoredDocs
      .sort((a, b) => b.score - a.score)
      .slice(0, k)
      .map(item => item.doc)
  }

  private calculateSimilarity(query: string, content: string): number {
    const queryWords = query.split(/\s+/)
    const contentWords = content.split(/\s+/)
    
    let matches = 0
    queryWords.forEach(word => {
      if (contentWords.some(cWord => cWord.includes(word) || word.includes(cWord))) {
        matches++
      }
    })
    
    return matches / queryWords.length
  }
}

// Resume content chunks (optimized for RAG)
const RESUME_CHUNKS: RAGDocument[] = [
  {
    page_content: `Arnav Sharma - Computer Science Student at Penn State University

EDUCATION:
- Bachelor of Science in Computer Science, Penn State University (Expected Graduation: 2026)
- Minor in Artificial Intelligence
- Currently pursuing degree with focus on AI/ML and software development
- Strong foundation in mathematics, algorithms, and data structures`,
    metadata: {
      chunk_id: 0,
      source: 'arnav_resume',
      page_number: 1
    }
  },
  {
    page_content: `CURRENT POSITION:
- Software Engineering Intern at Wefire (January 2025 - November 2025)
- Location: Hayward, CA
- Focus: Reddit data analysis and monitoring solutions for financial sentiment tracking
- Developing AI-powered tools for market analysis and brand monitoring`,
    metadata: {
      chunk_id: 1,
      source: 'arnav_resume',
      page_number: 1
    }
  },
  {
    page_content: `PROFESSIONAL EXPERIENCE:

Wefire - Software Engineering Intern (January 2025 - November 2025)
- Developed and deployed advanced Python-based programs that transformed 5,000+ Reddit posts into actionable financial insights
- Built AI-powered Reddit post analyzer using Python and Google Gemini API for sentiment analysis
- Created high-performance real-time monitoring infrastructure using PRAW tracking brand mentions and sales keywords
- Implemented automated SMTP notification pipeline generating 500+ instant alerts during 24-hour testing periods
- Technologies: Python, Google Gemini API, PRAW, Pandas, SMTP, NLP, Data Processing
- Impact: Resulted in 40% faster customer response times and enhanced brand reputation management`,
    metadata: {
      chunk_id: 2,
      source: 'arnav_resume',
      page_number: 1
    }
  },
  {
    page_content: `TECHNICAL SKILLS:

Programming Languages: Python, JavaScript, TypeScript, Java, C++
Web Technologies: Next.js, React.js, Node.js, Express.js, Flask, HTML, CSS, Tailwind CSS
Machine Learning: PyTorch, TensorFlow, Keras, Scikit-learn, Pandas, NumPy, XGBoost, ONNX Runtime
AI/ML Tools: LangChain, OpenAI API, Google Gemini API, PRAW, PyCaret, MediaPipe
Data Processing: Pandas, NumPy, Matplotlib, Plotly
Databases: Supabase, PostgreSQL, ChromaDB, FAISS
Other: Git, Docker, Web Scraping, NLP, LSTM, RAG, Vector Databases, FastAPI`,
    metadata: {
      chunk_id: 3,
      source: 'arnav_resume',
      page_number: 1
    }
  },
  {
    page_content: `PROJECTS:

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
   - Technologies: Python, Scikit-learn, TensorFlow, Keras, XGBoost, Pandas, NumPy, Matplotlib, Jupyter Notebook`,
    metadata: {
      chunk_id: 4,
      source: 'arnav_resume',
      page_number: 1
    }
  },
  {
    page_content: `PROJECTS (continued):

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
   - Technologies: Python, PRAW, SMTP`,
    metadata: {
      chunk_id: 5,
      source: 'arnav_resume',
      page_number: 1
    }
  },
  {
    page_content: `PERSONAL INTERESTS & CAREER GOALS:

Personal Interests:
- Machine Learning and AI applications
- Full-stack web development
- Data science and analytics
- Natural language processing
- Building conversational AI systems
- Cooking and trying new recipes
- Fitness and gym (2+ years)
- Board games and competitive gaming

Career Goals:
- Pursue opportunities in Machine Learning Engineering
- Focus on AI/ML applications and data science
- Build innovative solutions that solve real-world problems
- Continue learning and growing in the tech industry
- Contribute to meaningful projects in AI and software development`,
    metadata: {
      chunk_id: 6,
      source: 'arnav_resume',
      page_number: 1
    }
  },
  {
    page_content: `CONTACT INFORMATION:
- Email: aqs7726@psu.edu
- GitHub: https://github.com/Arnavsharma2
- LinkedIn: https://linkedin.com/in/arnav-sharma2
- Resume: Available via Google Drive link
- Location: Pennsylvania, USA (Penn State University)`,
    metadata: {
      chunk_id: 7,
      source: 'arnav_resume',
      page_number: 1
    }
  }
]

// Global vector store instance
let vectorStore: InMemoryVectorStore | null = null

// Initialize the RAG system
export async function initializeRAG(): Promise<void> {
  if (!vectorStore) {
    vectorStore = new InMemoryVectorStore()
    await vectorStore.addDocuments(RESUME_CHUNKS)
    console.log('RAG system initialized with', RESUME_CHUNKS.length, 'document chunks')
  }
}

// Enhanced retriever function
export async function retrieveRelevantDocuments(query: string, k: number = 3): Promise<RAGDocument[]> {
  if (!vectorStore) {
    await initializeRAG()
  }
  
  if (!vectorStore) {
    throw new Error('Failed to initialize RAG system')
  }

  return await vectorStore.similaritySearch(query, k)
}

// Generate RAG-enhanced response
export async function generateRAGResponse(
  userMessage: string,
  conversationHistory: any[] = []
): Promise<RAGResponse> {
  try {
    // Initialize RAG if needed
    await initializeRAG()

    // Retrieve relevant documents
    const relevantDocs = await retrieveRelevantDocuments(userMessage, 3)
    
    // Build context from retrieved documents
    const context = relevantDocs.map((doc, index) => 
      `Source ${index + 1} (Page ${doc.metadata.page_number}):\n${doc.page_content}`
    ).join('\n\n---\n\n')

    // Build conversation context
    let conversationContext = ""
    if (conversationHistory.length > 0) {
      conversationContext = "\n\nPREVIOUS CONVERSATION:\n"
      conversationHistory.forEach((msg, index) => {
        const role = msg.role === 'user' ? 'USER' : 'ARNAV'
        conversationContext += `${role}: "${msg.content}"\n`
      })
      conversationContext += "\nCURRENT USER MESSAGE:\n"
    }

    // Enhanced system prompt for RAG
    const systemPrompt = `You are Arnav Sharma, a Computer Science student at Penn State University. You are speaking directly to recruiters and hiring managers about your background, skills, and experience.

Your role:
- Answer questions about your resume, education, projects, skills, and experience
- Provide specific details about your technical skills, projects, and achievements
- Be professional, confident, and enthusiastic about opportunities
- Use the provided context from your resume to give accurate, detailed answers
- Always speak in first person as Arnav
- If you need more specific information, ask clarifying questions

RESUME CONTEXT:
${context}

${conversationContext}

Instructions:
- Use the resume context above to provide accurate, detailed responses
- Be specific about technologies, methodologies, and achievements
- Show enthusiasm for technology and continuous learning
- Demonstrate leadership and initiative
- Keep responses concise but impactful (2-4 sentences typically)
- If asked about something not in the context, politely mention it's not covered in your current resume but you'd be happy to discuss it further
- Always end responses that could lead to follow-up questions with a question to keep the conversation engaging

Current User Question: ${userMessage}

Response:`

    return {
      response: systemPrompt, // This will be processed by the LLM
      sources: relevantDocs,
      confidence: relevantDocs.length > 0 ? 0.9 : 0.3
    }

  } catch (error) {
    console.error('Error in RAG response generation:', error)
    return {
      response: "I apologize, but I'm having trouble accessing my resume information right now. Please try again later, or feel free to reach out to me directly at aqs7726@psu.edu.",
      sources: [],
      confidence: 0.1
    }
  }
}

// Get RAG system status
export async function getRAGStatus(): Promise<{
  initialized: boolean
  documentCount: number
  lastUpdated: string
}> {
  return {
    initialized: vectorStore !== null,
    documentCount: RESUME_CHUNKS.length,
    lastUpdated: new Date().toISOString()
  }
}

// Refresh RAG system (for admin use)
export async function refreshRAGSystem(): Promise<void> {
  vectorStore = null
  await initializeRAG()
}
