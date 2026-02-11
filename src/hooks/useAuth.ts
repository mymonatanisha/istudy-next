"use client";

import { useState, useEffect } from "react";

type AuthUser = { id: number; email: string; name?: string };

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!active) return;
        
        if (res.ok) {
          const data = await res.json();
          setUser(data.user || null);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        if (active) setUser(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchUser();
    
    return () => {
      active = false;
    };
  }, []);

  const logout = () => {
    setUser(null);
    setLoading(false);
  };

  return { user, loading, isAuthenticated: !!user, logout };
}
