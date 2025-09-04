"use client";

import type {RefObject} from "react";

import {useEffect, useLayoutEffect} from "react";

/**
 * Prevents React Aria from setting hidden attribute which breaks animations.
 * Works across all browsers including Safari.
 */
export const usePreventHidden = (ref: RefObject<HTMLElement | null>) => {
  // Use useLayoutEffect to remove hidden attribute before paint
  useLayoutEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    // Function to remove hidden attribute
    const removeHidden = () => {
      if (element.hasAttribute("hidden")) {
        element.removeAttribute("hidden");
      }
    };

    // Immediately remove any existing hidden attribute
    removeHidden();

    // Watch for any attempts to set hidden attribute
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.attributeName === "hidden") {
          // Use queueMicrotask to ensure removal happens after React Aria sets it
          // This works consistently across all browsers including Safari
          queueMicrotask(() => {
            removeHidden();
          });
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

  // Additional check using RAF for Safari compatibility
  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    let rafId: number;

    const checkAndRemoveHidden = () => {
      if (element.hasAttribute("hidden")) {
        element.removeAttribute("hidden");
      }
      // Keep checking for a short period to catch any delayed attribute sets
      rafId = requestAnimationFrame(checkAndRemoveHidden);
    };

    // Start checking
    checkAndRemoveHidden();

    // Stop after 100ms (enough time for React Aria to do its work)
    const timeoutId = setTimeout(() => {
      cancelAnimationFrame(rafId);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [ref]);
};
