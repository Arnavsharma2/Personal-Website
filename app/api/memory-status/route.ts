import { NextResponse } from 'next/server'
import { logMemoryUsage } from '@/utils/memoryManager'

export async function GET() {
  try {
    // Log current memory usage
    logMemoryUsage('memory-status endpoint')
    
    if (typeof process !== 'undefined' && process.memoryUsage) {
      const usage = process.memoryUsage()
      const memoryMB = {
        rss: Math.round(usage.rss / 1024 / 1024),
        heapTotal: Math.round(usage.heapTotal / 1024 / 1024),
        heapUsed: Math.round(usage.heapUsed / 1024 / 1024),
        external: Math.round(usage.external / 1024 / 1024),
        arrayBuffers: Math.round(usage.arrayBuffers / 1024 / 1024),
      }
      
      return NextResponse.json({
        success: true,
        memory: memoryMB,
        uptime: Math.round(process.uptime()),
        timestamp: new Date().toISOString()
      })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Memory information not available'
    })
    
  } catch (error) {
    console.error('Error getting memory status:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get memory status',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
