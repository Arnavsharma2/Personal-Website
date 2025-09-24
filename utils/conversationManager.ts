// Vercel-compatible conversation manager using in-memory storage
// Note: Data will reset on each Vercel function restart

// Message limit configuration
const DAILY_MESSAGE_LIMIT = 100
const CONVERSATION_RETENTION_DAYS = 1 // Keep conversations for 1 day

// In-memory storage for Vercel compatibility
let conversationData: ConversationData = {
  conversations: [],
  messageCounts: []
}

// Interface for conversation data
interface ConversationMessage {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: string
}

interface Conversation {
  ip: string
  messages: ConversationMessage[]
  lastActivity: string
  totalMessages: number
}

interface MessageCount {
  ip: string
  count: number
  date: string // YYYY-MM-DD format
  lastReset: string
}

interface ConversationData {
  conversations: Conversation[]
  messageCounts: MessageCount[]
}

// Get today's date in YYYY-MM-DD format
function getTodayString(): string {
  return new Date().toISOString().split('T')[0]
}

// Read conversation data from memory (Vercel-compatible)
function readConversationData(): ConversationData {
  return conversationData
}

// Write conversation data to memory (Vercel-compatible)
function writeConversationData(data: ConversationData): void {
  conversationData = data
}

// Clean up old conversations and message counts
function cleanupOldData(data: ConversationData): ConversationData {
  const now = new Date()
  const cutoffDate = new Date(now.getTime() - (CONVERSATION_RETENTION_DAYS * 24 * 60 * 60 * 1000))
  
  // Clean up old conversations
  data.conversations = data.conversations.filter(conv => {
    const lastActivity = new Date(conv.lastActivity)
    return lastActivity > cutoffDate
  })
  
  // Clean up old message counts
  data.messageCounts = data.messageCounts.filter(count => {
    const countDate = new Date(count.date)
    return countDate > cutoffDate
  })
  
  return data
}

// Get or create conversation for IP
function getOrCreateConversation(data: ConversationData, ip: string): Conversation {
  let conversation = data.conversations.find(conv => conv.ip === ip)
  
  if (!conversation) {
    conversation = {
      ip,
      messages: [],
      lastActivity: new Date().toISOString(),
      totalMessages: 0
    }
    data.conversations.push(conversation)
  }
  
  return conversation
}

// Get message count for IP today
function getTodayMessageCount(data: ConversationData, ip: string): number {
  const today = getTodayString()
  const messageCount = data.messageCounts.find(count => count.ip === ip && count.date === today)
  return messageCount ? messageCount.count : 0
}

// Increment message count for IP today
function incrementMessageCount(data: ConversationData, ip: string): void {
  const today = getTodayString()
  let messageCount = data.messageCounts.find(count => count.ip === ip && count.date === today)
  
  if (!messageCount) {
    messageCount = {
      ip,
      count: 0,
      date: today,
      lastReset: new Date().toISOString()
    }
    data.messageCounts.push(messageCount)
  }
  
  messageCount.count++
}

// Check if IP has exceeded daily message limit
export function checkMessageLimit(ip: string): { allowed: boolean; remaining: number; limit: number } {
  const data = readConversationData()
  const todayCount = getTodayMessageCount(data, ip)
  const remaining = Math.max(0, DAILY_MESSAGE_LIMIT - todayCount)
  
  return {
    allowed: todayCount < DAILY_MESSAGE_LIMIT,
    remaining,
    limit: DAILY_MESSAGE_LIMIT
  }
}

// Add message to conversation (without counting)
export function addMessageToConversation(
  ip: string, 
  message: ConversationMessage
): { success: boolean; error?: string } {
  try {
    const data = readConversationData()
    
    // Get or create conversation
    const conversation = getOrCreateConversation(data, ip)
    
    // Add message
    conversation.messages.push(message)
    conversation.lastActivity = new Date().toISOString()
    conversation.totalMessages++
    
    // Clean up old data
    const cleanedData = cleanupOldData(data)
    
    // Save to file
    writeConversationData(cleanedData)
    
    return { success: true }
  } catch (error) {
    console.error('Error adding message to conversation:', error)
    return { success: false, error: 'Failed to save message' }
  }
}

// Add user message to conversation and count it
export function addUserMessageToConversation(
  ip: string, 
  message: ConversationMessage
): { success: boolean; error?: string } {
  try {
    const data = readConversationData()
    
    // Check message limit
    const limitCheck = checkMessageLimit(ip)
    if (!limitCheck.allowed) {
      return { 
        success: false, 
        error: `Daily message limit of ${DAILY_MESSAGE_LIMIT} exceeded. Please try again tomorrow.` 
      }
    }
    
    // Get or create conversation
    const conversation = getOrCreateConversation(data, ip)
    
    // Add message
    conversation.messages.push(message)
    conversation.lastActivity = new Date().toISOString()
    conversation.totalMessages++
    
    // Increment daily message count (only for user messages)
    incrementMessageCount(data, ip)
    
    // Clean up old data
    const cleanedData = cleanupOldData(data)
    
    // Save to file
    writeConversationData(cleanedData)
    
    return { success: true }
  } catch (error) {
    console.error('Error adding user message to conversation:', error)
    return { success: false, error: 'Failed to save message' }
  }
}

// Get conversation history for IP
export function getConversationHistory(ip: string): ConversationMessage[] {
  try {
    const data = readConversationData()
    const conversation = data.conversations.find(conv => conv.ip === ip)
    return conversation ? conversation.messages : []
  } catch (error) {
    console.error('Error getting conversation history:', error)
    return []
  }
}

// Clear conversation for IP (admin function)
export function clearConversation(ip: string): boolean {
  try {
    const data = readConversationData()
    data.conversations = data.conversations.filter(conv => conv.ip !== ip)
    writeConversationData(data)
    return true
  } catch (error) {
    console.error('Error clearing conversation:', error)
    return false
  }
}

// Get conversation stats
export function getConversationStats(): {
  totalConversations: number
  totalMessages: number
  activeToday: number
} {
  try {
    const data = readConversationData()
    const today = getTodayString()
    
    const activeToday = data.conversations.filter(conv => {
      const lastActivity = new Date(conv.lastActivity).toISOString().split('T')[0]
      return lastActivity === today
    }).length
    
    const totalMessages = data.conversations.reduce((sum, conv) => sum + conv.totalMessages, 0)
    
    return {
      totalConversations: data.conversations.length,
      totalMessages,
      activeToday
    }
  } catch (error) {
    console.error('Error getting conversation stats:', error)
    return {
      totalConversations: 0,
      totalMessages: 0,
      activeToday: 0
    }
  }
}
