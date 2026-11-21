"use client";

import type {AgentComponentOptions} from "./types";
import type {RefObject} from "react";

import {useEffect, useRef} from "react";

import {useIsomorphicLayoutEffect} from "../hooks/use-isomorphic-layout-effect";

import {registerAgentComponent} from "./registry";

/**
 * Lets an agent read and use a component you built. Pass the ref of its root element,
 * its current state, and the methods an agent may call.
 *
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 *
 * useAgentComponent(ref, {
 *   component: "rating",
 *   state: () => ({value}),
 *   actions: {rate: (next: number) => setValue(next)},
 * });
 * ```
 */
export const useAgentComponent = (
  ref: RefObject<Element | null>,
  options: AgentComponentOptions,
): void => {
  const latest = useRef(options);
  const registered = useRef<{element: Element; remove: () => void} | null>(null);

  // Layout timing keeps the state an agent reads in step with what was just committed.
  useIsomorphicLayoutEffect(() => {
    latest.current = options;
  });

  // Checked after every commit: the ref object stays the same when the element it points to is
  // swapped (a conditional root, a remount by key), and the new element has to be registered.
  useEffect(() => {
    const element = ref.current;

    if (registered.current?.element === element) return;

    registered.current?.remove();
    registered.current = element
      ? {element, remove: registerAgentComponent(element, () => latest.current)}
      : null;
  });

  useEffect(
    () => () => {
      registered.current?.remove();
      registered.current = null;
    },
    [],
  );
};
