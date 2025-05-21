import React, { useState } from "react";
import axios from "axios";

const FarmerQueryForm = () => {
  const [formData, setFormData] = useState({
    farmerName: "",
    email: "",
    queryType: "",
    queryDescription: "",
  });

  const [isQueryPosted, setIsQueryPosted] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.farmerName || !formData.email || !formData.queryType || !formData.queryDescription) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // Send data to Flask backend
      const response = await axios.post("http://127.0.0.1:5000/api/save_query", formData);
      alert(response.data.message);

      // Show success message and reset form
      setIsQueryPosted(true);
      setFormData({
        farmerName: "",
        email: "",
        queryType: "",
        queryDescription: "",
      });
    } catch (error) {
      alert("Error submitting query!");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Farmer Query Form
        </h2>

        {isQueryPosted ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Query Posted Successfully! </strong>
            <span className="block sm:inline">Our team will get back to you soon.</span>
            <button 
              onClick={() => setIsQueryPosted(false)}
              className="absolute top-0 bottom-0 right-0 px-4 py-3 text-green-700 hover:text-green-900"
            >
              ×
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Farmer Name Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Farmer Name</label>
              <input
                type="text"
                name="farmerName"
                value={formData.farmerName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Query Type Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Query Type</label>
              <input
                type="text"
                name="queryType"
                value={formData.queryType}
                onChange={handleChange}
                placeholder="Enter query type (e.g., Crop Advice)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Query Description Textarea */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Query Description</label>
              <textarea
                name="queryDescription"
                value={formData.queryDescription}
                onChange={handleChange}
                placeholder="Describe your query in detail"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors duration-300 font-semibold"
            >
              Post Query
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FarmerQueryForm;
