import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaSearch, FaEye, FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";

function Orders() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/get_waste_listings");
      if (response.data.success && Array.isArray(response.data.listings)) {
        const filteredListings = response.data.listings.filter((item) => item.status !== "active");
        const transformedListings = filteredListings.map((item) => ({
          id: item.id,
          farmerName: item.farmerName,
          wasteType: item.wasteType,
          quantity: item.quantity,
          unit: item.unit,
          price: item.priceOffered,
          location: item.location,
          description: item.description,
          availableFrom: item.createdAt,
          status: item.status,
        }));
        setOrders(transformedListings);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    if (!window.confirm(`Are you sure you want to update the status to ${newStatus}?`)) return;

    setActionLoading(true);
    try {
      const response = await axios.post(`http://127.0.0.1:5000/update-status/${orderId}`, {
        status: newStatus,
      });

      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: response.data.status } : order
          )
        );
        alert("Status updated successfully!");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update status.");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (statusFilter !== "all" && order.status !== statusFilter) return false;
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        order.id.toLowerCase().includes(searchLower) ||
        order.farmerName.toLowerCase().includes(searchLower) ||
        order.wasteType.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{t("orders.title")}</h1>
        <div className="flex space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder={t("Search orders...")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-4 pr-8 py-2 border border-gray-300 rounded-md"
          >
            <option value="all">{t("orders.all")}</option>
            <option value="pending">{t("orders.pending")}</option>
            <option value="confirmed">{t("orders.confirmed")}</option>
            <option value="completed">{t("orders.completed")}</option>
            <option value="cancelled">{t("orders.cancelled")}</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500">{t("orders.noOrders")}</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">{t("orders.orderID")}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">{t("orders.farmerName")}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">{t("orders.wasteType")}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">{t("orders.quantity")}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">{t("orders.status")}</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">{t("orders.actions")}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.farmerName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.wasteType}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.quantity} {order.unit}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => updateOrderStatus(order.id, "confirmed")} className="text-green-600"><FaCheck /></button>
                    <button onClick={() => updateOrderStatus(order.id, "cancelled")} className="text-red-600"><FaTimes /></button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Orders;
