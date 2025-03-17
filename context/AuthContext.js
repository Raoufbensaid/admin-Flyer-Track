// context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Vérifier s'il y a un token dans le localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // Pour simplifier, nous stockons seulement le token dans l'état.
      // Vous pouvez appeler une API pour récupérer les infos utilisateur.
      setUser({ token });
    }
  }, []);

  const login = async (email, password) => {
    // Remplacez l'URL par celle de votre backend hébergé sur Render
    const res = await axios.post(
      "https://backend-flyer-track.onrender.com/api/auth/login",
      { email, password }
    );
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  const register = async (username, email, password) => {
    const res = await axios.post(
      "https://backend-flyer-track.onrender.com/api/auth/register",
      { username, email, password }
    );
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
