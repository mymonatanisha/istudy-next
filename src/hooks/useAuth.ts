import { useState, useEffect, useCallback } from "react";

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
    // PATCH: Remove unused "active" variable
    // let active = true;   <-- DELETE THIS LINE
    const fetchAndSetUser = async () => {
      await fetchUser();
    };

    fetchAndSetUser();
    return () => {
      // If you were checking "active", it is unnecessary!
      // Just leave cleanup empty or remove if not needed
    };
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
