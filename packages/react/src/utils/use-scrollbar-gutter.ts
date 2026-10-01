"use client";

import type {Ref} from "react";

import {mergeRefs, useLayoutEffect} from "@react-aria/utils";
import {useCallback, useMemo, useState} from "react";

const SCROLLBAR_GUTTER_VAR = "--overlay-scrollbar-gutter";

/**
 * React Aria's scroll lock reserves a classic scrollbar with `scrollbar-gutter: stable`
 * on `<html>`. That shrinks the containing block of fixed overlays, and Chromium clips
 * them to the shrunken box, so a wider backdrop still leaves the gutter undimmed on
 * Windows. Docs Search does not: Radix removes the scrollbar and offsets the page.
 *
 * While an overlay is open, release that gutter and reserve the same width as padding
 * on the scrollbar's side. In-flow content keeps its width, and `inset: 0` covers the
 * viewport. Overlay scrollbars never take that path (`scrollbar-gutter` stays `auto`).
 *
 * Padding is refcounted so stacked overlays restore it once. `scrollbar-gutter` itself
 * is left for React Aria to restore when the last scroll lock ends.
 */
let gutterHolders = 0;
let restoreGutterPadding: (() => void) | null = null;

const releaseReservedGutter = (root: HTMLElement, backdrop: HTMLElement, gutter: number) => {
  const isRTL = getComputedStyle(root).direction === "rtl";
  const paddingProp = isRTL ? "paddingLeft" : "paddingRight";
  const previousPadding = root.style[paddingProp];
  const currentPadding = Number.parseFloat(getComputedStyle(root)[paddingProp]) || 0;

  root.style.scrollbarGutter = "auto";
  backdrop.style.removeProperty(SCROLLBAR_GUTTER_VAR);

  if (gutter > 0) {
    root.style[paddingProp] = `${currentPadding + gutter}px`;
  }

  return () => {
    root.style[paddingProp] = previousPadding;
  };
};

const useScrollbarGutter = <T extends HTMLElement>(forwardedRef?: Ref<T>) => {
  const [element, setElement] = useState<T | null>(null);
  const ref = useCallback((node: T | null) => setElement(node), []);

  // Attaching the element through state defers this to a commit of its own, so it runs
  // after react-aria has locked the page and the reserved gutter is measurable.
  useLayoutEffect(() => {
    if (!element) return;

    const {defaultView, documentElement} = element.ownerDocument;

    if (!defaultView) return;

    const reserved =
      documentElement.style.scrollbarGutter ||
      defaultView.getComputedStyle(documentElement).scrollbarGutter;
    const gutter = Math.max(defaultView.innerWidth - documentElement.clientWidth, 0);
    const gutterActive = Boolean(reserved && reserved !== "auto");

    if (!gutterActive && gutterHolders === 0) return;

    gutterHolders += 1;

    if (gutterHolders === 1 && gutterActive) {
      restoreGutterPadding = releaseReservedGutter(documentElement, element, gutter);
    }

    return () => {
      gutterHolders -= 1;

      if (gutterHolders === 0) {
        restoreGutterPadding?.();
        restoreGutterPadding = null;
      }
    };
  }, [element]);

  return useMemo(() => mergeRefs(forwardedRef, ref), [forwardedRef, ref]);
};

export {SCROLLBAR_GUTTER_VAR, useScrollbarGutter};
