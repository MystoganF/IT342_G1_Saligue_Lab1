import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register: React.FC = () => {
  const navigate = useNavigate();

  // ===============================
  // Form state
  // ===============================
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // ===============================
  // Auto-redirect if user already logged in
  // ===============================
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard"); // redirect to landing/dashboard
    }
  }, [navigate]);

  // ===============================
  // Handle input changes
  // ===============================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Clear general error
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: "" }));
    }
  };

  // ===============================
  // Simple client-side validation
  // ===============================
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const phone = formData.phone.replace(/\D/g, "");
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (phone.length < 10 || phone.length > 15) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===============================
  // Handle form submission
  // ===============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      let errorMessage = `Registration failed (status ${response.status})`;

      // Parse backend response
      try {
        const contentType = response.headers.get("Content-Type") || "";
        if (contentType.includes("application/json")) {
          const data = await response.json();
          if (data?.message) errorMessage = data.message;
        } else {
          const text = await response.text();
          if (text) errorMessage = text;
        }
      } catch (err) {
        console.error("Error reading response:", err);
      }

      if (!response.ok) {
        setErrors({ general: errorMessage });
        return;
      }

      // ===============================
      // On success, navigate to dashboard directly
      // ===============================
      navigate("/dashboard");
    } catch (err) {
      console.error("Network or server error:", err);
      setErrors({ general: "Registration failed: network or server error" });
    } finally {
      setIsLoading(false);
    }
  };

  // ===============================
  // Render
  // ===============================
  return (
    <div className="register-page">
      {/* Logo */}
      <div className="company-logo">
        <div className="logo-circle">
          <span className="logo-text">CL</span>
        </div>
        <h1 className="company-name">Kean</h1>
      </div>

      {/* Left Brand Section */}
      <div className="register-brand-section">
        <div className="brand-content">
          <div className="welcome-text">
            <h2>Join Us...</h2>
            <p>Create your account and start your journey with us.</p>
          </div>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="register-form-section">
        <div className="form-container">
          <div className="form-header">
            <h1>Register</h1>
            <p className="form-subtitle">Create an account to access exclusive features.</p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="form-group">
              <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={isLoading}
                className={errors.username ? "error" : ""}
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">EMAIL</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">PHONE NUMBER</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={isLoading}
                className={errors.phone ? "error" : ""}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className={errors.password ? "error" : ""}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                className={errors.confirmPassword ? "error" : ""}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            {/* General error message */}
            {errors.general && <div className="general-error">{errors.general}</div>}

            {/* Submit button */}
            <button type="submit" className="register-button" disabled={isLoading}>
              {isLoading ? "CREATING ACCOUNT..." : "REGISTER"}
            </button>

            {/* Footer */}
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
