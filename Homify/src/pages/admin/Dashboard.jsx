import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaRecycle, FaExchangeAlt, FaChartPie, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalWaste: 0,
    totalOrders: 0,
    revenue: 0,
    revenueGrowth: 0,
    monthlyData: {
      labels: [],
      users: [],
      waste: [],
      orders: [],
      revenue: []
    },
    topWasteSales: {
      types: [],
      quantities: []
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // This would normally fetch from the API
      // For demo, we'll use mock data
      const mockTopWasteSales = {
        types: ['Crop Residue', 'Vegetable Waste', 'Fruit Peels', 'Coffee Grounds', 'Sugarcane Bagasse'],
        quantities: [3500, 2800, 2200, 1800, 1500]
      };

      const mockStats = {
        totalUsers: 156,
        totalWaste: 12500,
        totalOrders: 89,
        revenue: 45000,
        revenueGrowth: 12.5,
        monthlyData: generateMockMonthlyData(),
        topWasteSales: mockTopWasteSales
      };

      setStats(mockStats);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate mock monthly data for charts
  const generateMockMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    
    return {
      labels: months,
      users: [30, 45, 67, 89, 120, 156],
      waste: [2000, 3500, 5400, 7800, 10200, 12500],
      orders: [15, 28, 42, 53, 71, 89],
      revenue: [8000, 15000, 22000, 28000, 37000, 45000]
    };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <>
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              className="bg-white rounded-lg shadow-md p-6"
              whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Users</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.totalUsers}</h3>
                </div>
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <FaUsers className="text-2xl" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <FaArrowUp className="text-green-500 mr-1" />
                <span className="text-green-500 font-medium">12%</span>
                <span className="text-gray-500 ml-2">vs last month</span>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-white rounded-lg shadow-md p-6"
              whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Waste</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.totalWaste} kg</h3>
                </div>
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <FaRecycle className="text-2xl" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <FaArrowUp className="text-green-500 mr-1" />
                <span className="text-green-500 font-medium">8%</span>
                <span className="text-gray-500 ml-2">vs last month</span>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-white rounded-lg shadow-md p-6"
              whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Orders</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.totalOrders}</h3>
                </div>
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <FaExchangeAlt className="text-2xl" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <FaArrowDown className="text-red-500 mr-1" />
                <span className="text-red-500 font-medium">3%</span>
                <span className="text-gray-500 ml-2">vs last month</span>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-white rounded-lg shadow-md p-6"
              whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Revenue</p>
                  <h3 className="text-2xl font-bold text-gray-800">₹{stats.revenue.toLocaleString()}</h3>
                </div>
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <FaChartPie className="text-2xl" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                {stats.revenueGrowth >= 0 ? (
                  <FaArrowUp className="text-green-500 mr-1" />
                ) : (
                  <FaArrowDown className="text-red-500 mr-1" />
                )}
                <span className={stats.revenueGrowth >= 0 ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                  {Math.abs(stats.revenueGrowth).toFixed(1)}%
                </span>
                <span className="text-gray-500 ml-2">vs last month</span>
              </div>
            </motion.div>
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Revenue Trend */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Revenue Trend
              </h3>
              <Line
                data={{
                  labels: stats.monthlyData.labels,
                  datasets: [{
                    label: 'Revenue',
                    data: stats.monthlyData.revenue,
                    borderColor: 'rgb(234, 179, 8)',
                    tension: 0.4
                  }]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false
                    }
                  }
                }}
              />
            </div>

            {/* Top Waste Sales Chart */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Top Waste Sales by Type
              </h3>
              <Bar
                data={{
                  labels: stats.topWasteSales.types,
                  datasets: [
                    {
                      label: 'Quantity (kg)',
                      data: stats.topWasteSales.quantities,
                      backgroundColor: [
                        'rgba(34, 197, 94, 0.7)',
                        'rgba(59, 130, 246, 0.7)',
                        'rgba(234, 179, 8, 0.7)',
                        'rgba(147, 51, 234, 0.7)',
                        'rgba(249, 115, 22, 0.7)'
                      ],
                      borderColor: [
                        'rgb(34, 197, 94)',
                        'rgb(59, 130, 246)',
                        'rgb(234, 179, 8)',
                        'rgb(147, 51, 234)',
                        'rgb(249, 115, 22)'
                      ],
                      borderWidth: 1
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          return `${context.raw} kg`;
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Quantity (kg)'
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
          
          {/* User Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              User Distribution
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64">
                <Doughnut
                  data={{
                    labels: ['Farmers', 'Buyers', 'Admins'],
                    datasets: [{
                      data: [15, 25, 5],
                      backgroundColor: [
                        'rgba(34, 197, 94, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(234, 179, 8, 0.8)'
                      ]
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false
                  }}
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-500">Active Farmers</p>
                    <p className="text-xl font-bold text-green-600">15</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-500">Active Buyers</p>
                    <p className="text-xl font-bold text-blue-600">25</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-gray-500">Total Transactions</p>
                    <p className="text-xl font-bold text-yellow-600">150</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-500">Active Listings</p>
                    <p className="text-xl font-bold text-purple-600">45</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          
        </>
      )}
    </div>
  );
}

export default Dashboard;