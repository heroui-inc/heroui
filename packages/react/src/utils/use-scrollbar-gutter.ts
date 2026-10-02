"use client";

import type {Ref} from "react";

import {mergeRefs, useLayoutEffect} from "@react-aria/utils";
import {useCallback, useMemo, useState} from "react";

/**
 * React Aria's scroll lock reserves a classic scrollbar with `scrollbar-gutter: stable`
 * on `<html>`. That column sits outside the containing block of fixed overlays, and
 * nothing a backdrop can paint reaches it — verified in Chromium with classic scrollbars:
 * a root `background-image` (scrolling or fixed), `::-webkit-scrollbar-track`, a fixed
 * element wider than the viewport, and a native `<dialog>::backdrop` all stop short of
 * it. Only the root `background-color` lands there, so a single flat color is the most a
 * backdrop could ever show, which a gradient or an image cannot match.
 *
 * So release the reservation while an overlay is open and reserve the same width as
 * padding on the scrollbar's side instead. In-flow content keeps its box, and `inset: 0`
 * now covers the full viewport, so the backdrop paints edge to edge. Viewport-anchored
 * fixed content does widen by the scrollbar width while the overlay is open — that is the
 * cost of covering the column at all.
 *
 * Padding is refcounted so stacked overlays restore it once. `scrollbar-gutter` itself is
 * left for React Aria to restore when the last scroll lock ends.
 */
let gutterHolders = 0;
let restoreGutterPadding: (() => void) | null = null;

const releaseReservedGutter = (root: HTMLElement, gutter: number) => {
  const isRTL = getComputedStyle(root).direction === "rtl";
  const paddingProp = isRTL ? "paddingLeft" : "paddingRight";
  const previousPadding = root.style[paddingProp];
  const currentPadding = Number.parseFloat(getComputedStyle(root)[paddingProp]) || 0;

  root.style.scrollbarGutter = "auto";

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
      restoreGutterPadding = releaseReservedGutter(documentElement, gutter);
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

export {useScrollbarGutter};
