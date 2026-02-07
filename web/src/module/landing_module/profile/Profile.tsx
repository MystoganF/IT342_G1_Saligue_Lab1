import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/navbar/navbar';
import './Profile.css';

interface UserProfile {
  username: string;
  email: string;
  phone: string;
  avatar?: string;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tempProfile, setTempProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        const data = await res.json();
        const userProfile: UserProfile = {
          username: data.username,
          email: data.email,
          phone: data.phoneNumber,
        };

        setProfile(userProfile);
        setTempProfile(userProfile);
      } catch (err) {
        console.error('Failed to load profile', err);
      }
    };

    fetchProfile();
  }, [token, navigate]);

  if (!profile || !tempProfile) return <div className="profile-page">Loading...</div>;

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempProfile(prev => prev && { ...prev, [name]: value });
  };

  const handleSaveProfile = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: tempProfile.email,
          phoneNumber: tempProfile.phone,
        }),
      });

      if (!res.ok) return alert('Failed to update profile');

      setProfile(tempProfile);
      setIsEditing(false);
      alert('Profile updated!');
    } catch (err) {
      console.error(err);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword)
      return alert('Passwords do not match');
    if (passwordData.newPassword.length < 6)
      return alert('Password must be at least 6 characters');

    try {
      const res = await fetch('http://localhost:8080/api/users/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (!res.ok) return alert('Failed to change password');

      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setIsEditingPassword(false);
      alert('Password updated!');
    } catch (err) {
      console.error(err);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile(prev => prev && { ...prev, avatar: reader.result as string });
      setTempProfile(prev => prev && { ...prev, avatar: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-page">
      <Navbar />

      <div className="profile-container">
        <h1 className="profile-title">My Profile</h1>

        <div className="profile-grid">
          {/* Left Column: Avatar & Personal Info */}
          <div className="profile-left">
            <div className="avatar-section">
              {profile.avatar ? (
                <img src={profile.avatar} alt="avatar" className="avatar" />
              ) : (
                <div className="avatar-placeholder">{profile.username.charAt(0).toUpperCase()}</div>
              )}
              {isEditing && (
                <input type="file" accept="image/*" onChange={handleAvatarUpload} className="avatar-upload"/>
              )}
            </div>

            <div className="profile-info">
              <div className="info-group">
                <label>Username</label>
                <div>{profile.username}</div>
              </div>

              <div className="info-group">
                <label>Email</label>
                {isEditing ? (
                  <input name="email" value={tempProfile.email} onChange={handleProfileChange} />
                ) : (
                  <div>{profile.email}</div>
                )}
              </div>

              <div className="info-group">
                <label>Phone</label>
                {isEditing ? (
                  <input name="phone" value={tempProfile.phone} onChange={handleProfileChange} />
                ) : (
                  <div>{profile.phone}</div>
                )}
              </div>

              <div className="profile-actions">
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                ) : (
                  <>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                    <button onClick={handleSaveProfile}>Save</button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Security */}
          <div className="profile-right">
            <h2>Security</h2>
            {!isEditingPassword ? (
              <button onClick={() => setIsEditingPassword(true)}>Change Password</button>
            ) : (
              <div className="password-form">
                <input
                  type="password"
                  name="oldPassword"
                  placeholder="Old password"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                />

                <div className="password-actions">
                  <button onClick={() => setIsEditingPassword(false)}>Cancel</button>
                  <button onClick={handlePasswordSubmit}>Update Password</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
