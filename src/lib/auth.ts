import { cookies } from "next/headers";
import { verify, JwtPayload } from "jsonwebtoken";

export type AuthUser = { id: number; email: string };

export async function getAuthUser(): Promise<AuthUser | null> {
  // Next.js 15 dynamic API must be awaited
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

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