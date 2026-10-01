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

type FixedPin = {
  node: HTMLElement;
  width: number | null;
  side: "left" | "right" | null;
  inset: number;
};

const collectFixedElements = (body: HTMLElement, contentEdge: number, isRTL: boolean) => {
  const pins: FixedPin[] = [];

  for (const node of body.querySelectorAll("*")) {
    if (!(node instanceof HTMLElement) || node.closest(OVERLAY_SELECTOR)) continue;

    const computed = getComputedStyle(node);

    if (computed.position !== "fixed") continue;

    const rect = node.getBoundingClientRect();

    if (rect.width <= 0) continue;

    // `left` + `width: 100%` ignores `right`, so pin the used width. Other right-anchored
    // boxes keep their distance from the scrollbar edge.
    if (rect.left <= 1 && rect.right >= contentEdge - 1) {
      pins.push({inset: 0, node, side: null, width: Math.round(rect.width)});
      continue;
    }

    const side = isRTL ? "left" : "right";

    if (computed[side] === "auto") continue;

    const fromEdge = isRTL ? rect.left : contentEdge - rect.right;
    const specified = Number.parseFloat(computed[side]) || 0;

    if (Math.abs(fromEdge - specified) > 1) continue;

    pins.push({inset: specified, node, side, width: null});
  }

  return pins;
};

const applyFixedPins = (pins: FixedPin[], gap: number) => {
  const restores: Array<() => void> = [];

  for (const pin of pins) {
    if (pin.width != null) {
      const previousWidth = pin.node.style.width;

      pin.node.style.width = `${pin.width}px`;
      restores.push(() => {
        pin.node.style.width = previousWidth;
      });
      continue;
    }

    if (!pin.side) continue;

    const previousSide = pin.node.style[pin.side];

    pin.node.style[pin.side] = `${pin.inset + gap}px`;
    restores.push(() => {
      pin.node.style[pin.side!] = previousSide;
    });
  }

  return () => {
    for (const restore of restores) restore();
  };
};

const holdPageGutter = (root: HTMLElement, body: HTMLElement, view: Window) => {
  const isRTL = getComputedStyle(root).direction === "rtl";
  const marginProp = isRTL ? "marginLeft" : "marginRight";
  const previousMargin = body.style[marginProp];
  const currentMargin = Number.parseFloat(getComputedStyle(body)[marginProp]) || 0;
  const before = root.clientWidth;
  // `innerWidth` often matches `clientWidth` once `scrollbar-gutter: stable` is set, so the
  // reserved column is invisible to that subtraction. Clearing the gutter grows `clientWidth`
  // by the real amount. The subtraction remains for environments that fake `clientWidth`.
  const reservedGap = Math.max(view.innerWidth - before, 0);
  const pins = collectFixedElements(body, before, isRTL);

  root.style.scrollbarGutter = "auto";

  const gap = Math.max(root.clientWidth - before, reservedGap);
  const restoreFixed = gap > 0 ? applyFixedPins(pins, gap) : () => {};

  if (gap > 0) body.style[marginProp] = `${currentMargin + gap}px`;

  return {
    gap,
    restore: () => {
      restoreFixed();
      body.style[marginProp] = previousMargin;
    },
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

    if (gutterHolders === 0) {
      const held = holdPageGutter(documentElement, body, defaultView);

      reservedGutter = held.gap;
      restorePage = held.restore;
    }

    gutterHolders += 1;

    if (reservedGutter > 0) {
      element.style.setProperty(SCROLLBAR_GUTTER_VAR, `${reservedGutter}px`);
    }

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
