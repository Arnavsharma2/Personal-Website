import { NextRequest, NextResponse } from 'next/server'
import { clearConversation } from '@/utils/conversationManager'

// Helper function to get client IP
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  return 'unknown'
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request)
    
    // Clear conversation using in-memory storage
    const success = clearConversation(clientIP)
    
    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Conversation history cleared successfully'
      })
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to clear conversation' 
        },
        { status: 500 }
      )
    }
    
  } catch (error) {
    console.error('Error clearing conversation:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to clear conversation' 
      },
      { status: 500 }
    )
  }
}
