import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

function GithubCallback() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      console.log("GitHub Code:", code);

      if (!code) {
        setError("No authorization code received");
        setLoading(false);
        setTimeout(() => navigate("/"), 2000);
        return;
      }

      try {
        const res = await API.post("/auth/github", { code });
        console.log("Response:", res.data);
        
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard", { replace: true });
      } catch (err) {
        console.error("GitHub Error:", err);
        setError(err.response?.data?.message || "GitHub login failed");
        setLoading(false);
        setTimeout(() => navigate("/"), 2000);
      }
    };

    handleCallback();
  }, [navigate]);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f172a",
        color: "white",
        gap: "16px"
      }}>
        <div style={{
          width: "40px",
          height: "40px",
          border: "3px solid rgba(139,92,246,0.2)",
          borderTopColor: "#8b5cf6",
          borderRadius: "50%",
          animation: "spin 0.6s linear infinite"
        }}></div>
        <p>Processing GitHub login...</p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#0f172a",
      color: "white",
      gap: "16px"
    }}>
      <h2>❌ {error}</h2>
      <p>Redirecting to login...</p>
    </div>
  );
}

export default GithubCallback;