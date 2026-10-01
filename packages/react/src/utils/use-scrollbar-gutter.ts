"use client";

import type {Ref} from "react";

import {mergeRefs, useLayoutEffect} from "@react-aria/utils";
import {useCallback, useMemo, useState} from "react";

const SCROLLBAR_GUTTER_VAR = "--overlay-scrollbar-gutter";

/**
 * React Aria's scroll lock reserves a classic scrollbar with `scrollbar-gutter: stable`
 * on `<html>`. That shrinks the containing block of fixed overlays, so a `100%` backdrop
 * stops short of the viewport and leaves the gutter undimmed.
 *
 * Replacing the gutter with padding avoids the strip, but it also grows the layout
 * viewport. Fixed and `100vw` page chrome then jump by the scrollbar width. Leave the
 * gutter in place and only widen the overlay by `--overlay-scrollbar-gutter`.
 * `padding-inline-end` on the backdrop keeps the dialog centered on the content area.
 * Overlay scrollbars never reserve a gutter, so the variable stays unset.
 */
const readReservedGutter = (element: HTMLElement, view: Window, root: HTMLElement) => {
  const width = element.getBoundingClientRect().width;

  // jsdom does not lay out, so a zero rect falls back to the viewport gap the tests fake.
  if (width > 0) return Math.max(Math.round(view.innerWidth - width), 0);

  return Math.max(view.innerWidth - root.clientWidth, 0);
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

    if (!reserved || reserved === "auto") return;

    const gutter = readReservedGutter(element, defaultView, documentElement);

    if (gutter > 0) element.style.setProperty(SCROLLBAR_GUTTER_VAR, `${gutter}px`);
  }, [element]);

  return useMemo(() => mergeRefs(forwardedRef, ref), [forwardedRef, ref]);
};

export {SCROLLBAR_GUTTER_VAR, useScrollbarGutter};
