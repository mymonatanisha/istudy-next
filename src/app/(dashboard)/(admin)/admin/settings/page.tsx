import Wrapper from '@/layout/DefaultWrapper';
import AdminDashboardLayout from '@/layout/AdminDashboardLayout';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Settings - Admin Panel",
};

const SettingsPage = () => {
  return (
    <>
      <Wrapper>
        <main>
          <AdminDashboardLayout>
            <div className="col-xxl-9 col-xl-8 col-lg-8">
              <div className="bd-dashboard-content">
                <div className="bd-dashboard-content-inner">
                  <div className="bd-dashboard-widget white-bg mb-30">
                    <div className="bd-dashboard-section-header mb-20">
                      <h5 className="bd-dashboard-section-title">System Settings</h5>
                    </div>
                    <div className="alert alert-info">
                      <i className="fa-light fa-info-circle"></i>
                      <strong> Coming Soon:</strong> System configuration settings will be available here.
                    </div>
                    <div className="row g-4">
                      <div className="col-12">
                        <h6>Platform Settings</h6>
                        <p className="text-muted">Configure platform-wide settings and preferences.</p>
                      </div>
                      <div className="col-12">
                        <h6>Payment Configuration</h6>
                        <p className="text-muted">Manage payment gateways and commission rates.</p>
                      </div>
                      <div className="col-12">
                        <h6>Email Templates</h6>
                        <p className="text-muted">Customize email notifications and templates.</p>
                      </div>
                      <div className="col-12">
                        <h6>Security Settings</h6>
                        <p className="text-muted">Configure security and authentication options.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AdminDashboardLayout>
        </main>
      </Wrapper>
    </>
  );
};

export default SettingsPage;
