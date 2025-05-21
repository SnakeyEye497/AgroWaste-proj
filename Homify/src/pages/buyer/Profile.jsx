// import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { motion } from 'framer-motion';
// import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding, FaEdit, FaCamera, FaTimes } from 'react-icons/fa';
// import { useAuth } from '../../contexts/AuthContext';

// function Profile() {
//   const { t } = useTranslation();
//   const { currentUser } = useAuth();
//   const [isEditing, setIsEditing] = useState(false);
//   const [profileImage, setProfileImage] = useState(currentUser?.profileImage || null);
//   const [tempImage, setTempImage] = useState(null);
//   const [formData, setFormData] = useState({
//     name: currentUser?.name || '',
//     email: currentUser?.email || '',
//     phone: currentUser?.phone || '',
//     address: currentUser?.address || '',
//     companyName: currentUser?.companyName || '',
//     companyDescription: currentUser?.companyDescription || '',
//   });
  
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
  
//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const reader = new FileReader();
      
//       reader.onloadend = () => {
//         setTempImage(reader.result);
//       };
      
//       reader.readAsDataURL(file);
//     }
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       // Update profile logic would go here
//       // For demo, just update the state
//       if (tempImage) {
//         setProfileImage(tempImage);
//         setTempImage(null);
//       }
      
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };
  
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">{t('profile.title')}</h1>
      
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="md:flex">
//           <div className="md:w-1/3 bg-green-50 p-8 flex flex-col items-center">
//             <div className="relative mb-6">
//               <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-md">
//                 {isEditing && tempImage ? (
//                   <img src={tempImage} alt="Profile" className="w-full h-full object-cover" />
//                 ) : profileImage ? (
//                   <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center bg-green-100 text-green-600">
//                     <FaUser className="text-5xl" />
//                   </div>
//                 )}
//               </div>
              
//               {isEditing && (
//                 <div className="absolute bottom-0 right-0">
//                   <label htmlFor="profile-image" className="cursor-pointer bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
//                     <FaCamera />
//                     <input
//                       type="file"
//                       id="profile-image"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={handleImageChange}
//                     />
//                   </label>
//                 </div>
//               )}
              
//               {isEditing && tempImage && (
//                 <button
//                   onClick={() => setTempImage(null)}
//                   className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
//                 >
//                   <FaTimes />
//                 </button>
//               )}
//             </div>
            
//             <h2 className="text-2xl font-semibold text-gray-800 mb-2">{currentUser?.name}</h2>
//             <p className="text-green-600 font-medium mb-6">Buyer</p>
            
//             {!isEditing && (
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//               >
//                 <FaEdit className="mr-2" />
//                 {t('profile.edit')}
//               </button>
//             )}
//           </div>
          
//           <div className="md:w-2/3 p-8">
//             <h3 className="text-xl font-semibold mb-6">{t('profile.personalInfo')}</h3>
            
//             <form onSubmit={handleSubmit}>
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-gray-700 mb-2">{t('profile.name')}</label>
//                   {isEditing ? (
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                       required
//                     />
//                   ) : (
//                     <div className="flex items-center">
//                       <FaUser className="text-gray-500 mr-3" />
//                       <span>{formData.name || t('profile.notProvided')}</span>
//                     </div>
//                   )}
//                 </div>
                
//                 <div>
//                   <label className="block text-gray-700 mb-2">{t('profile.email')}</label>
//                   {isEditing ? (
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                       required
//                     />
//                   ) : (
//                     <div className="flex items-center">
//                       <FaEnvelope className="text-gray-500 mr-3" />
//                       <span>{formData.email || t('profile.notProvided')}</span>
//                     </div>
//                   )}
//                 </div>
                
//                 <div>
//                   <label className="block text-gray-700 mb-2">{t('profile.phone')}</label>
//                   {isEditing ? (
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="flex items-center">
//                       <FaPhone className="text-gray-500 mr-3" />
//                       <span>{formData.phone || t('profile.notProvided')}</span>
//                     </div>
//                   )}
//                 </div>
                
//                 <div>
//                   <label className="block text-gray-700 mb-2">{t('profile.address')}</label>
//                   {isEditing ? (
//                     <input
//                       type="text"
//                       name="address"
//                       value={formData.address}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="flex items-center">
//                       <FaMapMarkerAlt className="text-gray-500 mr-3" />
//                       <span>{formData.address || t('profile.notProvided')}</span>
//                     </div>
//                   )}
//                 </div>
                
//                 <div>
//                   <label className="block text-gray-700 mb-2">{t('profile.companyName')}</label>
//                   {isEditing ? (
//                     <input
//                       type="text"
//                       name="companyName"
//                       value={formData.companyName}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="flex items-center">
//                       <FaBuilding className="text-gray-500 mr-3" />
//                       <span>{formData.companyName || t('profile.notProvided')}</span>
//                     </div>
//                   )}
//                 </div>
                
//                 <div>
//                   <label className="block text-gray-700 mb-2">{t('profile.companyDescription')}</label>
//                   {isEditing ? (
//                     <textarea
//                       name="companyDescription"
//                       value={formData.companyDescription}
//                       onChange={handleInputChange}
//                       rows="4"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     ></textarea>
//                   ) : (
//                     <p className="text-gray-700">
//                       {formData.companyDescription || t('profile.notProvided')}
//                     </p>
//                   )}
//                 </div>
                
//                 {isEditing && (
//                   <div className="flex space-x-4 pt-4">
//                     <button
//                       type="submit"
//                       className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//                     >
//                       {t('profile.save')}
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setIsEditing(false)}
//                       className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
//                     >
//                       {t('profile.cancel')}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile; 


import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding, FaEdit, FaCamera, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

function Profile() {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(currentUser?.profileImage || null);
  const [tempImage, setTempImage] = useState(null);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    companyName: currentUser?.companyName || '',
    companyDescription: currentUser?.companyDescription || '',
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setTempImage(reader.result);
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Update profile logic would go here
      // For demo, just update the state
      if (tempImage) {
        setProfileImage(tempImage);
        setTempImage(null);
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('profile.title')}</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-green-50 p-8 flex flex-col items-center">
            <div className="relative mb-6">
              <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-md">
                {isEditing && tempImage ? (
                  <img src={tempImage} alt="Profile" className="w-full h-full object-cover" />
                ) : profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-green-100 text-green-600">
                    <FaUser className="text-5xl" />
                  </div>
                )}
              </div>
              
              {isEditing && (
                <div className="absolute bottom-0 right-0">
                  <label htmlFor="profile-image" className="cursor-pointer bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                    <FaCamera />
                    <input
                      type="file"
                      id="profile-image"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              )}
              
              {isEditing && tempImage && (
                <button
                  onClick={() => setTempImage(null)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
                >
                  <FaTimes />
                </button>
              )}
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{currentUser?.name}</h2>
            <p className="text-green-600 font-medium mb-6">Buyer</p>
            
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <FaEdit className="mr-2" />
                {t('profile.edit')}
              </button>
            )}
          </div>
          
          <div className="md:w-2/3 p-8">
            <h3 className="text-xl font-semibold mb-6">{t('profile.personalInfo')}</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">{t('profile.name')}</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  ) : (
                    <div className="flex items-center">
                      <FaUser className="text-gray-500 mr-3" />
                      <span>{formData.name || t('profile.notProvided')}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">{t('profile.email')}</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  ) : (
                    <div className="flex items-center">
                      <FaEnvelope className="text-gray-500 mr-3" />
                      <span>{formData.email || t('profile.notProvided')}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">{t('profile.phone')}</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center">
                      <FaPhone className="text-gray-500 mr-3" />
                      <span>{formData.phone || t('profile.notProvided')}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">{t('profile.address')}</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-gray-500 mr-3" />
                      <span>{formData.address || t('profile.notProvided')}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">{t('profile.companyName')}</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center">
                      <FaBuilding className="text-gray-500 mr-3" />
                      <span>{formData.companyName || t('profile.notProvided')}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">{t('profile.companyDescription')}</label>
                  {isEditing ? (
                    <textarea
                      name="companyDescription"
                      value={formData.companyDescription}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    ></textarea>
                  ) : (
                    <p className="text-gray-700">
                      {formData.companyDescription || t('profile.notProvided')}
                    </p>
                  )}
                </div>
                
                {isEditing && (
                  <div className="flex space-x-4 pt-4">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      {t('profile.save')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                      {t('profile.cancel')}
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile; 