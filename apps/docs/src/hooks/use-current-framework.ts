"use client";

import {usePathname} from "next/navigation";

export type Framework = "web" | "native";

// Default routes for each framework
export const defaultRoutes = {
  native: "/docs/native/getting-started",
  web: "/docs/react/getting-started",
} as const;

/**
 * Hook to detect the current framework based on the pathname
 * @returns "native" if pathname starts with "/docs/native", otherwise "web"
 */
export function useCurrentFramework(): Framework {
  const pathname = usePathname();

  return pathname.startsWith("/docs/native") ? "native" : "web";
}
