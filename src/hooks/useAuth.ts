import { useState, useEffect, useCallback } from "react";
// Solution: import AuthUser type
import type { AuthUser } from "@/lib/auth"; // <-- or define inline if not available

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user || null);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchAndSetUser = async () => {
      await fetchUser();
    };
    fetchAndSetUser();
  }, [fetchUser]);

  const logout = () => {
    setUser(null);
    setLoading(false);
  };

  const refreshUser = async () => {
    await fetchUser();
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    logout,
    refreshUser,
  };
}
