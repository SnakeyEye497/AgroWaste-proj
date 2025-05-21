import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

function Chatbot() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: t('chatbot.welcome'), 
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Update welcome message when language changes
  useEffect(() => {
    setMessages(prev => [
      { 
        id: 1, 
        text: t('chatbot.welcome'), 
        sender: 'bot',
        timestamp: new Date()
      },
      ...prev.slice(1)
    ]);
  }, [i18n.language, t]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    try {
      // Call API for bot response
      const response = await api.post('/chatbot', { 
        message: inputValue,
        language: i18n.language
      });
      
      // Add bot response
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          text: response.data.message || t('chatbot.fallback'),
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000); // Simulate typing delay
      
    } catch (error) {
      console.error('Chatbot error:', error);
      
      // Add fallback bot response
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          text: t('chatbot.error'),
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);
    }
  };

  // Format timestamp
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chatbot toggle button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-green-600 text-white rounded-full p-4 shadow-lg z-50 hover:bg-green-700 focus:outline-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChatbot}
        aria-label={isOpen ? t('chatbot.close') : t('chatbot.open')}
      >
        {isOpen ? <FaTimes size={24} /> : <FaRobot size={24} />}
      </motion.button>
      
      {/* Chatbot window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-xl z-50 flex flex-col"
            style={{ height: '500px', maxHeight: 'calc(100vh - 120px)' }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {/* Chatbot header */}
            <div className="bg-green-600 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center">
                <FaRobot className="mr-2" />
                <h3 className="font-medium">{t('chatbot.title')}</h3>
              </div>
              <button 
                onClick={toggleChatbot}
                className="text-white hover:text-gray-200 focus:outline-none"
                aria-label={t('chatbot.close')}
              >
                <FaTimes />
              </button>
            </div>
            
            {/* Messages container */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3/4 rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-green-100' : 'text-gray-500'}`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="mb-4 flex justify-start">
                  <div className="bg-white text-gray-800 rounded-lg px-4 py-2 border border-gray-200">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input form */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 bg-white rounded-b-lg">
              <div className="flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder={t('chatbot.placeholder')}
                  className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white rounded-r-lg px-4 py-2 hover:bg-green-700 focus:outline-none disabled:bg-green-400"
                  disabled={!inputValue.trim() || isTyping}
                >
                  {isTyping ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Chatbot; 