import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaUsers, 
  FaRecycle, 
  FaShoppingCart, 
  FaRupeeSign, 
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaCalendarAlt
} from 'react-icons/fa';
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

function Overview() {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    // totalUsers: 0,
    totalWaste: 0,
    totalOrders: 0,
    totalRevenue: 0,
    revenueGrowth: 0,
    recentActivities: [],
    monthlyData: {
      labels: [],
      users: [],
      waste: [],
      orders: [],
      revenue: []
    }
  });

  useEffect(() => {
    fetchOverviewData();
    const interval = setInterval(fetchOverviewData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchOverviewData = () => {
    try {
      // Get all data from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const wastes = JSON.parse(localStorage.getItem('farmerWastes') || '[]');
      const orders = JSON.parse(localStorage.getItem('wasteOrders') || '[]');

      // Calculate monthly data
      const monthlyData = getMonthlyData(users, wastes, orders);
      
      // Calculate growth percentages
      const currentMonthRevenue = monthlyData.revenue[monthlyData.revenue.length - 1] || 0;
      const lastMonthRevenue = monthlyData.revenue[monthlyData.revenue.length - 2] || 0;
      const revenueGrowth = lastMonthRevenue ? ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 : 0;

      // Calculate total revenue
      const totalRevenue = orders.reduce((sum, order) => sum + (order.quantity * order.pricePerUnit), 0);

      setStats({
        totalUsers: users.length,
        totalWaste: wastes.length,
        totalOrders: orders.length,
        totalRevenue,
        revenueGrowth: revenueGrowth || 0,
        monthlyData
      });
    } catch (error) {
      console.error('Error fetching overview data:', error);
      // Set default values in case of error
      setStats(prevStats => ({
        ...prevStats,
        revenueGrowth: 0
      }));
    }
  };

  const getMonthlyData = (users, wastes, orders) => {
    const months = [];
    const userData = [];
    const wasteData = [];
    const orderData = [];
    const revenueData = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      months.push(date.toLocaleString('default', { month: 'short' }));

      // Calculate monthly statistics
      const monthUsers = users.filter(user => 
        new Date(user.createdAt).getMonth() === date.getMonth()
      ).length;

      const monthWastes = wastes.filter(waste =>
        new Date(waste.createdAt).getMonth() === date.getMonth()
      ).length;

      const monthOrders = orders.filter(order =>
        new Date(order.createdAt).getMonth() === date.getMonth()
      );

      const monthRevenue = monthOrders.reduce((sum, order) => 
        sum + (order.quantity * order.pricePerUnit), 0
      );

      userData.push(monthUsers);
      wasteData.push(monthWastes);
      orderData.push(monthOrders.length);
      revenueData.push(monthRevenue);
    }

    return {
      labels: months,
      users: userData,
      waste: wasteData,
      orders: orderData,
      revenue: revenueData
    };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{t('Overview ')}</h1>
        <p className="text-gray-600">{t('')}</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t('Total Users')}</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalUsers}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FaUsers className="text-blue-600 text-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <FaArrowUp className="text-green-500 mr-1" />
            <span className="text-green-500 font-medium">12%</span>
            <span className="text-gray-500 ml-2">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t('Total Waste')}</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalWaste}</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FaRecycle className="text-green-600 text-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <FaArrowUp className="text-green-500 mr-1" />
            <span className="text-green-500 font-medium">8%</span>
            <span className="text-gray-500 ml-2">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t('Total Orders')}</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalOrders}</h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <FaShoppingCart className="text-purple-600 text-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <FaArrowDown className="text-red-500 mr-1" />
            <span className="text-red-500 font-medium">3%</span>
            <span className="text-gray-500 ml-2">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t('Total Revenue')}</p>
              <h3 className="text-2xl font-bold text-gray-800">₹{stats.totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <FaRupeeSign className="text-yellow-600 text-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            {typeof stats.revenueGrowth === 'number' && (
              <>
                {stats.revenueGrowth >= 0 ? (
                  <FaArrowUp className="text-green-500 mr-1" />
                ) : (
                  <FaArrowDown className="text-red-500 mr-1" />
                )}
                <span className={stats.revenueGrowth >= 0 ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                  {Math.abs(stats.revenueGrowth).toFixed(1)}%
                </span>
                <span className="text-gray-500 ml-2">vs last month</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Trend */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {t('Revenue Trend')}
          </h3>
          <Line
            data={{
              labels: stats.monthlyData.labels,
              datasets: [{
                label: t('Revenue'),
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

        {/* Orders vs Waste */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {t('Orders Vs Waste')}
          </h3>
          <Bar
            data={{
              labels: stats.monthlyData.labels,
              datasets: [
                {
                  label: t('Orders'),
                  data: stats.monthlyData.orders,
                  backgroundColor: 'rgba(147, 51, 234, 0.5)'
                },
                {
                  label: t('Waste'),
                  data: stats.monthlyData.waste,
                  backgroundColor: 'rgba(34, 197, 94, 0.5)'
                }
              ]
            }}
          />
        </div>
      </div>

      {/* User Distribution */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {t('User Distribution')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64">
            <Doughnut
              data={{
                labels: [t('Farmers'), t('Buyers'), t('Admins')],
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
                <p className="text-sm text-gray-500">{t('Active Farmers')}</p>
                <p className="text-xl font-bold text-green-600">15</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-500">{t('Active Buyers')}</p>
                <p className="text-xl font-bold text-blue-600">25</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-500">{t('Total Transactions')}</p>
                <p className="text-xl font-bold text-yellow-600">150</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-500">{t('Active Listings')}</p>
                <p className="text-xl font-bold text-purple-600">45</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview; 