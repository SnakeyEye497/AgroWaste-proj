import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTruck, FaMapMarkerAlt, FaBox, FaCheck } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

function FarmerTransport() {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
    // Set up real-time updates
    const interval = setInterval(loadOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadOrders = () => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('wasteOrders') || '[]');
      const farmerOrders = savedOrders.filter(order => order.farmerId === currentUser.uid);
      setOrders(farmerOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'allocated': return 'bg-blue-100 text-blue-800';
      case 'dispatched': return 'bg-yellow-100 text-yellow-800';
      case 'in_transit': return 'bg-purple-100 text-purple-800';
      case 'arrived': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{t('transport.farmerTitle')}</h1>
        <p className="text-gray-600">{t('transport.farmerSubtitle')}</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{order.wasteType}</h3>
                <p className="text-sm text-gray-600">
                  {t('transport.orderNumber')}: #{order.id}
                </p>
              </div>
              {order.transport ? (
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.transport.status)}`}>
                  {t(`transport.status.${order.transport.status}`)}
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                  {t('transport.waitingForAllocation')}
                </span>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <FaBox className="mr-2" />
                  <span>{order.quantity} {order.unit}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{order.location}</span>
                </div>
              </div>

              {order.transport && (
                <div className="space-y-2">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="font-medium text-gray-700 mb-2">{t('transport.vehicleDetails')}:</p>
                    <div className="flex items-center text-gray-600">
                      <FaTruck className="mr-2 text-green-600" />
                      <span>{order.transport.vehicleType}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {order.transport && order.transport.timeline && (
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">{t('transport.timeline')}</h4>
                <div className="space-y-3">
                  {order.transport.timeline.map((event, index) => (
                    <div key={index} className="flex items-center">
                      <div className="relative">
                        <FaCheck className="text-green-500 text-xl" />
                        {index !== order.transport.timeline.length - 1 && (
                          <div className="absolute top-6 left-[0.7rem] w-0.5 h-full -mt-6 bg-green-200" />
                        )}
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-gray-800">
                          {t(`transport.status.${event.status}`)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(event.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!order.transport && (
              <div className="flex items-center justify-center p-4 border-t">
                <div className="animate-pulse flex items-center text-gray-600">
                  <FaTruck className="mr-2" />
                  <span>{t('transport.waitingMessage')}</span>
                </div>
              </div>
            )}
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-8 bg-white rounded-lg shadow-md">
            <p className="text-gray-600">{t('transport.noOrders')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FarmerTransport; 