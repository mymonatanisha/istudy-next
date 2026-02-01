import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const rows = await prisma.$queryRaw<{ ok: number }[]>`SELECT 1 as ok`;
    return NextResponse.json({ ok: rows[0]?.ok === 1 });
  } catch {
    // Optional: keep the app responsive even if DB is down
    return NextResponse.json({ ok: false });
  }
}