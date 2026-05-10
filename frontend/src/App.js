import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ForgotPassword from "./pages/ForgotPassword";
import { useEffect, useState } from "react";
import GithubCallback from "./pages/GithubCallback";

/* =========================
   THEME WRAPPER
========================= */

function AppWrapper({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark";
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <button
        onClick={toggleTheme}
        style={{
          position: "fixed",
          top: 15,
          right: 15,
          padding: "8px 14px",
          borderRadius: 40,
          border: "1px solid rgba(0,0,0,0.1)",
          background: theme === "dark" ? "#1e293b" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#1e293b",
          cursor: "pointer",
          zIndex: 9999,
          fontSize: "13px",
          fontWeight: 500,
          zIndex: 9999,
        }}
      >
        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
      </button>
      {children}
    </>
  );
}

/* =========================
   ANIMATED ROUTES
========================= */

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        <Route path="/auth/github/callback" element={<GithubCallback />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
}

/* =========================
   MAIN APP
========================= */

export default function App() {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  // ✅ Debug: Check if Client ID is loaded
  console.log("Google Client ID:", googleClientId);

  if (!googleClientId) {
    console.error("❌ Google Client ID is missing! Check your .env file");
    return (
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        background: "#0f172a",
        color: "white",
        flexDirection: "column",
        gap: "16px"
      }}>
        <h2>❌ Configuration Error</h2>
        <p>REACT_APP_GOOGLE_CLIENT_ID is not defined in .env file</p>
        <p style={{ fontSize: "12px", color: "#94a3b8" }}>Please check your environment variables</p>
      </div>
    );
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <BrowserRouter>
        <AppWrapper>
          <AnimatedRoutes />
        </AppWrapper>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}