import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTractor, FaEdit, FaCamera } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

function Profile() {
  const { t } = useTranslation();
  const { currentUser, updateProfile } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    farmSize: currentUser?.farmSize || '',
    crops: currentUser?.crops || [],
    bio: currentUser?.bio || '',
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implementation would go here
    setIsEditing(false);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        {t('farmer.profile')}
      </h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {t('profile.personalInfo')}
            </h2>
            {!isEditing && (
              <motion.button
                onClick={() => setIsEditing(true)}
                className="flex items-center text-green-600 hover:text-green-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEdit className="mr-1" />
                {t('common.edit')}
              </motion.button>
            )}
          </div>
          
          {successMessage && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
              {successMessage}
            </div>
          )}
          
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              {/* Form fields would go here */}
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {isLoading ? t('common.saving') : t('common.save')}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 flex-shrink-0 mr-4 bg-green-100 rounded-full flex items-center justify-center">
                  <FaUser className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('auth.name')}</p>
                  <p className="font-medium">{formData.name || '-'}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 flex-shrink-0 mr-4 bg-green-100 rounded-full flex items-center justify-center">
                  <FaEnvelope className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('auth.email')}</p>
                  <p className="font-medium">{formData.email || '-'}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 flex-shrink-0 mr-4 bg-green-100 rounded-full flex items-center justify-center">
                  <FaPhone className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('auth.phone')}</p>
                  <p className="font-medium">{formData.phone || '-'}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 flex-shrink-0 mr-4 bg-green-100 rounded-full flex items-center justify-center">
                  <FaMapMarkerAlt className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('auth.address')}</p>
                  <p className="font-medium">{formData.address || '-'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile; 