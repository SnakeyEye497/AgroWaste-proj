import { useState, useEffect } from "react";
import { FaSearch, FaBan, FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const FarmersList = () => {
  const { t } = useTranslation(); // Ensure translations work
  const staticFarmers = [
    { id: 1, name: "Rajesh Kumar", email: "rajesh@example.com", status: "active" },
    { id: 2, name: "Priya Sharma", email: "priya@example.com", status: "active" },
    { id: 3, name: "Amit Singh", email: "amit@example.com", status: "active" },
    { id: 4, name: "Suresh Patil", email: "suresh@example.com", status: "active" },
    { id: 5, name: "Deepika Rao", email: "deepika@example.com", status: "active" },
    { id: 6, name: "Manoj Verma", email: "manoj@example.com", status: "active" },
    { id: 7, name: "Sunita Yadav", email: "sunita@example.com", status: "active" },
  ];

  const [farmers, setFarmers] = useState(staticFarmers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [queries, setQueries] = useState([]); // State for queries
  const [loading, setLoading] = useState(true);
  const farmersPerPage = 5;

  // Fetch farmer queries from API
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/get_farmers_queries");
        const data = await response.json();
        if (data.success) {
          setQueries(data.queries);
        }
      } catch (error) {
        console.error("Error fetching queries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  // Search functionality
  const filteredFarmers = farmers.filter((farmer) =>
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredFarmers.length / farmersPerPage);
  const indexOfLastFarmer = currentPage * farmersPerPage;
  const indexOfFirstFarmer = indexOfLastFarmer - farmersPerPage;
  const currentFarmers = filteredFarmers.slice(indexOfFirstFarmer, indexOfLastFarmer);

  // Block/unblock farmer
  const handleBlockFarmer = (id) => {
    setFarmers(
      farmers.map((farmer) =>
        farmer.id === id
          ? { ...farmer, status: farmer.status === "blocked" ? "active" : "blocked" }
          : farmer
      )
    );
  };

  // Delete farmer
  const handleDeleteFarmer = (id) => {
    setFarmers(farmers.filter((farmer) => farmer.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Display Farmers</h1>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search Farmers"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Farmers Table */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Available Farmers</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Farmer Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentFarmers.map((farmer) => (
                <tr key={farmer.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{farmer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{farmer.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        farmer.status === "blocked"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}>
                      {farmer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button onClick={() => handleBlockFarmer(farmer.id)} className="text-yellow-600 hover:text-yellow-900 mr-3">
                      <FaBan />
                    </button>
                    <button onClick={() => handleDeleteFarmer(farmer.id)} className="text-red-600 hover:text-red-900">
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
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 border text-sm font-medium rounded-md">
            Previous
          </button>
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="ml-3 px-4 py-2 border text-sm font-medium rounded-md">
            Next
          </button>
        </div>
      </div>

      {/* Farmer Queries */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{t('Farmer Queries')}</h1>

      {loading ? (
        <p className="text-center py-4">{t('Loading...')}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('Query ID')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('Farmer Name')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('Email')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('Query Type')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('Description')}</th>
              </tr>
            </thead>
            <tbody>
              {queries.length === 0 ? <tr><td colSpan="5" className="px-6 py-4 text-center">{t('No queries available')}</td></tr> : queries.map(query => (
                <tr key={query.id}>
                  <td>{query.id}</td>
                  <td>{query.farmerName}</td>
                  <td>{query.email}</td>
                  <td>{query.queryType}</td>
                  <td>{query.queryDescription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FarmersList;
