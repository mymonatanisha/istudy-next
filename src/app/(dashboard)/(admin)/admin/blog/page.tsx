import BlogPostsTable from '@/components/admin/blog/BlogPostsTable';
import Wrapper from '@/layout/DefaultWrapper';
import AdminDashboardLayout from '@/layout/AdminDashboardLayout';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Blog Management - Admin Dashboard',
};

const AdminBlogPage = () => {
  return (
    <Wrapper>
      <main>
        <AdminDashboardLayout>
          <div className="col-xxl-9 col-xl-8 col-lg-8">
            <div className="bd-dashboard-content">
              <div className="bd-dashboard-content-inner">
                <div className="bd-dashboard-widget white-bg mb-30">
                  <BlogPostsTable />
                </div>
              </div>
            </div>
          </div>
        </AdminDashboardLayout>
      </main>
    </Wrapper>
  );
};

export default AdminBlogPage;
