// src/app/page.tsx
"use client";

import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Accueil - FlyerTrack",
};

export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>FlyerTrack</h1>
      <h2>Dashboard Admin</h2>
      <p>Interface d&apos;administration Auth</p>
      <nav>
        <ul>
          <li>
            <Link href="/login">Se connecter</Link>
          </li>
          <li>
            <Link href="/register">S&apos;inscrire</Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
