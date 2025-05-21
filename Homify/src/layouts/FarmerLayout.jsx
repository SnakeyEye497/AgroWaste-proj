import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  FaHome, FaRecycle, FaExchangeAlt, FaChartLine, FaBook,
  FaUser, FaSignOutAlt, FaBars, FaTimes, FaGlobe, FaQuestionCircle 
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import PageTransition from '../components/PageTransition';
import LanguageSwitcher from '../components/LanguageSwitcher';

function FarmerLayout() {
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
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white border-r">
          <div className="h-16 flex items-center justify-center border-b">
            <h2 className="text-xl font-semibold text-green-600">{t('app.name')}</h2>
          </div>
          <div className="flex flex-col flex-grow p-4 overflow-y-auto">
            <nav className="flex-1 space-y-2">
              <NavLink 
                to="/farmer" 
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
                to="/farmer/waste-selling" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-green-100 text-green-f700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <FaRecycle className="mr-3" />
                {t('WasteSelling')}
              </NavLink>

              
              <NavLink 
                to="/farmer/orders" 
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
                to="/farmer/prediction" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <FaChartLine className="mr-3" />
                {t('nav.wastePrediction')}
              </NavLink>
              
              <NavLink 
                to="/farmer/CreativeWasteUses" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <FaRecycle className="mr-3" />
                {t('CreativeWasteUses')}
              </NavLink>
              
              {/* New PostQuery Navigation Link */}
              <NavLink 
                to="/farmer/PostQuery" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <FaQuestionCircle className="mr-3" />
                {t('PostQuery')}
              </NavLink>

              <NavLink 
                to="/farmer/NearByBuyers" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <FaQuestionCircle className="mr-3" />
                {t('NearByBuyers')}
              </NavLink>
              
              <NavLink 
                to="/farmer/tutorials" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <FaBook className="mr-3" />
                {t('Tutorials')}
              </NavLink>
              
              <NavLink 
                to="/farmer/profile" 
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

      {/* Main content */}
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
              <Outlet />
            </PageTransition>
          </div>
        </main>
      </div>
    </div>
  );
}

export default FarmerLayout;