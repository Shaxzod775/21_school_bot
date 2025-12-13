import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, Send } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import './AiChat.css'

export default function AiChat({ isOpen, onClose }) {
  const { t } = useLanguage()
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // Initialize with greeting when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 1,
        type: 'bot',
        text: t('aiChat.greeting')
      }])
    }
  }, [isOpen, t])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputValue.trim()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = t('aiChat.responses')

      const botMessage = {
        id: Date.now(),
        type: 'bot',
        text: responses[Math.floor(Math.random() * responses.length)]
      }

      setIsTyping(false)
      setMessages(prev => [...prev, botMessage])
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickQuestions = t('aiChat.quickQuestions')

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="ai-chat-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="ai-chat-window"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="ai-chat-header">
              <div className="ai-chat-header-info">
                <div className="ai-avatar">
                  <Bot size={22} />
                </div>
                <div className="ai-header-text">
                  <span className="ai-name">{t('aiChat.title')}</span>
                  <span className="ai-status">
                    <span className="status-dot"></span>
                    {t('aiChat.online')}
                  </span>
                </div>
              </div>
              <button className="ai-close-btn" onClick={onClose}>
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="ai-chat-messages">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`ai-message ${msg.type}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {msg.type === 'bot' && (
                    <span className="message-avatar">
                      <Bot size={16} />
                    </span>
                  )}
                  <div className="message-bubble">{msg.text}</div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="ai-message bot"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span className="message-avatar">
                    <Bot size={16} />
                  </span>
                  <div className="message-bubble typing">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 2 && (
              <div className="ai-quick-questions">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    className="quick-question-btn"
                    onClick={() => {
                      setInputValue(q)
                      setTimeout(() => handleSend(), 100)
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="ai-chat-input">
              <input
                type="text"
                placeholder={t('aiChat.placeholder')}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                className="ai-send-btn"
                onClick={handleSend}
                disabled={!inputValue.trim()}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
