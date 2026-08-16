import AdminDashboardMain from '@/components/admin/dashboard/AdminDashboardMain';
import Wrapper from '@/layout/DefaultWrapper';
import AdminDashboardLayout from '@/layout/AdminDashboardLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Admin Dashboard - Enam Notes Learning Platform",
};

const AdminDashboard = () => {
  // Auth check will be added later when NextAuth is properly configured
  return (
    <Wrapper>
      <main>
        <AdminDashboardLayout>
          <AdminDashboardMain />
        </AdminDashboardLayout>
      </main>
    </Wrapper>
  );
};

export default AdminDashboard;
