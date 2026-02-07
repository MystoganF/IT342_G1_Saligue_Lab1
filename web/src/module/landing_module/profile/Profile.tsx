// src/pages/Profile/ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/navbar/navbar';
import './Profile.css';

interface UserProfile {
  username: string;
  email: string;
  phone: string;
  avatar?: string;
  createdAt?: string;
  lastLogin?: string;
  accountStatus?: string;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [profile, setProfile] = useState<UserProfile>({
    username: '',
    email: '',
    phone: '',
  });
  const [tempProfile, setTempProfile] = useState<UserProfile>({
    username: '',
    email: '',
    phone: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Format date nicely
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:8080/api/users/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Failed to fetch profile');

        const data = await response.json();
        const mappedProfile: UserProfile = {
          username: data.username || '',
          email: data.email || '',
          phone: data.phoneNumber || data.phone || '',
          avatar: data.avatar || '',
          createdAt: formatDate(data.createdAt),
          lastLogin: formatDate(data.lastUpdate),
          accountStatus: data.accountStatus || 'Active',
        };

        setProfile(mappedProfile);
        setTempProfile(mappedProfile);
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Failed to load profile.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [token, navigate]);

  // Handlers for editing profile
  const handleEditToggle = () => setIsEditing(true);

  const handleCancelEdit = () => {
    setTempProfile({ ...profile });
    setIsEditing(false);
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/users/me', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: tempProfile.username,
          email: tempProfile.email,
          phoneNumber: tempProfile.phone,
        }),
      });
      if (!response.ok) throw new Error('Failed to update profile');

      setProfile({ ...tempProfile });
      setIsEditing(false);

      // Show success overlay and logout
      setSuccessMessage('Profile updated successfully! Logging you out to apply changes...');
      setShowSuccess(true);
      setTimeout(() => {
        localStorage.removeItem('token');
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error instanceof Error ? error.message : 'Failed to update profile.');
      setTempProfile({ ...profile });
    }
  };

  // Handlers for changing password
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('New password must be at least 6 characters!');
      return;
    }
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/users/change-password', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        }),
      });
      if (!response.ok) throw new Error('Failed to change password');

      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setIsEditingPassword(false);

      // Show success overlay and logout
      setSuccessMessage('Password changed successfully! Logging you out to apply changes...');
      setShowSuccess(true);
      setTimeout(() => {
        localStorage.removeItem('token');
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error('Error changing password:', error);
      alert(error instanceof Error ? error.message : 'Failed to change password.');
    }
  };

  if (isLoading)
    return (
      <div className="profile-page">
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <h1 className="profile-title">
            My <span className="accent">Profile</span>
          </h1>
          <p className="profile-subtitle">
            Manage your account information and security settings
          </p>
        </div>

        {/* Profile Content */}
        <div className="profile-content">
          {/* Personal Info */}
          <div className="profile-card">
            <div className="profile-card-header">
              <h2>Personal Information</h2>
              {isEditing ? (
                <>
                  <button className="btn btn-secondary btn-small" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                  <button className="btn btn-primary btn-small" onClick={handleSaveProfile}>
                    Save Changes
                  </button>
                </>
              ) : (
                <button className="btn btn-primary btn-small" onClick={handleEditToggle}>
                  Edit Profile
                </button>
              )}
            </div>
            <div className="profile-card-body">
              <div className="profile-form">
                <div className="form-group">
                  <label>Username</label>
                  <input
                    name="username"
                    value={tempProfile.username}
                    onChange={handleProfileChange}
                    className="form-input"
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    name="email"
                    value={tempProfile.email}
                    onChange={handleProfileChange}
                    className="form-input"
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    name="phone"
                    value={tempProfile.phone}
                    onChange={handleProfileChange}
                    className="form-input"
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="profile-card" style={{ minWidth: '350px' }}>
            <div className="profile-card-header">
              <h2>Security</h2>
              {!isEditingPassword && (
                <button
                  className="btn btn-primary btn-small"
                  onClick={() => setIsEditingPassword(true)}
                >
                  Change Password
                </button>
              )}
            </div>
            <div className="profile-card-body">
              {isEditingPassword ? (
                <div className="password-form">
                  <div className="form-group">
                    <label>Old Password</label>
                    <input
                      type="password"
                      name="oldPassword"
                      value={passwordData.oldPassword}
                      onChange={handlePasswordChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="form-input"
                    />
                  </div>
                  <div className="password-actions">
                    <button
                      className="btn btn-secondary btn-small"
                      onClick={() => setIsEditingPassword(false)}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-primary btn-small" onClick={handlePasswordSubmit}>
                      Update Password
                    </button>
                  </div>
                </div>
              ) : (
                <div className="security-info">
                  <div className="security-item">
                    <span className="security-label">Password</span>
                    <span className="security-value">••••••••</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Account Info */}
          <div className="profile-card">
            <div className="profile-card-header">
              <h2>Account Information</h2>
            </div>
            <div className="profile-card-body">
              <div className="account-info">
                <div className="info-item">
                  <span className="info-label">Account Created</span>
                  <span className="info-value">{profile.createdAt}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Last Update</span>
                  <span className="info-value">{profile.lastLogin}</span>
                </div>
                <div className="info-item">
                  <span className={`info-value ${profile.accountStatus === 'Active' ? 'status-active' : 'status-inactive'}`}>
                    {profile.accountStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Overlay */}
      {showSuccess && (
        <div className="success-message-overlay">
          <div className="success-message">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3>Success!</h3>
            <p>{successMessage}</p>
            <div className="success-progress">
              <div className="progress-bar"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
