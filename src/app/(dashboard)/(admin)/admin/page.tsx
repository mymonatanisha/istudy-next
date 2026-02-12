import AdminDashboardMain from '@/components/admin/dashboard/AdminDashboardMain';
import Wrapper from '@/layout/DefaultWrapper';
import AdminDashboardLayout from '@/layout/AdminDashboardLayout';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Admin Dashboard - iStudy Learning Platform",
};

const AdminDashboard = () => {
  return (
    <>
      <Wrapper>
        <main>
          <AdminDashboardLayout>
            <AdminDashboardMain />
          </AdminDashboardLayout>
        </main>
      </Wrapper>
    </>
  );
};

export default AdminDashboard;
