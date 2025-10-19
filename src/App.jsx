import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Layout from './components/Layout'
import ChatWindow from './components/ChatWindow'
import ChatFAB from './components/ChatFAB'

function App() {
  const [selectedTool, setSelectedTool] = useState(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [unreadMessages, setUnreadMessages] = useState(0)

  // Keyboard shortcuts for chat
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + K to toggle chat
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsChatOpen(prev => !prev)
      }
      // Escape to close chat
      if (e.key === 'Escape' && isChatOpen) {
        setIsChatOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isChatOpen])

  // Handle tool launch - opens chat automatically
  const handleToolLaunch = (toolId) => {
    setSelectedTool(toolId)
    setIsChatOpen(true)
  }

  // Handle new messages
  const handleNewMessage = () => {
    if (!isChatOpen) {
      setUnreadMessages(prev => prev + 1)
    }
  }

  // Mark messages as read when chat opens
  const handleMessagesRead = () => {
    setUnreadMessages(0)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onChatToggle={() => setIsChatOpen(prev => !prev)}
          isChatOpen={isChatOpen}
          unreadMessages={unreadMessages}
        />

        <div className="flex-1 flex overflow-hidden relative">
          {/* Main content area with tools - Full width when chat closed */}
          <div className="flex-1 overflow-y-auto">
            <Layout onToolSelect={handleToolLaunch} selectedTool={selectedTool} />
          </div>

          {/* Slide-out Chat Panel */}
          <ChatWindow
            selectedTool={selectedTool}
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
            onNewMessage={handleNewMessage}
            onMessagesRead={handleMessagesRead}
          />
        </div>
      </div>

      {/* Floating Action Button - Only show when chat is closed */}
      {!isChatOpen && (
        <ChatFAB
          onClick={() => setIsChatOpen(true)}
          unreadCount={unreadMessages}
        />
      )}
    </div>
  )
}

export default App
