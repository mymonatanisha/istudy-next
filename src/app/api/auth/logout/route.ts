import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = NextResponse.redirect("https://enamnotes.com/");
  res.cookies.set("token", "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
