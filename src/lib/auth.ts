import { cookies } from "next/headers";
import { verify, JwtPayload } from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";
import { prisma } from "./prisma";

export type AuthUser = { id: number; email: string };

export async function getAuthUser(): Promise<AuthUser | null> {
  // Next.js 15 dynamic API must be awaited
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  
  // First, try JWT token (for email/password login)
  if (token) {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not set");

    try {
      const decoded = verify(token, secret);
      // verify() can return a string or a JwtPayload — handle both
      if (typeof decoded === "string") {
        return null;
      }

      const payload = decoded as JwtPayload & { email?: string };

      const sub = payload.sub;
      const email = payload.email;

      if (sub == null || typeof email !== "string") {
        return null;
      }

      const id = typeof sub === "string" ? Number(sub) : sub;
      return { id, email };
    } catch {
      return null;
    }
  }

  // If no JWT token, check for NextAuth session (for OAuth login)
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.email) {
      // Check if user ID is in the session (set by jwt callback in auth-options)
      const userId = (session.user as any).id;
      if (userId) {
        return { id: userId, email: session.user.email };
      }
      
      // Fallback: Look up user by email to get their ID (for legacy sessions)
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true, email: true }
      });
      
      if (user) {
        return { id: user.id, email: user.email };
      }
      
      console.error("NextAuth session found but user not in database:", session.user.email);
    }
  } catch (error) {
    console.error("NextAuth session check error:", error, "User email:", (await getServerSession(authOptions))?.user?.email || "unknown");
  }

  return null;
}