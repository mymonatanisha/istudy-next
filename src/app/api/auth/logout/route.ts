import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.redirect("https://enamnotes.com/");

  res.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return res;
}
