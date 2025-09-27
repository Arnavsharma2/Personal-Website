import { NextRequest, NextResponse } from 'next/server'

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

// In-memory storage for Vercel compatibility
const failedAttempts: FailedLoginAttempt[] = []
const blockedIPs = new Set<string>()
const blockedIPsCache = new Map<string, number>()

// Configuration
const MAX_ATTEMPTS_PER_IP = 5 // Block after 5 failed attempts
const BLOCK_DURATION = 24 * 60 * 60 * 1000 // 24 hours
const MAX_ATTEMPTS_STORED = 1000 // Limit to prevent memory issues

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

// In-memory management functions
function addFailedAttempt(attempt: FailedLoginAttempt): void {
  failedAttempts.push(attempt)
  
  // Keep only the most recent attempts to prevent memory issues
  if (failedAttempts.length > MAX_ATTEMPTS_STORED) {
    failedAttempts.splice(0, failedAttempts.length - MAX_ATTEMPTS_STORED)
  }
}

function getFailedLoginStats() {
  // Filter out expired blocks
  const now = Date.now()
  const activeBlocks = Array.from(blockedIPs).filter(ip => {
    const blockTime = blockedIPsCache.get(ip)
    return blockTime && (now - blockTime) < BLOCK_DURATION
  })
  
  return {
    totalAttempts: failedAttempts.length,
    activeBlocks: activeBlocks.length,
    recentAttempts: failedAttempts.slice(-20) // Last 20 attempts
  }
}

// Cleanup expired blocked IPs from memory cache
function cleanupBlockedIPs() {
  const now = Date.now()
  const keysToDelete: string[] = []
  
  blockedIPsCache.forEach((blockTime, ip) => {
    if (now - blockTime > BLOCK_DURATION) {
      keysToDelete.push(ip)
    }
  })
  
  keysToDelete.forEach(ip => blockedIPsCache.delete(ip))
}

// Check if IP is blocked
function isIPBlocked(ip: string): boolean {
  // Cleanup expired entries periodically
  if (Math.random() < 0.1) { // 10% chance to cleanup on each request
    cleanupBlockedIPs()
  }
  
  // Check in-memory cache first
  const blockTime = blockedIPsCache.get(ip)
  if (blockTime && (Date.now() - blockTime) < BLOCK_DURATION) {
    return true
  }
  
  if (!blockedIPs.has(ip)) {
    return false
  }
  
  // Check if block has expired (24 hours)
  const now = Date.now()
  const recentAttempts = failedAttempts.filter(attempt => 
    attempt.ip === ip && 
    (now - new Date(attempt.timestamp).getTime()) < BLOCK_DURATION
  )
  
  if (recentAttempts.length === 0) {
    // Block has expired, remove from blocked list
    blockedIPs.delete(ip)
    blockedIPsCache.delete(ip)
    return false
  }
  
  return true
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const { attemptedPassword } = await request.json()
    
    // Check if IP is already blocked
    if (isIPBlocked(ip)) {
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
    
    // Add to in-memory storage
    addFailedAttempt(failedAttempt)
    
    // Count recent attempts from this IP (last hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const recentAttempts = failedAttempts.filter(attempt => 
      attempt.ip === ip && 
      attempt.timestamp > oneHourAgo
    )
    
    // Block IP if too many attempts
    if (recentAttempts.length >= MAX_ATTEMPTS_PER_IP) {
      blockedIPs.add(ip)
      blockedIPsCache.set(ip, Date.now())
      console.warn(`IP blocked due to too many failed attempts: ${ip}`)
    }
    
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
    const stats = getFailedLoginStats()
    
    return NextResponse.json({
      success: true,
      totalAttempts: stats.totalAttempts,
      activeBlocks: stats.activeBlocks,
      recentAttempts: stats.recentAttempts
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
