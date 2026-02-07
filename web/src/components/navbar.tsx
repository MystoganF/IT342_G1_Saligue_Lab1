// src/components/Navbar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Brand/Logo */}
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            <div className="brand-logo">
              <span className="logo-text">CL</span>
            </div>
            <span className="brand-name">Kean</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
          >
            About
          </Link>
          <Link 
            to="/gallery" 
            className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}
          >
            Gallery
          </Link>
          <Link 
            to="/product" 
            className={`nav-link ${location.pathname === '/product' ? 'active' : ''}`}
          >
            Product
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
          >
            Contact
          </Link>
        </div>

        
        
        <div className="nav-profile">
          <Link 
            to="/dashboard" 
            className={`profile-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            <div className="profile-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <span className="profile-text">Profile</span>
            </Link>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;