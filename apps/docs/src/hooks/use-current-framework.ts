"use client";

import {usePathname} from "next/navigation";

export type Framework = "web" | "native";

// Valid top-level routes for each framework (from meta.json)
export const validRoutes = {
  native: ["getting-started", "components"],
  web: ["getting-started", "components", "releases"],
} as const;

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

/**
 * Maps the current path to an equivalent path in the target framework
 * @param pathname - The current pathname
 * @param targetFramework - The target framework to map to
 * @returns The equivalent path in the target framework
 */
export function getEquivalentPath(pathname: string, targetFramework: Framework): string {
  // Determine current framework based on pathname
  const currentFramework: Framework = pathname.startsWith("/docs/native") ? "native" : "web";

  // If already on target framework, return current path
  if (currentFramework === targetFramework) {
    return pathname;
  }

  // Extract path segments after /docs/react or /docs/native
  const pathSegments = pathname.split("/").filter(Boolean);
  const frameworkIndex = pathSegments.findIndex((seg) => seg === "react" || seg === "native");

  if (frameworkIndex === -1) {
    // Fallback to default pages
    return defaultRoutes[targetFramework];
  }

  // Get the first route segment after the framework (e.g., "releases", "components", "getting-started")
  const firstRouteSegment = pathSegments[frameworkIndex + 1];

  // Check if this route exists in the target framework
  if (firstRouteSegment && !validRoutes[targetFramework].includes(firstRouteSegment as any)) {
    // Route doesn't exist in target framework, fallback to default
    return defaultRoutes[targetFramework];
  }

  // Replace framework segment
  pathSegments[frameworkIndex] = targetFramework === "web" ? "react" : "native";
  const newPath = `/${pathSegments.join("/")}`;

  return newPath;
}
