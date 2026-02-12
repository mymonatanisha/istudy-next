import RevenueDashboard from '@/components/admin/dashboard/RevenueDashboard';
import Wrapper from '@/layout/DefaultWrapper';
import AdminDashboardLayout from '@/layout/AdminDashboardLayout';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Revenue Dashboard - Admin Panel",
};

const RevenuePage = () => {
  return (
    <>
      <Wrapper>
        <main>
          <AdminDashboardLayout>
            <div className="col-xxl-9 col-xl-8 col-lg-8">
              <div className="bd-dashboard-content">
                <div className="bd-dashboard-content-inner">
                  <RevenueDashboard />
                </div>
              </div>
            </div>
          </AdminDashboardLayout>
        </main>
      </Wrapper>
    </>
  );
};

export default RevenuePage;
