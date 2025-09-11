'use client'

import { useState } from 'react'

export default function TestAPIPage() {
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const testAPI = async () => {
    setLoading(true)
    setResult('Testing API...')
    
    try {
      // Test GET request
      const getResponse = await fetch('/api/log-visit', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      })
      
      const getData = await getResponse.json()
      
      // Test POST request
      const postResponse = await fetch('/api/log-visit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      const postData = await postResponse.json()
      
      setResult(`
✅ API is working correctly!

GET Response: ${JSON.stringify(getData, null, 2)}

POST Response: ${JSON.stringify(postData, null, 2)}
      `)
    } catch (error) {
      setResult(`
❌ API Error: ${error instanceof Error ? error.message : 'Unknown error'}

This is likely due to:
- Browser extension blocking the request
- Ad blocker preventing API calls
- Network connectivity issues

Try:
1. Disable browser extensions
2. Use incognito mode
3. Check browser console for details
      `)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Test Page</h1>
        
        <div className="mb-8">
          <button
            onClick={testAPI}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test API Endpoints'}
          </button>
        </div>
        
        {result && (
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Test Results:</h2>
            <pre className="text-sm text-gray-300 whitespace-pre-wrap overflow-auto">
              {result}
            </pre>
          </div>
        )}
        
        <div className="mt-8 text-gray-400 text-sm">
          <p>This page tests the visit logging API endpoints to help diagnose connection issues.</p>
          <p>If you see errors here, the same issue will affect the admin page.</p>
        </div>
      </div>
    </div>
  )
}
