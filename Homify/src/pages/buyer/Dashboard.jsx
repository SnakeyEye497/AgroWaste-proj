// import { useState } from 'react';
// import { Routes, Route, Link, useLocation } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useAuth } from '../../contexts/AuthContext';
// import { 
//   FaRecycle, FaSearch, FaShoppingCart, FaTruck, 
//   FaClipboardList, FaUser, FaSignOutAlt 
// } from 'react-icons/fa';
// import Chatbot from '../../components/Chatbot';
// import Chat from '../../components/Chat/Chat';

// // Buyer components
// import BrowseWaste from './BrowseWaste';
// import PostRequirement from './PostRequirement';
// import Transport from './Transport';
// import Profile from './Profile';

// function BuyerDashboard() {
//   const { currentUser, logout } = useAuth();
//   const location = useLocation();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };
  
//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <motion.div 
//         initial={{ x: -250 }}
//         animate={{ x: isSidebarOpen ? 0 : -250 }}
//         className="bg-blue-800 text-white w-64 flex-shrink-0 shadow-lg"
//       >
//         <div className="p-4 border-b border-blue-700">
//           <div className="flex items-center space-x-3">
//             <FaRecycle className="text-2xl" />
//             <h1 className="text-xl font-bold">Buyer Portal</h1>
//           </div>
//         </div>
        
//         <div className="p-4">
//           <div className="flex items-center space-x-3 mb-6">
//             <img 
//               src={currentUser?.avatar || "https://via.placeholder.com/40"} 
//               alt="Profile" 
//               className="w-10 h-10 rounded-full"
//             />
//             <div>
//               <p className="font-medium">{currentUser?.name || "Buyer"}</p>
//               <p className="text-xs text-blue-300">{currentUser?.email}</p>
//             </div>
//           </div>
          
//           <nav className="space-y-1">
//             <Link 
//               to="/buyer/browse" 
//               className={`flex items-center space-x-3 p-3 rounded-md transition-colors ${
//                 location.pathname.includes('/buyer/browse') 
//                   ? 'bg-blue-700 text-white' 
//                   : 'text-blue-200 hover:bg-blue-700'
//               }`}
//             >
//               <FaSearch />
//               <span>Browse Waste</span>
//             </Link>
            
//             <Link 
//               to="/buyer/requirements" 
//               className={`flex items-center space-x-3 p-3 rounded-md transition-colors ${
//                 location.pathname.includes('/buyer/requirements') 
//                   ? 'bg-blue-700 text-white' 
//                   : 'text-blue-200 hover:bg-blue-700'
//               }`}
//             >
//               <FaClipboardList />
//               <span>Post Requirements</span>
//             </Link>
            
//             <Link 
//               to="/buyer/transport" 
//               className={`flex items-center space-x-3 p-3 rounded-md transition-colors ${
//                 location.pathname.includes('/buyer/transport') 
//                   ? 'bg-blue-700 text-white' 
//                   : 'text-blue-200 hover:bg-blue-700'
//               }`}
//             >
//               <FaTruck />
//               <span>Transport</span>
//             </Link>
            
//             <Link 
//               to="/buyer/profile" 
//               className={`flex items-center space-x-3 p-3 rounded-md transition-colors ${
//                 location.pathname.includes('/buyer/profile') 
//                   ? 'bg-blue-700 text-white' 
//                   : 'text-blue-200 hover:bg-blue-700'
//               }`}
//             >
//               <FaUser />
//               <span>My Profile</span>
//             </Link>
//           </nav>
//         </div>
        
//         <div className="absolute bottom-0 w-64 p-4 border-t border-blue-700">
//           <button 
//             onClick={logout}
//             className="flex items-center space-x-3 text-blue-200 hover:text-white w-full p-2 rounded-md hover:bg-blue-700 transition-colors"
//           >
//             <FaSignOutAlt />
//             <span>Sign Out</span>
//           </button>
//         </div>
//       </motion.div>
      
//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="bg-white shadow-sm z-10">
//           <div className="flex items-center justify-between p-4">
//             <button 
//               onClick={toggleSidebar}
//               className="text-gray-600 focus:outline-none"
//             >
//               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
            
//             <div className="text-xl font-semibold text-blue-800">
//               AgriWaste Connect
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <button className="text-gray-600 focus:outline-none">
//                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//                 </svg>
//               </button>
              
//               <div className="relative">
//                 <button className="flex items-center space-x-2 text-gray-600 focus:outline-none">
//                   <FaShoppingCart className="h-6 w-6" />
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                     3
//                   </span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </header>
        
//         {/* Content */}
//         <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
//           <Routes>
//             <Route path="/" element={<BrowseWaste />} />
//             <Route path="/browse" element={<BrowseWaste />} />
//             <Route path="/requirements" element={<PostRequirement />} />
//             <Route path="/transport" element={<Transport />} />
//             <Route path="/profile" element={<Profile />} />
//           </Routes>
//         </main>
//       </div>
      
//       {/* Add Chat component */}
//       <Chat />
      
//       {/* Chatbot */}
//       <Chatbot />
//     </div>
//   );
// }

// export default BuyerDashboard; 

// import { useState } from 'react';

// import { 
//   FaRecycle
// } from 'react-icons/fa';
// import Chatbot from '../../components/Chatbot';
// import Chat from '../../components/Chat/Chat';

// Buyer components
// import BrowseWaste from './BrowseWaste';
// import PostRequirement from './PostRequirement';
// import Transport from './Transport';
// import Profile from './Profile';


// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';
// import api from '../../services/api';
// import {  Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useAuth } from '../../contexts/AuthContext';
// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';import { FaBoxOpen, FaChartLine, FaRupeeSign,FaRecycle} from 'react-icons/fa';




// function BuyerDashboard() {
//   const { t } = useTranslation();
//   const { currentUser } = useAuth();
//   const [isLoading, setIsLoading] = useState(true);
//   const [dashboardData, setDashboardData] = useState({
//     totalWasteOrdered: 0,
//     totalSpent: 0,
//     averagePrice: 0,
//     pendingOrders: 0,
//     confirmedOrders: 0,
//     completedOrders: 0,
//     cancelledOrders: 0,
//     recentOrders: [],
//     wasteByType: [],
//     monthlySpendings: []
//   });
  
//   // Define helper functions
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(amount);
//   };
  
//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };
  
//   useEffect(() => {
//     fetchDashboardData();
    
//     // Set up interval to refresh dashboard data every minute
//     const dashboardInterval = setInterval(() => {
//       fetchDashboardData();
//     }, 60000);
    
//     return () => clearInterval(dashboardInterval);
//   }, []);
  
//   const fetchDashboardData = async () => {
//     setIsLoading(true);
    
//     try {
//       // Get orders from localStorage (both mock orders and buyer orders)
//       const buyerOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      
//       // Calculate order statistics
//       const pendingOrders = buyerOrders.filter(order => order.status === 'pending').length;
//       const confirmedOrders = buyerOrders.filter(order => order.status === 'confirmed').length;
//       const completedOrders = buyerOrders.filter(order => order.status === 'completed').length;
//       const cancelledOrders = buyerOrders.filter(order => order.status === 'cancelled').length;
      
//       // Calculate total spent and waste ordered (from completed and confirmed orders)
//       const activeOrders = buyerOrders.filter(order => 
//         order.status === 'completed' || order.status === 'confirmed'
//       );
      
//       const totalSpent = activeOrders.reduce((sum, order) => sum + order.totalAmount, 0);
//       const totalWasteOrdered = activeOrders.reduce((sum, order) => sum + order.quantity, 0);
      
//       const averagePrice = totalSpent / (activeOrders.length || 1);
      
//       // Get recent orders (sorted by date, most recent first)
//       const recentOrders = [...buyerOrders]
//         .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
//         .slice(0, 5);
      
//       // Calculate waste by type
//       const wasteByType = [
//         { name: 'Rice Straw', value: 800 },
//         { name: 'Wheat Straw', value: 600 },
//         { name: 'Corn Stalks', value: 400 },
//         { name: 'Sugarcane Bagasse', value: 200 }
//       ];
      
//       // Monthly spendings data
//       const monthlySpendings = [
//         { name: 'Jan', spending: 4000 },
//         { name: 'Feb', spending: 3000 },
//         { name: 'Mar', spending: 5000 },
//         { name: 'Apr', spending: 2780 },
//         { name: 'May', spending: 1890 },
//         { name: 'Jun', spending: 2390 },
//         { name: 'Jul', spending: 3490 },
//         { name: 'Aug', spending: 4000 },
//         { name: 'Sep', spending: 3000 },
//         { name: 'Oct', spending: 2000 },
//         { name: 'Nov', spending: 2780 },
//         { name: 'Dec', spending: 3890 }
//       ];
      
//       setDashboardData({
//         totalWasteOrdered,
//         totalSpent,
//         averagePrice,
//         pendingOrders,
//         confirmedOrders,
//         completedOrders,
//         cancelledOrders,
//         recentOrders,
//         wasteByType,
//         monthlySpendings
//       });
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   return (
//     <div className="p-6 space-y-6">
//       <motion.h1 
//         className="text-2xl font-bold text-gray-800"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         {t('Dashboard')}
//       </motion.h1>
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <motion.div 
//           className="bg-white rounded-lg shadow-md p-6"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3, delay: 0.1 }}
//         >
//           <div className="flex items-center">
//             <div className="p-3 rounded-full bg-green-100 text-green-600">
//               <FaRecycle className="text-2xl" />
//             </div>
//             <div className="ml-4">
//               <p className="text-lg font-medium text-gray-500">{t('TotalWasteOrdered')}</p>
//               <p className="text-2xl font-semibold text-gray-800">{dashboardData.totalWasteOrdered} kg</p>
//             </div>
//           </div>
//         </motion.div>
        
//         <motion.div 
//           className="bg-white rounded-lg shadow-md p-6"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3, delay: 0.2 }}
//         >
//           <div className="flex items-center">
//             <div className="p-3 rounded-full bg-blue-100 text-blue-600">
//               <FaRupeeSign className="text-2xl" />
//             </div>
//             <div className="ml-4">
//               <p className="text-lg font-medium text-gray-500">{t('TotalSpent')}</p>
//               <p className="text-2xl font-semibold text-gray-800">{formatCurrency(dashboardData.totalSpent)}</p>
//             </div>
//           </div>
//         </motion.div>
        
//         <motion.div 
//           className="bg-white rounded-lg shadow-md p-6"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3, delay: 0.3 }}
//         >
//           <div className="flex items-center">
//             <div className="p-3 rounded-full bg-purple-100 text-purple-600">
//               <FaChartLine className="text-2xl" />
//             </div>
//             <div className="ml-4">
//               <p className="text-lg font-medium text-gray-500">{t('AveragePrice')}</p>
//               <p className="text-2xl font-semibold text-gray-800">{formatCurrency(dashboardData.averagePrice)}/kg</p>
//             </div>
//           </div>
//         </motion.div>
        
//         <motion.div 
//           className="bg-white rounded-lg shadow-md p-6"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3, delay: 0.4 }}
//         >
//           <div className="flex items-center">
//             <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
//               <FaBoxOpen className="text-2xl" />
//             </div>
//             <div className="ml-4">
//               <p className="text-lg font-medium text-gray-500">{t('PendingOrders')}</p>
//               <p className="text-2xl font-semibold text-gray-800">{dashboardData.pendingOrders}</p>
//             </div>
//           </div>
//         </motion.div>
//       </div>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('MonthlySpendings')}</h2>
          
//           {isLoading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
//             </div>
//           ) : (
//             <div className="h-64 flex items-center justify-center">
//               <p className="text-gray-500">{t('ChartPlaceholder')}</p>
//             </div>
//           )}
//         </div>
        
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('WasteByType')}</h2>
          
//           {isLoading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {dashboardData.wasteByType.map((item, index) => (
//                 <div key={index} className="bg-gray-50 p-3 rounded-lg">
//                   <div className="flex justify-between mb-1">
//                     <span className="font-medium">{item.name}</span>
//                     <span>{item.value} kg</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2.5">
//                     <div 
//                       className="bg-blue-600 h-2.5 rounded-full" 
//                       style={{ width: `${(item.value / 800) * 100}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
      
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold text-gray-800">{t('RecentOrders')}</h2>
//             <Link to="/buyer/orders" className="text-blue-600 hover:text-blue-800 text-sm">
//               {t('View All')}
//             </Link>
//           </div>
          
//           {isLoading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       {t('orders.orderId')}
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       {t('orders.farmer')}
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       {t('orders.wasteType')}
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       {t('orders.amount')}
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       {t('orders.status')}
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {dashboardData.recentOrders.map((order) => (
//                     <tr key={order.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {order.id}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {order.sellerName || 'Unknown Farmer'}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {order.wasteType}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {formatCurrency(order.totalAmount)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                           order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
//                           order.status === 'completed' ? 'bg-green-100 text-green-800' :
//                           'bg-red-100 text-red-800'
//                         }`}>
//                           {order.status === 'pending' && t('orders.statusPending')}
//                           {order.status === 'confirmed' && t('orders.statusConfirmed')}
//                           {order.status === 'completed' && t('orders.statusCompleted')}
//                           {order.status === 'cancelled' && t('orders.statusCancelled')}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
        
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('OrderStatus')}</h2>
          
//           {isLoading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
//             </div>
//           ) : (
//             <>
//               <div className="space-y-4 mb-6">
//                 <div className="bg-yellow-50 rounded p-3">
//                   <div className="flex justify-between items-center">
//                     <p className="text-yellow-800 font-medium">{t('orders.statusPending')}</p>
//                     <p className="text-2xl font-bold text-yellow-600">{dashboardData.pendingOrders}</p>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
//                     <div 
//                       className="bg-yellow-500 h-2.5 rounded-full" 
//                       style={{ width: `${(dashboardData.pendingOrders / (dashboardData.pendingOrders + dashboardData.confirmedOrders + dashboardData.completedOrders + dashboardData.cancelledOrders)) * 100}%` }}
//                     ></div>
//                   </div>
//                 </div>
                
//                 <div className="bg-blue-50 rounded p-3">
//                   <div className="flex justify-between items-center">
//                     <p className="text-blue-800 font-medium">{t('orders.statusConfirmed')}</p>
//                     <p className="text-2xl font-bold text-blue-600">{dashboardData.confirmedOrders}</p>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
//                     <div 
//                       className="bg-blue-500 h-2.5 rounded-full" 
//                       style={{ width: `${(dashboardData.confirmedOrders / (dashboardData.pendingOrders + dashboardData.confirmedOrders + dashboardData.completedOrders + dashboardData.cancelledOrders)) * 100}%` }}
//                     ></div>
//                   </div>
//                 </div>
                
//                 <div className="bg-green-50 rounded p-3">
//                   <div className="flex justify-between items-center">
//                     <p className="text-green-800 font-medium">{t('orders.statusCompleted')}</p>
//                     <p className="text-2xl font-bold text-green-600">{dashboardData.completedOrders}</p>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
//                     <div 
//                       className="bg-green-500 h-2.5 rounded-full" 
//                       style={{ width: `${(dashboardData.completedOrders / (dashboardData.pendingOrders + dashboardData.confirmedOrders + dashboardData.completedOrders + dashboardData.cancelledOrders)) * 100}%` }}
//                     ></div>
//                   </div>
//                 </div>
                
//                 <div className="bg-red-50 rounded p-3">
//                   <div className="flex justify-between items-center">
//                     <p className="text-red-800 font-medium">{t('orders.statusCancelled')}</p>
//                     <p className="text-2xl font-bold text-red-600">{dashboardData.cancelledOrders}</p>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
//                     <div 
//                       className="bg-red-500 h-2.5 rounded-full" 
//                       style={{ width: `${(dashboardData.cancelledOrders / (dashboardData.pendingOrders + dashboardData.confirmedOrders + dashboardData.completedOrders + dashboardData.cancelledOrders)) * 100}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BuyerDashboard;

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaShoppingCart, 
  FaMoneyBillWave, 
  FaBox, 
  FaTruck 
} from 'react-icons/fa';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

function BuyerDashboard() {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalPurchases: 20000,
    totalSpent: 0,
    averageOrderValue: 50,
    pendingDeliveries: 5,
    recentPurchases: [],
    purchasesByCategory: [],
    monthlyPurchases: []
  });
  
  // Helper functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  useEffect(() => {
    fetchDashboardData();
    
    // Refresh dashboard data every minute
    const dashboardInterval = setInterval(fetchDashboardData, 60000);
    
    return () => clearInterval(dashboardInterval);
  }, []);
  
  const fetchDashboardData = async () => {
    setIsLoading(true);
    
    try {
      // Get purchases from localStorage (mock data)
      const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
      
      // Calculate purchase statistics
      const totalPurchases = purchases.length;
      const totalSpent = purchases.reduce((sum, purchase) => sum + purchase.totalAmount, 0);
      const averageOrderValue = totalPurchases > 0 ? totalSpent / totalPurchases : 0;
      const pendingDeliveries = purchases.filter(p => p.status === 'shipped' || p.status === 'processing').length;
      
      // Recent purchases (sorted by date, most recent first)
      const recentPurchases = [...purchases]
        .sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate))
        .slice(0, 5);
      
      // Purchase categories
      const purchasesByCategory = [
        { name: 'Animal Based Waste', value: 4000, color: 'bg-green-500' },
        { name: 'Husks Waste', value: 2500, color: 'bg-blue-500' },
        { name: 'Straw', value: 5500, color: 'bg-green-500' },
        { name: 'Roots', value: 3500, color: 'bg-blue-500' }
        
      ];
      
      // Monthly purchase data
      const monthlyPurchases = [
        { name: 'Jan', amount: 45000 },
        { name: 'Feb', amount: 52000 },
        { name: 'Mar', amount: 38000 },
        { name: 'Apr', amount: 56000 },
        { name: 'May', amount: 42000 },
        { name: 'Jun', amount: 49000 }
      ];
      
      setDashboardData({
        totalPurchases,
        totalSpent,
        averageOrderValue,
        pendingDeliveries,
        recentPurchases,
        purchasesByCategory,
        monthlyPurchases
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Custom Tooltip for Monthly Purchases Chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow-lg">
          <p className="font-bold">{label}</p>
          <p className="text-blue-600">{t('Total Purchases')}: {formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="p-6 space-y-6 bg-gray-50">
      <motion.h1 
        className="text-3xl font-bold text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('Buyer Dashboard')}
      </motion.h1>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FaShoppingCart className="text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-lg font-medium text-gray-500">{t('Total Purchases')}</p>
              <p className="text-2xl font-semibold text-gray-800">{dashboardData.totalPurchases}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FaMoneyBillWave className="text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-lg font-medium text-gray-500">{t('Total Spent')}</p>
              <p className="text-2xl font-semibold text-gray-800">{formatCurrency(dashboardData.totalSpent)}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <FaBox className="text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-lg font-medium text-gray-500">{t('Avg Order Value')}</p>
              <p className="text-2xl font-semibold text-gray-800">{formatCurrency(dashboardData.averageOrderValue)}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <FaTruck className="text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-lg font-medium text-gray-500">{t('Pending Deliveries')}</p>
              <p className="text-2xl font-semibold text-gray-800">{dashboardData.pendingDeliveries}</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Purchase Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('Purchase Categories')}</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {dashboardData.purchasesByCategory.map((category, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{category.name}</span>
                    <span>{formatCurrency(category.value)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`${category.color} h-2.5 rounded-full`} 
                      style={{ width: `${(category.value / 9000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Monthly Purchases Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('Monthly Purchases')}</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={dashboardData.monthlyPurchases}
                margin={{ top: 5, right: 0, left: -15, bottom: 5 }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  vertical={false} 
                  stroke="#f3f4f6" 
                />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickFormatter={(value) => formatCurrency(value).replace('₹', '')}
                />
                <Tooltip 
                  content={<CustomTooltip />} 
                  cursor={{ fill: 'transparent' }} 
                />
                <Bar 
                  dataKey="amount" 
                  fill="#3b82f6" 
                  radius={[5, 5, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      
      {/* Recent Purchases */}
      {/* <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{t('Recent Purchases')}</h2>
          <Link to="/buyer/purchases" className="text-blue-600 hover:text-blue-800 text-sm">
            {t('View All')}
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('Purchase ID')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('Waste Type')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('Amount')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('Date')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('Status')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.recentPurchases.map((purchase) => (
                  <tr key={purchase.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {purchase.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {purchase.wasteType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(purchase.totalAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(purchase.purchaseDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        purchase.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        purchase.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        purchase.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {purchase.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div> */}
    </div>
  );
}

export default BuyerDashboard;