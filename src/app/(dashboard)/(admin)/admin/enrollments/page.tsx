import EnrollmentsTable from '@/components/admin/tables/EnrollmentsTable';
import Wrapper from '@/layout/DefaultWrapper';
import AdminDashboardLayout from '@/layout/AdminDashboardLayout';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Enrollment Management - Admin Dashboard",
};

const EnrollmentsPage = () => {
  return (
    <>
      <Wrapper>
        <main>
          <AdminDashboardLayout>
            <div className="col-xxl-9 col-xl-8 col-lg-8">
              <div className="bd-dashboard-content">
                <div className="bd-dashboard-content-inner">
                  <div className="bd-dashboard-widget white-bg mb-30">
                    <EnrollmentsTable />
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

export default EnrollmentsPage;
