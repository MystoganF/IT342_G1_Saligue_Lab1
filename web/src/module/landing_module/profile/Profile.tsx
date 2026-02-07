import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/navbar/navbar';
import './Profile.css';

interface UserProfile {
  username: string;
  email: string;
  phone: string;
  avatar?: string;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    username: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [tempProfile, setTempProfile] = useState<UserProfile>({ ...profile });

  // Initialize tempProfile when profile changes
  useEffect(() => {
    setTempProfile({ ...profile });
  }, [profile]);

  const handleEditToggle = () => {
    if (isEditing) {
      setProfile({ ...tempProfile });
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setTempProfile({ ...profile });
    setIsEditing(false);
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempProfile(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('New password must be at least 6 characters!');
      return;
    }

    // Here you would typically make an API call to change the password
    console.log('Changing password...', passwordData);

    // Reset password form
    setPasswordData({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setIsEditingPassword(false);
    
    alert('Password changed successfully!');
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          avatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // Here you would typically make an API call to save the profile
    console.log('Saving profile...', tempProfile);
    setProfile({ ...tempProfile });
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="profile-page">
      <Navbar />

      {/* Main Content */}
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-title">
            My <span className="accent">Profile</span>
          </h1>
          <p className="profile-subtitle">
            Manage your account information and security settings
          </p>
        </div>

        <div className="profile-content">
          {/* Profile Card */}
          <div className="profile-card">
            <div className="profile-card-header">
              <h2>Personal Information</h2>
              <div className="profile-actions">
                {isEditing ? (
                  <>
                    <button 
                      className="btn btn-secondary btn-small"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                    <button 
                      className="btn btn-primary btn-small"
                      onClick={handleSaveProfile}
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button 
                    className="btn btn-primary btn-small"
                    onClick={handleEditToggle}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            <div className="profile-card-body">
              {/* Avatar Section */}
              <div className="profile-avatar-section">
                <div className="avatar-container">
                  <div className="avatar">
                    {profile.avatar ? (
                      <img src={profile.avatar} alt="Profile" />
                    ) : (
                      <div className="avatar-placeholder">
                        {profile.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <label className="avatar-upload">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        hidden
                      />
                      <span className="upload-text">Change Photo</span>
                    </label>
                  )}
                </div>
              </div>

              {/* Form Fields */}
              <div className="profile-form">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={tempProfile.username}
                      onChange={handleProfileChange}
                      className="form-input"
                      placeholder="Enter your username"
                    />
                  ) : (
                    <div className="form-value">{profile.username}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={tempProfile.email}
                      onChange={handleProfileChange}
                      className="form-input"
                      placeholder="Enter your email"
                    />
                  ) : (
                    <div className="form-value">{profile.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={tempProfile.phone}
                      onChange={handleProfileChange}
                      className="form-input"
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <div className="form-value">{profile.phone}</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Password Card */}
          <div className="profile-card">
            <div className="profile-card-header">
              <h2>Security Settings</h2>
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
                    <label htmlFor="oldPassword">Old Password</label>
                    <input
                      type="password"
                      id="oldPassword"
                      name="oldPassword"
                      value={passwordData.oldPassword}
                      onChange={handlePasswordChange}
                      className="form-input"
                      placeholder="Enter your old password"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="form-input"
                      placeholder="Enter new password"
                    />
                    <div className="form-hint">
                      Must be at least 6 characters
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="form-input"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <div className="password-actions">
                    <button 
                      className="btn btn-secondary btn-small"
                      onClick={() => setIsEditingPassword(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      className="btn btn-primary btn-small"
                      onClick={handlePasswordSubmit}
                    >
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
                  <div className="security-note">
                    Last changed 30 days ago
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Account Info Card */}
          <div className="profile-card">
            <div className="profile-card-header">
              <h2>Account Information</h2>
            </div>
            <div className="profile-card-body">
              <div className="account-info">
                <div className="info-item">
                  <span className="info-label">Account Created</span>
                  <span className="info-value">January 15, 2024</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Last Login</span>
                  <span className="info-value">Today, 10:30 AM</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Account Status</span>
                  <span className="info-value status-active">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="background-effects">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
    </div>
  );
};

export default ProfilePage;