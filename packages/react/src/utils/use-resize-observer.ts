"use client";

import type {RefObject} from "react";

import {useEffect, useRef} from "react";

export interface UseResizeObserverOptions<T extends Element> {
  /** The element to observe. */
  ref: RefObject<T | null> | undefined;
  /** Which box of the element to observe. */
  box?: ResizeObserverBoxOptions;
  /** Called when the element changes size. Does not need to be memoized. */
  onResize: () => void;
}

/**
 * Calls `onResize` whenever the element in `ref` changes size. Falls back to
 * the window `resize` event where `ResizeObserver` is unavailable.
 */
export function useResizeObserver<T extends Element>({
  box,
  onResize,
  ref,
}: UseResizeObserverOptions<T>): void {
  const onResizeRef = useRef(onResize);

  useEffect(() => {
    onResizeRef.current = onResize;
  });

  useEffect(() => {
    const element = ref?.current;

    if (!element) return;

    const handleResize = () => onResizeRef.current();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length > 0) handleResize();
    });

    resizeObserver.observe(element, {box});

    return () => resizeObserver.disconnect();
  }, [ref, box]);
}
