import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

// ===============================
// Login Config
// ===============================
const MAX_ATTEMPTS = 5;       // Maximum allowed login attempts
const BLOCK_TIME = 20;        // Block duration in seconds when max attempts exceeded

const Login: React.FC = () => {
  const navigate = useNavigate();

  // ===============================
  // Form State
  // ===============================
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [blockedTimeLeft, setBlockedTimeLeft] = useState(0);

  // ===============================
  // Auto-redirect if user already logged in
  // ===============================
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // ===============================
  // Countdown timer for blocked login
  // ===============================
  useEffect(() => {
    if (blockedTimeLeft <= 0) return;

    const timer = setInterval(() => {
      setBlockedTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [blockedTimeLeft]);

  // ===============================
  // Handle form submission
  // ===============================
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const attempts = parseInt(localStorage.getItem("loginAttempts") || "0", 10);
    const lastBlocked = parseInt(localStorage.getItem("blockedUntil") || "0", 10);
    const now = Math.floor(Date.now() / 1000);

    // If user is currently blocked
    if (lastBlocked && now < lastBlocked) {
      setBlockedTimeLeft(lastBlocked - now);
      setIsLoading(false);
      return;
    }

    try {
      // ===============================
      // Call backend API
      // ===============================
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // ===============================
      // Successful login
      // ===============================
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username || username);

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      // Reset failed attempts after successful login
      localStorage.removeItem("loginAttempts");
      localStorage.removeItem("blockedUntil");

      navigate("/dashboard");
    } catch (err: any) {
      // ===============================
      // Handle failed login attempts
      // ===============================
      const newAttempts = attempts + 1;

      if (newAttempts >= MAX_ATTEMPTS) {
        const blockedUntil = now + BLOCK_TIME;
        localStorage.setItem("blockedUntil", blockedUntil.toString());
        setBlockedTimeLeft(BLOCK_TIME);
        localStorage.setItem("loginAttempts", "0"); // reset attempts after blocking
      } else {
        localStorage.setItem("loginAttempts", newAttempts.toString());
      }

      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* =============================== */}
      {/* Logo */}
      {/* =============================== */}
      <div className="company-logo">
        <div className="logo-circle">
          <span className="logo-text">CL</span>
        </div>
        <h1 className="company-name">Kean</h1>
      </div>

      {/* =============================== */}
      {/* Left Branding Section */}
      {/* =============================== */}
      <div className="login-brand-section">
        <div className="brand-content">
          <div className="welcome-text">
            <h2>Welcome Back!</h2>
            <p>Log in to access your account and enjoy exclusive features.</p>
          </div>
        </div>
      </div>

      {/* =============================== */}
      {/* Right Login Form */}
      {/* =============================== */}
      <div className="login-form-section">
        <div className="form-container">
          <div className="form-header">
            <h1>Login</h1>
            <p className="form-subtitle">Enter your credentials to continue.</p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            {/* Username Input */}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                disabled={isLoading || blockedTimeLeft > 0}
              />
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={isLoading || blockedTimeLeft > 0}
              />
            </div>

            {/* Remember Me */}
            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading || blockedTimeLeft > 0}
                />
                <span className="checkmark"></span>
                <span>Remember me</span>
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="login-button"
              disabled={isLoading || blockedTimeLeft > 0}
            >
              {isLoading ? "LOGGING IN..." : "LOGIN"}
            </button>

            {/* =============================== */}
            {/* Messages Below Login Button */}
            {/* =============================== */}
            <div className="message-below-button">
              {blockedTimeLeft > 0 ? (
                <span className="blocked-message">
                  Too many failed attempts. Try again in {blockedTimeLeft} second
                  {blockedTimeLeft > 1 ? "s" : ""}.
                </span>
              ) : error ? (
                <span className="error-message">{error}</span>
              ) : null}
            </div>

            {/* Footer Links */}
            <div className="form-footer">
              <Link to="/register" className="signup-link">
                New User? Sign Up
              </Link>
              <Link to="/forgot-password" className="forgot-link">
                Forgot your password?
              </Link>
            </div>
          </form>

          <div className="feature-text">
            <p>Securely access your account anytime, anywhere.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
