// import React, { useState } from 'react';
// import { Outlet, NavLink, useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { motion } from 'framer-motion';
// import { 
//   FaHome, FaShoppingBasket, FaExchangeAlt, FaTruck,
//   FaUser, FaSignOutAlt, FaBars, FaTimes, FaGlobe 
// } from 'react-icons/fa';
// import { useAuth } from '../contexts/AuthContext';
// import PageTransition from '../components/PageTransition';
// import LanguageSwitcher from '../components/LanguageSwitcher';

// function BuyerLayout() {
//   const { t } = useTranslation();
//   const { currentUser, logout } = useAuth();
//   const navigate = useNavigate();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
//   const handleLogout = async () => {
//     try {
//       navigate('/login');
//     } catch (error) {
//       console.error('Failed to log out', error);
//     }
//   };
  
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };
  
//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Sidebar for desktop */}
//       <div className="hidden md:flex md:flex-shrink-0">
//         <div className="flex flex-col w-64 bg-white border-r">
//           <div className="h-16 flex items-center justify-center border-b">
//             <h2 className="text-xl font-semibold text-green-600">{t('app.name')}</h2>
//           </div>
//           <div className="flex flex-col flex-grow p-4 overflow-y-auto">
//             <nav className="flex-1 space-y-2">
//               <NavLink 
//                 to="/buyer" 
//                 end
//                 className={({ isActive }) => 
//                   `flex items-center px-4 py-2 rounded-md transition-colors ${
//                     isActive 
//                       ? 'bg-green-100 text-green-700' 
//                       : 'text-gray-700 hover:bg-gray-100'
//                   }`
//                 }
//               >
//                 <FaHome className="mr-3" />
//                 {t('nav.dashboard')}
//               </NavLink>
              
//               <NavLink 
//                 to="/buyer/browse-waste" 
//                 className={({ isActive }) => 
//                   `flex items-center px-4 py-2 rounded-md transition-colors ${
//                     isActive 
//                       ? 'bg-green-100 text-green-700' 
//                       : 'text-gray-700 hover:bg-gray-100'
//                   }`
//                 }
//               >
//                 <FaShoppingBasket className="mr-3" />
//                 {t('nav.browseWaste')}
//               </NavLink>
              
//               <NavLink 
//                 to="/buyer/post-requirement" 
//                 className={({ isActive }) => 
//                   `flex items-center px-4 py-2 rounded-md transition-colors ${
//                     isActive 
//                       ? 'bg-green-100 text-green-700' 
//                       : 'text-gray-700 hover:bg-gray-100'
//                   }`
//                 }
//               >
//                 <FaExchangeAlt className="mr-3" />
//                 {t('nav.postRequirement')}
//               </NavLink>
              
//               <NavLink 
//                 to="/buyer/orders" 
//                 className={({ isActive }) => 
//                   `flex items-center px-4 py-2 rounded-md transition-colors ${
//                     isActive 
//                       ? 'bg-green-100 text-green-700' 
//                       : 'text-gray-700 hover:bg-gray-100'
//                   }`
//                 }
//               >
//                 <FaExchangeAlt className="mr-3" />
//                 {t('nav.orders')}
//               </NavLink>
              
//               <NavLink 
//                 to="/buyer/transport" 
//                 className={({ isActive }) => 
//                   `flex items-center px-4 py-2 rounded-md transition-colors ${
//                     isActive 
//                       ? 'bg-green-100 text-green-700' 
//                       : 'text-gray-700 hover:bg-gray-100'
//                   }`
//                 }
//               >
//                 <FaTruck className="mr-3" />
//                 {t('nav.transport')}
//               </NavLink>
              
//               <NavLink 
//                 to="/buyer/profile" 
//                 className={({ isActive }) => 
//                   `flex items-center px-4 py-2 rounded-md transition-colors ${
//                     isActive 
//                       ? 'bg-green-100 text-green-700' 
//                       : 'text-gray-700 hover:bg-gray-100'
//                   }`
//                 }
//               >
//                 <FaUser className="mr-3" />
//                 {t('nav.profile')}
//               </NavLink>
//             </nav>
            
//             <div className="pt-4 border-t mt-6">
//               <button
//                 onClick={handleLogout}
//                 className="flex w-full items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
//               >
//                 <FaSignOutAlt className="mr-3" />
//                 {t('nav.logout')}
//               </button>
              
//               <div className="mt-4">
//                 <LanguageSwitcher />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Mobile sidebar */}
//       <div className={`fixed inset-0 z-40 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleSidebar}></div>
//         <div className="fixed inset-y-0 left-0 flex flex-col w-full max-w-xs bg-white">
//           <div className="h-16 flex items-center justify-between px-4 border-b">
//             <h2 className="text-xl font-semibold text-green-600">{t('app.name')}</h2>
//             <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700">
//               <FaTimes size={24} />
//             </button>
//           </div>
//           <div className="flex-1 overflow-y-auto p-4">
//             <nav className="space-y-2">
//               {/* Same NavLinks as desktop but with onClick to close sidebar */}
//               <NavLink 
//                 to="/buyer" 
//                 end
//                 className={({ isActive }) => 
//                   `flex items-center px-4 py-2 rounded-md transition-colors ${
//                     isActive 
//                       ? 'bg-green-100 text-green-700' 
//                       : 'text-gray-700 hover:bg-gray-100'
//                   }`
//                 }
//                 onClick={toggleSidebar}
//               >
//                 <FaHome className="mr-3" />
//                 {t('nav.dashboard')}
//               </NavLink>
              
//               {/* Add other NavLinks with onClick={toggleSidebar} */}
//               {/* ... */}
//             </nav>
            
//             <div className="pt-4 border-t mt-6">
//               <button
//                 onClick={() => {
//                   toggleSidebar();
//                   handleLogout();
//                 }}
//                 className="flex w-full items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
//               >
//                 <FaSignOutAlt className="mr-3" />
//                 {t('nav.logout')}
//               </button>
              
//               <div className="mt-4">
//                 <LanguageSwitcher />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Main content */}
//       <div className="flex flex-col flex-1 overflow-hidden">
//         <header className="bg-white shadow-sm z-10">
//           <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
//             <button
//               className="md:hidden text-gray-500 hover:text-gray-700"
//               onClick={toggleSidebar}
//             >
//               <FaBars size={24} />
//             </button>
            
//             <div className="flex items-center">
//               <div className="ml-3 relative">
//                 <div className="flex items-center">
//                   <span className="mr-2 text-sm font-medium text-gray-700">
//                     {currentUser?.name || currentUser?.email}
//                   </span>
//                   {currentUser?.profileImage ? (
//                     <img
//                       className="h-8 w-8 rounded-full object-cover"
//                       src={currentUser.profileImage}
//                       alt="Profile"
//                     />
//                   ) : (
//                     <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white">
//                       {currentUser?.name?.charAt(0) || currentUser?.email?.charAt(0) || 'U'}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>
        
//         <main className="flex-1 overflow-y-auto bg-gray-50">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
//             <PageTransition>
//               <Outlet />
//             </PageTransition>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default BuyerLayout; 



import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  FaHome, FaShoppingBasket, FaExchangeAlt, FaTruck,
  FaUser, FaSignOutAlt, FaBars, FaTimes, FaGlobe, 
  FaSearch, FaPlus
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import PageTransition from '../components/PageTransition';
import LanguageSwitcher from '../components/LanguageSwitcher';

function BuyerLayout() {
  const { t } = useTranslation();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const handleLogout = async () => {
    try {
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white border-r">
          <div className="h-16 flex items-center justify-center border-b">
            <h2 className="text-xl font-semibold text-green-600">{t('app.name')}</h2>
          </div>
          <div className="flex flex-col flex-grow p-4 overflow-y-auto">
            <nav className="flex-1 space-y-2">
              <NavLink 
                to="/buyer" 
                end
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <FaHome className="mr-3" />
                {t('nav.dashboard')}
              </NavLink>
              
              <NavLink 
                to="/buyer/browsewaste" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <FaSearch className="mr-3" />
                {t('nav.browseWaste')}
              </NavLink>
              
              <NavLink 
                to="/buyer/postrequirement" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <FaPlus className="mr-3" />
                {t('nav.postRequirement')}
              </NavLink>
              
              <NavLink 
                to="/buyer/orders" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <FaExchangeAlt className="mr-3" />
                {t('nav.orders')}
              </NavLink>
              
              <NavLink 
                to="/buyer/transport" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <FaTruck className="mr-3" />
                {t('nav.transport')}
              </NavLink>
              
              <NavLink 
                to="/buyer/profile" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <FaUser className="mr-3" />
                {t('nav.profile')}
              </NavLink>
            </nav>
            
            <div className="pt-4 border-t mt-6">
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                <FaSignOutAlt className="mr-3" />
                {t('nav.logout')}
              </button>
              <div className="mt-4">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-40 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleSidebar}></div>
        <div className="fixed inset-y-0 left-0 flex flex-col w-full max-w-xs bg-white">
          <div className="h-16 flex items-center justify-between px-4 border-b">
            <h2 className="text-xl font-semibold text-green-600">{t('app.name')}</h2>
            <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2">
              <NavLink 
                to="/buyer" 
                end
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
                onClick={toggleSidebar}
              >
                <FaHome className="mr-3" />
                {t('nav.dashboard')}
              </NavLink>
              
              <NavLink 
                to="/buyer/browsewaste"
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
                onClick={toggleSidebar}
              >
                <FaSearch className="mr-3" />
                {t('nav.browseWaste')}
              </NavLink>
              
              <NavLink 
                to="/buyer/postrequirement"
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
                onClick={toggleSidebar}
              >
                <FaPlus className="mr-3" />
                {t('nav.postRequirement')}
              </NavLink>
              
              <NavLink 
                to="/buyer/transport"
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
                onClick={toggleSidebar}
              >
                <FaTruck className="mr-3" />
                {t('nav.transport')}
              </NavLink>
            </nav>
            
            <div className="pt-4 border-t mt-6">
              <button
                onClick={() => {
                  toggleSidebar();
                  handleLogout();
                }}
                className="flex w-full items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                <FaSignOutAlt className="mr-3" />
                {t('nav.logout')}
              </button>
              <div className="mt-4">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button
              className="md:hidden text-gray-500 hover:text-gray-700"
              onClick={toggleSidebar}
            >
              <FaBars size={24} />
            </button>
            
            <div className="flex items-center">
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <span className="mr-2 text-sm font-medium text-gray-700">
                    {currentUser?.name || currentUser?.email}
                  </span>
                  {currentUser?.profileImage ? (
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={currentUser.profileImage}
                      alt="Profile"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white">
                      {currentUser?.name?.charAt(0) || currentUser?.email?.charAt(0) || 'U'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <PageTransition>
              <Outlet /> {/* This is where nested routes render */}
            </PageTransition>
          </div>
        </main>
      </div>
    </div>
  );
}

export default BuyerLayout;