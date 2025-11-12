'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle } from 'lucide-react'
import ChatResume from './ChatResume'

export default function ChatResumeSidebar() {
  const [isOpen, setIsOpen] = useState(false)

  // Close sidebar on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  return (
    <>
      {/* Floating Button to Open Sidebar */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-40 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-4 rounded-full shadow-2xl border border-white/30 flex items-center justify-center transition-all duration-300 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <MessageCircle className="w-6 h-6" />
          <span className="ml-2 font-semibold hidden sm:inline">Resume Chatbot</span>
        </motion.button>
      )}

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[500px] lg:w-[600px] bg-white shadow-2xl z-50 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Chat Content */}
              <div className="flex-1 flex flex-col overflow-hidden">
                <ChatResume isSidebar={true} onClose={() => setIsOpen(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

