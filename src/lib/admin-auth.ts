import { getAuthUser } from "./auth";
import { prisma } from "./prisma";

export type AdminUser = {
  id: number;
  email: string;
  name: string;
  role_id: number;
};

/**
 * Check if the authenticated user is an admin
 * Returns the user object if admin, null otherwise
 */
export async function getAdminUser(): Promise<AdminUser | null> {
  const authUser = await getAuthUser();
  
  if (!authUser) {
    return null;
  }

  // Fetch full user details including role
  const user = await prisma.user.findUnique({
    where: { id: authUser.id },
    select: {
      id: true,
      email: true,
      name: true,
      role_id: true,
    },
  });

  if (!user) {
    return null;
  }

  // Check if user is admin (role_id === 1)
  if (user.role_id !== 1) {
    return null;
  }

  return user;
}

/**
 * Verify if a user has admin privileges
 * Returns true if admin, false otherwise
 */
export async function isAdmin(): Promise<boolean> {
  const adminUser = await getAdminUser();
  return adminUser !== null;
}
