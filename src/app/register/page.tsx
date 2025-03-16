// src/app/register/page.tsx
"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext, AuthContextType } from "../layout";

export const metadata = {
  title: "Inscription - FlyerTrack",
};

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthContext n’est pas disponible");
  }
  const { register } = auth as AuthContextType;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
