import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FaPaperPlane, FaSpinner, FaEllipsisV, FaArrowLeft, 
  FaFileAlt, FaImage, FaSmile, FaPaperclip, FaMicrophone, FaTimes, FaArrowDown, FaComments, FaUser 
} from 'react-icons/fa';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import ChatMessage from './ChatMessage';

function ChatInterface({ selectedChat, onBack }) {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Load initial messages
  useEffect(() => {
    if (selectedChat) {
      setMessages([]);
      setPage(1);
      setHasMore(true);
      loadMessages(1);
    }
  }, [selectedChat]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (messages.length > 0 && page === 1) {
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMessages = async (pageNum) => {
    if (!selectedChat || isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await api.get(`/chats/${selectedChat.id}/messages`, {
        params: { page: pageNum, limit: 20 }
      });
      
      // For demo, generate mock messages if API returns empty
      let newMessages = response.data.messages || [];
      if (newMessages.length === 0 && pageNum === 1) {
        newMessages = generateMockMessages(selectedChat.id, 10);
      }
      
      if (pageNum === 1) {
        setMessages(newMessages);
      } else {
        setMessages(prev => [...newMessages, ...prev]);
      }
      
      setHasMore(newMessages.length === 20);
    } catch (error) {
      console.error('Error loading messages:', error);
      // For demo, generate mock messages
      if (pageNum === 1) {
        const mockMessages = generateMockMessages(selectedChat.id, 10);
        setMessages(mockMessages);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    
    setShowScrollButton(!isNearBottom);
  };

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if ((!inputValue.trim() && !selectedFile) || !selectedChat || isSending) return;
    
    const newMessage = {
      id: `temp-${Date.now()}`,
      chatId: selectedChat.id,
      senderId: currentUser.id,
      content: inputValue.trim(),
      attachment: selectedFile ? {
        name: selectedFile.name,
        type: selectedFile.type,
        url: URL.createObjectURL(selectedFile)
      } : null,
      timestamp: new Date(),
      status: 'sending'
    };
    
    // Add message to state immediately
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setSelectedFile(null);
    scrollToBottom();
    
    setIsSending(true);
    try {
      // Send message to server
      const formData = new FormData();
      if (inputValue.trim()) {
        formData.append('content', inputValue.trim());
      }
      if (selectedFile) {
        formData.append('file', selectedFile);
      }
      
      const response = await api.post(`/chats/${selectedChat.id}/messages`, formData);
      
      // Update message status
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...response.data, status: 'sent' } : msg
        )
      );
    } catch (error) {
      console.error('Error sending message:', error);
      // Update message status to error
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'error' } : msg
        )
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAttachClick = () => {
    setShowAttachMenu(!showAttachMenu);
  };

  const handleEmojiClick = () => {
    setShowEmoji(!showEmoji);
  };

  const handleImageAttach = () => {
    fileInputRef.current.accept = 'image/*';
    fileInputRef.current.click();
    setShowAttachMenu(false);
  };

  const handleDocumentAttach = () => {
    // Implementation for document attachment
    console.log('Document attach clicked');
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Generate mock messages for demo
  const generateMockMessages = (chatId, count) => {
    const otherParticipant = selectedChat.participants.find(p => p.id !== currentUser.id);
    
    return Array.from({ length: count }, (_, i) => {
      const isCurrentUser = i % 2 === 0;
      const date = new Date();
      date.setMinutes(date.getMinutes() - (count - i) * 5);
      
      return {
        id: `msg-${i}`,
        chatId,
        senderId: isCurrentUser ? currentUser.id : otherParticipant.id,
        content: isCurrentUser 
          ? `This is a sample message from you (${i + 1})`
          : `This is a sample reply from ${otherParticipant.name} (${i + 1})`,
        timestamp: date,
        status: 'sent'
      };
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };
  
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };
  
  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24, delay: 0.2 }
    }
  };
  
  const attachMenuVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 10,
      transition: { duration: 0.2 }
    }
  };
  
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const otherParticipant = selectedChat?.participants.find(p => p.id !== currentUser?.id);

  const TypingIndicator = () => {
    return (
      <motion.div 
        className="flex items-center space-x-1 p-2 rounded-full bg-gray-100 w-16 ml-2 mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
      >
        <motion.div 
          className="w-2 h-2 rounded-full bg-gray-400"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
        />
        <motion.div 
          className="w-2 h-2 rounded-full bg-gray-400"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.div 
          className="w-2 h-2 rounded-full bg-gray-400"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0.4 }}
        />
      </motion.div>
    );
  };

  const MessageDateSeparator = ({ date }) => {
    return (
      <motion.div 
        className="flex justify-center my-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="px-4 py-1 bg-gray-100 rounded-full text-xs text-gray-500"
          whileHover={{ scale: 1.05, backgroundColor: "#e5e7eb" }}
        >
          {date}
        </motion.div>
      </motion.div>
    );
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Fix for the currentDate not defined error
  const formatMessageDate = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    
    // Check if the message is from today
    if (messageDate.toDateString() === today.toDateString()) {
      return t('chat.today');
    }
    
    // Check if the message is from yesterday
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return t('chat.yesterday');
    }
    
    // Otherwise, return the formatted date
    return messageDate.toLocaleDateString();
  };

  return (
    <AnimatePresence>
      {selectedChat && (
        <motion.div
          className="fixed inset-0 bg-white z-50 flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Chat header */}
          <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-3 text-gray-500 hover:text-gray-700"
              >
                <FaArrowLeft />
              </button>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-3">
                  <FaUser />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {selectedChat.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {isTyping ? t('chat.typing') : selectedChat.lastSeen ? `${t('chat.lastSeen')} ${formatMessageDate(selectedChat.lastSeen)}` : ''}
                  </p>
                </div>
              </div>
            </div>
            <button
              className="text-gray-500 hover:text-gray-700"
            >
              <FaEllipsisV />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-4 bg-gray-50">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : (
              <>
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <p>{t('chat.noMessages')}</p>
                    <p className="text-sm">{t('chat.startNewChat')}</p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`mb-4 flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.senderId !== currentUser.id && (
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-2 flex-shrink-0">
                          <FaUser />
                        </div>
                      )}
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          msg.senderId === currentUser.id
                            ? 'bg-green-600 text-white'
                            : 'bg-white border border-gray-200 text-gray-800'
                        }`}
                      >
                        {msg.senderId !== currentUser.id && (
                          <p className="text-xs font-medium mb-1">{otherParticipant?.name}</p>
                        )}
                        <p>{msg.content}</p>
                        <p className={`text-xs mt-1 ${msg.senderId === currentUser.id ? 'text-green-100' : 'text-gray-500'}`}>
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
          
          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 flex items-center">
            <div className="flex space-x-2 mr-2">
              <button
                type="button"
                onClick={handleAttachClick}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaImage />
              </button>
              <button
                type="button"
                onClick={handleDocumentAttach}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaFileAlt />
              </button>
              <button
                type="button"
                onClick={handleEmojiClick}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaSmile />
              </button>
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={t('chat.typingPlaceholder')}
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() && !selectedFile}
              className="ml-2 bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-50"
            >
              <FaPaperPlane />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ChatInterface; 