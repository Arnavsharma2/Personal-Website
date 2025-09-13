'use client'

import { useEffect } from 'react'
import { startMemoryManagement, stopMemoryManagement } from '@/utils/memoryManager'

export default function MemoryManager() {
  useEffect(() => {
    // Start memory management on client side
    startMemoryManagement()
    
    // Cleanup on unmount
    return () => {
      stopMemoryManagement()
    }
  }, [])

  // This component doesn't render anything visible
  return null
}
