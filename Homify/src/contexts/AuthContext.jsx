import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Fetch user role from localStorage
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const role = storedUser?.role || "buyer"; // Default role if not found

        setCurrentUser({ ...user, role });
        setUserRole(role); // Update state immediately
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Manually update role when login happens
  const updateUserRole = (role) => {
    setUserRole(role);
  };

  return (
    <AuthContext.Provider value={{ currentUser, userRole, loading, updateUserRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
