"use client";

import type {RefObject} from "react";

import {useCallback, useEffect, useState} from "react";

import {useSafeLayoutEffect} from "./use-safe-layout-effect";

export const useMeasuredHeight = (ref: RefObject<HTMLDivElement | null>) => {
  const [height, setHeight] = useState<number | undefined>(undefined);

  const calculateHeight = useCallback(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    // Temporarily remove the height clamp to measure the natural height without triggering transitions.
    const previousHeight = element.style.height;
    const previousTransition = element.style.transition;

    element.style.transition = "none";
    element.style.height = "auto";

    // scrollHeight excludes borders; add them here if the element gains one.
    const measuredHeight = element.scrollHeight;

    element.style.height = previousHeight;
    element.style.transition = previousTransition;

    setHeight((prevHeight) => (prevHeight !== measuredHeight ? measuredHeight : prevHeight));
  }, [ref]);

  // Measure before the first paint so consumers can position siblings without a one-frame layout shift.
  useSafeLayoutEffect(() => {
    calculateHeight();
  }, [calculateHeight]);

  // Re-measure only when content changes; async changes without DOM mutations are not detected.
  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    // Exclude `style` and state attributes to avoid triggering measurements or canceling in-progress transitions.
    const mutationObserver = new MutationObserver(() => {
      calculateHeight();
    });

    mutationObserver.observe(element, {
      attributeFilter: ["class"],
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
    });

    // Width changes re-wrap text; debounced so a drag-resize measures once.
    let resizeTimeoutId: ReturnType<typeof setTimeout> | undefined;

    const handleWindowResize = () => {
      clearTimeout(resizeTimeoutId);
      resizeTimeoutId = setTimeout(calculateHeight, 150);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      mutationObserver.disconnect();
      window.removeEventListener("resize", handleWindowResize);
      clearTimeout(resizeTimeoutId);
    };
  }, [ref, calculateHeight]);

  return {
    height,
  };
};
