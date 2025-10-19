import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader2, AlertCircle, X } from 'lucide-react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

const ChatWindow = ({
  selectedTool,
  isOpen,
  onClose,
  onNewMessage,
  onMessagesRead
}) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'system',
      content: 'Hi! I\'m your AI assistant for SEO workflows. Ask me anything about your SEO tools or get help with keyword research!',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Auto-focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Mark messages as read when chat opens
  useEffect(() => {
    if (isOpen) {
      onMessagesRead()
    }
  }, [isOpen, onMessagesRead])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (selectedTool) {
      const newMessage = {
        id: Date.now(),
        type: 'system',
        content: `Tool selected: ${selectedTool}. Ready to run workflows!`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, newMessage])
      if (onNewMessage && !isOpen) {
        onNewMessage()
      }
    }
  }, [selectedTool, isOpen, onNewMessage])

  const triggerN8NWorkflow = async (message) => {
    try {
      setIsLoading(true)

      // Get webhook URL from environment variable
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL

      if (!webhookUrl) {
        throw new Error('N8N webhook URL not configured. Please add VITE_N8N_WEBHOOK_URL to environment variables.')
      }

      // Send GET request with message as query parameter
      // (n8n webhook is configured for GET requests)
      const response = await axios.get(
        webhookUrl,
        {
          params: {
            message: message
          },
          timeout: 30000, // 30 second timeout for AI responses
        }
      )

      // Handle AI response from n8n
      const aiResponse = response.data

      // Support various response formats from n8n
      let aiContent = ''
      if (typeof aiResponse === 'string') {
        aiContent = aiResponse
      } else if (aiResponse.text) {
        aiContent = aiResponse.text
      } else if (aiResponse.response) {
        aiContent = aiResponse.response
      } else if (aiResponse.message) {
        aiContent = aiResponse.message
      } else if (aiResponse.output) {
        aiContent = aiResponse.output
      } else {
        aiContent = JSON.stringify(aiResponse, null, 2)
      }

      const aiMessage = {
        id: Date.now(),
        type: 'system',
        content: aiContent,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      if (onNewMessage) onNewMessage()
    } catch (error) {
      let errorContent = 'Failed to get AI response. '

      if (error.code === 'ECONNABORTED') {
        errorContent += 'Request timed out. The AI is taking too long to respond.'
      } else if (error.response) {
        errorContent += `Server error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`
      } else if (error.request) {
        errorContent += 'No response from server. Please check your internet connection and n8n webhook URL.'
      } else {
        errorContent += error.message
      }

      const errorMessage = {
        id: Date.now(),
        type: 'error',
        content: errorContent,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
      if (onNewMessage) onNewMessage()
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()

    if (!inputValue.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')

    // Trigger n8n workflow
    await triggerN8NWorkflow(inputValue)
  }

  const Message = ({ message }) => {
    const isUser = message.type === 'user'
    const isSystem = message.type === 'system'
    const isError = message.type === 'error'

    return (
      <div className={`flex gap-3 mb-4 ${isUser ? 'flex-row-reverse' : ''}`}>
        {/* Avatar */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser
              ? 'bg-primary text-white'
              : isError
              ? 'bg-red-100 text-red-600'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {isUser ? <User className="w-4 h-4" /> : isError ? <AlertCircle className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>

        {/* Message Content */}
        <div className={`flex-1 ${isUser ? 'text-right' : ''}`}>
          <div
            className={`inline-block max-w-[85%] rounded-lg px-4 py-2.5 ${
              isUser
                ? 'bg-primary text-white'
                : isError
                ? 'bg-red-50 text-red-900 border border-red-200'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            {isUser ? (
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            ) : (
              <div className="text-sm prose prose-sm max-w-none prose-headings:mt-3 prose-headings:mb-2 prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-table:my-2">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            )}
          </div>
          <div className="text-xs text-gray-500 mt-1 px-1">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Backdrop (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Chat Panel */}
      <div
        id="chat-panel"
        role="dialog"
        aria-label="Workflow chat"
        className={`
          fixed lg:absolute top-0 right-0 h-full w-full lg:w-[480px]
          bg-white shadow-2xl lg:shadow-xl border-l border-gray-200
          transform transition-transform duration-300 ease-out
          z-50 flex flex-col
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Powered by n8n SEO workflows
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50 scrollbar-thin">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}

          {isLoading && (
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Loader2 className="w-4 h-4 text-primary animate-spin" />
              </div>
              <div className="bg-primary/10 rounded-lg px-4 py-2.5">
                <p className="text-sm text-primary font-medium">AI is thinking...</p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a command or message..."
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-shadow"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>

          {/* Quick Tip */}
          <p className="text-xs text-gray-500 mt-2">
            Press <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">Esc</kbd> to close • <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">Ctrl+K</kbd> to toggle
          </p>
        </div>
      </div>
    </>
  )
}

export default ChatWindow
