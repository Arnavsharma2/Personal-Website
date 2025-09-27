'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Eye, MapPin, Clock, Globe, Shield, AlertTriangle, Sparkles } from 'lucide-react'

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

interface VisitStats {
  totalVisits: number
  uniqueVisits: number
  recentVisits: VisitData[]
}

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

interface SecurityStats {
  totalAttempts: number
  activeBlocks: number
  recentAttempts: FailedLoginAttempt[]
}

interface RAGStats {
  initialized: boolean
  documentCount: number
  lastUpdated: string
}

export default function AdminPage() {
  const [stats, setStats] = useState<VisitStats | null>(null)
  const [securityStats, setSecurityStats] = useState<SecurityStats | null>(null)
  const [ragStats, setRagStats] = useState<RAGStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch visit stats
        const visitResponse = await fetch('/api/log-visit', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-cache',
        })
        
        if (visitResponse.ok) {
          const visitData = await visitResponse.json()
          if (visitData.success) {
            setStats(visitData)
          }
        }

        // Fetch security stats
        const securityResponse = await fetch('/api/log-failed-login', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-cache',
        })
        
        if (securityResponse.ok) {
          const securityData = await securityResponse.json()
          if (securityData.success) {
            setSecurityStats(securityData)
          }
        }

        // Fetch RAG stats
        const ragResponse = await fetch('/api/rag-status', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-cache',
        })
        
        if (ragResponse.ok) {
          const ragData = await ragResponse.json()
          if (ragData.success) {
            setRagStats(ragData.rag)
          }
        }
        
      } catch (error) {
        console.error('Error fetching stats:', error)
        
        // Check if it's a blocked request error
        if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
          console.warn('Request may be blocked by browser extension or ad blocker')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-white text-xl">Loading visit statistics...</div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center max-w-2xl mx-auto p-8">
          <div className="text-white text-xl mb-4">Failed to load statistics</div>
          <div className="text-gray-400 text-sm mb-6">
            This is likely due to a browser extension (ad blocker, privacy extension) blocking the API request.
          </div>
          <div className="text-gray-300 text-sm mb-6 space-y-2">
            <p><strong>To fix this:</strong></p>
            <p>1. Disable ad blockers or privacy extensions for localhost</p>
            <p>2. Add localhost:3000 to your extension&apos;s whitelist</p>
            <p>3. Try opening the page in an incognito/private window</p>
            <p>4. Check the browser console for more details</p>
          </div>
          <div className="space-x-4">
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
            <button 
              onClick={() => window.open('/', '_blank')} 
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Visit Main Site
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="text-white p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">Visit Statistics</h1>
          <p className="text-gray-400">Track unique visitors and page views</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gray-900 p-6 rounded-lg border border-gray-800"
          >
            <div className="flex items-center space-x-3">
              <Eye className="w-8 h-8 text-blue-400" />
              <div>
                <h3 className="text-2xl font-bold text-blue-400">{stats.totalVisits}</h3>
                <p className="text-gray-400">Total Visits</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-900 p-6 rounded-lg border border-gray-800"
          >
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="text-2xl font-bold text-green-400">{stats.uniqueVisits}</h3>
                <p className="text-gray-400">Unique Visitors</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-900 p-6 rounded-lg border border-gray-800"
          >
            <div className="flex items-center space-x-3">
              <Globe className="w-8 h-8 text-purple-400" />
              <div>
                <h3 className="text-2xl font-bold text-purple-400">
                  {stats.uniqueVisits > 0 ? Math.round((stats.uniqueVisits / stats.totalVisits) * 100) : 0}%
                </h3>
                <p className="text-gray-400">Return Rate</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-900 p-6 rounded-lg border border-gray-800"
          >
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-red-400" />
              <div>
                <h3 className="text-2xl font-bold text-red-400">
                  {securityStats?.activeBlocks || 0}
                </h3>
                <p className="text-gray-400">Blocked IPs</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gray-900 p-6 rounded-lg border border-gray-800"
          >
            <div className="flex items-center space-x-3">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <div>
                <h3 className="text-2xl font-bold text-purple-400">
                  {ragStats?.documentCount || 0}
                </h3>
                <p className="text-gray-400">RAG Documents</p>
                <p className="text-xs text-gray-500">
                  {ragStats?.initialized ? 'Active' : 'Inactive'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Security Alerts */}
        {securityStats && securityStats.activeBlocks > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-6"
          >
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="text-red-400 font-semibold">Security Alert</h3>
            </div>
            <p className="text-red-300 text-sm mt-1">
              {securityStats.activeBlocks} IP address(es) are currently blocked due to suspicious activity.
            </p>
          </motion.div>
        )}

        {/* Recent Visits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-2xl font-bold">Recent Visits</h2>
            <p className="text-gray-400">Last 10 visits to your website</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">IP Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Referer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {stats.recentVisits.length > 0 ? (
                  stats.recentVisits.map((visit, index) => (
                    <tr key={index} className="hover:bg-gray-800/50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-300">
                        {visit.ip}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>
                            {visit.location?.city && visit.location?.region && visit.location?.country 
                              ? `${visit.location.city}, ${visit.location.region}, ${visit.location.country}`
                              : visit.location?.country === 'Local'
                              ? 'Local Development'
                              : 'Location Unknown'
                            }
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>
                            {new Date(visit.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {visit.referer ? (
                          <a 
                            href={visit.referer} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 truncate max-w-xs block"
                          >
                            {visit.referer}
                          </a>
                        ) : (
                          <span className="text-gray-500">Direct</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                      No visits recorded yet. Visit your main page to generate some data!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Failed Login Attempts */}
        {securityStats && securityStats.recentAttempts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden mt-8"
          >
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-red-400">Security Log</h2>
              <p className="text-gray-400">Recent failed login attempts and blocked IPs</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">IP Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Attempted Password</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User Agent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {securityStats.recentAttempts.slice(-10).map((attempt, index) => (
                    <tr key={index} className="hover:bg-gray-800/50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-300">
                        {attempt.ip}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>
                            {attempt.location?.city && attempt.location?.region && attempt.location?.country 
                              ? `${attempt.location.city}, ${attempt.location.region}, ${attempt.location.country}`
                              : attempt.location?.country === 'Local'
                              ? 'Local Development'
                              : 'Location Unknown'
                            }
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>
                            {new Date(attempt.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <span className="font-mono bg-red-900/20 text-red-300 px-2 py-1 rounded">
                          {attempt.attemptedPassword}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">
                        {attempt.userAgent}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
