'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [adminPassword, setAdminPassword] = useState('admin123')
  const router = useRouter()

  // Set default admin password (will be verified server-side)
  useEffect(() => {
    // No longer fetch password from server for security
    // Password verification happens server-side only
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Check if already authenticated
    const authStatus = sessionStorage.getItem('adminAuthenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Verify password server-side
      const response = await fetch('/api/admin-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          providedPassword: password
        })
      })
      
      const data = await response.json()
      
      if (response.ok && data.success) {
        setIsAuthenticated(true)
        sessionStorage.setItem('adminAuthenticated', 'true')
        setPassword('')
      } else {
        // Log failed login attempt
        try {
          await fetch('/api/log-failed-login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              attemptedPassword: password
            })
          })
        } catch (error) {
          console.error('Error logging failed login attempt:', error)
        }
        
        alert(data.error || 'Incorrect password')
      }
    } catch (error) {
      console.error('Error during login:', error)
      alert('Login failed. Please try again.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('adminAuthenticated')
    setPassword('')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="max-w-md mx-auto p-8 bg-gray-900 rounded-lg">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-xs text-gray-400 text-center">
            <p>Enter admin password to access the dashboard</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Admin Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
          >
            Logout
          </button>
        </div>
      </div>
      
      {/* Admin Content */}
      {children}
    </div>
  )
}
