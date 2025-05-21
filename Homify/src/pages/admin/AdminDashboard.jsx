import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FaUsers, FaRecycle, FaShoppingCart, FaRupeeSign, 
  FaBell, FaUserCog, FaChartPie, FaListAlt,
  FaExclamationTriangle, FaCheckCircle, FaChartLine
} from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalWaste: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingApprovals: 0,
    activeListings: 0,
    monthlyData: {
      labels: [],
      users: [],
      waste: [],
      orders: [],
      revenue: []
    }
  });
  const [notifications, setNotifications] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    createSampleData();
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = () => {
    try {
      // Fetch users
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const wastes = JSON.parse(localStorage.getItem('farmerWastes') || '[]');
      const orders = JSON.parse(localStorage.getItem('wasteOrders') || '[]');
      const queries = JSON.parse(localStorage.getItem('farmerQueries') || '[]');

      // Calculate monthly data
      const monthlyData = {
        labels: [],
        users: [],
        waste: [],
        orders: [],
        revenue: []
      };

      // Get last 6 months
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthYear = date.toLocaleString('default', { month: 'short' });
        monthlyData.labels.push(monthYear);

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

        monthlyData.users.push(monthUsers);
        monthlyData.waste.push(monthWastes);
        monthlyData.orders.push(monthOrders.length);
        monthlyData.revenue.push(monthRevenue);
      }

      // Calculate stats
      const pendingQueries = queries.filter(q => q.status === 'pending').length;
      const activeWastes = wastes.filter(w => w.status === 'available').length;
      const totalRevenue = orders.reduce((sum, order) => sum + (order.quantity * order.pricePerUnit), 0);

      // Set notifications
      const newNotifications = [
        ...queries.filter(q => q.status === 'pending').map(q => ({
          type: 'query',
          message: `New query from ${q.farmerName}`,
          time: new Date(q.createdAt).toLocaleString()
        })),
        ...orders.filter(o => o.status === 'pending').map(o => ({
          type: 'order',
          message: `New order worth ₹${o.quantity * o.pricePerUnit}`,
          time: new Date(o.createdAt).toLocaleString()
        }))
      ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5);

      // Update stats with all data
      setStats({
        totalUsers: users.length,
        totalWaste: wastes.length,
        totalOrders: orders.length,
        totalRevenue,
        pendingApprovals: pendingQueries,
        activeListings: activeWastes,
        monthlyData
      });

      setNotifications(newNotifications);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const createSampleData = () => {
    const users = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 2 === 0 ? 'farmer' : 'buyer',
      createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString()
    }));

    const wastes = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      type: `Waste Type ${i + 1}`,
      quantity: Math.floor(Math.random() * 100) + 10,
      price: Math.floor(Math.random() * 1000) + 100,
      status: 'available',
      createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString()
    }));

    const orders = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      quantity: Math.floor(Math.random() * 50) + 5,
      pricePerUnit: Math.floor(Math.random() * 500) + 50,
      status: 'pending',
      createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString()
    }));

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('farmerWastes', JSON.stringify(wastes));
    localStorage.setItem('wasteOrders', JSON.stringify(orders));
  };

  const QuickActionCard = ({ icon: Icon, title, value, link, color }) => (
    <Link to={link} className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <Icon className="text-3xl opacity-80" />
      </div>
    </Link>
  );

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'System Overview'
      }
    }
  };

  const chartData = {
    labels: stats.monthlyData.labels,
    datasets: [
      {
        label: 'Users',
        data: stats.monthlyData.users,
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.1
      },
      {
        label: 'Waste Listings',
        data: stats.monthlyData.waste,
        borderColor: 'rgb(34, 197, 94)',
        tension: 0.1
      },
      {
        label: 'Orders',
        data: stats.monthlyData.orders,
        borderColor: 'rgb(168, 85, 247)',
        tension: 0.1
      },
      {
        label: 'Revenue (₹)',
        data: stats.monthlyData.revenue,
        borderColor: 'rgb(234, 179, 8)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-6 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">{t('admin.dashboard.welcome')}</h1>
          <p className="opacity-90">{t('admin.dashboard.welcomeMessage')}</p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <QuickActionCard
            icon={FaUsers}
            title={t('TotalUsers')}
            value={stats.totalUsers}
            link="/admin/manage-users"
            color="hover:bg-blue-50"
          />
          <QuickActionCard
            icon={FaRecycle}
            title={t('admin.dashboard.activeListings')}
            value={stats.activeListings}
            link="/admin/manage-waste"
            color="hover:bg-green-50"
          />
          <QuickActionCard
            icon={FaExclamationTriangle}
            title={t('admin.dashboard.pendingApprovals')}
            value={stats.pendingApprovals}
            link="/admin/approvals"
            color="hover:bg-yellow-50"
          />
          <QuickActionCard
            icon={FaRupeeSign}
            title={t('TotalRevenue')}
            value={`₹${stats.totalRevenue.toLocaleString()}`}
            link="/admin/finance"
            color="hover:bg-purple-50"
          />
        </div>

        {/* Add Chart Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaChartLine className="mr-2 text-green-600" />
            {t('admin.dashboard.overview')}
          </h2>
          <div className="h-80">
            <Line options={chartOptions} data={chartData} />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FaListAlt className="mr-2 text-green-600" />
                {t('admin.dashboard.recentActivities')}
              </h2>
              <div className="space-y-4">
                {notifications.map((notification, index) => (
                  <div key={index} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    {notification.type === 'query' ? (
                      <FaUserCog className="text-blue-500 mt-1" />
                    ) : (
                      <FaShoppingCart className="text-green-500 mt-1" />
                    )}
                    <div className="ml-3">
                      <p className="text-sm text-gray-800">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaBell className="mr-2 text-green-600" />
              {t('admin.dashboard.quickActions')}
            </h2>
            <div className="space-y-3">
              <Link 
                to="/admin/manage-farmers"
                className="block p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-center">
                  <FaUsers className="text-blue-600" />
                  <span className="ml-3 text-blue-900">Manage Farmers</span>
                </div>
              </Link>
              <Link 
                to="/admin/manage-buyers"
                className="block p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
              >
                <div className="flex items-center">
                  <FaShoppingCart className="text-green-600" />
                  <span className="ml-3 text-green-900">Manage Buyers</span>
                </div>
              </Link>
              <Link 
                to="/admin/overview"
                className="block p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors"
              >
                <div className="flex items-center">
                  <FaChartPie className="text-purple-600" />
                  <span className="ml-3 text-purple-900">View Analytics</span>
                </div>
              </Link>
              <Link 
                to="/admin/approvals"
                className="block p-3 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition-colors"
              >
                <div className="flex items-center">
                  <FaCheckCircle className="text-yellow-600" />
                  <span className="ml-3 text-yellow-900">Pending Approvals</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard; 


