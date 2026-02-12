import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import AdminDashboardMain from '@/components/admin/dashboard/AdminDashboardMain';
import Wrapper from '@/layout/DefaultWrapper';
import AdminDashboardLayout from '@/layout/AdminDashboardLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Admin Dashboard - iStudy Learning Platform",
};

const AdminDashboard = async () => {
  // Check authentication
  const session = await getServerSession();
  
  if (!session) {
    redirect('/sign-in?redirect=/admin');
  }
  
  // Check if user is admin (role_id = 1)
  if (session.user?.role_id !== 1) {
    redirect('/'); // or redirect to 403 page
  }

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
