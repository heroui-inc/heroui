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
 */
let openBackdrops: HTMLElement[] = [];
let previousBackgroundColor: string | null = null;

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

const syncGutterColor = (root: HTMLElement, body: HTMLElement) => {
  const backdrop = openBackdrops[openBackdrops.length - 1];

  if (!backdrop) {
    if (previousBackgroundColor !== null) {
      root.style.backgroundColor = previousBackgroundColor;
      previousBackgroundColor = null;
    }

    return;
  }

  const base = readPageColor(body);

  if (!base) return;

  const color = flattenWash(base, getComputedStyle(backdrop).backgroundColor);

  if (!color) return;

  if (previousBackgroundColor === null) previousBackgroundColor = root.style.backgroundColor;

  root.style.backgroundColor = color;
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

    return () => {
      openBackdrops = openBackdrops.filter((node) => node !== element);
      syncGutterColor(documentElement, body);
    };
  }, [element]);

  return useMemo(() => mergeRefs(forwardedRef, ref), [forwardedRef, ref]);
};

export {useScrollbarGutter};
