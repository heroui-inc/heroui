"use client";

import {useEffect, useState} from "react";

/**
 * Returns `value` with changes applied two animation frames later. The first render
 * uses it as is, so SSR and `defaultOpen` output match.
 *
 * On iOS WebKit, React Aria's modal popover adds a global `overscroll-behavior`
 * stylesheet and `overflow: hidden` on `<html>` (layout effect) and marks outside
 * content inert (passive effect) in the same commit that flips `isOpen`. Flipping
 * `data-open` in that commit can drop the indicator's rotate transition.
 */
export const useFrameDeferred = (value: boolean) => {
  const [deferred, setDeferred] = useState(value);

  useEffect(() => {
    if (value === deferred) return;

    let inner = 0;
    const outer = window.requestAnimationFrame(() => {
      inner = window.requestAnimationFrame(() => setDeferred(value));
    });

    return () => {
      window.cancelAnimationFrame(outer);
      window.cancelAnimationFrame(inner);
    };
  }, [value, deferred]);

  return deferred;
};
