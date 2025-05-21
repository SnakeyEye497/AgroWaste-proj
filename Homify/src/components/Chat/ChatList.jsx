import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaPlus, FaSpinner } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import ChatListItem from './ChatListItem';
import NewChatModal from './NewChatModal';

function ChatList({ onSelectChat, selectedChatId }) {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  
  useEffect(() => {
    fetchChats();
  }, []);
  
  const fetchChats = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/chats');
      setChats(response.data);
    } catch (error) {
      console.error('Error fetching chats:', error);
      // For demo, add mock chats
      const mockChats = generateMockChats();
      setChats(mockChats);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredChats = chats.filter(chat => {
    if (!searchTerm) return true;
    
    const otherParticipant = chat.participants.find(p => p.id !== currentUser.id);
    return otherParticipant?.name?.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  const handleNewChat = (chat) => {
    setChats(prev => [chat, ...prev]);
    onSelectChat(chat);
    setShowNewChatModal(false);
  };
  
  // Generate mock chats for demo
  const generateMockChats = () => {
    const roles = currentUser.role === 'farmer' ? ['buyer'] : ['farmer'];
    
    return Array.from({ length: 5 }, (_, i) => ({
      id: `chat-${i}`,
      participants: [
        {
          id: currentUser.id,
          name: currentUser.name,
          role: currentUser.role
        },
        {
          id: `user-${i}`,
          name: `${roles[0].charAt(0).toUpperCase() + roles[0].slice(1)} ${i + 1}`,
          role: roles[0]
        }
      ],
      lastMessage: i < 4 ? {
        id: `msg-${i}`,
        chatId: `chat-${i}`,
        senderId: i % 2 === 0 ? currentUser.id : `user-${i}`,
        content: `This is a sample message ${i + 1}`,
        timestamp: new Date(Date.now() - i * 3600000),
        status: 'read'
      } : null,
      unreadCount: i === 1 ? 3 : 0
    }));
  };
  
  // Animation variants
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.08
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };
  
  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <motion.div 
        className="p-4 border-b border-gray-200 flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        <h2 className="text-lg font-semibold text-gray-800">{t('chat.conversations')}</h2>
        <motion.button
          onClick={() => setShowNewChatModal(true)}
          className="bg-green-500 text-white rounded-full p-2 hover:bg-green-600 focus:outline-none"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <FaPlus />
        </motion.button>
      </motion.div>
      
      {/* Search */}
      <motion.div 
        className="p-4 border-b border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder={t('chat.searchPlaceholder')}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </motion.div>
      
      {/* Chat list */}
      <motion.div 
        className="flex-1 overflow-y-auto"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <motion.div 
              className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            ></motion.div>
          </div>
        ) : filteredChats.length > 0 ? (
          filteredChats.map(chat => (
            <motion.div
              key={chat.id}
              variants={itemVariants}
            >
              <ChatListItem
                chat={chat}
                isSelected={chat.id === selectedChatId}
                currentUserId={currentUser.id}
                onClick={() => onSelectChat(chat)}
              />
            </motion.div>
          ))
        ) : (
          <motion.div 
            className="flex flex-col items-center justify-center h-32 text-gray-500"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            <p>{searchTerm ? t('chat.noResults') : t('chat.noConversations')}</p>
            {!searchTerm && (
              <motion.button
                onClick={() => setShowNewChatModal(true)}
                className="mt-2 text-green-600 hover:underline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('chat.startNewChat')}
              </motion.button>
            )}
          </motion.div>
        )}
      </motion.div>
      
      {/* New chat modal */}
      <AnimatePresence>
        {showNewChatModal && (
          <NewChatModal
            onClose={() => setShowNewChatModal(false)}
            onCreateChat={handleNewChat}
            currentUser={currentUser}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChatList; 