import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

function ChatListItem({ chat, isSelected, currentUserId, onClick }) {
  const { t } = useTranslation();
  
  const otherParticipant = chat.participants.find(p => p.id !== currentUserId);
  
  // Format timestamp
  const formatTime = (date) => {
    const messageDate = new Date(date);
    const today = new Date();
    
    if (
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (
      messageDate.getDate() === yesterday.getDate() &&
      messageDate.getMonth() === yesterday.getMonth() &&
      messageDate.getFullYear() === yesterday.getFullYear()
    ) {
      return t('chat.yesterday');
    }
    
    return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };
  
  // Truncate message
  const truncateMessage = (message, maxLength = 30) => {
    if (!message) return '';
    return message.length > maxLength
      ? message.substring(0, maxLength) + '...'
      : message;
  };
  
  return (
    <motion.div
      onClick={onClick}
      className={`p-3 border-b flex items-center cursor-pointer hover:bg-gray-50 ${
        isSelected ? 'bg-green-50' : ''
      }`}
      whileHover={{ backgroundColor: isSelected ? 'rgba(236, 253, 245, 1)' : 'rgba(249, 250, 251, 1)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {/* Avatar with animation */}
      <motion.div 
        className="h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold mr-3 shadow-sm"
        whileHover={{ scale: 1.05, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {otherParticipant?.name?.charAt(0).toUpperCase() || '?'}
      </motion.div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <motion.h3 
            className="font-medium text-gray-900 truncate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {otherParticipant?.name || t('chat.unknownUser')}
          </motion.h3>
          {chat.lastMessage && (
            <motion.span 
              className="text-xs text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {formatTime(chat.lastMessage.timestamp)}
            </motion.span>
          )}
        </div>
        
        <div className="flex items-center">
          <motion.p 
            className="text-sm text-gray-600 truncate flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {chat.lastMessage ? (
              <>
                {chat.lastMessage.senderId === currentUserId && (
                  <span className="text-gray-400 mr-1">{t('chat.you')}:</span>
                )}
                {truncateMessage(chat.lastMessage.content)}
              </>
            ) : (
              <span className="text-gray-400 italic">{t('chat.noMessages')}</span>
            )}
          </motion.p>
          
          {chat.unreadCount > 0 && (
            <motion.span 
              className="ml-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {chat.unreadCount}
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ChatListItem; 