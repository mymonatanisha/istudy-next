"use client";

import * as React from "react";
import Link from "next/link";

type Me = { user?: { email: string } };

export default function HeaderAuthClient() {
  const [email, setEmail] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!active) return;
        if (res.ok) {
          const data: Me = await res.json();
          setEmail(data.user?.email ?? null);
        } else {
          setEmail(null);
        }
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  if (loading) return null; // or a small skeleton

  if (!email) {
    return (
      <>
        <Link className="bd-btn btn-outline-primary h-40px" href="/sign-in">Login</Link>
        <Link className="bd-btn btn-outline-border-primary h-40px" href="/sign-up">Register</Link>
      </>
    );
  }

  return (
    <>
      <Link className="bd-btn btn-outline-primary h-40px" href="/student-dashboard">Dashboard</Link>
      <form action="/api/auth/logout" method="post" style={{ display: "inline" }}>
        <button type="submit" className="bd-btn btn-outline-border-primary h-40px">Logout</button>
      </form>
    </>
  );
}