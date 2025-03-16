// context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = async (email, password) => {
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

export default AuthContext;
