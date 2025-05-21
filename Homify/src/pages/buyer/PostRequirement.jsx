import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { FaPlus, FaEdit, FaTrash, FaLeaf } from 'react-icons/fa';

function PostRequirement() {
  const [requirements, setRequirements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRequirement, setCurrentRequirement] = useState(null);
  const [formData, setFormData] = useState({
    wasteType: '',
    quantity: '',
    unit: 'kg',
    priceOffered: '',
    location: '',
    description: '',
    requiredBy: '',
    transportIncluded: false,
  });
  
  useEffect(() => {
    fetchRequirements();
  }, []);
  
  const fetchRequirements = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/transport');
      
      if (response.data.success && Array.isArray(response.data.listings)) {
        // Filter only listings where status is "disable"
        const filteredListings = response.data.listings.filter(
          (item) => item.status === "active"
        );
  
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
        }));
  

      setRequirements(response.data);
      }
    } catch (error) {
      console.error('Error fetching requirements:', error);
      // Mock data for demonstration
      const mockRequirements = [
        {
          id: 1,
          wasteType: 'Rice Straw',
          quantity: 1000,
          unit: 'kg',
          priceOffered: 2.8,
          location: 'Delhi NCR',
          description: 'Looking for clean rice straw for mushroom cultivation. Must be dry and free from pesticides.',
          requiredBy: '2023-11-30',
          transportIncluded: true,
          status: 'active',
          responses: 3,
          createdAt: '2023-10-05',
        },
        {
          id: 2,
          wasteType: 'Sugarcane Bagasse',
          quantity: 500,
          unit: 'kg',
          priceOffered: 2.0,
          location: 'Mumbai, Maharashtra',
          description: 'Need sugarcane bagasse for paper manufacturing. Quality should be good with minimal impurities.',
          requiredBy: '2023-12-15',
          transportIncluded: false,
          status: 'active',
          responses: 5,
          createdAt: '2023-10-08',
        },
        {
          id: 3,
          wasteType: 'Wheat Straw',
          quantity: 800,
          unit: 'kg',
          priceOffered: 3.2,
          location: 'Chandigarh, Punjab',
          description: 'Seeking wheat straw for animal feed production. Must be clean and dry.',
          requiredBy: '2023-11-20',
          transportIncluded: true,
          status: 'fulfilled',
          responses: 7,
          createdAt: '2023-09-25',
        },
      ];
      setRequirements(mockRequirements);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleOpenModal = (requirement = null) => {
    if (requirement) {
      setCurrentRequirement(requirement);
      setFormData({
        wasteType: requirement.wasteType,
        quantity: requirement.quantity,
        unit: requirement.unit,
        priceOffered: requirement.priceOffered,
        location: requirement.location,
        description: requirement.description,
        requiredBy: requirement.requiredBy,
        transportIncluded: requirement.transportIncluded,
      });
    } else {
      setCurrentRequirement(null);
      setFormData({
        wasteType: '',
        quantity: '',
        unit: 'kg',
        priceOffered: '',
        location: '',
        description: '',
        requiredBy: '',
        transportIncluded: false,
      });
    }
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentRequirement) {
        await api.put(`/buyer/requirements/${currentRequirement.id}`, formData);
        setRequirements(requirements.map(req => 
          req.id === currentRequirement.id ? { ...req, ...formData } : req
        ));
      } else {
        const response = await api.post('/buyer/requirements', formData);
        setRequirements([...requirements, response.data]);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving requirement:', error);
      // For demonstration, simulate successful save
      if (currentRequirement) {
        setRequirements(requirements.map(req => 
          req.id === currentRequirement.id ? { 
            ...req, 
            ...formData,
            status: 'active',
          } : req
        ));
      } else {
        const newRequirement = {
          id: requirements.length + 1,
          ...formData,
          status: 'active',
          responses: 0,
          createdAt: new Date().toISOString().split('T')[0],
        };
        setRequirements([...requirements, newRequirement]);
      }
      handleCloseModal();
    }
  };
  
  const handleDeleteRequirement = async (id) => {
    if (window.confirm('Are you sure you want to delete this requirement?')) {
      try {
        await api.delete(`/buyer/requirements/${id}`);
        setRequirements(requirements.filter(req => req.id !== id));
      } catch (error) {
        console.error('Error deleting requirement:', error);
        // For demonstration, simulate successful delete
        setRequirements(requirements.filter(req => req.id !== id));
      }
    }
  };
  
  const wasteTypeOptions = [
    'Rice Straw',
    'Wheat Straw',
    'Corn Stalks',
    'Sugarcane Bagasse',
    'Vegetable Waste',
    'Rice Husk',
    'Coconut Shells',
    'Fruit Peels',
    'Coffee Grounds',
    'Other',
  ];
  
  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Requirements</h1>
          
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <FaPlus />
            <span>Post New Requirement</span>
          </button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : requirements.length === 0 ? (
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <h3 className="text-lg font-medium text-gray-700 mb-2">No requirements posted yet</h3>
            <p className="text-gray-500">Click the button above to post your first requirement</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Waste Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price Offered
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Required By
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Responses
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requirements.map((requirement) => (
                  <tr key={requirement.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaLeaf className="text-green-500 mr-2" />
                        <div className="text-sm font-medium text-gray-900">{requirement.wasteType}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{requirement.quantity} {requirement.unit}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹{requirement.priceOffered}/{requirement.unit}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{requirement.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(requirement.requiredBy).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        requirement.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : requirement.status === 'fulfilled'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {requirement.status.charAt(0).toUpperCase() + requirement.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{requirement.responses}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleOpenModal(requirement)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteRequirement(requirement.id)}
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
        )}
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {currentRequirement ? 'Edit Requirement' : 'Post New Requirement'}
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Waste Type
                    </label>
                    <select
                      name="wasteType"
                      value={formData.wasteType}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Waste Type</option>
                      {wasteTypeOptions.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div className="w-24">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Unit
                      </label>
                      <select
                        name="unit"
                        value={formData.unit}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="kg">kg</option>
                        <option value="ton">ton</option>
                        <option value="quintal">quintal</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price Offered (₹ per {formData.unit})
                    </label>
                    <input
                      type="number"
                      name="priceOffered"
                      value={formData.priceOffered}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Required By
                    </label>
                    <input
                      type="date"
                      name="requiredBy"
                      value={formData.requiredBy}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center h-full pt-6">
                    <input
                      type="checkbox"
                      id="transportIncluded"
                      name="transportIncluded"
                      checked={formData.transportIncluded}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="transportIncluded" className="ml-2 block text-sm text-gray-700">
                      I will arrange transport
                    </label>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {currentRequirement ? 'Update Requirement' : 'Post Requirement'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default PostRequirement; 