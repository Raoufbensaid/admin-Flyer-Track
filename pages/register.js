// pages/register.js
import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext not available");
  const { register } = auth;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      router.push("/dashboard");
    } catch {
      setError("Erreur lors de l&apos;inscription");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Inscription</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d&apos;utilisateur: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">S&apos;inscrire</button>
      </form>
    </div>
  );
}
