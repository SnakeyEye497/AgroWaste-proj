import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import FarmerLayout from './layouts/FarmerLayout';
import BuyerLayout from './layouts/BuyerLayout';
import AdminLayout from './layouts/AdminLayout';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import Home from './Home';

// Farmer pages
import FarmerDashboard from './pages/farmer/Dashboard';
import ManageWaste from './pages/farmer/ManageWaste';
import FarmerOrders from './pages/farmer/Orders';
import WastePrediction from './pages/farmer/WastePrediction';
import FarmerProfile from './pages/farmer/Profile';
import SalesDashboard from './pages/farmer/SalesDashboard';
import Tutorials from './pages/farmer/Tutorials';
import FarmerTransport from './pages/farmer/FarmerTransport';
import CreativeWasteUses from './pages/farmer/CreativeWasteUses';
import FarmerQueryForm from './pages/farmer/PostQuery';
import NearByBuyers from './pages/farmer/NearByBuyers';

// Buyer pages
import BuyerDashboard from './pages/buyer/Dashboard';
import BuyerMarketplace from './pages/buyer/Marketplace';
import BuyerOrders from './pages/buyer/Orders';
import BuyerProfile from './pages/buyer/Profile';
import BuyerTransportSystem from './pages/buyer/TransportSystem';
import BuyerBrowseWaste from './pages/buyer/BrowseWaste';
import BuyerPostRequirement from './pages/buyer/PostRequirement';
import BuyerTransport from './pages/buyer/Transport';


// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Waste from './pages/admin/Waste';
import AdminOrders from './pages/admin/Orders';
import AdminProfile from './pages/admin/Profile';
import ManageFarmers from './pages/admin/ManageFarmers';
import ManageBuyers from './pages/admin/ManageBuyers';
import Overview from './pages/admin/Overview';
import ManageTutorials from './pages/admin/ManageTutorials';

// Shared pages
import Chat from './pages/shared/Chat';
import NotFound from './pages/NotFound';

function App() {
  const { currentUser, loading } = useAuth();

  // Create a protected route component
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (loading) {
      return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }
    
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    
    if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
      return <Navigate to="/" />;
    }
    
    return children;
  };

  return (
    <>
      <Router>
        <Routes>

          {/* Default Home Page */}
          <Route path="/home" element={<Home />} />
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
         
          
          
          {/* Farmer routes */}
          <Route path="/farmer" element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <FarmerLayout />
            </ProtectedRoute>
          }>
            <Route index element={<FarmerDashboard />} />
            <Route path="waste" element={<ManageWaste />} />
            <Route path="waste-selling" element={<ManageWaste />} />
            <Route path="orders" element={<FarmerOrders />} />
            <Route path="prediction" element={<WastePrediction />} />
            <Route path="profile" element={<FarmerProfile />} />
            <Route path="chat" element={<Chat />} />
            <Route path="chat/:id" element={<Chat />} />
            <Route path="sales-dashboard" element={<SalesDashboard />} />
            <Route path="tutorials" element={<Tutorials />} />
            <Route path="transport" element={<FarmerTransport />} />
            <Route path="CreativeWasteUses" element={<CreativeWasteUses/>} />
            <Route path="PostQuery" element={<FarmerQueryForm />} />
            <Route path="NearByBuyers" element={<NearByBuyers />} />
          </Route>
          
           {/* Buyer routes */}
           <Route path="/buyer" element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <BuyerLayout />
            </ProtectedRoute>
          }>
            <Route index element={<BuyerDashboard />} />
            <Route path="browsewaste" element={<BuyerBrowseWaste />} />
            <Route path="postrequirement" element={<BuyerPostRequirement />} />

            <Route path="marketplace" element={<BuyerMarketplace />} />

            <Route path="orders" element={<BuyerOrders />} />
            <Route path="profile" element={<BuyerProfile />} />
            <Route path="chat" element={<Chat />} />
            <Route path="chat/:id" element={<Chat />} />
            <Route path="transport" element={<BuyerTransport />} />

            <Route path="transportsystem" element={<BuyerTransportSystem />} />
          </Route>
          
          {/* Admin routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="waste" element={<Waste />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="manage-farmers" element={<ManageFarmers />} />
            <Route path="manage-buyers" element={<ManageBuyers />} />
            <Route path="overview" element={<Overview />} />
            <Route path="manage-tutorials" element={<ManageTutorials />} />
          </Route>
          
          {/* Redirect based on user role */}
          <Route path="/" element={
            loading ? (
              <div className="flex justify-center items-center h-screen">Loading...</div>
            ) : currentUser ? (
              currentUser.role === 'farmer' ? (
                <Navigate to="/farmer" />
              ) : currentUser.role === 'buyer' ? (
                <Navigate to="/buyer" />
              ) : currentUser.role === 'admin' ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/login" />
              )
            ) : (
              <Navigate to="/login" />
            )
          } />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App; 