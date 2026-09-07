import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ message: "If the email exists, a reset link has been generated" }, { status: 200 });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);
    await prisma.user.update({ where: { email }, data: { resetToken, resetTokenExpires } });

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/reset?token=${resetToken}`;
    console.log("Password reset link:", resetLink);

    // No email transport is configured yet, so expose the link in the API
    // response during local development only (never in production).
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json(
        { message: "Reset link generated", resetLink },
        { status: 200 }
      );
    }

    return NextResponse.json({ message: "Reset link generated" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}