import React from 'react';
import Navbar from '../../../components/navbar/navbar';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="accent">Kean</span>
          </h1>
          <p className="hero-description">
            Experience the future of digital interaction with our cutting-edge platform
          </p>
          
          <div className="hero-actions">
            <button className="btn btn-primary">
              Get Started
            </button>
            <button className="btn btn-secondary">
              Learn More
            </button>
          </div>
        </div>

        {/* Background Effects */}
        <div className="background-effects">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
          <div className="blob blob-4"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-intro">
          <h2>Why Choose Us</h2>
          <p>Discover the features that make us stand out</p>
        </div>

        <div className="features-list">
          <div className="feature">
            <div className="feature-icon">
              <span>🚀</span>
            </div>
            <h3>Fast Performance</h3>
            <p>Lightning-fast response times and optimized performance.</p>
          </div>

          <div className="feature">
            <div className="feature-icon">
              <span>🔒</span>
            </div>
            <h3>Secure & Reliable</h3>
            <p>Enterprise-grade security with 99.9% uptime guarantee.</p>
          </div>

          <div className="feature">
            <div className="feature-icon">
              <span>🎨</span>
            </div>
            <h3>Modern Design</h3>
            <p>Clean, intuitive interface with dark mode support.</p>
          </div>

          <div className="feature">
            <div className="feature-icon">
              <span>🔄</span>
            </div>
            <h3>Easy Integration</h3>
            <p>Seamlessly connect with your existing tools.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-branding">
            <div className="footer-logo">K</div>
            <div>
              <h3>Kean</h3>
              <p>Innovating the digital experience</p>
            </div>
          </div>

          <div className="footer-links-group">
            <div className="footer-links-column">
              <h4>Product</h4>
              <a href="/features">Features</a>
              <a href="/pricing">Pricing</a>
              <a href="/api">API</a>
              <a href="/docs">Documentation</a>
            </div>

            <div className="footer-links-column">
              <h4>Company</h4>
              <a href="/about">About</a>
              <a href="/blog">Blog</a>
              <a href="/careers">Careers</a>
              <a href="/press">Press</a>
            </div>

            <div className="footer-links-column">
              <h4>Support</h4>
              <a href="/help">Help Center</a>
              <a href="/contact">Contact Us</a>
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} Kean. All rights reserved.</p>
          <div className="footer-social-links">
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