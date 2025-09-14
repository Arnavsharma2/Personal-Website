import { NextRequest, NextResponse } from 'next/server'
import { refreshResumeText } from '@/utils/pdfProcessor'

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

    // Refresh the resume text from PDF
    const resumeText = await refreshResumeText()
    
    return NextResponse.json({
      success: true,
      message: 'Resume text refreshed successfully',
      textLength: resumeText.length,
      preview: resumeText.substring(0, 200) + '...'
    })

  } catch (error) {
    console.error('Error refreshing resume text:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to refresh resume text',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Just return status without requiring authentication
    return NextResponse.json({
      success: true,
      message: 'Resume refresh endpoint is available',
      usage: 'POST to /api/refresh-resume with optional password to refresh resume text'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Service unavailable' },
      { status: 500 }
    )
  }
}
