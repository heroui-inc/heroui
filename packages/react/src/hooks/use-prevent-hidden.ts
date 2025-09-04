"use client";

import type {RefObject} from "react";

import {useIsSSR} from "@react-aria/ssr";
import {useEffect, useLayoutEffect} from "react";

/**
 * Prevents React Aria from setting hidden="until-found" which breaks animations.
 * Disables the beforematch feature entirely to avoid conflicts.
 */
export const usePreventHidden = (ref: RefObject<HTMLElement | null>) => {
  const isSSR = useIsSSR();

  // Disable beforematch feature globally to prevent React Aria from using hidden="until-found"
  useLayoutEffect(() => {
    if (!isSSR && "onbeforematch" in document.body) {
      // Store original handler if it exists
      const originalHandler = document.body.onbeforematch;

      // Remove the handler to disable the feature
      delete (document.body as any).onbeforematch;

      return () => {
        // Restore original handler on cleanup
        if (originalHandler !== undefined) {
          document.body.onbeforematch = originalHandler;
        }
      };
    }
  }, [isSSR]);

  // Fallback: Remove hidden attribute if it still gets set somehow
  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    // Immediately remove any existing hidden attribute
    if (element.hasAttribute("hidden")) {
      element.removeAttribute("hidden");
    }

    // Watch for any attempts to set hidden attribute
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.attributeName === "hidden") {
          const hiddenValue = element.getAttribute("hidden");

          if (hiddenValue !== null) {
            // Remove it immediately to prevent any visual glitches
            element.removeAttribute("hidden");
          }
        }
      }
    });

    observer.observe(element, {
      attributes: true,
      attributeFilter: ["hidden"],
      subtree: false,
    });

    return () => {
      observer.disconnect();
    };
  }, [ref]);
};
