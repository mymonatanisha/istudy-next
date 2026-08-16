import React, { ReactNode } from 'react';
import AdminSidebarMenu from './sidebar/AdminSidebarMenu';
import AdminDashboardBreadcrumb from '@/components/admin/layout/AdminBreadcrumb';

interface AdminDashboardLayoutProps {
  children: ReactNode;
}

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ children }) => {
  return (
    <>
      <AdminDashboardBreadcrumb />
      {/* -- Start Admin Dashboard Area -- */}
      <div className="bd-dashboard-area section-space-bottom">
        <div className="container">
          <div className="bd-dashboard-main">
            <div className="row gy-30">
              <AdminSidebarMenu />
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardLayout;
