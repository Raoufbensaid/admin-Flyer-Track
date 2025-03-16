// pages/dashboard.js
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  return (
    <div>
      <h1>Tableau de bord</h1>
      {user ? (
        <p>Bienvenue {user.username || "utilisateur"}!</p>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}
