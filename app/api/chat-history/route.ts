import { NextRequest, NextResponse } from 'next/server'
import { getConversationHistory } from '@/utils/conversationManager'

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

export async function GET(request: NextRequest) {
  try {
    const clientIP = getClientIP(request)
    const conversationHistory = getConversationHistory(clientIP)
    
    return NextResponse.json({
      success: true,
      messages: conversationHistory,
      count: conversationHistory.length
    })
  } catch (error) {
    console.error('Error getting conversation history:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to retrieve conversation history' 
      },
      { status: 500 }
    )
  }
}
