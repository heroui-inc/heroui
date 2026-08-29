"use client";

import type {ScrollShadowVisibility} from "./scroll-shadow";
import type {RefObject} from "react";

import {useCallback, useEffect, useRef} from "react";

export interface UseScrollShadowProps {
  containerRef: RefObject<HTMLElement>;
  orientation: "vertical" | "horizontal";
  offset: number;
  visibility: ScrollShadowVisibility;
  isEnabled: boolean;
  onVisibilityChange?: (visibility: ScrollShadowVisibility) => void;
}

export const useScrollShadow = (props: UseScrollShadowProps) => {
  const {containerRef, isEnabled, offset, onVisibilityChange, orientation, visibility} = props;

  // Consumers usually pass an inline callback. Reading it through a ref keeps
  // checkOverflow stable, so the scroll listener and ResizeObserver are not
  // torn down and rebuilt on every render.
  const onVisibilityChangeRef = useRef(onVisibilityChange);

  useEffect(() => {
    onVisibilityChangeRef.current = onVisibilityChange;
  }, [onVisibilityChange]);

  // Cache previous state to avoid unnecessary DOM updates
  const prevStateRef = useRef<{
    hasScrollBefore: boolean;
    hasScrollAfter: boolean;
  } | null>(null);

  // Track pending RAF to avoid multiple scheduled updates
  const rafIdRef = useRef<number | null>(null);

  const checkOverflow = useCallback(() => {
    const el = containerRef.current;

    if (!el) return;

    const isVertical = orientation === "vertical";
    const scrollStart = isVertical ? el.scrollTop : Math.abs(el.scrollLeft);
    const scrollSize = isVertical ? el.scrollHeight : el.scrollWidth;
    const clientSize = isVertical ? el.clientHeight : el.clientWidth;

    const hasScrollBefore = scrollStart > offset;
    const hasScrollAfter = scrollStart + clientSize + offset < scrollSize - 1;

    // Skip DOM updates if state hasn't changed
    const prevState = prevStateRef.current;

    if (
      prevState &&
      prevState.hasScrollBefore === hasScrollBefore &&
      prevState.hasScrollAfter === hasScrollAfter
    ) {
      return;
    }

    // Update state cache
    prevStateRef.current = {hasScrollBefore, hasScrollAfter};

    // Cancel previous pending update
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    // Batch DOM updates with RAF for better performance
    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;

      const notify = onVisibilityChangeRef.current;

      if (isVertical) {
        if (hasScrollBefore && hasScrollAfter) {
          el.dataset["topBottomScroll"] = "true";
          delete el.dataset["topScroll"];
          delete el.dataset["bottomScroll"];

          notify?.("both");
        } else {
          el.dataset["topScroll"] = String(hasScrollBefore);
          el.dataset["bottomScroll"] = String(hasScrollAfter);
          delete el.dataset["topBottomScroll"];

          if (notify) {
            if (hasScrollBefore) {
              notify("top");
            } else if (hasScrollAfter) {
              notify("bottom");
            } else {
              notify("none");
            }
          }
        }
      } else {
        if (hasScrollBefore && hasScrollAfter) {
          el.dataset["leftRightScroll"] = "true";
          delete el.dataset["leftScroll"];
          delete el.dataset["rightScroll"];

          notify?.("both");
        } else {
          el.dataset["leftScroll"] = String(hasScrollBefore);
          el.dataset["rightScroll"] = String(hasScrollAfter);
          delete el.dataset["leftRightScroll"];

          if (notify) {
            if (hasScrollBefore) {
              notify("left");
            } else if (hasScrollAfter) {
              notify("right");
            } else {
              notify("none");
            }
          }
        }
      }
    });
  }, [containerRef, orientation, offset]);

  useEffect(() => {
    const el = containerRef.current;

    if (!el || !isEnabled || visibility !== "auto") return;

    // Initial check
    checkOverflow();

    // Use passive listener for better scroll performance
    el.addEventListener("scroll", checkOverflow, {passive: true});

    // Monitor size changes
    const resizeObserver = new ResizeObserver(checkOverflow);

    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", checkOverflow);
      resizeObserver.disconnect();

      // Cancel pending RAF and cleanup cache
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      prevStateRef.current = null;
    };
  }, [containerRef, visibility, isEnabled, checkOverflow]);

  // ResizeObserver only reports the container's own box, so content growing or
  // shrinking inside a fixed-size container fires neither resize nor scroll and
  // would leave the shadows stale. Re-measuring after every render covers that;
  // the prevStateRef guard keeps it a no-op unless the measurement changed.
  useEffect(() => {
    if (!isEnabled || visibility !== "auto") return;

    checkOverflow();
  });
};
