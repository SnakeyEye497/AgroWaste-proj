import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children, allowedRole }) {
  const { isAuthenticated, userRole } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRole && userRole !== allowedRole) {
    // Redirect to appropriate dashboard based on role
    if (userRole === 'farmer') {
      return <Navigate to="/farmer" replace />;
    } else if (userRole === 'buyer') {
      return <Navigate to="/buyer" replace />;
    } else if (userRole === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    
    // Fallback to login if role is unknown
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

export default ProtectedRoute; 