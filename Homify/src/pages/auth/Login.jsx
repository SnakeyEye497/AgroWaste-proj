import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaLeaf, FaRecycle } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "buyer", // Default role
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      console.log("User logged in:", user.email);

      // Fetch user role from a reliable source (e.g., database or predefined user info)
      let userRole = formData.role; // Assuming role is selected from dropdown
      localStorage.setItem("user", JSON.stringify({ email: user.email, role: userRole }));

      toast.success("Login successful! Redirecting...", { autoClose: 2000 });


      // Redirect based on role
      if (userRole === "admin") {
        navigate("/admin");
        window.location.reload()
      } else if (userRole === "farmer") {
        navigate("/farmer");
        window.location.reload()
      } else {
        navigate("/buyer");
        window.location.reload()
      }

    } catch (err) {
      console.error("Login error:", err.code, err.message);
      setError("Invalid email or password. Please try again.");
      toast.error("Invalid credentials! Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
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
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
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
        <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
          <span className="text-green-700">Agri</span> 
          <span className="text-green-500">Waste</span> 
          <span className="text-green-600">Connect</span>
        </h2>
        <h3 className="text-center text-xl font-bold text-gray-800">{t("auth.signIn")}</h3>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t("auth.noAccount")}{" "}
          <Link to="/register" className="font-medium text-green-600 hover:text-green-500 underline">
            {t("auth.createAccount")}
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-green-100">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200 flex items-center"
            >
              <span className="mr-2">⚠️</span>
              {error}
            </motion.div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t("auth.email")}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-green-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t("auth.password")}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-green-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                {t("auth.role")}
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md bg-white transition-all duration-200"
              >
                <option value="farmer">{t("auth.farmer")}</option>
                <option value="buyer">{t("auth.buyer")}</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Removed remember me and forgot password options */}

            <div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-all duration-200"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t("auth.signingIn")}
                  </span>
                ) : (
                  t("auth.signIn")
                )}
              </motion.button>
            </div>
          </form>
          
          {/* No additional login options as per request */}
        </div>
        
        {/* Removed terms and policy footer */}
      </div>
    </div>
  );
}

export default Login;