import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { cleanupApiMemory, logMemoryUsage } from '@/utils/memoryManager'

// Rate limiting storage with cleanup
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10 // 10 requests per minute per IP
const RATE_LIMIT_CLEANUP_INTERVAL = 5 * 60 * 1000 // Clean up every 5 minutes

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

interface VisitLog {
  visits: VisitData[]
  uniqueIPs: Set<string>
  totalVisits: number
  uniqueVisits: number
}

const VISITS_FILE = path.join(process.cwd(), 'data', 'visits.json')

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.dirname(VISITS_FILE)
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

// Cache for location data to avoid repeated API calls (with TTL)
const locationCache = new Map<string, { data: VisitData['location']; expires: number }>()
const LOCATION_CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours

// Cleanup expired rate limit entries
function cleanupRateLimit() {
  const now = Date.now()
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key)
    }
  }
}

// Cleanup expired location cache entries
function cleanupLocationCache() {
  const now = Date.now()
  for (const [key, value] of locationCache.entries()) {
    if (now > value.expires) {
      locationCache.delete(key)
    }
  }
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

// Read existing visits
async function readVisits(): Promise<VisitLog> {
  try {
    await ensureDataDir()
    
    if (!existsSync(VISITS_FILE)) {
      return {
        visits: [],
        uniqueIPs: new Set(),
        totalVisits: 0,
        uniqueVisits: 0
      }
    }
    
    const data = await readFile(VISITS_FILE, 'utf-8')
    const parsed = JSON.parse(data)
    
    // Convert uniqueIPs array back to Set
    return {
      visits: parsed.visits || [],
      uniqueIPs: new Set(parsed.uniqueIPs || []),
      totalVisits: parsed.totalVisits || 0,
      uniqueVisits: parsed.uniqueVisits || 0
    }
  } catch (error) {
    console.error('Error reading visits:', error)
    return {
      visits: [],
      uniqueIPs: new Set(),
      totalVisits: 0,
      uniqueVisits: 0
    }
  }
}

// Write visits to file
async function writeVisits(visitLog: VisitLog): Promise<void> {
  try {
    await ensureDataDir()
    
    // Convert Set to Array for JSON serialization
    const dataToWrite = {
      ...visitLog,
      uniqueIPs: Array.from(visitLog.uniqueIPs)
    }
    
    await writeFile(VISITS_FILE, JSON.stringify(dataToWrite, null, 2))
  } catch (error) {
    console.error('Error writing visits:', error)
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
    
    // Get location (simplified for now)
    const location = await getLocationFromIP(ip)
    
    // Read existing visits
    const visitLog = await readVisits()
    
    // Check if this is a unique visit
    const isUniqueVisit = !visitLog.uniqueIPs.has(ip)
    
    // Create visit data
    const visitData: VisitData = {
      ip,
      timestamp: new Date().toISOString(),
      userAgent,
      location,
      referer
    }
    
    // Add to visits
    visitLog.visits.push(visitData)
    visitLog.totalVisits++
    
    if (isUniqueVisit) {
      visitLog.uniqueIPs.add(ip)
      visitLog.uniqueVisits++
    }
    
    // Keep only last 1000 visits to prevent file from growing too large
    if (visitLog.visits.length > 1000) {
      visitLog.visits = visitLog.visits.slice(-1000)
    }
    
    // Write back to file
    await writeVisits(visitLog)
    
    // Cleanup memory after processing
    cleanupApiMemory()
    
    return NextResponse.json({
      success: true,
      isUniqueVisit,
      totalVisits: visitLog.totalVisits,
      uniqueVisits: visitLog.uniqueVisits
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
    
    const visitLog = await readVisits()
    
    return NextResponse.json({
      success: true,
      totalVisits: visitLog.totalVisits,
      uniqueVisits: visitLog.uniqueVisits,
      recentVisits: visitLog.visits.slice(-10) // Last 10 visits
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
