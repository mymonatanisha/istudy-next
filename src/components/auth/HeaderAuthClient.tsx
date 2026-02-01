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
      <div style={{ display: "flex", gap: 12 }}>
        <Link href="/sign-in" className="btn btn-outline">Login</Link>
        <Link href="/sign-up" className="btn btn-primary">Register</Link>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <span>Hi, {email}</span>
      <Link href="/student-dashboard" className="btn btn-outline">Dashboard</Link>
      <form action="/api/auth/logout" method="post">
        <button type="submit" className="btn btn-secondary">Logout</button>
      </form>
    </div>
  );
}