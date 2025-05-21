import React from 'react';
import { motion } from 'framer-motion';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

function ChatMessage({ message, formatTime }) {
  const { currentUser } = useAuth();
  const isFromCurrentUser = message.senderId === currentUser?.id;

  return (
    <motion.div
      className={`mb-4 flex ${isFromCurrentUser ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {!isFromCurrentUser && (
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-2 flex-shrink-0">
          <FaUser className="text-sm" />
        </div>
      )}
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isFromCurrentUser
            ? 'bg-green-600 text-white'
            : 'bg-white border border-gray-200 text-gray-800'
        }`}
      >
        {message.content}
        <p className={`text-xs mt-1 ${isFromCurrentUser ? 'text-green-100' : 'text-gray-500'}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </motion.div>
  );
}

export default ChatMessage; 