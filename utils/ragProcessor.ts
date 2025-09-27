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
- Software Engineering Intern at Wefire (January 2025 - Present)
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

Wefire - Software Engineering Intern (January 2025 - Present)
- Developed comprehensive Reddit data analysis and monitoring solutions
- Built AI-powered Reddit post analyzer using Python and Google Gemini API
- Created automated bot for real-time Reddit monitoring with PRAW library
- Implemented keyword-matching system and SMTP notification pipeline
- Technologies: Python, Google Gemini API, PRAW, Pandas, SMTP, NLP, Data Processing
- Impact: Generated 500+ instant alerts, improved customer response times by 40%`,
    metadata: {
      chunk_id: 2,
      source: 'arnav_resume',
      page_number: 1
    }
  },
  {
    page_content: `TECHNICAL SKILLS:

Programming Languages: Python, JavaScript, Java, C++
Web Technologies: React.js, Node.js, Express.js, Flask, HTML, CSS
Machine Learning: TensorFlow, Keras, Scikit-learn, Pandas, NumPy, XGBoost
AI/ML Tools: LangChain, OpenAI API, PRAW, PyCaret
Data Processing: Pandas, NumPy, Matplotlib, Plotly
Other: Git, Docker, Web Scraping, NLP, LSTM, RAG, Vector Databases`,
    metadata: {
      chunk_id: 3,
      source: 'arnav_resume',
      page_number: 1
    }
  },
  {
    page_content: `PROJECTS:

1. Stock Return Forecaster with Deep Learning
   - Architected and trained LSTM neural network for stock return prediction
   - Implemented data processing workflow for time-series data
   - Used Keras with multiple LSTM and Dropout layers
   - Technologies: Python, TensorFlow, Keras, Scikit-learn, Pandas

2. Customer Churn Predictor
   - Built classification model for telecommunications customer churn prediction
   - Leveraged PyCaret AutoML for end-to-end ML workflow
   - Analyzed key features using Plotly for actionable insights
   - Technologies: Python, Scikit-learn, Pandas, Plotly, PyCaret`,
    metadata: {
      chunk_id: 4,
      source: 'arnav_resume',
      page_number: 1
    }
  },
  {
    page_content: `PROJECTS (continued):

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
   - Technologies: Python, LangChain, OpenAI API, ChromaDB, FAISS, Flask`,
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
