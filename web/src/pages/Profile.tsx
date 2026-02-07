// src/pages/Profile.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Profile.css';

const Profile: React.FC = () => {
  // Mock user data - will be replaced with actual data later
  const [userData, setUserData] = useState({
    username: 'john_doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
  });

  // Form states - not functional yet
  const [editMode, setEditMode] = useState({
    profile: false,
    password: false,
  });

  const [profileForm, setProfileForm] = useState({
    username: '',
    email: '',
    phone: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // These functions will be implemented later
  const handleProfileEdit = () => {
    console.log('Profile edit toggled');
    setEditMode(prev => ({ ...prev, profile: !prev.profile }));
  };

  const handlePasswordEdit = () => {
    console.log('Password edit toggled');
    setEditMode(prev => ({ ...prev, password: !prev.password }));
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile update submitted:', profileForm);
    // Will be implemented when backend is ready
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password change submitted:', passwordForm);
    // Will be implemented when backend is ready
  };

  return (
    <div className="profile-page">
      {/* Navbar */}
      <Navbar />

      <main className="profile-container">
        <div className="profile-header">
          <h1>Profile Settings</h1>
          <p className="profile-subtitle">Manage your account information and security</p>
        </div>

        <div className="profile-content">
          {/* Profile Information Card */}
          <div className="profile-card">
            <div className="card-header">
              <h2>Personal Information</h2>
              <button 
                className="edit-button"
                onClick={handleProfileEdit}
              >
                {editMode.profile ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {editMode.profile ? (
              <form className="profile-form" onSubmit={handleProfileSubmit}>
                <div className="form-group">
                  <label htmlFor="edit-username">USERNAME</label>
                  <input
                    type="text"
                    id="edit-username"
                    defaultValue={userData.username}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="Enter new username"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-email">EMAIL</label>
                  <input
                    type="email"
                    id="edit-email"
                    defaultValue={userData.email}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter new email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-phone">PHONE NUMBER</label>
                  <input
                    type="tel"
                    id="edit-phone"
                    defaultValue={userData.phone}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter new phone number"
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-button">
                    Save Changes
                  </button>
                  <button 
                    type="button" 
                    className="cancel-button"
                    onClick={handleProfileEdit}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-info">
                <div className="info-item">
                  <span className="info-label">Username:</span>
                  <span className="info-value">{userData.username}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{userData.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone:</span>
                  <span className="info-value">{userData.phone}</span>
                </div>
              </div>
            )}
          </div>

          {/* Password Change Card */}
          <div className="profile-card">
            <div className="card-header">
              <h2>Security</h2>
              <button 
                className="edit-button"
                onClick={handlePasswordEdit}
              >
                {editMode.password ? 'Cancel' : 'Change Password'}
              </button>
            </div>

            {editMode.password ? (
              <form className="profile-form" onSubmit={handlePasswordSubmit}>
                <div className="form-group">
                  <label htmlFor="current-password">CURRENT PASSWORD</label>
                  <input
                    type="password"
                    id="current-password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                    placeholder="Enter current password"
                    required
                  />
                  <p className="field-note">
                    You must enter your current password to change it.
                  </p>
                </div>

                <div className="form-group">
                  <label htmlFor="new-password">NEW PASSWORD</label>
                  <input
                    type="password"
                    id="new-password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="Enter new password"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirm-password">CONFIRM NEW PASSWORD</label>
                  <input
                    type="password"
                    id="confirm-password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-button">
                    Update Password
                  </button>
                  <button 
                    type="button" 
                    className="cancel-button"
                    onClick={handlePasswordEdit}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="password-info">
                <div className="info-item">
                  <span className="info-label">Password:</span>
                  <span className="info-value">••••••••</span>
                </div>
                <p className="security-note">
                  Your password was last changed recently. For security reasons, 
                  we recommend changing your password periodically.
                </p>
              </div>
            )}
          </div>

          {/* Account Actions Card */}
          <div className="profile-card">
            <div className="card-header">
              <h2>Account Actions</h2>
            </div>
            <div className="account-actions">
              <div className="action-item">
                <h3>Export Data</h3>
                <p>Download a copy of your personal data</p>
                <button className="action-button">
                  Request Data Export
                </button>
              </div>
              <div className="action-item">
                <h3>Delete Account</h3>
                <p>Permanently delete your account and all data</p>
                <button className="delete-button">
                  Delete Account
                </button>
              </div>
            </div>
          </div>

        
        </div>
      </main>

      {/* Footer Note */}
      <div className="implementation-note">
        <p>
          <strong>Note:</strong> This is a frontend-only implementation. 
          Profile update functionality will be implemented when backend is ready.
        </p>
      </div>
    </div>
  );
};

export default Profile;