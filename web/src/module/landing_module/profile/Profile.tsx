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

  /* ===============================
     FETCH PROFILE USING JWT
     =============================== */
  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  if (!profile || !tempProfile) {
    return <div className="profile-page">Loading profile...</div>;
  }

  /* ===============================
     PROFILE EDIT HANDLERS
     =============================== */
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

      if (!res.ok) {
        alert('Failed to update profile');
        return;
      }

      setProfile(tempProfile);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  /* ===============================
     PASSWORD CHANGE
     =============================== */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    try {
      const res = await fetch(
        'http://localhost:8080/api/users/change-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oldPassword: passwordData.oldPassword,
            newPassword: passwordData.newPassword,
          }),
        }
      );

      if (!res.ok) {
        alert('Failed to change password');
        return;
      }

      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setIsEditingPassword(false);
      alert('Password updated successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  /* ===============================
     AVATAR (FRONTEND ONLY)
     =============================== */
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
        <h1>My Profile</h1>

       
        <div className="profile-card">
          <div className="profile-card-header">
            <h2>Personal Information</h2>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)}>Edit</button>
            ) : (
              <>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
                <button onClick={handleSaveProfile}>Save</button>
              </>
            )}
          </div>

          <div className="profile-card-body">
            {/* Avatar */}
            <div className="avatar">
              {profile.avatar ? (
                <img src={profile.avatar} alt="avatar" />
              ) : (
                <div className="avatar-placeholder">
                  {profile.username.charAt(0).toUpperCase()}
                </div>
              )}
              {isEditing && (
                <input type="file" accept="image/*" onChange={handleAvatarUpload} />
              )}
            </div>

            <div className="form-group">
              <label>Username</label>
              <div>{profile.username}</div>
            </div>

            <div className="form-group">
              <label>Email</label>
              {isEditing ? (
                <input
                  name="email"
                  value={tempProfile.email}
                  onChange={handleProfileChange}
                />
              ) : (
                <div>{profile.email}</div>
              )}
            </div>

            <div className="form-group">
              <label>Phone</label>
              {isEditing ? (
                <input
                  name="phone"
                  value={tempProfile.phone}
                  onChange={handleProfileChange}
                />
              ) : (
                <div>{profile.phone}</div>
              )}
            </div>
          </div>
        </div>

      
        <div className="profile-card">
          <div className="profile-card-header">
            <h2>Security</h2>
            {!isEditingPassword && (
              <button onClick={() => setIsEditingPassword(true)}>
                Change Password
              </button>
            )}
          </div>

          {isEditingPassword && (
            <div className="profile-card-body">
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

              <button onClick={() => setIsEditingPassword(false)}>Cancel</button>
              <button onClick={handlePasswordSubmit}>Update Password</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
