import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

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

// Get location from IP (simplified - you can integrate with a geolocation service)
async function getLocationFromIP(ip: string): Promise<VisitData['location']> {
  // For development/localhost, return mock data
  if (ip === '127.0.0.1' || ip === '::1' || ip === 'unknown') {
    return {
      country: 'Local',
      region: 'Development',
      city: 'Localhost'
    }
  }
  
  // In production, you could integrate with services like:
  // - ipapi.co
  // - ipinfo.io
  // - maxmind GeoIP
  // For now, return basic info
  return {
    country: 'Unknown',
    region: 'Unknown',
    city: 'Unknown'
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
    const ip = getClientIP(request)
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
    
    return NextResponse.json({
      success: true,
      isUniqueVisit,
      totalVisits: visitLog.totalVisits,
      uniqueVisits: visitLog.uniqueVisits
    })
    
  } catch (error) {
    console.error('Error logging visit:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to log visit' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const visitLog = await readVisits()
    
    return NextResponse.json({
      success: true,
      totalVisits: visitLog.totalVisits,
      uniqueVisits: visitLog.uniqueVisits,
      recentVisits: visitLog.visits.slice(-10) // Last 10 visits
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
