import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Sign Up
export const signUp = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Signup successful!");
  } catch (error) {
    alert(error.message);
  }
};

// Login
export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
  } catch (error) {
    alert(error.message);
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
    alert("Logged out successfully!");
  } catch (error) {
    alert(error.message);
  }
};
