// src/app/login/page.tsx
"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext, AuthContextType } from "../layout";

export const metadata = {
  title: "Connexion - FlyerTrack",
};

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthContext not available");
  }
  const { login } = auth as AuthContextType;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch {
      setError("Erreur lors de la connexion");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Connexion</h2>
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
