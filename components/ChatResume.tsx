'use client'

import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Send, Bot, User, Loader2, MessageCircle, Trash2 } from 'lucide-react'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  ragMetadata?: {
    sourcesUsed: number
    confidence: number
    enhancedWithRAG: boolean
  }
}

const conversationStarters = [
  "Tell me about your experience with machine learning",
  "What projects have you worked on?",
  "What technologies do you specialize in?",
  "Tell me about your education background",
  "What are your career goals?",
  "Describe your internship experience"
]

interface ChatResumeProps {
  isSidebar?: boolean
  onClose?: () => void
}

export default function ChatResume({ isSidebar = false, onClose }: ChatResumeProps) {
  const ref = useRef(null)
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

  useEffect(() => {
    const loadConversationData = async () => {
      try {
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

    if (messageCount.remaining <= 0) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: `Daily message limit exceeded. You have used ${messageCount.limit}/${messageCount.limit} messages today. Please try again tomorrow.`,
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content.trim() }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (response.status === 429 && errorData.limitExceeded) {
          const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: errorData.error,
            role: 'assistant',
            timestamp: new Date()
          }
          setMessages(prev => [...prev, errorMessage])
          return
        }
        throw new Error(errorData.error || 'Failed to get response')
      }

      const data = await response.json()

      if (data.remaining !== undefined && data.limit !== undefined) {
        setMessageCount({ remaining: data.remaining, limit: data.limit })
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date(),
        ragMetadata: data.ragMetadata
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
    if (window.confirm('Clear the conversation? This cannot be undone.')) {
      try {
        setMessages([])
        const response = await fetch('/api/clear-conversation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div ref={ref} className={isSidebar ? "h-full flex flex-col bg-surface" : "py-20 px-4 sm:px-6 lg:px-8 bg-background"}>
      <div className={isSidebar ? "flex-1 flex flex-col overflow-hidden" : "max-w-4xl mx-auto"}>
        <div className={isSidebar ? "flex-1 flex flex-col h-full" : ""}>
          <div className={isSidebar ? "flex-1 flex flex-col h-full" : "bg-surface rounded-2xl border border-surface-border overflow-hidden"}>

            {/* Compact header for modal mode */}
            {isSidebar && (
              <div className="bg-surface border-b border-surface-border px-4 py-2.5 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-foreground-subtle font-mono">
                    Ask me about Arnav&apos;s experience, skills, or projects
                  </p>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono ${messageCount.remaining <= 5 ? 'text-red-400' : 'text-foreground-subtle'}`}>
                      {messageCount.remaining}/{messageCount.limit}
                    </span>
                    <button
                      onClick={resetConversation}
                      className="p-1 text-foreground-subtle hover:text-foreground transition-colors"
                      title="Clear conversation"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Messages Container */}
            <div className={`${isSidebar ? "flex-1 overflow-y-auto" : "h-[500px] overflow-y-auto"} p-4 space-y-4`}>
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-foreground-subtle mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-foreground mb-2">Start a conversation</h4>
                  <p className="text-foreground-muted text-sm mb-6">Choose a topic or type your own question</p>

                  <div className={`grid ${isSidebar ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'} gap-2 ${isSidebar ? '' : 'max-w-2xl mx-auto'}`}>
                    {conversationStarters.map((starter, index) => (
                      <motion.button
                        key={index}
                        onClick={() => sendMessage(starter)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="p-3 text-left bg-surface-elevated hover:bg-surface-border/50 border border-surface-border rounded-lg text-foreground-muted hover:text-foreground transition-all duration-200 text-sm"
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
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2.5 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === 'user'
                            ? 'bg-accent'
                            : 'bg-surface-elevated border border-surface-border'
                        }`}>
                          {message.role === 'user' ? (
                            <User className="w-3.5 h-3.5 text-white" />
                          ) : (
                            <Bot className="w-3.5 h-3.5 text-foreground-muted" />
                          )}
                        </div>
                        <div className={`rounded-2xl px-4 py-2.5 ${
                          message.role === 'user'
                            ? 'bg-accent text-white'
                            : 'bg-surface-elevated text-foreground border border-surface-border'
                        }`}>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                          <p className={`text-xs mt-1.5 ${
                            message.role === 'user' ? 'text-white/60' : 'text-foreground-subtle'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-2.5">
                        <div className="w-7 h-7 rounded-full bg-surface-elevated border border-surface-border flex items-center justify-center">
                          <Bot className="w-3.5 h-3.5 text-foreground-muted" />
                        </div>
                        <div className="bg-surface-elevated border border-surface-border rounded-2xl px-4 py-2.5">
                          <div className="flex items-center space-x-2">
                            <Loader2 className="w-3.5 h-3.5 text-foreground-subtle animate-spin" />
                            <span className="text-sm text-foreground-muted">Thinking...</span>
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
            <div className={`border-t border-surface-border p-3 ${isSidebar ? 'flex-shrink-0' : ''}`}>
              <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask a question..."
                    className="w-full px-4 py-2.5 bg-surface-elevated border border-surface-border rounded-lg text-foreground text-sm placeholder-foreground-subtle focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors"
                    disabled={isLoading}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading || messageCount.remaining <= 0}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 bg-accent hover:bg-accent-dark disabled:bg-surface-border disabled:text-foreground-subtle text-white rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
