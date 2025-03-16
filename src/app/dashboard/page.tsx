// src/app/dashboard/page.tsx
"use client";

import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext, AuthContextType } from "../layout";

export const metadata = {
  title: "Dashboard - FlyerTrack",
};

export default function Dashboard() {
  const router = useRouter();
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthContext n’est pas disponible");
  }
  const { user, logout } = auth as AuthContextType;

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return <p>Chargement...</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>Dashboard</h2>
      <p>Bienvenue {user.username || user.email}!</p>
      <button
        onClick={() => {
          logout();
          router.push("/login");
        }}
      >
        Déconnexion
      </button>
    </div>
  );
}
