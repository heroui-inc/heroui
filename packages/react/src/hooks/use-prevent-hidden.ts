"use client";

import type {RefObject} from "react";

import {useEffect} from "react";

/**
 * Prevents React Aria from setting hidden="until-found" which breaks animations.
 * Optimized to minimize render delays and animation jank.
 */
export const usePreventHidden = (ref: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    // Use microtask to ensure minimal delay
    queueMicrotask(() => {
      element.removeAttribute("hidden");
    });

    // Optimize MutationObserver with single check
    const observer = new MutationObserver((mutations) => {
      // Early exit if no hidden attribute changes
      if (!mutations.some((m) => m.attributeName === "hidden")) {
        return;
      }

      const hiddenValue = element.getAttribute("hidden");

      if (hiddenValue === "until-found" || hiddenValue === "") {
        // Use RAF to batch DOM updates with browser paint cycle
        requestAnimationFrame(() => {
          element.removeAttribute("hidden");
        });
      }
    });

    observer.observe(element, {
      attributes: true,
      attributeFilter: ["hidden"],
      // Disable subtree and character data observation for performance
      subtree: false,
      characterData: false,
      childList: false,
    });

    return () => {
      observer.disconnect();
    };
  }, [ref]);
};
