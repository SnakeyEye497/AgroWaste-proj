// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { motion } from 'framer-motion';
// import { FaBoxOpen, FaChartLine, FaRupeeSign, FaLeaf, FaRecycle, FaExchangeAlt } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';
// import api from '../../services/api';

// function Dashboard() {
//   const { t } = useTranslation();
//   const { currentUser } = useAuth();
//   const [isLoading, setIsLoading] = useState(true);
//   const [dashboardData, setDashboardData] = useState({
//     totalWasteListed: 0,
//     totalWasteSold: 0,
//     totalRevenue: 0,
//     pendingOrders: 0,
//     confirmedOrders: 0,
//     completedOrders: 0,
//     cancelledOrders: 0,
//     recentOrders: [],
//     wasteByType: [],
//     monthlySales: []
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
//       // In a real app, this would fetch from the API
//       // const response = await api.get(`/farmer/dashboard?farmerId=${currentUser.id}`);
//       // setDashboardData(response.data);
      
//       // For demo, we'll use mock data combined with localStorage data
      
//       // Get orders from localStorage (both mock orders and buyer orders)
//       const mockOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
//       const buyerOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      
//       // Get the base mock orders to combine with any persisted status changes
//       const baseMockOrders = [
//         {
//           id: 'ORD-001',
//           buyerId: '201',
//           buyerName: 'Rajesh Industries',
//           wasteId: 'W001',
//           wasteType: 'Rice Straw',
//           quantity: 500,
//           unit: 'kg',
//           price: 2.5,
//           totalAmount: 1250,
//           status: 'pending',
//           orderDate: '2023-06-15T10:30:00Z'
//         },
//         {
//           id: 'ORD-002',
//           buyerId: '202',
//           buyerName: 'Green Energy Co.',
//           wasteId: 'W003',
//           wasteType: 'Corn Stalks',
//           quantity: 300,
//           unit: 'kg',
//           price: 3.0,
//           totalAmount: 900,
//           status: 'confirmed',
//           orderDate: '2023-06-10T14:15:00Z'
//         },
//         {
//           id: 'ORD-003',
//           buyerId: '203',
//           buyerName: 'Eco Solutions',
//           wasteId: 'W002',
//           wasteType: 'Wheat Straw',
//           quantity: 800,
//           unit: 'kg',
//           price: 2.0,
//           totalAmount: 1600,
//           status: 'completed',
//           orderDate: '2023-05-28T09:45:00Z'
//         },
//         {
//           id: 'ORD-004',
//           buyerId: '204',
//           buyerName: 'New Buyer Corp',
//           wasteId: 'W004',
//           wasteType: 'Sugarcane Bagasse',
//           quantity: 600,
//           unit: 'kg',
//           price: 2.8,
//           totalAmount: 1680,
//           status: 'pending',
//           orderDate: new Date().toISOString()
//         }
//       ];
      
//       // Apply any persisted status changes to the mock orders
//       const updatedMockOrders = baseMockOrders.map(mockOrder => {
//         const persistedOrder = mockOrders.find(order => order.id === mockOrder.id);
//         return persistedOrder ? { ...mockOrder, status: persistedOrder.status } : mockOrder;
//       });
      
//       // Combine all orders
//       const allOrders = [...updatedMockOrders, ...buyerOrders];
      
//       // Calculate order statistics
//       const pendingOrders = allOrders.filter(order => order.status === 'pending').length;
//       const confirmedOrders = allOrders.filter(order => order.status === 'confirmed').length;
//       const completedOrders = allOrders.filter(order => order.status === 'completed').length;
//       const cancelledOrders = allOrders.filter(order => order.status === 'cancelled').length;
      
//       // Calculate revenue (only from completed orders)
//       const totalRevenue = allOrders
//         .filter(order => order.status === 'completed')
//         .reduce((sum, order) => sum + order.totalAmount, 0);
      
//       // Calculate total waste sold (only from completed orders)
//       const totalWasteSold = allOrders
//         .filter(order => order.status === 'completed')
//         .reduce((sum, order) => sum + order.quantity, 0);
      
//       // Get recent orders (sorted by date, most recent first)
//       const recentOrders = [...allOrders]
//         .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
//         .slice(0, 5);
      
//       // Calculate waste by type
//       const wasteByType = [
//         { name: 'Rice Straw', value: 1200 },
//         { name: 'Wheat Straw', value: 800 },
//         { name: 'Corn Stalks', value: 600 },
//         { name: 'Sugarcane Bagasse', value: 400 }
//       ];
      
//       // Monthly sales data
//       const monthlySales = [
//         { name: 'Jan', sales: 4000 },
//         { name: 'Feb', sales: 3000 },
//         { name: 'Mar', sales: 5000 },
//         { name: 'Apr', sales: 2780 },
//         { name: 'May', sales: 1890 },
//         { name: 'Jun', sales: 2390 },
//         { name: 'Jul', sales: 3490 },
//         { name: 'Aug', sales: 4000 },
//         { name: 'Sep', sales: 3000 },
//         { name: 'Oct', sales: 2000 },
//         { name: 'Nov', sales: 2780 },
//         { name: 'Dec', sales: 3890 }
//       ];
      
//       setDashboardData({
//         totalWasteListed: 3000, // Mock total waste listed
//         totalWasteSold,
//         totalRevenue,
//         pendingOrders,
//         confirmedOrders,
//         completedOrders,
//         cancelledOrders,
//         recentOrders,
//         wasteByType,
//         monthlySales
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
//               <FaLeaf className="text-2xl" />
//             </div>
//             <div className="ml-4">
//               <p className="text-lg font-medium text-gray-500">{t('TotalWasteListed')}</p>
//               <p className="text-2xl font-semibold text-gray-800">{dashboardData.totalWasteListed} kg</p>
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
//               <FaRecycle className="text-2xl" />
//             </div>
//             <div className="ml-4">
//               <p className="text-lg font-medium text-gray-500">{t('TotalWasteSold')}</p>
//               <p className="text-2xl font-semibold text-gray-800">{dashboardData.totalWasteSold} kg</p>
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
//               <FaRupeeSign className="text-2xl" />
//             </div>
//             <div className="ml-4">
//               <p className="text-lg font-medium text-gray-500">{t('TotalRevenue')}</p>
//               <p className="text-2xl font-semibold text-gray-800">{formatCurrency(dashboardData.totalRevenue)}</p>
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
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('MonthlySales')}</h2>
          
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
//                       style={{ width: `${(item.value / 1200) * 100}%` }}
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
//             <Link to="/farmer/orders" className="text-blue-600 hover:text-blue-800 text-sm">
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
//                       {t('orders.buyer')}
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
//                         {order.buyerName}
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

// export default Dashboard; 


import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  FaBoxOpen, 
  FaChartLine, 
  FaRupeeSign, 
  FaLeaf, 
  FaRecycle, 
  FaExchangeAlt 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

function Dashboard() {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalWasteListed: 0,
    totalWasteSold: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    recentOrders: [],
    wasteByType: [],
    monthlySales: []
  });
  
  // Define helper functions
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
    
    // Set up interval to refresh dashboard data every minute
    const dashboardInterval = setInterval(() => {
      fetchDashboardData();
    }, 60000);
    
    return () => clearInterval(dashboardInterval);
  }, []);
  
  const fetchDashboardData = async () => {
    setIsLoading(true);
    
    try {
      // Get orders from localStorage (both mock orders and buyer orders)
      const mockOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
      const buyerOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      
      // Get the base mock orders to combine with any persisted status changes
      const baseMockOrders = [
        {
          id: 'ORD-001',
          buyerId: '201',
          buyerName: 'Rajesh Industries',
          wasteId: 'W001',
          wasteType: 'Rice Straw',
          quantity: 500,
          unit: 'kg',
          price: 2.5,
          totalAmount: 1250,
          status: 'pending',
          orderDate: '2023-06-15T10:30:00Z'
        },
        {
          id: 'ORD-002',
          buyerId: '202',
          buyerName: 'Green Energy Co.',
          wasteId: 'W003',
          wasteType: 'Corn Stalks',
          quantity: 300,
          unit: 'kg',
          price: 3.0,
          totalAmount: 900,
          status: 'confirmed',
          orderDate: '2023-06-10T14:15:00Z'
        },
        {
          id: 'ORD-003',
          buyerId: '203',
          buyerName: 'Eco Solutions',
          wasteId: 'W002',
          wasteType: 'Wheat Straw',
          quantity: 800,
          unit: 'kg',
          price: 2.0,
          totalAmount: 1600,
          status: 'completed',
          orderDate: '2023-05-28T09:45:00Z'
        },
        {
          id: 'ORD-004',
          buyerId: '204',
          buyerName: 'New Buyer Corp',
          wasteId: 'W004',
          wasteType: 'Sugarcane Bagasse',
          quantity: 600,
          unit: 'kg',
          price: 2.8,
          totalAmount: 1680,
          status: 'pending',
          orderDate: new Date().toISOString()
        }
      ];
      
      // Apply any persisted status changes to the mock orders
      const updatedMockOrders = baseMockOrders.map(mockOrder => {
        const persistedOrder = mockOrders.find(order => order.id === mockOrder.id);
        return persistedOrder ? { ...mockOrder, status: persistedOrder.status } : mockOrder;
      });
      
      // Combine all orders
      const allOrders = [...updatedMockOrders, ...buyerOrders];
      
      // Calculate order statistics
      const pendingOrders = allOrders.filter(order => order.status === 'pending').length;
      const confirmedOrders = allOrders.filter(order => order.status === 'confirmed').length;
      const completedOrders = allOrders.filter(order => order.status === 'completed').length;
      const cancelledOrders = allOrders.filter(order => order.status === 'cancelled').length;
      
      // Calculate revenue (only from completed orders)
      const totalRevenue = allOrders
        .filter(order => order.status === 'completed')
        .reduce((sum, order) => sum + order.totalAmount, 0);
      
      // Calculate total waste sold (only from completed orders)
      const totalWasteSold = allOrders
        .filter(order => order.status === 'completed')
        .reduce((sum, order) => sum + order.quantity, 0);
      
      // Get recent orders (sorted by date, most recent first)
      const recentOrders = [...allOrders]
        .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
        .slice(0, 5);
      
      // Calculate waste by type
      const wasteByType = [
        { name: 'Rice Straw', value: 1200 },
        { name: 'Wheat Straw', value: 800 },
        { name: 'Corn Stalks', value: 600 },
        { name: 'Sugarcane Bagasse', value: 400 }
      ];
      
      // Monthly sales data
      const monthlySales = [
        { name: 'Jan', sales: 4000 },
        { name: 'Feb', sales: 3000 },
        { name: 'Mar', sales: 5000 },
        { name: 'Apr', sales: 2780 },
        { name: 'May', sales: 1890 },
        { name: 'Jun', sales: 2390 },
        { name: 'Jul', sales: 3490 },
        { name: 'Aug', sales: 4000 },
        { name: 'Sep', sales: 3000 },
        { name: 'Oct', sales: 2000 },
        { name: 'Nov', sales: 2780 },
        { name: 'Dec', sales: 3890 }
      ];
      
      setDashboardData({
        totalWasteListed: 3000, // Mock total waste listed
        totalWasteSold,
        totalRevenue,
        pendingOrders,
        confirmedOrders,
        completedOrders,
        cancelledOrders,
        recentOrders,
        wasteByType,
        monthlySales
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="p-6 space-y-6">
      <motion.h1 
        className="text-2xl font-bold text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('Dashboard')}
      </motion.h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FaLeaf className="text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-lg font-medium text-gray-500">{t('TotalWasteListed')}</p>
              <p className="text-2xl font-semibold text-gray-800">{dashboardData.totalWasteListed} kg</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FaRecycle className="text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-lg font-medium text-gray-500">{t('TotalWasteSold')}</p>
              <p className="text-2xl font-semibold text-gray-800">{dashboardData.totalWasteSold} kg</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <FaRupeeSign className="text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-lg font-medium text-gray-500">{t('TotalRevenue')}</p>
              <p className="text-2xl font-semibold text-gray-800">{formatCurrency(dashboardData.totalRevenue)}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <FaBoxOpen className="text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-lg font-medium text-gray-500">{t('PendingOrders')}</p>
              <p className="text-2xl font-semibold text-gray-800">{dashboardData.pendingOrders}</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('MonthlySales')}</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dashboardData.monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickFormatter={(value) => `₹${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ fontWeight: 'bold' }}
                  formatter={(value) => [`₹${value}`, 'Sales']}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
                  activeDot={{ r: 8, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('WasteByType')}</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {dashboardData.wasteByType.map((item, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{item.name}</span>
                    <span>{item.value} kg</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${(item.value / 1200) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{t('RecentOrders')}</h2>
            <Link to="/farmer/orders" className="text-blue-600 hover:text-blue-800 text-sm">
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
                      {t('orders.orderId')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('orders.buyer')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('orders.wasteType')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('orders.amount')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('orders.status')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dashboardData.recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.buyerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.wasteType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(order.totalAmount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status === 'pending' && t('orders.statusPending')}
                          {order.status === 'confirmed' && t('orders.statusConfirmed')}
                          {order.status === 'completed' && t('orders.statusCompleted')}
                          {order.status === 'cancelled' && t('orders.statusCancelled')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('OrderStatus')}</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                <div className="bg-yellow-50 rounded p-3">
                  <div className="flex justify-between items-center">
                    <p className="text-yellow-800 font-medium">{t('orders.statusPending')}</p>
                    <p className="text-2xl font-bold text-yellow-600">{dashboardData.pendingOrders}</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div 
                      className="bg-yellow-500 h-2.5 rounded-full" 
                      style={{ width: `${(dashboardData.pendingOrders / (dashboardData.pendingOrders + dashboardData.confirmedOrders + dashboardData.completedOrders + dashboardData.cancelledOrders)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded p-3">
                  <div className="flex justify-between items-center">
                    <p className="text-blue-800 font-medium">{t('orders.statusConfirmed')}</p>
                    <p className="text-2xl font-bold text-blue-600">{dashboardData.confirmedOrders}</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div 
                      className="bg-blue-500 h-2.5 rounded-full" 
                      style={{ width: `${(dashboardData.confirmedOrders / (dashboardData.pendingOrders + dashboardData.confirmedOrders + dashboardData.completedOrders + dashboardData.cancelledOrders)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded p-3">
                  <div className="flex justify-between items-center">
                    <p className="text-green-800 font-medium">{t('orders.statusCompleted')}</p>
                    <p className="text-2xl font-bold text-green-600">{dashboardData.completedOrders}</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div 
                      className="bg-green-500 h-2.5 rounded-full" 
                      style={{ width: `${(dashboardData.completedOrders / (dashboardData.pendingOrders + dashboardData.confirmedOrders + dashboardData.completedOrders + dashboardData.cancelledOrders)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-red-50 rounded p-3">
                  <div className="flex justify-between items-center">
                    <p className="text-red-800 font-medium">{t('orders.statusCancelled')}</p>
                    <p className="text-2xl font-bold text-red-600">{dashboardData.cancelledOrders}</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div 
                      className="bg-red-500 h-2.5 rounded-full" 
                      style={{ width: `${(dashboardData.cancelledOrders / (dashboardData.pendingOrders + dashboardData.confirmedOrders + dashboardData.completedOrders + dashboardData.cancelledOrders)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;