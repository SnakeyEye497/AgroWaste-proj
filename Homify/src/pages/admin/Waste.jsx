import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaRecycle, FaSearch, FaEdit, FaTrash, FaFilter } from 'react-icons/fa';
import api from '../../services/api';

function Waste() {
  const { t } = useTranslation();
  const [wasteItems, setWasteItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchWasteItems();
  }, []);

  const fetchWasteItems = async () => {
    setIsLoading(true);
    try {
      // This would normally fetch from the API
      // For demo, we'll use mock data
      const mockWasteItems = [
        {
          id: '1',
          farmerId: '101',
          farmerName: 'Rajesh Kumar',
          wasteType: 'Rice Straw',
          quantity: 500,
          unit: 'kg',
          price: 2.5,
          location: 'Punjab',
          status: 'available',
          createdAt: '2023-04-15T10:30:00Z',
          updatedAt: '2023-04-15T10:30:00Z',
        },
        {
          id: '2',
          farmerId: '102',
          farmerName: 'Anita Sharma',
          wasteType: 'Sugarcane Bagasse',
          quantity: 1000,
          unit: 'kg',
          price: 1.8,
          location: 'Uttar Pradesh',
          status: 'available',
          createdAt: '2023-04-20T14:45:00Z',
          updatedAt: '2023-04-20T14:45:00Z',
        },
        {
          id: '3',
          farmerId: '103',
          farmerName: 'Suresh Patel',
          wasteType: 'Corn Stalks',
          quantity: 750,
          unit: 'kg',
          price: 2.0,
          location: 'Gujarat',
          status: 'sold',
          createdAt: '2023-04-18T09:15:00Z',
          updatedAt: '2023-05-02T11:20:00Z',
        },
        {
          id: '4',
          farmerId: '104',
          farmerName: 'Meena Verma',
          wasteType: 'Wheat Straw',
          quantity: 600,
          unit: 'kg',
          price: 1.5,
          location: 'Haryana',
          status: 'pending',
          createdAt: '2023-04-25T11:30:00Z',
          updatedAt: '2023-04-25T11:30:00Z',
        },
      ];

      setWasteItems(mockWasteItems);
    } catch (error) {
      console.error('Error fetching waste items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Filter waste items based on search query and status filter
  const filteredWasteItems = wasteItems.filter((item) => {
    // Filter by status
    if (statusFilter !== 'all' && item.status !== statusFilter) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.wasteType.toLowerCase().includes(query) ||
        item.farmerName.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'sold':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('nav.waste')}</h1>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search waste items..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        
        <div className="md:w-48">
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
      
      {/* Waste items table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : filteredWasteItems.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Waste Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Farmer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Added
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredWasteItems.map((item) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.wasteType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.farmerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{item.price}/{item.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FaTrash />
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
          <FaRecycle className="text-gray-400 text-5xl mb-4" />
          <p className="text-gray-600 text-lg">No waste items found</p>
        </div>
      )}
    </div>
  );
}

export default Waste; 