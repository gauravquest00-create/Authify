import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/api";
import AuthLayout from "../components/AuthLayout";

/* ─── Inline SVG icons ───────────────────────────────── */
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

/* ─── Forgot Password page ──────────────────────────── */
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Clear error when user starts typing
  const clearError = () => {
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setSuccess("");

    // Client-side validation
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!oldPassword || oldPassword.length < 6) {
      setError("Please enter your current password (min. 6 characters).");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (oldPassword === newPassword) {
      setError("New password must be different from current password.");
      return;
    }

    setLoading(true);

    try {
      // Original API call - UNCHANGED
      const res = await API.post("/auth/change-password", {
        email,
        oldPassword,
        newPassword,
      });

      setSuccess(res.data.message || "Password updated successfully!");

      // 🔥 smooth redirect (original logic - UNCHANGED)
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset password"
      subtitle="Update your credentials to secure your account"
      emoji="🔐"
    >
      <form onSubmit={handleSubmit} className="auth-form" noValidate>

        {/* Error banner */}
        {error && (
          <div className="auth-error" role="alert" aria-live="assertive">
            {error}
          </div>
        )}

        {/* Success banner */}
        {success && (
          <div className="auth-success" role="status" aria-live="polite">
            {success}
          </div>
        )}

        {/* ── Email ── */}
        <div className="input-group">
          <label htmlFor="reset-email">Email address</label>
          <div className="input-wrapper">
            <span className="input-icon">
              <MailIcon />
            </span>
            <input
              id="reset-email"
              type="email"
              className="auth-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearError(); }}
              autoComplete="email"
              disabled={loading}
              required
            />
          </div>
        </div>

        {/* ── Old Password ── */}
        <div className="input-group">
          <label htmlFor="reset-old-password">Current password</label>
          <div className="input-wrapper">
            <span className="input-icon">
              <LockIcon />
            </span>
            <input
              id="reset-old-password"
              type={showOldPass ? "text" : "password"}
              className="auth-input has-toggle"
              placeholder="Enter your current password"
              value={oldPassword}
              onChange={(e) => { setOldPassword(e.target.value); clearError(); }}
              autoComplete="current-password"
              disabled={loading}
              required
            />
            <button
              type="button"
              className="pass-toggle"
              onClick={() => setShowOldPass((v) => !v)}
              aria-label={showOldPass ? "Hide password" : "Show password"}
              aria-pressed={showOldPass}
              disabled={loading}
            >
              <EyeIcon open={showOldPass} />
            </button>
          </div>
        </div>

        {/* ── New Password ── */}
        <div className="input-group">
          <label htmlFor="reset-new-password">New password</label>
          <div className="input-wrapper">
            <span className="input-icon">
              <LockIcon />
            </span>
            <input
              id="reset-new-password"
              type={showNewPass ? "text" : "password"}
              className="auth-input has-toggle"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => { setNewPassword(e.target.value); clearError(); }}
              autoComplete="new-password"
              disabled={loading}
              required
            />
            <button
              type="button"
              className="pass-toggle"
              onClick={() => setShowNewPass((v) => !v)}
              aria-label={showNewPass ? "Hide password" : "Show password"}
              aria-pressed={showNewPass}
              disabled={loading}
            >
              <EyeIcon open={showNewPass} />
            </button>
          </div>
        </div>

        {/* ── Confirm New Password ── */}
        <div className="input-group">
          <label htmlFor="reset-confirm-password">Confirm new password</label>
          <div className="input-wrapper">
            <span className="input-icon">
              <LockIcon />
            </span>
            <input
              id="reset-confirm-password"
              type={showConfirmPass ? "text" : "password"}
              className="auth-input has-toggle"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); clearError(); }}
              autoComplete="new-password"
              disabled={loading}
              required
            />
            <button
              type="button"
              className="pass-toggle"
              onClick={() => setShowConfirmPass((v) => !v)}
              aria-label={showConfirmPass ? "Hide password" : "Show password"}
              aria-pressed={showConfirmPass}
              disabled={loading}
            >
              <EyeIcon open={showConfirmPass} />
            </button>
          </div>
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
              Updating…
            </>
          ) : (
            <>
              Update password{" "}
              <span aria-hidden="true">→</span>
            </>
          )}
        </button>

        {/* ── Footer with Back to Login ── */}
        <div className="auth-footer">
          <p>
            <Link to="/">← Back to Login</Link>
          </p>
        </div>

      </form>
    </AuthLayout>
  );
}

export default ForgotPassword;