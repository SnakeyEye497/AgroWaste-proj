import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaChartLine, 
  FaBoxOpen, 
  FaRupeeSign, 
  FaShoppingCart,
  FaCalendarAlt,
  FaChartBar
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

function SalesDashboard() {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [salesData, setSalesData] = useState({
    totalSales: 0,
    monthlyRevenue: 0,
    totalOrders: 0,
    activeListings: 0
  });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = () => {
    // Get waste listings from localStorage
    const allWastes = JSON.parse(localStorage.getItem('farmerWastes') || '[]');
    const farmerWastes = allWastes.filter(waste => waste.farmerId === currentUser?.uid);
    
    // Get orders from localStorage
    const allOrders = JSON.parse(localStorage.getItem('wasteOrders') || '[]');
    const farmerOrders = allOrders.filter(order => order.farmerId === currentUser?.uid);
    
    // Calculate monthly sales for the last 6 months
    const last6Months = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthOrders = farmerOrders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate.getMonth() === date.getMonth() &&
               orderDate.getFullYear() === date.getFullYear();
      });
      
      const monthTotal = monthOrders.reduce((sum, order) => 
        sum + (order.quantity * order.pricePerUnit), 0
      );

      last6Months.unshift({
        month: date.toLocaleString('default', { month: 'short' }),
        sales: monthTotal,
        orders: monthOrders.length
      });
    }
    setMonthlySales(last6Months);

    // Calculate overall statistics
    setSalesData({
      totalSales: farmerOrders.reduce((sum, order) => sum + (order.quantity * order.pricePerUnit), 0),
      monthlyRevenue: last6Months[last6Months.length - 1]?.sales || 0,
      totalOrders: farmerOrders.length,
      activeListings: farmerWastes.filter(waste => waste.status === 'available').length
    });

    // Set recent transactions
    const sortedOrders = [...farmerOrders]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
    setRecentTransactions(sortedOrders);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {t('dashboard.salesDashboard')}
      </h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-500">{t('dashboard.monthlyRevenue')}</div>
            <div className="p-2 bg-green-100 rounded-full">
              <FaChartLine className="text-green-600 text-xl" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {formatCurrency(salesData.monthlyRevenue)}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-500">{t('dashboard.totalSales')}</div>
            <div className="p-2 bg-blue-100 rounded-full">
              <FaRupeeSign className="text-blue-600 text-xl" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {formatCurrency(salesData.totalSales)}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-500">{t('dashboard.totalOrders')}</div>
            <div className="p-2 bg-purple-100 rounded-full">
              <FaShoppingCart className="text-purple-600 text-xl" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {salesData.totalOrders}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-500">{t('dashboard.activeListings')}</div>
            <div className="p-2 bg-yellow-100 rounded-full">
              <FaBoxOpen className="text-yellow-600 text-xl" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {salesData.activeListings}
          </div>
        </div>
      </div>

      {/* Monthly Sales Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            {t('dashboard.monthlySales')}
          </h2>
          <div className="p-2 bg-blue-100 rounded-full">
            <FaChartBar className="text-blue-600 text-xl" />
          </div>
        </div>
        
        <div className="grid grid-cols-6 gap-4 mb-4">
          {monthlySales.map((data, index) => {
            const maxSales = Math.max(...monthlySales.map(m => m.sales));
            const heightPercentage = maxSales ? (data.sales / maxSales) * 100 : 0;
            
            return (
              <div key={index} className="flex flex-col items-center">
                <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '150px' }}>
                  <div
                    className="absolute bottom-0 w-full bg-green-500 rounded-t-lg transition-all duration-500"
                    style={{ height: `${heightPercentage}%` }}
                  ></div>
                </div>
                <div className="text-sm font-medium text-gray-600 mt-2">{data.month}</div>
                <div className="text-xs text-gray-500">{formatCurrency(data.sales)}</div>
                <div className="text-xs text-gray-500">{data.orders} orders</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            {t('dashboard.recentTransactions')}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('dashboard.orderDate')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('dashboard.wasteType')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('dashboard.quantity')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('dashboard.amount')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('dashboard.status')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaCalendarAlt className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {formatDate(transaction.createdAt)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{transaction.wasteType}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {transaction.quantity} {transaction.unit}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {formatCurrency(transaction.quantity * transaction.pricePerUnit)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    {t('dashboard.noTransactions')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SalesDashboard; 