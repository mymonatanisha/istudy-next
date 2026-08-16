"use client";

import React, { useState, useEffect } from 'react';
import avaterImg from '../../../../public/assets/images/avatar/avatar7.webp';
import profileBgImg from '../../../../public/assets/images/bg/profile-bg.webp';
import Image from 'next/image';

type UserProfile = {
  name?: string;
  avatar?: string | null;
  email?: string;
};

const AdminDashboardBreadcrumb = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/profile', { cache: 'no-store' });
        
        if (res.ok) {
          const data = await res.json();
          setProfile(data.user);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const displayName = profile?.name || 'Administrator';
  const avatarSrc = profile?.avatar?.trim() || '';
  const hasAvatar = avatarSrc !== '';

  return (
    <>
      {/* -- dashboard breadcrumb start -- */}
      <div className="bd-dashboard-breadcrumb section-space-small-top">
        <div className="container custom-container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bd-dashboard-breadcrumb-wrapper p-relative">
                <div className="bd-dashboard-breadcrumb-bg image-bg" style={{ backgroundImage: `url(${profileBgImg.src})` }}>
                </div>
                <div className="bd-dashboard-profile">
                  <div className="bd-dashboard-profile-user">
                    <div className="thumb">
                      {loading ? (
                        <div style={{ 
                          width: '100%', 
                          height: '100%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          background: '#f0f0f0' 
                        }}>
                          <span>...</span>
                        </div>
                      ) : hasAvatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={avatarSrc} 
                          alt={displayName}
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover' 
                          }}
                        />
                      ) : (
                        <Image src={avaterImg} alt={displayName} />
                      )}
                    </div>
                    <div className="content">
                      <h3 className="name">{displayName}</h3>
                      <span className="designation d-block">Administrator</span>
                      <div className="bd-dashboard-profile-meta">
                        <div className="enrolled-course" data-title="email">
                          <span className="icon"><i className="fa-light fa-envelope"></i></span> {profile?.email || 'admin@example.com'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* -- dashboard breadcrumb end -- */}
    </>
  );
};

export default AdminDashboardBreadcrumb;
