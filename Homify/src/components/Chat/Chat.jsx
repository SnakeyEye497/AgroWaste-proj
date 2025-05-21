import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaComments, FaTimes, FaRegPaperPlane } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ChatList from './ChatList';
import ChatInterface from './ChatInterface';

function Chat() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showChatList, setShowChatList] = useState(true);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [newMessageCount, setNewMessageCount] = useState(0);
  
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowChatList(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSelectedChat(null);
      setShowChatList(true);
    }
  };
  
  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    if (isMobile) {
      setShowChatList(false);
    }
  };
  
  const handleBackToList = () => {
    setShowChatList(true);
  };
  
  // Button animation variants
  const buttonVariants = {
    hover: { 
      scale: 1.1,
      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };
  
  // Chat window animation variants
  const chatWindowVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: 50, 
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };
  
  // Chat panel animation variants
  const panelVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }
  };
  
  // Pulse animation for the chat button
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    boxShadow: [
      "0px 0px 0px rgba(0, 0, 0, 0.2)",
      "0px 0px 8px rgba(0, 0, 0, 0.2)",
      "0px 0px 0px rgba(0, 0, 0, 0.2)"
    ]
  };
  
  return (
    <>
      {/* Chat button with animation */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full p-4 shadow-lg hover:from-green-600 hover:to-green-700 focus:outline-none z-40"
        aria-label={isOpen ? t('chat.closeChat') : t('chat.openChat')}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        animate={hasNewMessages && !isOpen ? pulseAnimation : {}}
        transition={hasNewMessages && !isOpen ? { 
          repeat: Infinity, 
          duration: 2,
          repeatType: "loop" 
        } : {}}
      >
        {isOpen ? <FaTimes size={20} /> : <FaComments size={20} />}
        {hasNewMessages && !isOpen && (
          <motion.span 
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            {newMessageCount}
          </motion.span>
        )}
      </motion.button>
      
      {/* Chat window with enhanced animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={chatWindowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-20 right-6 w-full sm:w-96 md:w-[700px] h-[500px] bg-white rounded-lg shadow-2xl overflow-hidden z-40 flex"
            style={{ 
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              border: "1px solid rgba(229, 231, 235, 1)"
            }}
          >
            {/* Chat list with animation */}
            <AnimatePresence mode="wait">
              {(!isMobile || showChatList) && (
                <motion.div
                  key="chatlist"
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
                  className="w-full md:w-1/3 h-full border-r border-gray-200"
                >
                  <ChatList 
                    onSelectChat={handleSelectChat} 
                    selectedChatId={selectedChat?.id}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Chat interface with animation */}
            <AnimatePresence mode="wait">
              {(!isMobile || !showChatList) && (
                <motion.div
                  key="chatinterface"
                  variants={panelVariants}
                  initial={isMobile ? { opacity: 0, x: 50 } : "hidden"}
                  animate="visible"
                  exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
                  className="w-full md:w-2/3 h-full"
                >
                  <ChatInterface 
                    selectedChat={selectedChat} 
                    onBack={handleBackToList}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Chat; 