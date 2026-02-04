"use client";

import React, { useState, useEffect } from 'react';

type UserProfile = {
  id: number;
  name: string;
  email: string;
  username?: string | null;
  phone?: string | null;
  avatar?: string | null;
  avatarUrl?: string | null;
  linkedIn?: string | null;
  bio?: string | null;
  occupation?: string | null;
  headline?: string | null;
  createdAt: string;
  updatedAt: string;
};

const StudentProfileMain = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/profile', { cache: 'no-store' });
      
      if (!res.ok) {
        throw new Error('Failed to fetch profile');
      }
      
      const data = await res.json();
      setProfile(data.user);
      setFormData(data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setUpdateSuccess(false);
    setUpdateError(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(profile || {});
    setUpdateError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Validate that the field name is one we expect
    const validFields = ['name', 'username', 'phone', 'avatarUrl', 'linkedIn', 'bio', 'occupation', 'headline'];
    if (validFields.includes(name)) {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Reset image error state when avatarUrl changes
      if (name === 'avatarUrl') {
        setImageError(false);
        setImageLoading(true);
      }
    }
  };

  const validateImageUrl = (url: string | null | undefined): boolean => {
    if (!url || url.trim() === '') return false;
    
    try {
      const urlObj = new URL(url);
      // Check if URL has a valid protocol
      if (!['http:', 'https:'].includes(urlObj.protocol)) return false;
      
      // Check if URL ends with common image extensions
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico'];
      const pathname = urlObj.pathname.toLowerCase();
      const hasImageExtension = imageExtensions.some(ext => pathname.endsWith(ext));
      
      // Accept if it has image extension or if it looks like an image URL
      return hasImageExtension || pathname.includes('/image') || pathname.includes('/avatar') || pathname.includes('/photo');
    } catch {
      return false;
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateError(null);
    setUpdateSuccess(false);

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }

      const data = await res.json();
      setProfile(data.user);
      setFormData(data.user);
      setIsEditing(false);
      setUpdateSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (err) {
      setUpdateError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setUpdateLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="col-xl-9 col-lg-9 col-md-8">
        <div className="bd-dashboard-inner">
          <div className="bd-dashboard-title-inner">
            <h4 className="bd-dashboard-title">My Profile</h4>
          </div>
          <div className="bd-dashboard-profile-info">
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="col-xl-9 col-lg-9 col-md-8">
        <div className="bd-dashboard-inner">
          <div className="bd-dashboard-title-inner">
            <h4 className="bd-dashboard-title">My Profile</h4>
          </div>
          <div className="bd-dashboard-profile-info">
            <div className="alert alert-danger">
              {error || 'Failed to load profile'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-xl-9 col-lg-9 col-md-8">
      <div className="bd-dashboard-inner">
        <div className="bd-dashboard-title-inner d-flex justify-content-between align-items-center">
          <h4 className="bd-dashboard-title">My Profile</h4>
          {!isEditing && (
            <button 
              onClick={handleEdit}
              className="bd-btn btn-primary"
              type="button"
            >
              <i className="fa-light fa-pen-to-square me-2"></i>
              Edit Profile
            </button>
          )}
        </div>

        {updateSuccess && (
          <div className="alert alert-success mb-3">
            Profile updated successfully!
          </div>
        )}

        {updateError && (
          <div className="alert alert-danger mb-3">
            {updateError}
          </div>
        )}

        {/* Avatar Image Display */}
        <div className="bd-profile-avatar-section text-center mb-4">
          <div className="bd-profile-avatar-wrapper d-inline-block position-relative">
            {validateImageUrl(isEditing ? formData.avatarUrl : profile.avatarUrl) && !imageError ? (
              <>
                {imageLoading && (
                  <div className="bd-avatar-placeholder d-flex align-items-center justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading image...</span>
                    </div>
                  </div>
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={isEditing ? (formData.avatarUrl || '') : (profile.avatarUrl || '')}
                  alt={`${profile.name}'s avatar`}
                  className={`bd-profile-avatar ${imageLoading ? 'd-none' : ''}`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              </>
            ) : (
              <div className="bd-avatar-placeholder d-flex align-items-center justify-content-center">
                <i className="fa-solid fa-user"></i>
              </div>
            )}
          </div>
          <div className="mt-3">
            <h5 className="mb-1">{profile.name}</h5>
            {profile.headline && <p className="text-muted mb-0">{profile.headline}</p>}
          </div>
        </div>

        {!isEditing ? (
          <div className="bd-dashboard-profile-info table-responsive">
            <table className="table table-bordered table-head-bg">
              <thead>
                <tr>
                  <th style={{ minWidth: "200px" }}>Field</th>
                  <th style={{ minWidth: "736.5px" }}>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Registration Date</th>
                  <td>{formatDate(profile.createdAt)}</td>
                </tr>
                <tr>
                  <th>Full Name</th>
                  <td>{profile.name || 'Not set'}</td>
                </tr>
                <tr>
                  <th>Username</th>
                  <td>{profile.username || 'Not set'}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{profile.email}</td>
                </tr>
                <tr>
                  <th>Phone Number</th>
                  <td>{profile.phone || 'Not set'}</td>
                </tr>
                <tr>
                  <th>Avatar URL</th>
                  <td>{profile.avatarUrl || 'Not set'}</td>
                </tr>
                <tr>
                  <th>Headline</th>
                  <td>{profile.headline || 'Not set'}</td>
                </tr>
                <tr>
                  <th>LinkedIn Profile Link</th>
                  <td>
                    {profile.linkedIn ? (
                      <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer">
                        {profile.linkedIn}
                      </a>
                    ) : (
                      'Not set'
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Occupation</th>
                  <td>{profile.occupation || 'Not set'}</td>
                </tr>
                <tr>
                  <th>Bio</th>
                  <td>{profile.bio || 'Not set'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bd-dashboard-profile-info">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    value={formData.username || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email (Read-only)</label>
                  <input
                    type="email"
                    className="form-control"
                    value={profile.email}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={formData.phone || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Avatar URL</label>
                  <input
                    type="url"
                    name="avatarUrl"
                    className="form-control"
                    value={formData.avatarUrl || ''}
                    onChange={handleChange}
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Headline</label>
                  <input
                    type="text"
                    name="headline"
                    className="form-control"
                    value={formData.headline || ''}
                    onChange={handleChange}
                    placeholder="e.g., Full Stack Developer"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    name="linkedIn"
                    className="form-control"
                    value={formData.linkedIn || ''}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Occupation</label>
                  <input
                    type="text"
                    name="occupation"
                    className="form-control"
                    value={formData.occupation || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Bio</label>
                  <textarea
                    name="bio"
                    className="form-control"
                    rows={4}
                    value={formData.bio || ''}
                    onChange={handleChange}
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <div className="col-12">
                  <div className="d-flex gap-2">
                    <button
                      type="submit"
                      className="bd-btn btn-primary"
                      disabled={updateLoading}
                    >
                      {updateLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <i className="fa-light fa-save me-2"></i>
                          Save Changes
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bd-btn btn-outline-secondary"
                      disabled={updateLoading}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfileMain;