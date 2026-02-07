import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    const loggedUsername = data.username || username; // fallback to input

    // ✅ Save JWT token
    localStorage.setItem('token', token);

    // ✅ Always save username
    localStorage.setItem('username', loggedUsername);

    // Optionally save "remember me" flag
    if (rememberMe) {
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('rememberMe');
    }

    // Redirect
    navigate('/dashboard');
  } catch (err: any) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="login-page">
      {/* Left - Branding Section */}
      <div className="login-brand-section">
        <div className="brand-content">
          <div className="company-logo">
            <div className="logo-circle">
              <span className="logo-text">CL</span>
            </div>
            <h1 className="company-name">Kean</h1>
          </div>
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
    </div>
  );
};

export default Login;
