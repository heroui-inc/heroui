"use client";

import type {Key} from "@heroui/react";

import {Globe, Smartphone} from "@gravity-ui/icons";
import {Tabs} from "@heroui/react";
import {usePathname} from "next/navigation";
import {useCallback, useEffect, useRef, useState} from "react";
import {createRoot} from "react-dom/client";

export function FrameworksTabs() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<ReturnType<typeof createRoot> | null>(null);
  const isNavigatingRef = useRef(false);
  const previousPathnameRef = useRef(pathname);
  const [mounted, setMounted] = useState(false);

  const [selectedKey, setSelectedKey] = useState<"web" | "native">(() => {
    // Initialize based on current pathname
    return pathname.startsWith("/docs/native") ? "native" : "web";
  });

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
        return targetFramework === "web"
          ? "/docs/react/getting-started"
          : "/docs/native/introduction";
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

        // Use normal navigation for hard refresh when switching frameworks
        window.location.href = targetPath;
      }, 150); // Small delay to let animation start
    },
    [getEquivalentPath],
  );

  // Render function to avoid duplication
  const renderTabs = useCallback(
    (selectedKey: "web" | "native") => {
      return (
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
      );
    },
    [handleTabChange],
  );

  useEffect(() => {
    // Wait for DOM to be ready
    const findAndInject = () => {
      const headerTabs = document.querySelector("[data-header-tabs]") as HTMLElement | null;

      if (!headerTabs) {
        return;
      }

      // Check if we've already injected the component
      if (headerTabs.querySelector("[data-frameworks-tabs]")) {
        return;
      }

      // Create container div
      const container = document.createElement("div");

      container.setAttribute("data-frameworks-tabs", "true");
      container.className = "ml-auto";

      // Append to header tabs
      headerTabs.appendChild(container);

      // Create React root and render
      const root = createRoot(container);

      rootRef.current = root;

      root.render(renderTabs(selectedKey));

      containerRef.current = container;
      setMounted(true);
    };

    // Try immediately
    findAndInject();

    // Also try after a short delay in case DOM isn't ready
    const timeoutId = setTimeout(findAndInject, 100);

    return () => {
      clearTimeout(timeoutId);
      // Cleanup: remove the injected element
      // Defer unmounting to avoid race condition with React rendering
      const container = containerRef.current;
      const root = rootRef.current;

      if (container && container.parentNode && root) {
        // Use setTimeout to defer unmounting until after current render completes
        setTimeout(() => {
          try {
            root.unmount();
            if (container.parentNode) {
              container.parentNode.removeChild(container);
            }
          } catch (error) {
            // Ignore errors during cleanup (e.g., if already unmounted)
          }
        }, 0);
      }
    };
  }, [selectedKey, renderTabs]);

  // Sync selectedKey with pathname changes (e.g., browser back/forward)
  // Only sync if navigation wasn't initiated by us (to avoid overriding animation)
  useEffect(() => {
    // Skip if we're currently navigating (user-initiated)
    if (isNavigatingRef.current) {
      previousPathnameRef.current = pathname;

      return;
    }

    // Only update if pathname changed externally (browser nav)
    if (previousPathnameRef.current !== pathname) {
      const currentFramework = getCurrentFramework();

      if (currentFramework !== selectedKey) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedKey(currentFramework);
      }

      previousPathnameRef.current = pathname;
    }
  }, [pathname, getCurrentFramework, selectedKey]);

  // Update rendered tabs when selectedKey changes
  useEffect(() => {
    if (!mounted || !rootRef.current) {
      return;
    }

    const headerTabs = document.querySelector("[data-header-tabs]") as HTMLElement | null;

    if (!headerTabs) {
      return;
    }

    const container = headerTabs.querySelector("[data-frameworks-tabs]");

    if (!container) {
      return;
    }

    // Re-render with updated selected key
    rootRef.current.render(renderTabs(selectedKey));
  }, [selectedKey, mounted, renderTabs]);

  // This component doesn't render anything itself - it injects into DOM
  return null;
}
