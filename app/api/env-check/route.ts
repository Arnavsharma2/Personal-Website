import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const envVars = {
      GEMINI_API_KEY: process.env.GEMINI_API_KEY ? 'Set' : 'Missing',
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY ? 'Set' : 'Missing',
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? 'Set' : 'Missing',
      GEOLOCATION_API_TOKEN: process.env.GEOLOCATION_API_TOKEN ? 'Set' : 'Missing',
      RESUME_CONTENT: process.env.RESUME_CONTENT ? 'Set' : 'Missing',
    }

    const missingVars = Object.entries(envVars)
      .filter(([_, status]) => status === 'Missing')
      .map(([key, _]) => key)

    const hasApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY

    return NextResponse.json({
      success: true,
      environment: envVars,
      missing: missingVars,
      critical: !hasApiKey ? 'Either GEMINI_API_KEY or GOOGLE_API_KEY is required for chat functionality' : null
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to check environment variables',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
