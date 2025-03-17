// context/AuthContext.js
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
    console.log("=== LOGIN FUNCTION CALLED ===");
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      const res = await axios.post(
        "https://backend-flyer-track.onrender.com/api/auth/login",
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
    console.log("=== REGISTER FUNCTION CALLED ===");
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      const res = await axios.post(
        "https://backend-flyer-track.onrender.com/api/auth/register",
        { username, email, password }
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
    console.log("=== LOGOUT FUNCTION CALLED ===");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
