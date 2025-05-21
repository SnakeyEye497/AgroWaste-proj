import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaBox, FaEye, FaFilter, FaSearch, FaEdit } from 'react-icons/fa';
import api from '../../services/api';

function Orders() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      // This would normally fetch from the API
      // For demo, we'll use mock data
      const mockOrders = [
        {
          id: 'ORD-001',
          buyerId: '301',
          buyerName: 'Vikram Singh',
          farmerId: '101',
          farmerName: 'Rajesh Kumar',
          wasteType: 'Rice Straw',
          quantity: 200,
          unit: 'kg',
          price: 2.5,
          totalAmount: 500,
          status: 'pending',
          orderDate: '2023-05-10T10:30:00Z',
          deliveryDate: null,
        },
        {
          id: 'ORD-002',
          buyerId: '302',
          buyerName: 'Priya Patel',
          farmerId: '102',
          farmerName: 'Anita Sharma',
          wasteType: 'Sugarcane Bagasse',
          quantity: 500,
          unit: 'kg',
          price: 1.8,
          totalAmount: 900,
          status: 'confirmed',
          orderDate: '2023-05-05T14:45:00Z',
          deliveryDate: '2023-05-15',
        },
        {
          id: 'ORD-003',
          buyerId: '301',
          buyerName: 'Vikram Singh',
          farmerId: '103',
          farmerName: 'Suresh Patel',
          wasteType: 'Corn Stalks',
          quantity: 300,
          unit: 'kg',
          price: 2.0,
          totalAmount: 600,
          status: 'completed',
          orderDate: '2023-04-28T09:15:00Z',
          deliveryDate: '2023-05-08',
        },
        {
          id: 'ORD-004',
          buyerId: '302',
          buyerName: 'Priya Patel',
          farmerId: '104',
          farmerName: 'Meena Verma',
          wasteType: 'Wheat Straw',
          quantity: 400,
          unit: 'kg',
          price: 1.5,
          totalAmount: 600,
          status: 'cancelled',
          orderDate: '2023-04-25T11:30:00Z',
          deliveryDate: null,
        },
      ];

      setOrders(mockOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter orders based on active tab and search query
  const filteredOrders = orders.filter((order) => {
    // Filter by status tab
    if (activeTab !== 'all' && order.status !== activeTab) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        order.id.toLowerCase().includes(query) ||
        order.buyerName.toLowerCase().includes(query) ||
        order.farmerName.toLowerCase().includes(query) ||
        order.wasteType.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('orders.title')}</h1>
      
      {/* Tabs */}
      <div className="flex flex-wrap mb-6 border-b border-gray-200">
        <button
          className={`mr-4 py-2 px-4 font-medium ${
            activeTab === 'all'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('all')}
        >
          {t('orders.all')}
        </button>
        <button
          className={`mr-4 py-2 px-4 font-medium ${
            activeTab === 'pending'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('pending')}
        >
          {t('orders.pending')}
        </button>
        <button
          className={`mr-4 py-2 px-4 font-medium ${
            activeTab === 'confirmed'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('confirmed')}
        >
          {t('orders.confirmed')}
        </button>
        <button
          className={`mr-4 py-2 px-4 font-medium ${
            activeTab === 'completed'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('completed')}
        >
          {t('orders.completed')}
        </button>
        <button
          className={`mr-4 py-2 px-4 font-medium ${
            activeTab === 'cancelled'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('cancelled')}
        >
          {t('orders.cancelled')}
        </button>
      </div>
      
      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search orders..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>
      
      {/* Orders table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Buyer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Farmer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Waste Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.buyerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.farmerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.wasteType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.quantity} {order.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{order.totalAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.orderDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                        <FaEye />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <FaEdit />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-md">
          <FaBox className="text-gray-400 text-5xl mb-4" />
          <p className="text-gray-600 text-lg">No orders found</p>
        </div>
      )}
    </div>
  );
}

export default Orders; 