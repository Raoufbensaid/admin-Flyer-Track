// src/app/layout.tsx
"use client";

import React, { createContext, useState, ReactNode } from "react";

export interface User {
  username?: string;
  email?: string;
  token?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    console.log("=== LOGIN FUNCTION CALLED ===");
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      // Simule un appel API ou appelle ton backend
      // Remplace par :
      // const res = await axios.post('https://ton-backend.com/api/auth/login', { email, password });
      // ...
      // console.log('Login response:', res.data);

      // Ici, on simule juste la réussite :
      setUser({ email, username: "DemoUser", token: "fake-token" });
    } catch (err) {
      console.log("Erreur dans login:", err);
      throw err; // relance l'erreur pour être capturée dans la page login
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    console.log("=== REGISTER FUNCTION CALLED ===");
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      // Simule un appel API ou appelle ton backend
      // const res = await axios.post('https://ton-backend.com/api/auth/register', { username, email, password });
      // console.log('Register response:', res.data);

      // On simule juste la réussite :
      setUser({ username, email, token: "fake-token" });
    } catch (err) {
      console.log("Erreur dans register:", err);
      throw err; // relance l'erreur pour être capturée dans la page register
    }
  };

  const logout = () => {
    console.log("=== LOGOUT FUNCTION CALLED ===");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <head>
        <title>Admin Interface</title>
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
