import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/admin-auth';
import { ReactNode } from 'react';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Check if user is admin
  const adminUser = await getAdminUser();

  if (!adminUser) {
    // Redirect non-admins to home or show 403
    redirect('/');
  }

  return <>{children}</>;
}
