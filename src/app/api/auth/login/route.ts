import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

type Body = { email?: string; password?: string };

export async function POST(req: Request) {
  try {
    const { email, password } = (await req.json()) as Body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) return NextResponse.json({ error: "JWT_SECRET is not set" }, { status: 500 });

    const token = jwt.sign({ sub: user.id, email: user.email }, secret, { expiresIn: "7d" });
    const res = NextResponse.json({ ok: true }, { status: 200 });

    const secure = process.env.NODE_ENV === "production";
    res.cookies.set("token", token, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (err: unknown) {
    console.error("Login error:", err);
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}