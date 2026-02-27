import { useState, useEffect, useCallback } from "react";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user from the server, no cached cookie.
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
    let active = true;

    // Only update state if the component is still mounted
    const fetchAndSetUser = async () => {
      await fetchUser();
    };

    fetchAndSetUser();
    return () => {
      active = false;
    };
  }, [fetchUser]);

  // Clean logout and trigger user refresh afterwards
  const logout = () => {
    setUser(null);
    setLoading(false);
    // You can trigger a re-fetch here or let router.refresh() handle it
  };

  // Expose a method to force refresh the user state
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
