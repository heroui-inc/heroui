"use client";

import type {Key} from "@heroui/react";

import {Globe, Smartphone} from "@gravity-ui/icons";
import {Tabs} from "@heroui/react";
import {usePathname, useRouter} from "next/navigation";
import {useCallback, useEffect, useRef, useState} from "react";

export function FrameworksTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const isNavigatingRef = useRef(false);
  const previousPathnameRef = useRef(pathname);

  const [selectedKey, setSelectedKey] = useState<"web" | "native">(() => {
    // Initialize based on current pathname
    return pathname.startsWith("/docs/native") ? "native" : "web";
  });

  // Valid top-level routes for each framework (from meta.json)
  const validRoutes = {
    native: ["getting-started", "components"],
    web: ["getting-started", "components", "releases"],
  };

  // Default routes for each framework
  const defaultRoutes = {
    native: "/docs/native/getting-started",
    web: "/docs/react/getting-started",
  };

  // Determine current framework based on pathname
  const getCurrentFramework = useCallback((): "web" | "native" => {
    if (pathname.startsWith("/docs/native")) {
      return "native";
    }

    return "web";
  }, [pathname]);

  // Map current path to equivalent path in other framework
  const getEquivalentPath = useCallback(
    (targetFramework: "web" | "native"): string => {
      const currentFramework = getCurrentFramework();

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
      if (firstRouteSegment && !validRoutes[targetFramework].includes(firstRouteSegment)) {
        // Route doesn't exist in target framework, fallback to default
        return defaultRoutes[targetFramework];
      }

      // Replace framework segment
      pathSegments[frameworkIndex] = targetFramework === "web" ? "react" : "native";
      const newPath = `/${pathSegments.join("/")}`;

      return newPath;
    },
    [pathname, getCurrentFramework],
  );

  const handleTabChange = useCallback(
    (key: Key) => {
      // Convert Key (string | number) to string
      const keyString = String(key);

      if (keyString !== "web" && keyString !== "native") {
        return;
      }

      const targetFramework = keyString as "web" | "native";

      // Update local state first to trigger animation
      setSelectedKey(targetFramework);
      isNavigatingRef.current = true;

      // Navigate after a short delay to allow animation to play
      setTimeout(() => {
        const targetPath = getEquivalentPath(targetFramework);

        router.push(targetPath);
      }, 150); // Small delay to let animation start
    },
    [getEquivalentPath, router],
  );

  // Sync selectedKey with pathname changes (e.g., browser back/forward)
  // Only sync if navigation wasn't initiated by us (to avoid overriding animation)
  useEffect(() => {
    // Only update if pathname changed
    if (previousPathnameRef.current !== pathname) {
      // If we were navigating, reset the flag now that navigation completed
      if (isNavigatingRef.current) {
        isNavigatingRef.current = false;
      }

      const currentFramework = getCurrentFramework();

      if (currentFramework !== selectedKey) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedKey(currentFramework);
      }

      previousPathnameRef.current = pathname;
    }
  }, [pathname, getCurrentFramework, selectedKey]);

  return (
    <div className="ml-auto">
      <Tabs selectedKey={selectedKey} onSelectionChange={handleTabChange}>
        <Tabs.ListContainer className="pb-1.5">
          <Tabs.List aria-label="Documentation framework">
            <Tabs.Tab className="h-6 data-[selected=true]:[&>svg]:text-sky-400" id="web">
              <Globe className="mr-1 size-4" />
              Web
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab className="h-6 data-[selected=true]:[&>svg]:text-indigo-500" id="native">
              <Smartphone className="mr-1 size-4" />
              Native
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
      </Tabs>
    </div>
  );
}
