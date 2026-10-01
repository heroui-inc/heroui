"use client";

import type {Ref} from "react";

import {mergeRefs, useLayoutEffect} from "@react-aria/utils";
import {useCallback, useMemo, useState} from "react";

const SCROLLBAR_GUTTER_VAR = "--overlay-scrollbar-gutter";
const OVERLAY_SELECTOR =
  "[data-slot='modal-backdrop'],[data-slot='alert-dialog-backdrop'],[data-slot='drawer-backdrop']";

/**
 * React Aria reserves a classic scrollbar with `scrollbar-gutter: stable`. That gutter
 * stays undimmed: Chromium clips fixed backdrops before they can paint into it, which
 * leaves a white strip. Drop the gutter so the scrollbar is gone and the backdrop fills
 * the window. Body margin keeps in-flow content put, and fixed elements that were anchored
 * to the scrollbar side keep their inset. `--overlay-scrollbar-gutter` pads the backdrop
 * so a centered dialog stays on the content area. Overlay scrollbars never reserve a gutter.
 */
let gutterHolders = 0;
let reservedGutter = 0;
let restorePage: (() => void) | null = null;

const pinFixedElements = (body: HTMLElement, gap: number, isRTL: boolean) => {
  const root = body.ownerDocument.documentElement;
  const contentEdge = root.clientWidth;
  const restores: Array<() => void> = [];

  for (const node of body.querySelectorAll("*")) {
    if (!(node instanceof HTMLElement) || node.closest(OVERLAY_SELECTOR)) continue;

    const computed = getComputedStyle(node);

    if (computed.position !== "fixed") continue;

    const rect = node.getBoundingClientRect();

    if (rect.width <= 0) continue;

    const spansContent = rect.left <= 1 && rect.right >= contentEdge - 1;

    // `left` + `width: 100%` ignores `right`, so pin the used width. Other right-anchored
    // boxes keep their distance from the scrollbar edge.
    if (spansContent) {
      const previousWidth = node.style.width;

      node.style.width = `${Math.round(rect.width)}px`;
      restores.push(() => {
        node.style.width = previousWidth;
      });
      continue;
    }

    const side = isRTL ? "left" : "right";

    if (computed[side] === "auto") continue;

    const fromEdge = isRTL ? rect.left : contentEdge - rect.right;
    const specified = Number.parseFloat(computed[side]) || 0;

    if (Math.abs(fromEdge - specified) > 1) continue;

    const previousSide = node.style[side];

    node.style[side] = `${specified + gap}px`;
    restores.push(() => {
      node.style[side] = previousSide;
    });
  }

  return () => {
    for (const restore of restores) restore();
  };
};

const holdPageGutter = (root: HTMLElement, body: HTMLElement, gap: number) => {
  const isRTL = getComputedStyle(root).direction === "rtl";
  const marginProp = isRTL ? "marginLeft" : "marginRight";
  const previousMargin = body.style[marginProp];
  const currentMargin = Number.parseFloat(getComputedStyle(body)[marginProp]) || 0;
  const restoreFixed = pinFixedElements(body, gap, isRTL);

  root.style.scrollbarGutter = "auto";

  if (gap > 0) body.style[marginProp] = `${currentMargin + gap}px`;

  return () => {
    restoreFixed();
    body.style[marginProp] = previousMargin;
  };
};

const useScrollbarGutter = <T extends HTMLElement>(forwardedRef?: Ref<T>) => {
  const [element, setElement] = useState<T | null>(null);
  const ref = useCallback((node: T | null) => setElement(node), []);

  // Attaching the element through state defers this to a commit of its own, so it runs
  // after react-aria has locked the page and the reserved gutter is measurable.
  useLayoutEffect(() => {
    if (!element) return;

    const {body, defaultView, documentElement} = element.ownerDocument;

    if (!defaultView || !body) return;

    const reserved =
      documentElement.style.scrollbarGutter ||
      defaultView.getComputedStyle(documentElement).scrollbarGutter;
    const gutterActive = Boolean(reserved && reserved !== "auto");

    if (!gutterActive && gutterHolders === 0) return;

    const gutter = gutterActive
      ? Math.max(defaultView.innerWidth - documentElement.clientWidth, 0)
      : reservedGutter;

    if (gutter <= 0) return;

    gutterHolders += 1;

    if (gutterHolders === 1) {
      reservedGutter = gutter;
      restorePage = holdPageGutter(documentElement, body, gutter);
    }

    element.style.setProperty(SCROLLBAR_GUTTER_VAR, `${gutter}px`);

    return () => {
      element.style.removeProperty(SCROLLBAR_GUTTER_VAR);
      gutterHolders -= 1;

      if (gutterHolders === 0) {
        restorePage?.();
        restorePage = null;
        reservedGutter = 0;
      }
    };
  }, [element]);

  return useMemo(() => mergeRefs(forwardedRef, ref), [forwardedRef, ref]);
};

export {SCROLLBAR_GUTTER_VAR, useScrollbarGutter};
