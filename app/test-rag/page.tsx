'use client'

import { useState } from 'react'

export default function TestRAGPage() {
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [testQuery, setTestQuery] = useState('Tell me about your machine learning projects')

  const testRAG = async () => {
    setLoading(true)
    setResult('Testing RAG system...')
    
    try {
      // Check environment variables first
      const envResponse = await fetch('/api/env-check', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      })
      
      const envData = await envResponse.json()
      
      // Test RAG status
      const statusResponse = await fetch('/api/rag-status', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      })
      
      const statusData = await statusResponse.json()
      
      // Test chat with RAG
      const chatResponse = await fetch('/api/chat-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: testQuery }),
      })
      
      const chatData = await chatResponse.json()
      
      setResult(`
🔧 Environment Check:
${JSON.stringify(envData, null, 2)}

📊 RAG Status:
${JSON.stringify(statusData, null, 2)}

💬 Chat Response:
${JSON.stringify(chatData, null, 2)}

🎯 RAG Integration: ${chatData.ragMetadata?.enhancedWithRAG ? '✅ Working' : '❌ Not Working'}
📚 Sources Used: ${chatData.ragMetadata?.sourcesUsed || 0}
🎯 Confidence: ${chatData.ragMetadata?.confidence || 0}
${envData.critical ? `⚠️ Critical: ${envData.critical}` : ''}
      `)
    } catch (error) {
      setResult(`
❌ RAG Test Error: ${error instanceof Error ? error.message : 'Unknown error'}

This could be due to:
- Missing GEMINI_API_KEY in .env file
- RAG system not initialized
- API endpoint issues
- Network connectivity problems

Try:
1. Check if .env file exists and contains GEMINI_API_KEY
2. Restart the development server after adding .env
3. Check browser console for details
4. Verify API endpoints are working
      `)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">RAG System Test Page</h1>
        
        <div className="mb-8 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Test Query:
            </label>
            <input
              type="text"
              value={testQuery}
              onChange={(e) => setTestQuery(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a test question..."
            />
          </div>
          
          <button
            onClick={testRAG}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test RAG System'}
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
          <p>This page tests the RAG (Retrieval-Augmented Generation) system integration.</p>
          <p>The RAG system should enhance responses with relevant resume content and show metadata.</p>
        </div>
      </div>
    </div>
  )
}
