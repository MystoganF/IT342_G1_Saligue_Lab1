import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [username, setUsername] = useState('Profile');
  const [loading, setLoading] = useState(true); 

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);


  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('http://localhost:8080/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch user');
        }

        const data = await res.json();
        setUsername(data.username);
        localStorage.setItem('username', data.username);
      } catch (err) {
        console.error(err);
        setUsername('');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Close dropdown when clicking outside
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

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleViewProfile = () => {
    navigate('/profile');
    setIsDropdownOpen(false);
  };

  const openLogoutModal = () => {
    setIsDropdownOpen(false);
    setShowLogoutModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername('Profile');
    setShowLogoutModal(false);
    navigate('/login');
  };

  const [isClosing, setIsClosing] = useState(false);

const closeModal = () => {
  setIsClosing(true); // trigger fade-out
  setTimeout(() => {
    setShowLogoutModal(false);
    setIsClosing(false);
  }, 250); // match the animation duration
};


  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <Link to="/" className="brand-link">
              <div className="brand-logo">
                <span className="logo-text">CN</span>
              </div>
              <span className="brand-name">CebuNest</span>
            </Link>
          </div>

          <div className="nav-links">
            {['/', '/about', '/gallery', '/product', '/contact'].map((path, i) => (
              <Link
                key={i}
                to={path}
                className={`nav-link ${location.pathname === path ? 'active' : ''}`}
              >
                {['Home', 'About', 'Gallery', 'Product', 'Contact'][i]}
              </Link>
            ))}
          </div>

          <div className="nav-profile">
            <button
              ref={buttonRef}
              className={`profile-button ${isDropdownOpen ? 'active' : ''}`}
              onClick={toggleDropdown}
              disabled={loading} // optional, disables button until user fetched
            >
              <div className="profile-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <span className="profile-text">{username}</span>
            </button>

            <div
              ref={dropdownRef}
              className={`profile-dropdown ${isDropdownOpen ? 'show' : ''}`}
            >
              <div className="dropdown-item" onClick={handleViewProfile}>
                <span>View Profile</span>
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item logout" onClick={openLogoutModal}>
                <span>Logout</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

     {/* Logout Confirmation Modal */}
{showLogoutModal && (
  <div className="success-message-overlay">
    <div className="success-message">
      <div className="success-icon">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M12 9v4M12 17h0M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3>Confirm Logout</h3>
      <p>Are you sure you want to logout from your account?</p>

      <div
        style={{
          marginTop: '30px',
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
        }}
      >
        <button
          className="register-button"
          style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #4338ca 100%)' }}
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="register-button"
          style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default Navbar;
