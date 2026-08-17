import { getAuthUser } from "./auth";
import { prisma } from "./prisma";

export type AdminUser = {
  id: number;
  email: string;
  name: string;
  role_id: number | null;
};

/**
 * Check if the authenticated user is an admin
 * Returns the user object if admin, null otherwise
 */
export async function getAdminUser(): Promise<AdminUser | null> {
  try {
    console.debug("getAdminUser: checking admin user");
    const authUser = await getAuthUser();
    console.debug("getAdminUser: authUser=", authUser);

    if (!authUser) {
      console.debug("getAdminUser: no authenticated user");
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

    console.debug("getAdminUser: db user=", user);

    if (!user) {
      console.debug("getAdminUser: user not found in DB");
      return null;
    }

    // Check if user is admin (role_id === 1)
    if (user.role_id !== 1) {
      console.debug("getAdminUser: user is not admin; role_id=", user.role_id);
      return null;
    }

    return user;
  } catch (error) {
    console.error("getAdminUser: unexpected error", error instanceof Error ? error.message : error);
    throw error;
  }
}

/**
 * Verify if a user has admin privileges
 * Returns true if admin, false otherwise
 */
export async function isAdmin(): Promise<boolean> {
  const adminUser = await getAdminUser();
  return adminUser !== null;
}
