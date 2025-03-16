"use client";

import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../layout";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

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
