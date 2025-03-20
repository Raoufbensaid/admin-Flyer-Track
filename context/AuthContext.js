// context/AuthContext.js (pour interface-admin)
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = async (email, password) => {
    console.log("=== LOGIN FUNCTION CALLED (ADMIN) ===");
    console.log("Email:", email, "Password:", password);
    try {
      const res = await axios.post(
        "https://backend-flyer-track.onrender.com/api/auth/login?role=admin",
        { email, password }
      );
      console.log("Login response:", res.data);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    } catch (err) {
      console.error(
        "Erreur dans login:",
        err.response ? err.response.data : err.message
      );
      throw err;
    }
  };

  const register = async (username, email, password) => {
    console.log("=== REGISTER FUNCTION CALLED (ADMIN) ===");
    console.log("Username:", username, "Email:", email, "Password:", password);
    try {
      const res = await axios.post(
        "https://backend-flyer-track.onrender.com/api/auth/register",
        { username, email, password, role: "admin" }
      );
      console.log("Register response:", res.data);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    } catch (err) {
      console.error(
        "Erreur dans register:",
        err.response ? err.response.data : err.message
      );
      throw err;
    }
  };

  const logout = () => {
    console.log("=== LOGOUT FUNCTION CALLED (ADMIN) ===");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
