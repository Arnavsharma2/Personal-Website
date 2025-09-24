import { NextRequest, NextResponse } from 'next/server'
import { checkMessageLimit } from '@/utils/conversationManager'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

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
    const limitCheck = checkMessageLimit(clientIP)
    
    return NextResponse.json({
      success: true,
      remaining: limitCheck.remaining,
      limit: limitCheck.limit,
      allowed: limitCheck.allowed
    })
  } catch (error) {
    console.error('Error getting message count:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get message count' 
      },
      { status: 500 }
    )
  }
}
