// src/pages/Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

interface LoginResponse {
  message: string;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Login failed');
      }

      const data: LoginResponse = await response.json();
      console.log('Login success:', data);

      // Optionally, save session/token if your backend sends one
      // localStorage.setItem('token', data.token);

      navigate('/dashboard'); // redirect on success
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Left - Brand/Info */}
      <div className="login-brand-section">
        <div className="brand-content">
          <div className="company-logo">
            <div className="logo-circle">
              <span className="logo-text">CL</span>
            </div>
            <h1 className="company-name">Kean</h1>
          </div>

          <div className="welcome-text">
            <h2>Welcome to...</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>

      {/* Right - Login Form */}
      <div className="login-form-section">
        <div className="form-container">
          <div className="form-header">
            <h1>Login</h1>
            <p className="form-subtitle">
              Login to access your account and exclusive features.
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="form-group">
              <label htmlFor="username">User Name</label>
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

            {/* Password */}
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

            {/* Remember Me */}
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

            {/* Error Message */}
            {error && <p className="error-message">{error}</p>}

            {/* Submit Button */}
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  LOGGING IN...
                </>
              ) : (
                'LOGIN'
              )}
            </button>

            {/* Footer Links */}
            <div className="form-footer">
              <Link to="/register" className="signup-link">
                New User? Signup
              </Link>
              <Link to="/forgot-password" className="forgot-link">
                Forgot your password?
              </Link>
            </div>
          </form>

          <div className="feature-text">
            <p>Lorem ipsum dolor sit amet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
