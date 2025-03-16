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

// Initialisation du contexte avec type explicite
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string) => {
    // Simule un login – remplace par ton appel API réel.
    setUser({ email, username: "DemoUser", token: "fake-token" });
  };

  const register = async (username: string, email: string) => {
    // Simule une inscription – remplace par ton appel API réel.
    setUser({ username, email, token: "fake-token" });
  };

  const logout = () => {
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
