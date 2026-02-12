import CoursesTable from '@/components/admin/tables/CoursesTable';
import Wrapper from '@/layout/DefaultWrapper';
import AdminDashboardLayout from '@/layout/AdminDashboardLayout';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Course Management - Admin Dashboard",
};

const CoursesPage = () => {
  return (
    <>
      <Wrapper>
        <main>
          <AdminDashboardLayout>
            <div className="col-xxl-9 col-xl-8 col-lg-8">
              <div className="bd-dashboard-content">
                <div className="bd-dashboard-content-inner">
                  <div className="bd-dashboard-widget white-bg mb-30">
                    <CoursesTable />
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

export default CoursesPage;
