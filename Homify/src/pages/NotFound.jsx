import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <FaExclamationTriangle className="text-yellow-500 text-6xl" />
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">404 - Page Not Found</h1>
          <p className="text-gray-600 text-center mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="flex justify-center">
            <Link
              to="/"
              className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Go to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default NotFound; 