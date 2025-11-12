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

    // Initialize Gemini AI with fallback models
    const genAI = new GoogleGenerativeAI(apiKey)
    
    // Try models in order of preference (with fallbacks)
    const modelsToTry = [
      "gemini-2.5-flash"
    ]
    
    let response: string | null = null
    let lastError: any = null
    
    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName })
        response = await generateGeminiResponse(message, ragResponse.response, model, conversationHistory)
        break // Success, exit loop
      } catch (error: any) {
        lastError = error
        // If it's a rate limit error, try next model
        if (error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('quota')) {
          console.warn(`Rate limit hit for ${modelName}, trying next model...`)
          continue
        }
        // For other errors, break and handle below
        break
      }
    }
    
    // If all models failed, handle the error
    if (!response) {
      if (lastError) {
        throw lastError
      } else {
        throw new Error('Failed to generate response from any model')
      }
    }

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

  } catch (error: any) {
    console.error('Error in chat-resume API:', error)
    
    // Check if it's a rate limit error
    const errorMessage = error instanceof Error ? error.message : String(error)
    const statusCode = error?.status || error?.statusCode
    
    if (statusCode === 429 || 
        errorMessage.includes('429') || 
        errorMessage.includes('quota') || 
        errorMessage.includes('limit')) {
      
      // Return a user-friendly rate limit message
      return NextResponse.json(
        { 
          error: 'API rate limit exceeded. Please try again in a few minutes.',
          rateLimited: true,
          retryAfter: 60 // Suggest retrying after 60 seconds
        },
        { status: 429 }
      )
    }
    
    // For other errors, return generic error
    return NextResponse.json(
      { 
        error: 'Failed to process message. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
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
  } catch (error: any) {
    console.error('Error generating Gemini response:', error)
    
    // Check for specific Gemini API errors
    const errorMessage = error instanceof Error ? error.message : String(error)
    const statusCode = error?.status || error?.statusCode
    
    // Handle 429 rate limit errors specifically
    if (statusCode === 429 || 
        errorMessage.includes('429') || 
        errorMessage.includes('Too Many Requests') ||
        errorMessage.includes('quota') || 
        errorMessage.includes('limit') || 
        errorMessage.includes('exceeded')) {
      
      // Try to extract retry delay from error
      let retryMessage = ''
      if (error?.errorDetails) {
        const retryInfo = error.errorDetails.find((detail: any) => detail['@type']?.includes('RetryInfo'))
        if (retryInfo?.retryDelay) {
          const delaySeconds = parseInt(retryInfo.retryDelay.replace('s', '')) || 0
          const delayMinutes = Math.ceil(delaySeconds / 60)
          retryMessage = ` Please try again in about ${delayMinutes} minute${delayMinutes !== 1 ? 's' : ''}.`
        }
      }
      
      return `I apologize, but I've temporarily reached my API usage limit.${retryMessage} In the meantime, feel free to reach out to me directly at aqs7726@psu.edu to discuss my experience with machine learning, software development, or my current internship at Wefire. What would you like to know about my background?`
    }
    
    // Handle authentication errors
    if (statusCode === 401 || 
        statusCode === 403 ||
        errorMessage.includes('API_KEY') || 
        errorMessage.includes('authentication') ||
        errorMessage.includes('unauthorized')) {
      return "I apologize, but there's a temporary issue with my AI service authentication. Please try again later, or feel free to reach out to me directly at aqs7726@psu.edu to discuss my experience with machine learning, software development, or my current internship at Wefire. What would you like to know about my background?"
    }
    
    // Handle billing/credit errors
    if (errorMessage.includes('billing') || errorMessage.includes('credit')) {
      return "I apologize, but there's a temporary billing issue with my AI service. Please try again later, or feel free to reach out to me directly at aqs7726@psu.edu to discuss my experience with machine learning, software development, or my current internship at Wefire. What would you like to know about my background?"
    }
    
    // Generic fallback response
    return "I apologize, but I'm having trouble processing your request right now. Please try again in a moment, or feel free to reach out to me directly at aqs7726@psu.edu to discuss my experience with machine learning, software development, or my current internship at Wefire. What would you like to know about my background?"
  }
}
