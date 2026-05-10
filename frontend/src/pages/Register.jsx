import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import API from "../utils/api";
import AuthLayout from "../components/AuthLayout";

/* ─── Inline SVG icons ───────────────────────────────── */
function UserIcon() {
  return (
    <svg
      width="16" height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="16" height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="16" height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function EyeIcon({ open }) {
  return open ? (
    <svg
      width="17" height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg
      width="17" height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2 6l3 3 5-5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.259c-.806.54-1.837.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="18" height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

/* ─── Register page ──────────────────────────────────── */
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const clearError = () => {
    if (error) setError("");
  };

  // ========== GOOGLE LOGIN ==========
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setError("");
      try {
        const res = await API.post("/auth/google", {
          access_token: tokenResponse.access_token,
        });
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard", { replace: true });
      } catch (err) {
        setError(err.response?.data?.message || "Google login failed.");
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setError("Google login failed. Please try again.");
      setLoading(false);
    },
  });

  // ========== GITHUB LOGIN ==========
  const handleGitHubLogin = () => {
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    
    if (!clientId) {
      setError("GitHub login not configured. Please contact support.");
      return;
    }
    
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/github/callback`);
    const scope = encodeURIComponent("user:email");
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    
    window.location.href = authUrl;
  };

  // ========== EMAIL REGISTER ==========
  const handleRegister = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!name.trim() || name.length < 2) {
      setError("Please enter your full name (at least 2 characters).");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreeTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Fill in the details to get started"
      emoji="🚀"
    >
      <form onSubmit={handleRegister} className="auth-form register-page" noValidate>

        {error && (
          <div className="auth-error" role="alert" aria-live="assertive">
            {error}
          </div>
        )}

        {/* ── Full Name & Email in ONE ROW ── */}
        <div className="input-group-row">
          <div className="input-group">
            <label htmlFor="register-name">Full name</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <UserIcon />
              </span>
              <input
                id="register-name"
                type="text"
                className="auth-input"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => { setName(e.target.value); clearError(); }}
                autoComplete="name"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="register-email">Email address</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <MailIcon />
              </span>
              <input
                id="register-email"
                type="email"
                className="auth-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearError(); }}
                autoComplete="email"
                required
              />
            </div>
          </div>
        </div>

        {/* ── Password & Confirm Password in ONE ROW ── */}
        <div className="input-group-row">
          <div className="input-group">
            <label htmlFor="register-password">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <LockIcon />
              </span>
              <input
                id="register-password"
                type={showPass ? "text" : "password"}
                className="auth-input has-toggle"
                placeholder="Create a password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); clearError(); }}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="pass-toggle"
                onClick={() => setShowPass((v) => !v)}
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                <EyeIcon open={showPass} />
              </button>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="register-confirm-password">Confirm password</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <LockIcon />
              </span>
              <input
                id="register-confirm-password"
                type={showConfirmPass ? "text" : "password"}
                className="auth-input has-toggle"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); clearError(); }}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="pass-toggle"
                onClick={() => setShowConfirmPass((v) => !v)}
                aria-label={showConfirmPass ? "Hide password" : "Show password"}
              >
                <EyeIcon open={showConfirmPass} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Terms Checkbox ── */}
        <div className="form-options">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => { setAgreeTerms(e.target.checked); clearError(); }}
              aria-label="Agree to terms"
            />
            <span className="checkbox-custom" aria-hidden="true">
              <CheckIcon />
            </span>
            <span className="checkbox-text">
              I agree to the{" "}
              <Link to="/terms" target="_blank">Terms of Service</Link> and{" "}
              <Link to="/privacy" target="_blank">Privacy Policy</Link>
            </span>
          </label>
        </div>

        {/* ── Submit ── */}
        <button
          type="submit"
          className="auth-btn-primary"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <span className="auth-spinner" aria-hidden="true" />
              Please wait…
            </>
          ) : (
            <>
              Sign up <span aria-hidden="true">→</span>
            </>
          )}
        </button>

        {/* ── OR divider ── */}
        <div className="auth-divider">
          <span>OR</span>
        </div>

        {/* ── Social buttons ── */}
        <button
          type="button"
          className="auth-btn-social"
          onClick={() => googleLogin()}
          disabled={loading}
          aria-label="Continue with Google"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <button
          type="button"
          className="auth-btn-social"
          onClick={handleGitHubLogin}
          disabled={loading}
          aria-label="Continue with GitHub"
        >
          <GitHubIcon />
          Continue with GitHub
        </button>

        {/* ── Footer ── */}
        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/">Login</Link>
          </p>
        </div>

      </form>
    </AuthLayout>
  );
}

export default Register;