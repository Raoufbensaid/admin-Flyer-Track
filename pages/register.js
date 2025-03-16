// pages/register.js
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useContext(AuthContext);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Erreur lors de l&apos;inscription"
      );
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2>Inscription</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label>Nom d&apos;utilisateur :</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
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
