"use client";

import * as React from "react";
import Link from "next/link";

type Me = { user?: { email: string } };

export default function HeaderAuthClient() {
  const [email, setEmail] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!mounted) return;
        if (res.ok) {
          const data: Me = await res.json();
          setEmail(data.user?.email ?? null);
        } else {
          setEmail(null);
        }
      } catch {
        if (!mounted) return;
        // Network error or other fetch failure - assume not authenticated
        setEmail(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => {
      mounted = false;
    };
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

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        // Clear the email state to show login/register buttons
        setEmail(null);
        // Redirect to home page
        window.location.href = "/";
      } else {
        console.error("Logout failed with status:", res.status);
        // Still redirect to home page even if logout fails
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout request failed:", error);
      // Redirect to home page to ensure user sees login option
      window.location.href = "/";
    }
  };

  return (
    <>
      <Link className="bd-btn btn-outline-primary h-40px" href="/student-dashboard">Dashboard</Link>
      <form onSubmit={handleLogout} className="d-inline">
        <button type="submit" className="bd-btn btn-outline-border-primary h-40px">Logout</button>
      </form>
    </>
  );
}