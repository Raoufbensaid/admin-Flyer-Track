// pages/dashboard.js
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const router = useRouter();
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext not available");
  const { user, logout } = auth;

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
