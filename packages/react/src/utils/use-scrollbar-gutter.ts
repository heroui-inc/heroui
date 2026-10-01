"use client";

import type {Ref} from "react";

import {mergeRefs, useLayoutEffect} from "@react-aria/utils";
import {useCallback, useMemo, useState} from "react";

/**
 * React Aria reserves a classic scrollbar with `scrollbar-gutter: stable`. That column
 * sits outside fixed backdrops, and Chromium paints it with the root background color
 * only — a gradient never reaches it, so opaque and blur backdrops leave an undimmed
 * strip. Flatten the backdrop wash over the page color into that background color.
 * Clearing the gutter is what shifts the page, so the reservation stays.
 *
 * The color is transitioned with the backdrop's own duration and easing, otherwise the
 * gutter snaps to the wash a frame before the backdrop starts fading in.
 */
let openBackdrops: HTMLElement[] = [];
let previousBackgroundColor: string | null = null;
let previousTransition: string | null = null;

const isClear = (color: string) => color === "transparent" || color === "rgba(0, 0, 0, 0)";

const readPageColor = (body: HTMLElement) => {
  const bodyColor = getComputedStyle(body).backgroundColor;

  if (!isClear(bodyColor)) return bodyColor;

  const probe = body.ownerDocument.createElement("div");

  probe.style.cssText =
    "position:absolute;visibility:hidden;pointer-events:none;background-color:var(--background)";
  body.appendChild(probe);

  const token = getComputedStyle(probe).backgroundColor;

  probe.remove();

  return isClear(token) ? null : token;
};

const flattenWash = (base: string, wash: string) => {
  if (isClear(wash)) return base;

  const canvas = document.createElement("canvas");

  canvas.width = 1;
  canvas.height = 1;

  const context = canvas.getContext("2d");

  if (!context) return null;

  context.fillStyle = base;
  context.fillRect(0, 0, 1, 1);
  context.fillStyle = wash;
  context.fillRect(0, 0, 1, 1);

  const [red, green, blue] = context.getImageData(0, 0, 1, 1).data;

  return `rgb(${red}, ${green}, ${blue})`;
};

/**
 * Backdrops fade either by animation (Modal, AlertDialog) or by transition (Drawer), and
 * `motion-reduce` zeroes both. Follow whichever one is actually driving the fade.
 */
const readFadeMotion = (backdrop: HTMLElement) => {
  const computed = getComputedStyle(backdrop);
  const animation = Number.parseFloat(computed.animationDuration) || 0;
  const transition = Number.parseFloat(computed.transitionDuration) || 0;

  if (animation <= 0 && transition <= 0) return null;

  return animation >= transition
    ? {duration: computed.animationDuration, easing: computed.animationTimingFunction || "linear"}
    : {
        duration: computed.transitionDuration,
        easing: computed.transitionTimingFunction || "linear",
      };
};

/**
 * Commits a pending background color, so the next change transitions from it instead of
 * from whatever the root was already painted with. The computed read is the flush.
 */
const flushStyle = (root: HTMLElement) => getComputedStyle(root).backgroundColor;

const fadeGutterTo = (root: HTMLElement, from: string, to: string, backdrop: HTMLElement) => {
  const motion = readFadeMotion(backdrop);

  if (previousTransition === null) previousTransition = root.style.transition;

  if (!motion || from === to) {
    root.style.transition = previousTransition;
    root.style.backgroundColor = to;

    return;
  }

  root.style.transition = "none";
  root.style.backgroundColor = from;
  flushStyle(root);
  root.style.transition = `background-color ${motion.duration} ${motion.easing}`;
  root.style.backgroundColor = to;
};

const restoreGutter = (root: HTMLElement) => {
  if (previousBackgroundColor !== null) {
    root.style.backgroundColor = previousBackgroundColor;
    previousBackgroundColor = null;
  }

  if (previousTransition !== null) {
    root.style.transition = previousTransition;
    previousTransition = null;
  }
};

const syncGutterColor = (root: HTMLElement, body: HTMLElement) => {
  const backdrop = openBackdrops[openBackdrops.length - 1];

  if (!backdrop) {
    restoreGutter(root);

    return;
  }

  const base = readPageColor(body);

  if (!base) return;

  const color = flattenWash(base, getComputedStyle(backdrop).backgroundColor);

  if (!color) return;

  if (previousBackgroundColor === null) previousBackgroundColor = root.style.backgroundColor;

  fadeGutterTo(root, root.style.backgroundColor || base, color, backdrop);
};

/**
 * React Aria keeps the backdrop mounted through its exit animation, so the unmount
 * cleanup lands after the fade. Fade the gutter back as soon as the exit starts.
 */
const watchExit = (backdrop: HTMLElement, root: HTMLElement, body: HTMLElement) => {
  if (typeof MutationObserver === "undefined") return () => {};

  const observer = new MutationObserver(() => {
    if (backdrop.getAttribute("data-exiting") !== "true") return;

    const base = readPageColor(body);

    if (base) fadeGutterTo(root, root.style.backgroundColor || base, base, backdrop);
    observer.disconnect();
  });

  observer.observe(backdrop, {attributeFilter: ["data-exiting"]});

  return () => observer.disconnect();
};

const useScrollbarGutter = <T extends HTMLElement>(forwardedRef?: Ref<T>) => {
  const [element, setElement] = useState<T | null>(null);
  const ref = useCallback((node: T | null) => setElement(node), []);

  useLayoutEffect(() => {
    if (!element) return;

    const {body, documentElement} = element.ownerDocument;

    if (!body) return;

    openBackdrops.push(element);
    syncGutterColor(documentElement, body);

    const stopWatchingExit = watchExit(element, documentElement, body);

    return () => {
      stopWatchingExit();
      openBackdrops = openBackdrops.filter((node) => node !== element);
      syncGutterColor(documentElement, body);
    };
  }, [element]);

  return useMemo(() => mergeRefs(forwardedRef, ref), [forwardedRef, ref]);
};

export {useScrollbarGutter};
