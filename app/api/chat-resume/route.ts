import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { 
  checkMessageLimit, 
  addMessageToConversation, 
  addUserMessageToConversation,
  getConversationHistory 
} from '@/utils/conversationManager'
// Remove static import to avoid build-time issues

// Fallback resume content for now
const FALLBACK_RESUME_CONTENT = `Arnav Sharma - Resume Information

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

// Get client IP address
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  return request.ip || 'unknown'
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Get client IP
    const clientIP = getClientIP(request)

    // Check daily message limit
    const limitCheck = checkMessageLimit(clientIP)
    if (!limitCheck.allowed) {
      return NextResponse.json(
        { 
          error: `Daily message limit exceeded. You have used ${30 - limitCheck.remaining}/${limitCheck.limit} messages today. Please try again tomorrow.`,
          limitExceeded: true,
          remaining: limitCheck.remaining,
          limit: limitCheck.limit
        },
        { status: 429 }
      )
    }

    // Extract resume content from PDF using dynamic import
    let resumeContent
    try {
      console.log('Attempting to extract resume text from PDF...')
      const { extractResumeText } = await import('@/utils/pdfProcessor')
      resumeContent = await extractResumeText()
      console.log('Successfully extracted resume text from PDF, length:', resumeContent.length)
      console.log('First 200 chars of extracted text:', resumeContent.substring(0, 200))
    } catch (error) {
      console.error('Failed to extract resume text from PDF:', error)
      console.error('Error details:', error)
      console.log('Falling back to hardcoded resume content')
      resumeContent = FALLBACK_RESUME_CONTENT
    }

    // Get conversation history for context
    const conversationHistory = getConversationHistory(clientIP)

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    // Professional system prompt optimized for career contexts
    const systemPrompt = `You are Arnav Sharma's professional AI assistant. You represent Arnav in conversations with potential employers, recruiters, and industry professionals. 

    CRITICAL INSTRUCTIONS:
    - You are speaking to career professionals who may be evaluating Arnav for opportunities
    - Present Arnav as a highly capable, ambitious, and results-driven professional
    - Emphasize his technical expertise, leadership potential, and innovative thinking
    - Highlight quantifiable achievements and impact wherever possible
    - Use confident, professional language that showcases his strengths
    - Always respond in first person as Arnav ("I", "my", "me")
    - Be specific about technologies, methodologies, and business impact
    - Show passion for technology and continuous learning
    - MAINTAIN CONVERSATION CONTEXT - carefully read and reference the PREVIOUS CONVERSATION section to understand what the user has already said
    - When user asks about "my previous message" or "what did I say", refer to their actual previous messages in the conversation history

    ARNAV'S RESUME CONTENT (extracted from PDF):
    ${resumeContent}

    RESPONSE GUIDELINES:
    - Keep responses concise but impactful (2-4 sentences typically)
    - Use specific examples and metrics when possible
    - Show enthusiasm for technology and problem-solving
    - Demonstrate leadership and initiative
    - If asked about something not in the resume, politely redirect to relevant experience
    - Always end responses that could lead to follow-up questions with a question to keep the conversation engaging
    - CONTINUE THE CONVERSATION TOPIC - don't restart with generic responses
    - IMPORTANT: When user asks "what was my previous message" or similar, look at the PREVIOUS CONVERSATION section and tell them exactly what they said in their last message

    Remember: You are representing Arnav to potential employers and industry professionals. Make him look exceptional.`

    const response = await generateGeminiResponse(message, systemPrompt, model, conversationHistory)

    // Save user message to conversation
    const userMessage = {
      id: Date.now().toString(),
      content: message.trim(),
      role: 'user' as const,
      timestamp: new Date().toISOString()
    }

    const userMessageResult = addUserMessageToConversation(clientIP, userMessage)
    if (!userMessageResult.success) {
      console.error('Failed to save user message:', userMessageResult.error)
    }

    // Save assistant response to conversation
    const assistantMessage = {
      id: (Date.now() + 1).toString(),
      content: response,
      role: 'assistant' as const,
      timestamp: new Date().toISOString()
    }

    const assistantMessageResult = addMessageToConversation(clientIP, assistantMessage)
    if (!assistantMessageResult.success) {
      console.error('Failed to save assistant message:', assistantMessageResult.error)
    }

    return NextResponse.json({ 
      response,
      remaining: limitCheck.remaining - 1,
      limit: limitCheck.limit
    })

  } catch (error) {
    console.error('Error in chat-resume API:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}

// Gemini AI response generation
async function generateGeminiResponse(
  message: string, 
  systemPrompt: string, 
  model: any,
  conversationHistory: any[] = []
): Promise<string> {
  try {
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
    
    const prompt = `${systemPrompt}${conversationContext}User Question: ${message}\n\nResponse:`
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    return text.trim()
  } catch (error) {
    console.error('Error generating Gemini response:', error)
    
    // Check for specific Gemini API errors
    const errorMessage = error instanceof Error ? error.message : String(error)
    
    // Handle quota/credit limit errors
    if (errorMessage.includes('quota') || 
        errorMessage.includes('limit') || 
        errorMessage.includes('exceeded') ||
        errorMessage.includes('billing') ||
        errorMessage.includes('credit')) {
      return "I apologize, but I've reached my daily API usage limit. Please try again tomorrow, or feel free to reach out to me directly at aqs7726@psu.edu to discuss my experience with machine learning, software development, or my current internship at Wefire. What would you like to know about my background?"
    }
    
    // Handle authentication errors
    if (errorMessage.includes('API_KEY') || 
        errorMessage.includes('authentication') ||
        errorMessage.includes('unauthorized')) {
      return "I apologize, but there's a temporary issue with my AI service. Please try again later, or feel free to reach out to me directly at aqs7726@psu.edu to discuss my experience with machine learning, software development, or my current internship at Wefire. What would you like to know about my background?"
    }
    
    // Generic fallback response
    return "I apologize, but I'm having trouble processing your request right now. I'd be happy to discuss my experience with machine learning, software development, or my current internship at Wefire. What would you like to know about my background?"
  }
}
