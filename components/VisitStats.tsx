'use client'

import { motion } from 'framer-motion'
import { useVisitTracker } from '@/hooks/useVisitTracker'
import { Users, Eye, MapPin } from 'lucide-react'

export default function VisitStats() {
  const { stats, isLoading } = useVisitTracker()

  if (isLoading || !stats) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-4 right-4 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-3 shadow-lg z-40"
    >
      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-1 text-green-400">
          <Eye className="w-4 h-4" />
          <span>{stats.totalVisits}</span>
        </div>
        
        <div className="flex items-center space-x-1 text-blue-400">
          <Users className="w-4 h-4" />
          <span>{stats.uniqueVisits}</span>
        </div>
        
        {stats.isUniqueVisit && (
          <div className="flex items-center space-x-1 text-purple-400">
            <MapPin className="w-4 h-4" />
            <span className="text-xs">New!</span>
          </div>
        )}
      </div>
      
      <div className="text-xs text-gray-400 mt-1">
        {stats.isUniqueVisit ? 'Welcome!' : 'Welcome back!'}
      </div>
    </motion.div>
  )
}
