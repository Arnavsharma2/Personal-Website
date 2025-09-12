import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

interface FailedLoginAttempt {
  ip: string
  timestamp: string
  userAgent: string
  attemptedPassword: string
  location?: {
    country?: string
    region?: string
    city?: string
  }
}

interface FailedLoginLog {
  attempts: FailedLoginAttempt[]
  blockedIPs: Set<string>
}

const FAILED_LOGINS_FILE = path.join(process.cwd(), 'data', 'failed-logins.json')
const MAX_ATTEMPTS_PER_IP = 5 // Block after 5 failed attempts
const BLOCK_DURATION = 24 * 60 * 60 * 1000 // 24 hours

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.dirname(FAILED_LOGINS_FILE)
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true })
  }
}

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

// Get location from IP (simplified - you can integrate with a geolocation service)
async function getLocationFromIP(ip: string): Promise<FailedLoginAttempt['location']> {
  // For development/localhost, return mock data
  if (ip === '127.0.0.1' || ip === '::1' || ip === 'unknown') {
    return {
      country: 'Local',
      region: 'Development',
      city: 'Localhost'
    }
  }
  
  try {
    // Use ipinfo.io API (free tier: 50,000 requests/month)
    const response = await fetch(`https://ipinfo.io/${ip}/json?token=${process.env.GEOLOCATION_API_TOKEN || ''}`)
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }
    
    const data = await response.json()
    
    return {
      country: data.country || 'Unknown',
      region: data.region || 'Unknown', 
      city: data.city || 'Unknown'
    }
    
  } catch (error) {
    console.error('Error fetching location for IP:', ip, error)
    return {
      country: 'Unknown',
      region: 'Unknown',
      city: 'Unknown'
    }
  }
}

// Read existing failed login attempts
async function readFailedLogins(): Promise<FailedLoginLog> {
  try {
    await ensureDataDir()
    
    if (!existsSync(FAILED_LOGINS_FILE)) {
      return {
        attempts: [],
        blockedIPs: new Set()
      }
    }
    
    const data = await readFile(FAILED_LOGINS_FILE, 'utf-8')
    const parsed = JSON.parse(data)
    
    // Convert blockedIPs array back to Set
    return {
      attempts: parsed.attempts || [],
      blockedIPs: new Set(parsed.blockedIPs || [])
    }
  } catch (error) {
    console.error('Error reading failed logins:', error)
    return {
      attempts: [],
      blockedIPs: new Set()
    }
  }
}

// Write failed login attempts to file
async function writeFailedLogins(failedLoginLog: FailedLoginLog): Promise<void> {
  try {
    await ensureDataDir()
    
    // Convert Set to Array for JSON serialization
    const dataToWrite = {
      ...failedLoginLog,
      blockedIPs: Array.from(failedLoginLog.blockedIPs)
    }
    
    await writeFile(FAILED_LOGINS_FILE, JSON.stringify(dataToWrite, null, 2))
  } catch (error) {
    console.error('Error writing failed logins:', error)
  }
}

// Check if IP is blocked
function isIPBlocked(ip: string, failedLoginLog: FailedLoginLog): boolean {
  if (!failedLoginLog.blockedIPs.has(ip)) {
    return false
  }
  
  // Check if block has expired (24 hours)
  const now = Date.now()
  const recentAttempts = failedLoginLog.attempts.filter(attempt => 
    attempt.ip === ip && 
    (now - new Date(attempt.timestamp).getTime()) < BLOCK_DURATION
  )
  
  if (recentAttempts.length === 0) {
    // Block has expired, remove from blocked list
    failedLoginLog.blockedIPs.delete(ip)
    return false
  }
  
  return true
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const { attemptedPassword } = await request.json()
    
    // Read existing failed login attempts
    const failedLoginLog = await readFailedLogins()
    
    // Check if IP is already blocked
    if (isIPBlocked(ip, failedLoginLog)) {
      console.warn(`Blocked IP attempted login: ${ip}`)
      return NextResponse.json(
        { 
          success: false, 
          error: 'IP address is temporarily blocked due to multiple failed login attempts',
          blocked: true
        },
        { status: 429 }
      )
    }
    
    // Get location
    const location = await getLocationFromIP(ip)
    
    // Create failed login attempt
    const failedAttempt: FailedLoginAttempt = {
      ip,
      timestamp: new Date().toISOString(),
      userAgent,
      attemptedPassword: attemptedPassword || 'unknown',
      location
    }
    
    // Add to attempts
    failedLoginLog.attempts.push(failedAttempt)
    
    // Count recent attempts from this IP (last hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const recentAttempts = failedLoginLog.attempts.filter(attempt => 
      attempt.ip === ip && 
      attempt.timestamp > oneHourAgo
    )
    
    // Block IP if too many attempts
    if (recentAttempts.length >= MAX_ATTEMPTS_PER_IP) {
      failedLoginLog.blockedIPs.add(ip)
      console.warn(`IP blocked due to too many failed attempts: ${ip}`)
    }
    
    // Keep only last 1000 attempts to prevent file from growing too large
    if (failedLoginLog.attempts.length > 1000) {
      failedLoginLog.attempts = failedLoginLog.attempts.slice(-1000)
    }
    
    // Write back to file
    await writeFailedLogins(failedLoginLog)
    
    return NextResponse.json({
      success: true,
      attemptsRemaining: Math.max(0, MAX_ATTEMPTS_PER_IP - recentAttempts.length),
      blocked: recentAttempts.length >= MAX_ATTEMPTS_PER_IP
    })
    
  } catch (error) {
    console.error('Error logging failed login:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to log failed login attempt' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const failedLoginLog = await readFailedLogins()
    
    // Filter out expired blocks
    const now = Date.now()
    const activeBlocks = Array.from(failedLoginLog.blockedIPs).filter(ip => {
      const recentAttempts = failedLoginLog.attempts.filter(attempt => 
        attempt.ip === ip && 
        (now - new Date(attempt.timestamp).getTime()) < BLOCK_DURATION
      )
      return recentAttempts.length > 0
    })
    
    return NextResponse.json({
      success: true,
      totalAttempts: failedLoginLog.attempts.length,
      activeBlocks: activeBlocks.length,
      recentAttempts: failedLoginLog.attempts.slice(-20) // Last 20 attempts
    })
    
  } catch (error) {
    console.error('Error reading failed logins:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to read failed login attempts',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
