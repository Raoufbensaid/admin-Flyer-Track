// pages/login.js
import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext not available");
  const { login } = auth;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("=== HANDLE SUBMIT LOGIN ===");
    console.log("Email:", email, "Password:", password);
    try {
      // Spécifie true pour isAdmin
      await login(email, password, true);
      router.push("/dashboard");
    } catch (err) {
      console.error("Erreur catch handleSubmit login:", err);
      setError("Erreur lors de la connexion");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Connexion Admin</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
