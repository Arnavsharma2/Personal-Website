import { NextRequest, NextResponse } from 'next/server'
import { getRAGStatus, refreshRAGSystem } from '@/utils/ragProcessor'

export async function GET() {
  try {
    const status = await getRAGStatus()
    
    return NextResponse.json({
      success: true,
      rag: status
    })
  } catch (error) {
    console.error('Error getting RAG status:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get RAG status',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check for admin authentication (optional)
    const { password } = await request.json()
    
    if (password && password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Refresh the RAG system
    await refreshRAGSystem()
    
    const status = await getRAGStatus()
    
    return NextResponse.json({
      success: true,
      message: 'RAG system refreshed successfully',
      rag: status
    })

  } catch (error) {
    console.error('Error refreshing RAG system:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to refresh RAG system',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
