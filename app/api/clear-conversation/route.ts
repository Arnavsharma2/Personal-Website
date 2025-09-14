import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

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
    const conversationsFile = join(process.cwd(), 'data', 'conversations.json')
    
    // Read current conversations data
    let conversationsData = { conversations: [], messageCounts: [] }
    if (existsSync(conversationsFile)) {
      try {
        const fileContent = readFileSync(conversationsFile, 'utf-8')
        conversationsData = JSON.parse(fileContent)
      } catch (error) {
        console.error('Error reading conversations file:', error)
      }
    }
    
    // Remove conversation for this IP (but keep message counts)
    conversationsData.conversations = conversationsData.conversations.filter(
      (conv: any) => conv.ip !== clientIP
    )
    
    // Save updated data
    writeFileSync(conversationsFile, JSON.stringify(conversationsData, null, 2))
    
    return NextResponse.json({
      success: true,
      message: 'Conversation history cleared successfully'
    })
    
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
