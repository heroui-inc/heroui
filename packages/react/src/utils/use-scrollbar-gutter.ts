"use client";

import type {Ref} from "react";

import {mergeRefs, useLayoutEffect} from "@react-aria/utils";
import {useCallback, useMemo, useState} from "react";

const SCROLLBAR_GUTTER_VAR = "--overlay-scrollbar-gutter";

/**
 * Exposes the width reserved for the classic scrollbar as `--overlay-scrollbar-gutter`
 * on the element the returned ref is attached to.
 *
 * React Aria's scroll lock reserves that width with `scrollbar-gutter: stable` on `<html>`,
 * which shrinks the containing block of fixed-position elements. Overlay backdrops are
 * fixed, so without the reserved width they stop short of the viewport edge and leave the
 * gutter undimmed. The variable is `0px` whenever nothing is reserved — overlay scrollbars,
 * or the `padding-right` fallback used when `scrollbar-gutter` is unsupported.
 */
const useScrollbarGutter = <T extends HTMLElement>(forwardedRef?: Ref<T>) => {
  const [element, setElement] = useState<T | null>(null);
  const ref = useCallback((node: T | null) => setElement(node), []);

  // Attaching the element through state defers this to a commit of its own, so it runs
  // after react-aria has locked the page and the reserved gutter is measurable.
  useLayoutEffect(() => {
    if (!element) return;

    const {defaultView, documentElement} = element.ownerDocument;

    if (!defaultView) return;

    const reserved = defaultView.getComputedStyle(documentElement).scrollbarGutter;

    if (!reserved || reserved === "auto") return;

    const gutter = Math.max(defaultView.innerWidth - documentElement.clientWidth, 0);

    element.style.setProperty(SCROLLBAR_GUTTER_VAR, `${gutter}px`);
  }, [element]);

  return useMemo(() => mergeRefs(forwardedRef, ref), [forwardedRef, ref]);
};

export {SCROLLBAR_GUTTER_VAR, useScrollbarGutter};
