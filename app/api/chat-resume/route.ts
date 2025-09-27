import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { 
  checkMessageLimit, 
  addMessageToConversation, 
  addUserMessageToConversation,
  getConversationHistory 
} from '@/utils/conversationManager'
import { generateRAGResponse, initializeRAG } from '@/utils/ragProcessor'

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

    // Initialize RAG system
    await initializeRAG()

    // Get conversation history for context
    const conversationHistory = getConversationHistory(clientIP)

    // Generate RAG-enhanced response
    const ragResponse = await generateRAGResponse(message, conversationHistory)
    
    // Check for API key (try both GEMINI_API_KEY and GOOGLE_API_KEY)
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
    if (!apiKey) {
      console.error('Neither GEMINI_API_KEY nor GOOGLE_API_KEY is set in environment variables')
      return NextResponse.json(
        { 
          error: 'AI service is temporarily unavailable. Please try again later.',
          ragMetadata: {
            sourcesUsed: ragResponse.sources?.length || 0,
            confidence: ragResponse.confidence || 0,
            enhancedWithRAG: true,
            error: 'API key missing'
          }
        },
        { status: 503 }
      )
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    // Generate final response using the RAG-enhanced prompt
    const response = await generateGeminiResponse(message, ragResponse.response, model, conversationHistory)

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
      limit: limitCheck.limit,
      ragMetadata: {
        sourcesUsed: ragResponse.sources?.length || 0,
        confidence: ragResponse.confidence || 0,
        enhancedWithRAG: true
      }
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
