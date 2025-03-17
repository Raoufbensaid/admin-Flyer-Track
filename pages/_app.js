// pages/_app.js
import React from "react";
import { AuthProvider } from "../context/AuthContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
