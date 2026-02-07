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

  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [tempProfile, setTempProfile] = useState<UserProfile>({ ...profile });

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

  // Fetch user profile on component mount
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
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();

        const userProfile: UserProfile = {
          username: data.username || '',
          email: data.email || '',
          phone: data.phoneNumber || data.phone || '',
          avatar: data.avatar || data.profilePicture || '',
          createdAt: formatDate(data.createdAt),
          lastLogin: formatDate(data.lastUpdate),
          accountStatus: data.accountStatus || 'Active',
        };

        setProfile(userProfile);
        setTempProfile(userProfile);
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Failed to load profile. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token, navigate]);

  useEffect(() => {
    setTempProfile({ ...profile });
  }, [profile]);

  // Edit profile handlers
  const handleEditToggle = () => {
    if (isEditing) {
      handleSaveProfile();
    } else {
      setIsEditing(true);
    }
  };

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
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: tempProfile.email,
          phoneNumber: tempProfile.phone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      setProfile(prev => ({
        ...prev,
        email: tempProfile.email,
        phone: tempProfile.phone,
      }));

      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error instanceof Error ? error.message : 'Failed to update profile.');
      setTempProfile({ ...profile });
    }
  };

  // Password handlers
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
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to change password');
      }

      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setIsEditingPassword(false);
      alert('Password changed successfully!');
    } catch (error) {
      console.error('Error changing password:', error);
      alert(error instanceof Error ? error.message : 'Failed to change password.');
    }
  };

  // Avatar upload
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size too large. Max 5MB.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newAvatar = reader.result as string;
      setProfile(prev => ({ ...prev, avatar: newAvatar }));
      setTempProfile(prev => ({ ...prev, avatar: newAvatar }));
    };
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch('http://localhost:8080/api/users/avatar', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload avatar');

      const data = await response.json();
      if (data.avatarUrl) setProfile(prev => ({ ...prev, avatar: data.avatarUrl }));

      alert('Avatar updated successfully!');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Failed to upload avatar.');
    }
  };

  if (isLoading) {
    return (
      <div className="profile-page">
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

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
              <div className="profile-actions">
                {isEditing ? (
                  <>
                    <button className="btn btn-secondary btn-small" onClick={handleCancelEdit}>Cancel</button>
                    <button className="btn btn-primary btn-small" onClick={handleSaveProfile}>Save Changes</button>
                  </>
                ) : (
                  <button className="btn btn-primary btn-small" onClick={handleEditToggle}>Edit Profile</button>
                )}
              </div>
            </div>
            <div className="profile-card-body">
              {/* Avatar */}
              <div className="profile-avatar-section">
                <div className="avatar-container">
                  <div className="avatar">
                    {profile.avatar ? <img src={profile.avatar} alt="Profile" /> :
                      <div className="avatar-placeholder">{profile.username.charAt(0).toUpperCase()}</div>}
                  </div>
                  {isEditing && (
                    <label className="avatar-upload">
                      <input type="file" accept="image/*" onChange={handleAvatarUpload} hidden />
                      <span className="upload-text">Change Photo</span>
                    </label>
                  )}
                </div>
              </div>
              {/* Form */}
              <div className="profile-form">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  {isEditing ? (
                    <input type="text" id="username" name="username" value={tempProfile.username} onChange={handleProfileChange} disabled className="form-input" />
                  ) : (
                    <div className="form-value">{profile.username}</div>
                  )}
                  {isEditing && <div className="form-hint">Username cannot be changed</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  {isEditing ? (
                    <input type="email" id="email" name="email" value={tempProfile.email} onChange={handleProfileChange} className="form-input" />
                  ) : (
                    <div className="form-value">{profile.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  {isEditing ? (
                    <input type="tel" id="phone" name="phone" value={tempProfile.phone} onChange={handleProfileChange} className="form-input" />
                  ) : (
                    <div className="form-value">{profile.phone}</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="profile-card">
            <div className="profile-card-header">
              <h2>Security</h2>
              {!isEditingPassword && (
                <button className="btn btn-primary btn-small" onClick={() => setIsEditingPassword(true)}>Change Password</button>
              )}
            </div>
            <div className="profile-card-body">
              {isEditingPassword ? (
                <div className="password-form">
                  <div className="form-group">
                    <label htmlFor="oldPassword">Old Password</label>
                    <input type="password" id="oldPassword" name="oldPassword" value={passwordData.oldPassword} onChange={handlePasswordChange} className="form-input" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input type="password" id="newPassword" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} className="form-input" />
                    <div className="form-hint">Must be at least 6 characters</div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} className="form-input" />
                  </div>
                  <div className="password-actions">
                    <button className="btn btn-secondary btn-small" onClick={() => { setIsEditingPassword(false); setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' }); }}>Cancel</button>
                    <button className="btn btn-primary btn-small" onClick={handlePasswordSubmit}>Update Password</button>
                  </div>
                </div>
              ) : (
                <div className="security-info">
                  <div className="security-item">
                    <span className="security-label">Password</span>
                    <span className="security-value">••••••••</span>
                  </div>
                  <div className="security-note">Last changed 30 days ago</div>
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
                  <span className="info-label">Account Status</span>
                  <span className={`info-value ${profile.accountStatus === 'Active' ? 'status-active' : 'status-inactive'}`}>
                    {profile.accountStatus}
                  </span>
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
