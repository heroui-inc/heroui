"use client";

import {useEffect, useState} from "react";

/**
 * Returns whether the document is currently hidden (e.g. user switched tabs).
 * Used to pause toast timers when the tab is inactive so toasts don't disappear
 * before the user sees them.
 */
export function useIsDocumentHidden(): boolean {
  const [isDocumentHidden, setIsDocumentHidden] = useState(() =>
    typeof document !== "undefined" ? document.hidden : false,
  );

  useEffect(() => {
    function handleVisibilityChange() {
      setIsDocumentHidden(document.hidden);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isDocumentHidden;
}
