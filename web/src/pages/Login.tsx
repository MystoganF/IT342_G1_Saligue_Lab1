// src/pages/Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Form submission logic will go here
    console.log('Login attempt:', { username, password, rememberMe });
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="login-page">
      {/* Left side - Brand/Info Section */}
      <div className="login-brand-section">
        <div className="brand-content">
          <div className="company-logo">
            <div className="logo-circle">
              <span className="logo-text">CL</span>
            </div>
            <h1 className="company-name">COMPANY LOGO</h1>
          </div>
          
          <div className="welcome-text">
            <h2>Welcome to...</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="login-form-section">
        <div className="form-container">
          <div className="form-header">
            <h1>Login</h1>
            <p className="form-subtitle">
              Welcome! Login to get amazing discounts and offers only for you.
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
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