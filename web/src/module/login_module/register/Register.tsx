// src/pages/Register.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDuplicateError, setShowDuplicateError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    // Hide duplicate email error when email changes
    if (name === 'email' && showDuplicateError) {
      setShowDuplicateError(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (simple)
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setShowDuplicateError(false);

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        if (response.status === 409) {
          setShowDuplicateError(true);
          throw new Error('Email already registered');
        }
        const errorText = await response.text();
        throw new Error(errorText || 'Registration failed');
      }

      // Show success message
      setShowSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (error: any) {
      if (error.message !== 'Email already registered') {
        setErrors({
          general: error.message || 'Something went wrong',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-hide duplicate error after 5 seconds
  useEffect(() => {
    if (showDuplicateError) {
      const timer = setTimeout(() => {
        setShowDuplicateError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showDuplicateError]);

  return (
    <div className="register-page">
      {/* Success Message Overlay */}
      {showSuccess && (
        <div className="success-message-overlay">
          <div className="success-message">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Registration Successful!</h3>
            <p>Your account has been created successfully. Redirecting to login page...</p>
            <div className="success-progress">
              <div className="progress-bar"></div>
            </div>
          </div>
        </div>
      )}

      {/* Duplicate Email Error Message */}
      {showDuplicateError && (
        <div className="duplicate-error-message">
          <div className="error-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9V11M12 15H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="error-content">
            <h4>Email Already Registered</h4>
            <p>This email address is already associated with an account. Please use a different email or try logging in.</p>
            <Link to="/login" className="error-action-link">
              Go to Login
            </Link>
          </div>
          <button 
            className="close-error"
            onClick={() => setShowDuplicateError(false)}
          >
            ×
          </button>
        </div>
      )}

      {/* Left side - Brand/Info Section */}
      <div className="register-brand-section">
        <div className="brand-content">
          <div className="company-logo">
            <div className="logo-circle">
              <span className="logo-text">CL</span>
            </div>
            <h1 className="company-name">Kean</h1>
          </div>
          
          <div className="welcome-text">
            <h2>Join Us...</h2>
            <p>
              Create your account and start your journey with us. 
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Register Form */}
      <div className="register-form-section">
        <div className="form-container">
          <div className="form-header">
            <h1>Register</h1>
            <p className="form-subtitle">
              Create an account to access exclusive features and benefits.
            </p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                disabled={isLoading}
                className={errors.username ? 'error' : ''}
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">EMAIL</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled={isLoading}
                className={errors.email || showDuplicateError ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">PHONE NUMBER</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                disabled={isLoading}
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                disabled={isLoading}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                disabled={isLoading}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            {errors.general && (
              <div className="general-error">
                <span className="error-message">{errors.general}</span>
              </div>
            )}

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  required
                  disabled={isLoading}
                />
                <span className="checkmark"></span>
                <span>
                  I agree to the{' '}
                  <Link to="/terms" className="terms-link">Terms of Service</Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="terms-link">Privacy Policy</Link>
                </span>
              </label>
            </div>

            <button 
              type="submit" 
              className="register-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  CREATING ACCOUNT...
                </>
              ) : (
                'REGISTER'
              )}
            </button>

            <div className="form-footer">
              <Link to="/login" className="login-link">
                Already have an account? Login
              </Link>
            </div>
          </form>

          <div className="feature-text">
            <p>Start your journey with us today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;