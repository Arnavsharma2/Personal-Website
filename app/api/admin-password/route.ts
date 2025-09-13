import { NextRequest, NextResponse } from 'next/server'

// Rate limiting for password attempts
const passwordAttempts = new Map<string, { count: number; resetTime: number }>()
const MAX_ATTEMPTS = 3
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

function checkPasswordRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const key = ip
  
  const current = passwordAttempts.get(key)
  
  if (!current || now > current.resetTime) {
    passwordAttempts.set(key, { count: 1, resetTime: now + LOCKOUT_DURATION })
    return { allowed: true, remaining: MAX_ATTEMPTS - 1 }
  }
  
  if (current.count >= MAX_ATTEMPTS) {
    return { allowed: false, remaining: 0 }
  }
  
  current.count++
  passwordAttempts.set(key, current)
  
  return { allowed: true, remaining: MAX_ATTEMPTS - current.count }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    
    // Check rate limit
    const rateLimit = checkPasswordRateLimit(ip)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many password attempts. Try again later.',
          retryAfter: Math.ceil((passwordAttempts.get(ip)?.resetTime || Date.now() + LOCKOUT_DURATION - Date.now()) / 1000)
        },
        { status: 429 }
      )
    }
    
    const { providedPassword } = await request.json()
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
    
    if (providedPassword === adminPassword) {
      return NextResponse.json({
        success: true,
        message: 'Password verified'
      })
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid password',
          remaining: rateLimit.remaining
        },
        { status: 401 }
      )
    }
    
  } catch (error) {
    console.error('Error verifying password:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to verify password' },
      { status: 500 }
    )
  }
}

// Remove the GET method entirely - no more public password exposure
export async function GET() {
  return NextResponse.json(
    { 
      success: false, 
      error: 'This endpoint is not available. Use POST with password verification.' 
    },
    { status: 405 }
  )
}
