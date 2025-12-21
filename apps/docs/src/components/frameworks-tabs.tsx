"use client";

import type {Framework} from "@/hooks/use-current-framework";
import type {Key} from "@heroui/react";

import {Globe, Smartphone} from "@gravity-ui/icons";
import {Tabs} from "@heroui/react";
import {usePathname, useRouter} from "next/navigation";
import {useCallback, useEffect, useRef, useState} from "react";

import {
  getEquivalentPath as getEquivalentPathHelper,
  useCurrentFramework,
} from "@/hooks/use-current-framework";
import {cn} from "@/utils/cn";

export function FrameworksTabs({className}: {className?: string}) {
  const pathname = usePathname();
  const router = useRouter();
  const isNavigatingRef = useRef(false);
  const previousPathnameRef = useRef(pathname);
  const currentFramework = useCurrentFramework();

  const [selectedKey, setSelectedKey] = useState<Framework>(() => {
    // Initialize based on current pathname
    return currentFramework;
  });

  // Map current path to equivalent path in other framework
  const getEquivalentPath = useCallback(
    (targetFramework: Framework): string => {
      return getEquivalentPathHelper(pathname, targetFramework);
    },
    [pathname],
  );

  const handleTabChange = useCallback(
    (key: Key) => {
      // Convert Key (string | number) to string
      const keyString = String(key);

      if (keyString !== "web" && keyString !== "native") {
        return;
      }

      const targetFramework = keyString as Framework;

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

      if (currentFramework !== selectedKey) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedKey(currentFramework);
      }

      previousPathnameRef.current = pathname;
    }
  }, [pathname, currentFramework, selectedKey]);

  return (
    <div className={cn("ml-auto", className)}>
      <Tabs selectedKey={selectedKey} onSelectionChange={handleTabChange}>
        <Tabs.ListContainer className="pb-1.5">
          <Tabs.List aria-label="Documentation framework">
            <Tabs.Tab className="sm:h-6 data-[selected=true]:[&>svg]:text-sky-400" id="web">
              <Globe className="mr-1 size-4" />
              Web
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab className="sm:h-6 data-[selected=true]:[&>svg]:text-indigo-500" id="native">
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
