import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaTimes, FaSpinner } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';

function NewChatModal({ onClose, onCreateChat, currentUser }) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (searchTerm.length >= 2) {
      searchUsers();
    } else {
      setUsers([]);
    }
  }, [searchTerm]);
  
  const searchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/users/search', {
        params: { query: searchTerm, role: currentUser.role === 'farmer' ? 'buyer' : 'farmer' }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
      // For demo, add mock users
      const mockUsers = generateMockUsers(searchTerm, 5);
      setUsers(mockUsers);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleSelectUser = async (user) => {
    try {
      const response = await api.post('/chats', {
        participantId: user.id
      });
      onCreateChat(response.data);
    } catch (error) {
      console.error('Error creating chat:', error);
      // For demo, create a mock chat
      const mockChat = {
        id: `new-chat-${Date.now()}`,
        participants: [
          {
            id: currentUser.id,
            name: currentUser.name,
            role: currentUser.role
          },
          {
            id: user.id,
            name: user.name,
            role: user.role
          }
        ],
        lastMessage: null,
        unreadCount: 0
      };
      onCreateChat(mockChat);
    }
  };
  
  // Generate mock users for demo
  const generateMockUsers = (query, count) => {
    const otherRole = currentUser.role === 'farmer' ? 'buyer' : 'farmer';
    
    return Array.from({ length: count }, (_, i) => ({
      id: `user-search-${i}`,
      name: `${otherRole.charAt(0).toUpperCase() + otherRole.slice(1)} ${query} ${i + 1}`,
      role: otherRole,
      location: `Location ${i + 1}`
    }));
  };
  
  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        delay: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: 20,
      transition: { duration: 0.2 }
    }
  };
  
  const listItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };
  
  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };
  
  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden"
        variants={modalVariants}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">{t('chat.newConversation')}</h3>
          <motion.button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FaTimes />
          </motion.button>
        </div>
        
        <div className="p-4">
          <div className="relative mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder={t('chat.searchUsers')}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              autoFocus
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <motion.div 
            className="max-h-60 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {isLoading ? (
              <div className="flex justify-center items-center h-20">
                <motion.div 
                  className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                ></motion.div>
              </div>
            ) : users.length > 0 ? (
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.07
                    }
                  }
                }}
              >
                {users.map(user => (
                  <motion.li key={user.id} variants={listItemVariants}>
                    <motion.button
                      onClick={() => handleSelectUser(user)}
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center"
                      whileHover={{ backgroundColor: 'rgba(249, 250, 251, 1)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div 
                        className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold mr-3"
                        whileHover={{ scale: 1.05 }}
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </motion.div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">
                          {user.role === 'farmer' ? t('chat.farmer') : t('chat.buyer')}
                          {user.location && ` • ${user.location}`}
                        </p>
                      </div>
                    </motion.button>
                  </motion.li>
                ))}
              </motion.ul>
            ) : searchTerm.length >= 2 ? (
              <motion.p 
                className="text-center text-gray-500 py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {t('chat.noUsersFound')}
              </motion.p>
            ) : (
              <motion.p 
                className="text-center text-gray-500 py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {t('chat.typeToSearch')}
              </motion.p>
            )}
          </motion.div>
        </div>
        
        <motion.div 
          className="p-4 border-t flex justify-end"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg mr-2"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {t('common.cancel')}
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default NewChatModal; 