import React, { useState, useEffect } from 'react';
import { FaBan, FaTrash, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';

function ManageBuyers() {
  const dummyBuyers = [
    { id: 1, name: "Rahul Sharma", email: "rahul@example.com", status: "active" },
    { id: 2, name: "Ananya Verma", email: "ananya@example.com", status: "blocked" },
    { id: 3, name: "Vikas Patel", email: "vikas@example.com", status: "active" },
    { id: 4, name: "Pooja Singh", email: "pooja@example.com", status: "active" },
    { id: 5, name: "Amit Reddy", email: "amit@example.com", status: "blocked" },
    { id: 6, name: "Kiran Mehta", email: "kiran@example.com", status: "active" },
  ];

  const [buyers, setBuyers] = useState(dummyBuyers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // 'all', 'active', 'blocked'
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const buyersPerPage = 5;

  // Filter buyers based on search and status
  const filteredBuyers = buyers.filter(buyer => {
    const matchesSearch =
      buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      buyer.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "all" || buyer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredBuyers.length / buyersPerPage);
  const indexOfLastBuyer = currentPage * buyersPerPage;
  const indexOfFirstBuyer = indexOfLastBuyer - buyersPerPage;
  const currentBuyers = filteredBuyers.slice(indexOfFirstBuyer, indexOfLastBuyer);

  const handleBlockBuyer = (buyerId) => {
    const updatedBuyers = buyers.map(buyer =>
      buyer.id === buyerId
        ? { ...buyer, status: buyer.status === "blocked" ? "active" : "blocked" }
        : buyer
    );
    setBuyers(updatedBuyers);
    toast.success("Buyer status updated!");
  };

  const handleDeleteBuyer = (buyerId) => {
    setBuyers(buyers.filter(buyer => buyer.id !== buyerId));
    toast.success("Buyer deleted successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Buyers</h1>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search Buyers"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {/* Buyers Table */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Available Buyers</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Buyer Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentBuyers.map((buyer) => (
                <tr key={buyer.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{buyer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{buyer.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        buyer.status === "blocked"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {buyer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleBlockBuyer(buyer.id)}
                      className="text-yellow-600 hover:text-yellow-900 mr-3"
                    >
                      <FaBan />
                    </button>
                    <button
                      onClick={() => handleDeleteBuyer(buyer.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 flex justify-between">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border text-sm font-medium rounded-md"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="ml-3 px-4 py-2 border text-sm font-medium rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageBuyers;
