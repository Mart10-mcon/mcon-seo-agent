import React from 'react'
import { MessageSquare, Loader2 } from 'lucide-react'

const ChatFAB = ({ onClick, unreadCount = 0, isProcessing = false }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Open workflow chat"
      className={`
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full
        bg-gradient-to-br from-primary to-primary-dark
        text-white shadow-lg hover:shadow-xl
        transition-all duration-300 ease-out
        hover:scale-105 active:scale-95
        focus:outline-none focus:ring-4 focus:ring-primary/30
        flex items-center justify-center
        ${isProcessing ? 'animate-pulse' : ''}
      `}
    >
      {isProcessing ? (
        <Loader2 className="w-6 h-6 animate-spin" />
      ) : (
        <MessageSquare className="w-6 h-6" />
      )}

      {/* Unread Badge */}
      {unreadCount > 0 && !isProcessing && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  )
}

export default ChatFAB
