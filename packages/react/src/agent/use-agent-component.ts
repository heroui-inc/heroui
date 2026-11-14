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

  // Layout timing keeps the state an agent reads in step with what was just committed.
  useIsomorphicLayoutEffect(() => {
    latest.current = options;
  });

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    return registerAgentComponent(element, () => latest.current);
  }, [ref]);
};
