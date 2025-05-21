import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";  
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaLeaf, FaRecycle } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    role: 'buyer',  // Default role is buyer
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} with value:`, value); // Debugging

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate Form Inputs
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (!formData.address.trim()) errors.address = "Address is required";

    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with role:", formData.role); // Debugging

    setErrorMessage("");
    setIsSubmitting(true);

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      console.log("User registered successfully:", userCredential.user);

      // Redirect based on role (debugging role before navigating)
      console.log("Navigating to:", formData.role);
      
      if (formData.role === 'farmer') {
        navigate('/farmer');
      } else if (formData.role === 'buyer') {
        navigate('/buyer');
      } else if (formData.role === 'admin') {
        navigate('/admin');
      } else {
        console.error("Unknown role selected:", formData.role);
      }

    } catch (error) {
      console.error("Error signing up:", error.message);
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col justify-center py-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-green-200 opacity-30">
        <FaLeaf size={120} />
      </div>
      <div className="absolute bottom-10 right-10 text-green-200 opacity-30">
        <FaRecycle size={120} />
      </div>
      
      {/* Circular decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-200 rounded-full opacity-20"></div>
      <div className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-green-300 rounded-full opacity-20"></div>
      
      <div className="sm:w-full sm:max-w-md mx-auto px-4 relative z-10">
        <div className="flex justify-center">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="text-green-600 mb-2"
          >
            <FaRecycle size={40} />
          </motion.div>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          <span className="text-green-700">Agri</span> 
          <span className="text-green-500">Waste</span> 
          <span className="text-green-600">Connect</span>
        </h2>
        <h3 className="text-center text-xl font-bold text-gray-800 mt-2">Sign Up</h3>
        <p className="text-center text-sm text-gray-600 mt-2">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-green-600 hover:text-green-500 underline">Sign In</Link>
        </p>

        <form className="space-y-4 mt-8 bg-white p-8 shadow-lg rounded-lg border border-green-100" onSubmit={handleSubmit}>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200 flex items-center"
            >
              <span className="mr-2">⚠️</span>
              {errorMessage}
            </motion.div>
          )}
          
          {/* Name Input */}
          <InputField
            id="name"
            label="Name"
            icon={<FaUser className="text-green-500" />}
            type="text"
            value={formData.name}
            onChange={handleChange}
            error={formErrors.name}
          />

          {/* Email Input */}
          <InputField
            id="email"
            label="Email"
            icon={<FaEnvelope className="text-green-500" />}
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email}
          />

          {/* Password Input */}
          <InputField
            id="password"
            label="Password"
            icon={<FaLock className="text-green-500" />}
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
          />

          {/* Confirm Password Input */}
          <InputField
            id="confirmPassword"
            label="Confirm Password"
            icon={<FaLock className="text-green-500" />}
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={formErrors.confirmPassword}
          />

          {/* Phone Input */}
          <InputField
            id="phone"
            label="Phone"
            icon={<FaPhone className="text-green-500" />}
            type="text"
            value={formData.phone}
            onChange={handleChange}
            error={formErrors.phone}
          />

          {/* Address Input */}
          <InputField
            id="address"
            label="Address"
            icon={<FaMapMarkerAlt className="text-green-500" />}
            type="text"
            value={formData.address}
            onChange={handleChange}
            error={formErrors.address}
          />

          {/* Role Selection */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Select Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-green-500 focus:border-green-500 transition-all duration-200"
            >
              <option value="farmer">Farmer</option>
              <option value="buyer">Buyer</option>
              <option value="admin">Admin</option>
            </select>
            {formErrors.role && <p className="text-red-600 text-sm mt-1">{formErrors.role}</p>}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 mt-6 rounded-md shadow-sm font-medium transition-all duration-200 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing up...
              </span>
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
}

// Input Field Component (Reusable)
const InputField = ({ id, label, icon, type, value, onChange, error }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        className={`block w-full pl-10 pr-3 py-2 border ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'} rounded-md focus:outline-none transition-all duration-200`}
      />
    </div>
    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  </div>
);

export default Register;