import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  // Cookie attributes MUST match login/register routes for proper deletion
  const secure = process.env.NODE_ENV === "production";
  
  res.cookies.set("token", "", {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return res;
}
