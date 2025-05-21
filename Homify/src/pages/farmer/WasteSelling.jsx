import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

function WasteSelling() {
  const [wasteListings, setWasteListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentListing, setCurrentListing] = useState(null);
  const [formData, setFormData] = useState({
    wasteType: '',
    quantity: '',
    unit: 'kg',
    price: '',
    location: '',
    description: '',
    availableFrom: '',
    availableTo: '',
    images: []
  });
  
  useEffect(() => {
    fetchWasteListings();
  }, []);
  
  const fetchWasteListings = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/farmer/waste-listings');
      setWasteListings(response.data);
    } catch (error) {
      console.error('Error fetching waste listings:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleOpenModal = (listing = null) => {
    if (listing) {
      setCurrentListing(listing);
      setFormData({
        wasteType: listing.wasteType,
        quantity: listing.quantity,
        unit: listing.unit,
        price: listing.price,
        location: listing.location,
        description: listing.description,
        availableFrom: listing.availableFrom.split('T')[0],
        availableTo: listing.availableTo.split('T')[0],
        images: listing.images
      });
    } else {
      setCurrentListing(null);
      setFormData({
        wasteType: '',
        quantity: '',
        unit: 'kg',
        price: '',
        location: '',
        description: '',
        availableFrom: '',
        availableTo: '',
        images: []
      });
    }
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleImageUpload = (e) => {
    // Handle image upload logic here
    // This is a simplified version
    const files = Array.from(e.target.files);
    // In a real app, you would upload these to a server and get URLs back
    const imageUrls = files.map(file => URL.createObjectURL(file));
    
    setFormData({
      ...formData,
      images: [...formData.images, ...imageUrls]
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (currentListing) {
        // Update existing listing
        await api.put(`/farmer/waste-listings/${currentListing.id}`, formData);
      } else {
        // Create new listing
        await api.post('/farmer/waste-listings', formData);
      }
      
      fetchWasteListings();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving waste listing:', error);
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await api.delete(`/farmer/waste-listings/${id}`);
        fetchWasteListings();
      } catch (error) {
        console.error('Error deleting waste listing:', error);
      }
    }
  };
  
  const wasteTypeOptions = [
    'Crop Residue',
    'Rice Straw',
    'Wheat Straw',
    'Corn Stalks',
    'Sugarcane Bagasse',
    'Coconut Shells',
    'Fruit Peels',
    'Coffee Grounds',
    'Vegetable Waste',
    'Other'
  ];
  
  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-800">Waste Selling Portal</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleOpenModal()}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FaPlus className="mr-2" />
            Add New Listing
          </motion.button>
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search listings..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : wasteListings.length === 0 ? (
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <h3 className="text-lg font-medium text-gray-700 mb-2">No waste listings yet</h3>
            <p className="text-gray-500 mb-4">Create your first listing to start selling your crop waste</p>
            <button
              onClick={() => handleOpenModal()}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              Create Listing
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wasteListings.map((listing) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={listing.images[0] || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80"}
                    alt={listing.wasteType}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={() => handleOpenModal(listing)}
                      className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
                    >
                      <FaEdit className="text-green-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(listing.id)}
                      className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
                    >
                      <FaTrash className="text-red-600" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{listing.wasteType}</h3>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      ₹{listing.price}/{listing.unit}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-2">
                    Quantity: {listing.quantity} {listing.unit}
                  </p>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    Location: {listing.location}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Available: {new Date(listing.availableFrom).toLocaleDateString()} - {new Date(listing.availableTo).toLocaleDateString()}
                    </span>
                    
                    <span className={`text-xs px-2 py-1 rounded ${
                      listing.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {listing.status === 'active' ? 'Active' : 'Pending'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Add/Edit Listing Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                {currentListing ? 'Edit Waste Listing' : 'Add New Waste Listing'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Waste Type
                  </label>
                  <select
                    name="wasteType"
                    value={formData.wasteType}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select waste type</option>
                    {wasteTypeOptions.map((type) => (
                      <option key={type} value={type}>{type}</option>
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
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="kg">kg</option>
                      <option value="ton">ton</option>
                      <option value="quintal">quintal</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₹ per {formData.unit})
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Available From
                  </label>
                  <input
                    type="date"
                    name="availableFrom"
                    value={formData.availableFrom}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Available To
                  </label>
                  <input
                    type="date"
                    name="availableTo"
                    value={formData.availableTo}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Images
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  
                  {formData.images.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative w-20 h-20">
                          <img
                            src={image}
                            alt={`Preview ${index}`}
                            className="w-full h-full object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                images: formData.images.filter((_, i) => i !== index)
                              });
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  {currentListing ? 'Update Listing' : 'Create Listing'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default WasteSelling; 