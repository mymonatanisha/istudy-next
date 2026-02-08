import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  const auth = await getAuthUser();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: auth.id },
    select: { 
      id: true, 
      name: true, 
      email: true, 
      username: true,
      phone: true,
      avatar: true,
      address: true,
      linkedIn: true,
      bio: true,
      occupation: true,
      headline: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ user });
}