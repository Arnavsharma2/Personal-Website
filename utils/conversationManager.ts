// Message limit configuration
const DAILY_MESSAGE_LIMIT = 100
const CONVERSATION_RETENTION_DAYS = 1 // Keep conversations for 1 day

// In-memory storage for Vercel compatibility
const conversations = new Map<string, ConversationMessage[]>()
const messageCounts = new Map<string, { count: number; date: string; lastReset: string }>()

// Interface for conversation data
interface ConversationMessage {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: string
}

// Removed unused interfaces for in-memory storage

// Get today's date in YYYY-MM-DD format
function getTodayString(): string {
  return new Date().toISOString().split('T')[0]
}

// Clean up old conversations and message counts
function cleanupOldData(): void {
  const now = new Date()
  const cutoffDate = new Date(now.getTime() - (CONVERSATION_RETENTION_DAYS * 24 * 60 * 60 * 1000))
  
  // Clean up old conversations
  for (const [ip, messages] of conversations.entries()) {
    const recentMessages = messages.filter(msg => {
      const msgDate = new Date(msg.timestamp)
      return msgDate > cutoffDate
    })
    
    if (recentMessages.length === 0) {
      conversations.delete(ip)
    } else {
      conversations.set(ip, recentMessages)
    }
  }
  
  // Clean up old message counts
  for (const [ip, countData] of messageCounts.entries()) {
    const countDate = new Date(countData.date)
    if (countDate <= cutoffDate) {
      messageCounts.delete(ip)
    }
  }
}

// Get message count for IP today
function getTodayMessageCount(ip: string): number {
  const today = getTodayString()
  const countData = messageCounts.get(ip)
  return (countData && countData.date === today) ? countData.count : 0
}

// Increment message count for IP today
function incrementMessageCount(ip: string): void {
  const today = getTodayString()
  const countData = messageCounts.get(ip)
  
  if (!countData || countData.date !== today) {
    messageCounts.set(ip, {
      count: 1,
      date: today,
      lastReset: new Date().toISOString()
    })
  } else {
    countData.count++
    messageCounts.set(ip, countData)
  }
}

// Check if IP has exceeded daily message limit
export function checkMessageLimit(ip: string): { allowed: boolean; remaining: number; limit: number } {
  const todayCount = getTodayMessageCount(ip)
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
    // Get or create conversation
    let conversation = conversations.get(ip) || []
    
    // Add message
    conversation.push(message)
    conversations.set(ip, conversation)
    
    // Clean up old data periodically
    if (Math.random() < 0.1) { // 10% chance to cleanup
      cleanupOldData()
    }
    
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
    // Check message limit
    const limitCheck = checkMessageLimit(ip)
    if (!limitCheck.allowed) {
      return { 
        success: false, 
        error: `Daily message limit of ${DAILY_MESSAGE_LIMIT} exceeded. Please try again tomorrow.` 
      }
    }
    
    // Get or create conversation
    let conversation = conversations.get(ip) || []
    
    // Add message
    conversation.push(message)
    conversations.set(ip, conversation)
    
    // Increment daily message count (only for user messages)
    incrementMessageCount(ip)
    
    // Clean up old data periodically
    if (Math.random() < 0.1) { // 10% chance to cleanup
      cleanupOldData()
    }
    
    return { success: true }
  } catch (error) {
    console.error('Error adding user message to conversation:', error)
    return { success: false, error: 'Failed to save message' }
  }
}

// Get conversation history for IP
export function getConversationHistory(ip: string): ConversationMessage[] {
  try {
    return conversations.get(ip) || []
  } catch (error) {
    console.error('Error getting conversation history:', error)
    return []
  }
}

// Clear conversation for IP (admin function)
export function clearConversation(ip: string): boolean {
  try {
    conversations.delete(ip)
    messageCounts.delete(ip)
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
    const today = getTodayString()
    
    let totalMessages = 0
    let activeToday = 0
    
    for (const [ip, messages] of conversations.entries()) {
      totalMessages += messages.length
      
      // Check if there are messages from today
      const hasTodayMessages = messages.some(msg => {
        const msgDate = new Date(msg.timestamp).toISOString().split('T')[0]
        return msgDate === today
      })
      
      if (hasTodayMessages) {
        activeToday++
      }
    }
    
    return {
      totalConversations: conversations.size,
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
