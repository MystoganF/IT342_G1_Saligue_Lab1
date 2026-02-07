import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Login failed');
      }

      const data = await response.json();
      const token = data.token;
      const loggedUsername = data.username || username;

      // Save JWT token & username
      localStorage.setItem('token', token);
      localStorage.setItem('username', loggedUsername);
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }

      // Show success overlay before redirect
      setSuccessMessage('Login successful! Redirecting to dashboard...');
      setShowSuccess(true);

      // Redirect after 3s
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/dashboard');
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Logo - Top Left */}
      <div className="company-logo">
        <div className="logo-circle">
          <span className="logo-text">CL</span>
        </div>
        <h1 className="company-name">Kean</h1>
      </div>

      {/* Left - Branding Section */}
      <div className="login-brand-section">
        <div className="brand-content">
          <div className="welcome-text">
            <h2>Welcome Back!</h2>
            <p>Log in to access your account and enjoy exclusive features.</p>
          </div>
        </div>
      </div>

      {/* Right - Login Form */}
      <div className="login-form-section">
        <div className="form-container">
          <div className="form-header">
            <h1>Login</h1>
            <p className="form-subtitle">
              Enter your credentials to continue.
            </p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                />
                <span className="checkmark"></span>
                <span>Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  LOGGING IN...
                </>
              ) : (
                'LOGIN'
              )}
            </button>

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

      {/* Success Overlay */}
      {showSuccess && (
        <div className="success-message-overlay">
          <div className="success-message">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3>Success!</h3>
            <p>{successMessage}</p>
            <div className="success-progress">
              <div className="progress-bar"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
