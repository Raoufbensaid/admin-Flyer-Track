// context/AuthContext.js (pour interface-admin)
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Récupération du token depuis localStorage (pour persistance)
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = async (email, password) => {
    console.log("=== ADMIN LOGIN FUNCTION CALLED ===");
    console.log("Email:", email, "Password:", password);
    try {
      // On ajoute le paramètre ?role=admin pour forcer la vérification du rôle admin
      const res = await axios.post(
        "https://backend-flyer-track.onrender.com/api/auth/login?role=admin",
        { email, password }
      );
      console.log("Login response:", res.data);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    } catch (err) {
      console.error(
        "Erreur dans admin login:",
        err.response ? err.response.data : err.message
      );
      throw err;
    }
  };

  const register = async (username, email, password) => {
    console.log("=== ADMIN REGISTER FUNCTION CALLED ===");
    console.log("Username:", username, "Email:", email, "Password:", password);
    try {
      // On force le rôle "admin" dans la requête d'inscription
      const res = await axios.post(
        "https://backend-flyer-track.onrender.com/api/auth/register",
        { username, email, password, role: "admin" }
      );
      console.log("Register response:", res.data);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    } catch (err) {
      console.error(
        "Erreur dans admin register:",
        err.response ? err.response.data : err.message
      );
      throw err;
    }
  };

  const logout = () => {
    console.log("=== ADMIN LOGOUT FUNCTION CALLED ===");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
