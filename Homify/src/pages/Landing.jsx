import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaLeaf, FaRecycle, FaHandshake, FaArrowRight } from 'react-icons/fa';

function Landing() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {t('app.name')}
              </motion.h1>
              <motion.p 
                className="text-xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {t('app.tagline')}
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link to="/register" className="bg-white text-green-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium flex items-center justify-center">
                  {t('auth.register')}
                  <FaArrowRight className="ml-2" />
                </Link>
                <Link to="/login" className="border border-white text-white hover:bg-white hover:text-green-700 px-6 py-3 rounded-lg font-medium flex items-center justify-center">
                  {t('auth.login')}
                </Link>
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.img 
                src="/images/hero-image.svg" 
                alt="Agricultural waste management" 
                className="w-full h-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('landing.features.title')}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
              <FaLeaf className="text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('landing.features.sustainable.title')}</h3>
            <p className="text-gray-600">{t('landing.features.sustainable.description')}</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
              <FaRecycle className="text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('landing.features.circular.title')}</h3>
            <p className="text-gray-600">{t('landing.features.circular.description')}</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
              <FaHandshake className="text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('landing.features.connect.title')}</h3>
            <p className="text-gray-600">{t('landing.features.connect.description')}</p>
          </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">
                {t('footer.copyright', { year: new Date().getFullYear() })}
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-sm hover:text-green-400">{t('footer.privacy')}</a>
              <a href="#" className="text-sm hover:text-green-400">{t('footer.terms')}</a>
              <a href="#" className="text-sm hover:text-green-400">{t('footer.contact')}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing; 