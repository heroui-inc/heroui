"use client";

import type {Framework} from "@/hooks/use-current-framework";
import type {Key} from "@heroui/react";

import {Globe, Smartphone} from "@gravity-ui/icons";
import {Tabs} from "@heroui/react";
import {usePathname, useRouter} from "next/navigation";
import {useCallback, useEffect, useRef, useState} from "react";

import {getDefaultRoute, useCurrentFramework} from "@/hooks/use-current-framework";
import {useDictionary} from "@/hooks/use-dictionary";
import {cn} from "@/utils/cn";

export function FrameworksTabs({className}: {className?: string}) {
  const dict = useDictionary().frameworksTabs;
  const pathname = usePathname();
  const router = useRouter();
  const isNavigatingRef = useRef(false);
  const previousPathnameRef = useRef(pathname);
  const currentFramework = useCurrentFramework();

  const [selectedKey, setSelectedKey] = useState<Framework>(() => {
    // Initialize based on current pathname
    return currentFramework;
  });

  const handleTabChange = useCallback(
    (key: Key) => {
      // Convert Key (string | number) to string
      const keyString = String(key);

      if (keyString !== "web" && keyString !== "native") {
        return;
      }

      const targetFramework = keyString as Framework;

      // Don't navigate if already on the target framework
      if (targetFramework === currentFramework) {
        return;
      }

      // Update local state first to trigger animation
      setSelectedKey(targetFramework);
      isNavigatingRef.current = true;

      // Navigate to default route for target framework after a short delay to allow animation to play
      setTimeout(() => {
        router.push(getDefaultRoute(targetFramework, pathname) as any);
      }, 150); // Small delay to let animation start
    },
    [currentFramework, pathname, router],
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

      if (currentFramework !== selectedKey) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedKey(currentFramework);
      }

      previousPathnameRef.current = pathname;
    }
  }, [pathname, currentFramework, selectedKey]);

  // Spacing lives on the wrapper: since @heroui/styles 3.2.2 the ListContainer
  // is the visible pill (bg + radius), so padding on it distorts the pill.
  return (
    <div className={cn("ml-auto pb-1.5", className)}>
      <Tabs selectedKey={selectedKey} onSelectionChange={handleTabChange}>
        <Tabs.ListContainer>
          <Tabs.List aria-label={dict.ariaLabel}>
            <Tabs.Tab
              className="whitespace-nowrap sm:h-6 data-[selected=true]:[&>svg]:text-sky-400"
              id="web"
            >
              <Globe className="mr-1 size-4 shrink-0" />
              {dict.web}
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab
              className="whitespace-nowrap sm:h-6 data-[selected=true]:[&>svg]:text-indigo-500"
              id="native"
            >
              <Smartphone className="mr-1 size-4 shrink-0" />
              {dict.native}
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
      </Tabs>
    </div>
  );
}
