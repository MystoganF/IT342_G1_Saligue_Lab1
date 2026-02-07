// src/pages/LandingPage.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="highlight">Kean</span>
          </h1>
          <p className="hero-subtitle">
            Experience the future of digital interaction with our cutting-edge platform
          </p>
          
          <div className="hero-buttons">
            <button className="primary-button">
              Get Started
            </button>
            <button className="secondary-button">
              Learn More
            </button>
          </div>
        </div>

        {/* Abstract Background */}
        <div className="abstract-background">
          <div className="gradient-circle circle-1"></div>
          <div className="gradient-circle circle-2"></div>
          <div className="gradient-circle circle-3"></div>
          <div className="gradient-circle circle-4"></div>
        </div>
      </main>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose Us</h2>
          <p>Discover the features that make us stand out</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <span>🚀</span>
            </div>
            <h3>Fast Performance</h3>
            <p>Lightning-fast response times and optimized performance for the best user experience.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <span>🔒</span>
            </div>
            <h3>Secure & Reliable</h3>
            <p>Enterprise-grade security with 99.9% uptime guarantee and data protection.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <span>🎨</span>
            </div>
            <h3>Modern Design</h3>
            <p>Clean, intuitive interface with dark mode support and customizable themes.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <span>🔄</span>
            </div>
            <h3>Easy Integration</h3>
            <p>Seamlessly connect with your existing tools and workflows.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-text">CL</span>
            </div>
            <div className="footer-info">
              <h3>Kean</h3>
              <p>Innovating the digital experience</p>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="/features">Features</a>
              <a href="/pricing">Pricing</a>
              <a href="/api">API</a>
              <a href="/documentation">Documentation</a>
            </div>

            <div className="footer-column">
              <h4>Company</h4>
              <a href="/about">About</a>
              <a href="/blog">Blog</a>
              <a href="/careers">Careers</a>
              <a href="/press">Press</a>
            </div>

            <div className="footer-column">
              <h4>Support</h4>
              <a href="/help">Help Center</a>
              <a href="/contact">Contact Us</a>
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Kean. All rights reserved.</p>
          <div className="footer-social">
            <a href="/twitter" aria-label="Twitter">𝕏</a>
            <a href="/github" aria-label="GitHub">🐙</a>
            <a href="/linkedin" aria-label="LinkedIn">in</a>
            <a href="/discord" aria-label="Discord">🎮</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;