import { NextRequest, NextResponse } from 'next/server'
import { cleanupApiMemory, logMemoryUsage } from '@/utils/memoryManager'

// In-memory storage for Vercel compatibility
const visits: VisitData[] = []
const uniqueIPs = new Set<string>()
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const locationCache = new Map<string, { data: VisitData['location']; expires: number }>()

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10 // 10 requests per minute per IP
const LOCATION_CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours
const MAX_VISITS_STORED = 1000 // Limit to prevent memory issues

interface VisitData {
  ip: string
  timestamp: string
  userAgent: string
  location?: {
    country?: string
    region?: string
    city?: string
  }
  referer?: string
}

// Removed file system operations for Vercel compatibility

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

// Location cache is now defined at the top with other in-memory storage

// Cleanup expired rate limit entries
function cleanupRateLimit() {
  const now = Date.now()
  const keysToDelete: string[] = []
  
  rateLimitMap.forEach((value, key) => {
    if (now > value.resetTime) {
      keysToDelete.push(key)
    }
  })
  
  keysToDelete.forEach(key => rateLimitMap.delete(key))
}

// Cleanup expired location cache entries
function cleanupLocationCache() {
  const now = Date.now()
  const keysToDelete: string[] = []
  
  locationCache.forEach((value, key) => {
    if (now > value.expires) {
      keysToDelete.push(key)
    }
  })
  
  keysToDelete.forEach(key => locationCache.delete(key))
}

// Rate limiting function
function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const key = ip
  
  // Cleanup expired entries periodically
  if (Math.random() < 0.1) { // 10% chance to cleanup on each request
    cleanupRateLimit()
    cleanupLocationCache()
  }
  
  const current = rateLimitMap.get(key)
  
  if (!current || now > current.resetTime) {
    // Reset or create new entry
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 }
  }
  
  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }
  
  // Increment count
  current.count++
  rateLimitMap.set(key, current)
  
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - current.count }
}

// Get location from IP using ipinfo.io
async function getLocationFromIP(ip: string): Promise<VisitData['location']> {
  // For development/localhost, return mock data
  if (ip === '127.0.0.1' || ip === '::1' || ip === 'unknown') {
    return {
      country: 'Local',
      region: 'Development',
      city: 'Localhost'
    }
  }
  
  // Check cache first
  const cached = locationCache.get(ip)
  if (cached && Date.now() < cached.expires) {
    return cached.data
  }
  
  try {
    // Use ipinfo.io API (free tier: 50,000 requests/month)
    const response = await fetch(`https://ipinfo.io/${ip}/json?token=${process.env.GEOLOCATION_API_TOKEN || ''}`)
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }
    
    const data = await response.json()
    
    const location: VisitData['location'] = {
      country: data.country || 'Unknown',
      region: data.region || 'Unknown', 
      city: data.city || 'Unknown'
    }
    
    // Cache the result with expiration
    locationCache.set(ip, { 
      data: location, 
      expires: Date.now() + LOCATION_CACHE_TTL 
    })
    
    return location
    
  } catch (error) {
    console.error('Error fetching location for IP:', ip, error)
    
    // Return fallback data on error
    const fallbackLocation: VisitData['location'] = {
      country: 'Unknown',
      region: 'Unknown',
      city: 'Unknown'
    }
    
    // Cache the fallback to avoid repeated failed requests
    locationCache.set(ip, { 
      data: fallbackLocation, 
      expires: Date.now() + LOCATION_CACHE_TTL 
    })
    
    return fallbackLocation
  }
}

// In-memory visit management functions
function addVisit(visitData: VisitData): void {
  visits.push(visitData)
  
  // Keep only the most recent visits to prevent memory issues
  if (visits.length > MAX_VISITS_STORED) {
    visits.splice(0, visits.length - MAX_VISITS_STORED)
  }
  
  // Track unique IPs
  if (!uniqueIPs.has(visitData.ip)) {
    uniqueIPs.add(visitData.ip)
  }
}

function getVisitStats() {
  return {
    totalVisits: visits.length,
    uniqueVisits: uniqueIPs.size,
    recentVisits: visits.slice(-10) // Last 10 visits
  }
}

export async function POST(request: NextRequest) {
  try {
    // Log memory usage at start
    logMemoryUsage('log-visit POST')
    
    const ip = getClientIP(request)
    
    // Check rate limit
    const rateLimit = checkRateLimit(ip)
    if (!rateLimit.allowed) {
      console.warn(`Rate limit exceeded for IP: ${ip}`)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Rate limit exceeded. Too many requests.',
          retryAfter: Math.ceil((rateLimitMap.get(ip)?.resetTime || Date.now() + RATE_LIMIT_WINDOW - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimitMap.get(ip)?.resetTime || Date.now() + RATE_LIMIT_WINDOW - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': '0'
          }
        }
      )
    }
    
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const referer = request.headers.get('referer') || undefined
    
    // Get location
    const location = await getLocationFromIP(ip)
    
    // Check if this is a unique visit
    const isUniqueVisit = !uniqueIPs.has(ip)
    
    // Create visit data
    const visitData: VisitData = {
      ip,
      timestamp: new Date().toISOString(),
      userAgent,
      location,
      referer
    }
    
    // Add to in-memory storage
    addVisit(visitData)
    
    // Get current stats
    const stats = getVisitStats()
    
    // Cleanup memory after processing
    cleanupApiMemory()
    
    return NextResponse.json({
      success: true,
      isUniqueVisit,
      totalVisits: stats.totalVisits,
      uniqueVisits: stats.uniqueVisits
    }, {
      headers: {
        'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
        'X-RateLimit-Remaining': rateLimit.remaining.toString()
      }
    })
    
  } catch (error) {
    console.error('Error logging visit:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to log visit' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const ip = getClientIP(request)
    
    // Check rate limit
    const rateLimit = checkRateLimit(ip)
    if (!rateLimit.allowed) {
      console.warn(`Rate limit exceeded for IP: ${ip}`)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Rate limit exceeded. Too many requests.',
          retryAfter: Math.ceil((rateLimitMap.get(ip)?.resetTime || Date.now() + RATE_LIMIT_WINDOW - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimitMap.get(ip)?.resetTime || Date.now() + RATE_LIMIT_WINDOW - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': '0'
          }
        }
      )
    }
    
    const stats = getVisitStats()
    
    return NextResponse.json({
      success: true,
      totalVisits: stats.totalVisits,
      uniqueVisits: stats.uniqueVisits,
      recentVisits: stats.recentVisits
    }, {
      headers: {
        'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
        'X-RateLimit-Remaining': rateLimit.remaining.toString()
      }
    })
    
  } catch (error) {
    console.error('Error reading visits:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to read visits',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
