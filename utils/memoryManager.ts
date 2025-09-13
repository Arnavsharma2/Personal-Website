// Memory management utilities for preventing memory leaks

interface MemoryStats {
  heapUsed: number
  heapTotal: number
  external: number
  rss: number
}

// Global cleanup intervals
let cleanupInterval: NodeJS.Timeout | null = null

// Memory monitoring and cleanup
export function startMemoryManagement() {
  if (typeof window !== 'undefined') {
    // Client-side: Monitor memory usage and cleanup
    const cleanup = () => {
      // Force garbage collection if available
      if (window.gc) {
        window.gc()
      }
      
      // Clear any large objects or caches
      if (window.performance && window.performance.memory) {
        const memory = window.performance.memory as MemoryStats
        const memoryUsagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
        
        // If memory usage is high, trigger cleanup
        if (memoryUsagePercent > 80) {
          console.warn('High memory usage detected:', memoryUsagePercent.toFixed(2) + '%')
          
          // Clear session storage if it's getting large
          if (sessionStorage.length > 50) {
            const keysToKeep = ['visitLogged']
            const allKeys = Object.keys(sessionStorage)
            allKeys.forEach(key => {
              if (!keysToKeep.includes(key)) {
                sessionStorage.removeItem(key)
              }
            })
          }
        }
      }
    }
    
    // Run cleanup every 5 minutes
    cleanupInterval = setInterval(cleanup, 5 * 60 * 1000)
    
    // Also cleanup on page unload
    window.addEventListener('beforeunload', cleanup)
  }
}

export function stopMemoryManagement() {
  if (cleanupInterval) {
    clearInterval(cleanupInterval)
    cleanupInterval = null
  }
}

// Server-side memory monitoring
export function logMemoryUsage(context: string = 'Unknown') {
  if (typeof process !== 'undefined' && process.memoryUsage) {
    const usage = process.memoryUsage()
    const memoryMB = {
      rss: Math.round(usage.rss / 1024 / 1024),
      heapTotal: Math.round(usage.heapTotal / 1024 / 1024),
      heapUsed: Math.round(usage.heapUsed / 1024 / 1024),
      external: Math.round(usage.external / 1024 / 1024),
    }
    
    console.log(`Memory usage (${context}):`, memoryMB)
    
    // Warn if memory usage is high
    if (memoryMB.heapUsed > 100) { // 100MB threshold
      console.warn(`High memory usage detected in ${context}:`, memoryMB.heapUsed + 'MB')
    }
  }
}

// Cleanup function for API routes
export function cleanupApiMemory() {
  // Force garbage collection if available
  if (global.gc) {
    global.gc()
  }
  
  // Log current memory usage
  logMemoryUsage('API Cleanup')
}
