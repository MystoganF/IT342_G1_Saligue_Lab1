import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleViewProfile = () => {
    navigate('/profile');
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
    setIsDropdownOpen(false);
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Brand/Logo */}
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            <div className="brand-logo">
              <span className="logo-text">K</span>
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
            Laurem
          </Link>
          <Link 
            to="/product" 
            className={`nav-link ${location.pathname === '/product' ? 'active' : ''}`}
          >
            Laurem
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
          >
            Laurem
          </Link>
        </div>

        {/* Profile Section with Dropdown */}
        <div className="nav-profile">
          <button 
            ref={buttonRef}
            className={`profile-button ${isDropdownOpen ? 'active' : ''}`}
            onClick={toggleDropdown}
          >
            <div className="profile-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <span className="profile-text">Profile</span>
          </button>

          {/* Dropdown Menu */}
          <div 
            ref={dropdownRef}
            className={`profile-dropdown ${isDropdownOpen ? 'show' : ''}`}
          >
            <div 
              className="dropdown-item" 
              onClick={handleViewProfile}
            >
              <div className="dropdown-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </div>
              <span>View Profile</span>
            </div>

            <div className="dropdown-divider"></div>

            <div 
              className="dropdown-item logout" 
              onClick={handleLogout}
            >
              <div className="dropdown-icon logout">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                </svg>
              </div>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;