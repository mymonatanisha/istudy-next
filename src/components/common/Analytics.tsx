"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;

    window.gtag("event", "page_view", {
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}
