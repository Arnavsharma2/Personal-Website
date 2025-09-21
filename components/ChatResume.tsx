'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Send, Bot, User, Loader2, MessageCircle, Sparkles, Trash2 } from 'lucide-react'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

const conversationStarters = [
  "Tell me about your experience with machine learning",
  "What projects have you worked on?",
  "What technologies do you specialize in?",
  "Tell me about your education background",
  "What are your career goals?",
  "Describe your internship experience"
]

export default function ChatResume() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [messageCount, setMessageCount] = useState({ remaining: 100, limit: 100 })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const messagesContainer = messagesEndRef.current.parentElement
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load conversation history and message count on component mount
  useEffect(() => {
    const loadConversationData = async () => {
      try {
        // Load conversation history
        const historyResponse = await fetch('/api/chat-history')
        if (historyResponse.ok) {
          const historyData = await historyResponse.json()
          if (historyData.success && historyData.messages.length > 0) {
            setMessages(historyData.messages.map((msg: any) => ({
              id: msg.id,
              content: msg.content,
              role: msg.role,
              timestamp: new Date(msg.timestamp)
            })))
          }
        }

        // Load message count
        const countResponse = await fetch('/api/message-count')
        if (countResponse.ok) {
          const countData = await countResponse.json()
          if (countData.success) {
            setMessageCount({
              remaining: countData.remaining,
              limit: countData.limit
            })
          }
        }
      } catch (error) {
        console.error('Error loading conversation data:', error)
      }
    }

    loadConversationData()
  }, [])

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    // Check if user has remaining messages
    if (messageCount.remaining <= 0) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: `🚫 Daily message limit exceeded. You have used ${messageCount.limit}/${messageCount.limit} messages today. Please try again tomorrow.`,
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content.trim() }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        
        // Handle rate limit exceeded
        if (response.status === 429 && errorData.limitExceeded) {
          const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: `🚫 ${errorData.error}`,
            role: 'assistant',
            timestamp: new Date()
          }
          setMessages(prev => [...prev, errorMessage])
          return
        }
        
        throw new Error(errorData.error || 'Failed to get response')
      }

      const data = await response.json()
      
      // Update message count if provided
      if (data.remaining !== undefined && data.limit !== undefined) {
        setMessageCount({ remaining: data.remaining, limit: data.limit })
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  const resetConversation = async () => {
    if (window.confirm('Are you sure you want to clear the conversation? This action cannot be undone.')) {
      try {
        // Clear local messages
        setMessages([])
        
        // Clear conversation history only (not message count)
        const response = await fetch('/api/clear-conversation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          console.error('Failed to clear conversation history')
        }
      } catch (error) {
        console.error('Error resetting conversation:', error)
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const handleStarterClick = (starter: string) => {
    sendMessage(starter)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <section id="chat-resume" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-accent-600 mb-4">
            05.
          </h2>
          <h3 className="text-2xl sm:text-3xl font-semibold text-primary-900 mb-4">
            Chat with my Resume
          </h3>
          <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
          <p className="text-lg text-primary-700 max-w-3xl mx-auto">
            Ask me anything about Arnav's experience, skills, projects, career goals, or even hobbies. 
            I&apos;m powered by AI and have access to Arnav's information.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Chat Interface */}
          <div className="bg-white rounded-2xl border border-primary-200 overflow-hidden shadow-2xl">
            {/* Chat Header */}
            <div className="bg-accent-100 border-b border-accent-200 p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-primary-900">Arnav&apos;s Resume Assistant</h4>
                  <p className="text-sm text-primary-700">Ask me anything about my background</p>
                </div>
                <div className="ml-auto flex items-center space-x-4">
                  <div className={`text-sm ${messageCount.remaining <= 5 ? 'text-red-500' : messageCount.remaining <= 10 ? 'text-yellow-500' : 'text-primary-600'}`}>
                    Messages: {messageCount.remaining}/{messageCount.limit}
                    {messageCount.remaining <= 5 && messageCount.remaining > 0 && (
                      <span className="ml-1 text-xs">⚠️</span>
                    )}
                    {messageCount.remaining === 0 && (
                      <span className="ml-1 text-xs">🚫</span>
                    )}
                  </div>
                  <button
                    onClick={resetConversation}
                    className="p-2 text-primary-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    title="Clear conversation"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-4 scrollbar-hide">
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-primary-900 mb-2">Start a conversation</h4>
                  <p className="text-primary-700 mb-6">Choose a topic below or type your own question</p>
                  
                  {/* Conversation Starters */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                    {conversationStarters.map((starter, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleStarterClick(starter)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-3 text-left bg-primary-100 hover:bg-primary-200 border border-primary-300 rounded-lg text-primary-700 hover:text-primary-900 transition-all duration-200 text-sm"
                      >
                        {starter}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === 'user' 
                            ? 'bg-accent-500' 
                            : 'bg-primary-300'
                        }`}>
                          {message.role === 'user' ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className={`rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-accent-500 text-white'
                            : 'bg-primary-100 text-primary-900 border border-primary-200'
                        }`}>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                          <p className={`text-xs mt-2 ${
                            message.role === 'user' ? 'text-accent-100' : 'text-primary-600'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-primary-100 border border-primary-200 rounded-2xl px-4 py-3">
                          <div className="flex items-center space-x-1">
                            <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                            <span className="text-sm text-primary-700">Arnav is typing...</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-primary-200 p-4">
              <form onSubmit={handleSubmit} className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me anything about my experience, skills, or projects..."
                    className="w-full px-4 py-3 bg-white border border-primary-300 rounded-xl text-primary-900 placeholder-primary-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading || messageCount.remaining <= 0}
                  whileHover={{ scale: messageCount.remaining > 0 ? 1.05 : 1 }}
                  whileTap={{ scale: messageCount.remaining > 0 ? 0.95 : 1 }}
                  className={`px-6 py-3 font-semibold rounded-xl transition-all duration-200 flex items-center space-x-2 ${
                    messageCount.remaining <= 0
                      ? 'bg-primary-300 text-primary-600 cursor-not-allowed'
                      : 'bg-accent-500 hover:bg-accent-600 disabled:bg-primary-300 disabled:text-primary-600 text-white disabled:cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
