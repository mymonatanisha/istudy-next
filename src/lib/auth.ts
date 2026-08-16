import { cookies } from "next/headers";
import { verify, JwtPayload } from "jsonwebtoken";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth-options";
import { prisma } from "./prisma";

export type AuthUser = { id: number; email: string };

// Extended session user type for NextAuth
type SessionUser = {
  id?: number;
  email?: string;
  name?: string;
  image?: string;
};

export async function getAuthUser(): Promise<AuthUser | null> {
  // Next.js 15 dynamic API must be awaited
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // First, try JWT token (for email/password login)
  // IMPORTANT: if JWT verification fails, fall back to NextAuth session.
  if (token) {
    const secret = process.env.JWT_SECRET;

    if (secret) {
      try {
        const decoded = verify(token, secret);

        // verify() can return a string or a JwtPayload — handle both
        if (typeof decoded !== "string") {
          const payload = decoded as JwtPayload & { email?: string };
          const sub = payload.sub;
          const email = payload.email;

          if (sub != null && typeof email === "string") {
            const id = typeof sub === "string" ? Number(sub) : sub;
            return { id, email };
          }
        }
      } catch (error) {
        console.warn(
          "JWT token verification failed, trying NextAuth session fallback:",
          error instanceof Error ? error.message : error
        );
      }
    } else {
      console.warn("JWT_SECRET is not set, trying NextAuth session fallback.");
    }
  }

  // If JWT auth did not succeed, check NextAuth session (for OAuth login)
  try {
    const session = await getServerSession(authOptions);
    const sessionUser = session?.user as SessionUser | undefined;

    if (sessionUser?.email) {
      // If ID already exists in session (recommended way)
      if (sessionUser.id) {
        return { id: sessionUser.id, email: sessionUser.email };
      }

      // Legacy fallback: find user by email
      const user = await prisma.user.findUnique({
        where: { email: sessionUser.email },
        select: { id: true, email: true },
      });

      if (user) {
        return { id: user.id, email: user.email };
      }

      console.error(
        "NextAuth session found but user not in database (legacy session)"
      );
    }
  } catch (error) {
    console.error(
      "Failed to retrieve NextAuth session during authentication check:",
      error instanceof Error ? error.message : error
    );
  }

  return null;
}
