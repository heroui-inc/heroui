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

    const previousHeight = element.style.height;

    element.style.height = "auto";
    const measuredHeight = element.scrollHeight;

    element.style.height = previousHeight;

    setHeight((prev) => (prev !== measuredHeight ? measuredHeight : prev));
  }, [ref]);

  useSafeLayoutEffect(() => {
    calculateHeight();
  }, [calculateHeight]);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    let measureFrame = 0;
    const scheduleMeasure = () => {
      if (measureFrame) return;
      measureFrame = requestAnimationFrame(() => {
        measureFrame = 0;
        calculateHeight();
      });
    };

    const mutationObserver = new MutationObserver(scheduleMeasure);

    mutationObserver.observe(element, {
      attributeFilter: ["class"],
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
    });

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
      cancelAnimationFrame(measureFrame);
    };
  }, [ref, calculateHeight]);

  return {
    height,
  };
};
