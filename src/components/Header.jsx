import React from 'react'
import { Infinity, MessageSquare } from 'lucide-react'

const Header = ({ onChatToggle, isChatOpen, unreadMessages = 0 }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Logo/Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">
            AI Ranking | SEO Tool
          </h1>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-4">
          {/* Chat Toggle Button (Desktop - Secondary access) */}
          <button
            onClick={onChatToggle}
            className="hidden lg:flex relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={isChatOpen ? "Close workflow chat" : "Open workflow chat"}
          >
            <MessageSquare className={`w-5 h-5 ${isChatOpen ? 'text-primary' : 'text-gray-600'}`} />
            {unreadMessages > 0 && !isChatOpen && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {unreadMessages > 9 ? '9+' : unreadMessages}
              </span>
            )}
          </button>

          {/* Unlimited badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
            <Infinity className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Unlimited</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
