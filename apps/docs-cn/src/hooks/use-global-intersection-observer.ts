"use client";

import {useEffect, useRef, useState} from "react";

type ObserverCallback = (isIntersecting: boolean) => void;

interface ObserverConfig {
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * Global IntersectionObserver Manager
 * Single observer instance manages all component visibility detection with RAF throttling
 */
class GlobalIntersectionObserverManager {
  private observers: Map<string, IntersectionObserver> = new Map();
  private callbacks: Map<Element, ObserverCallback> = new Map();
  private pendingUpdates: Map<Element, boolean> = new Map();
  private rafId: number | null = null;

  // Cache config keys to avoid repeated string concatenation
  private getConfigKey(config: ObserverConfig): string {
    return `${config.rootMargin || "0px"}-${String(config.threshold || 0)}`;
  }

  private getObserver(config: ObserverConfig): IntersectionObserver {
    const key = this.getConfigKey(config);

    if (!this.observers.has(key)) {
      const observer = new IntersectionObserver(
        (entries) => {
          // Batch collect all changes
          for (let i = 0; i < entries.length; i++) {
            const entry = entries[i]!;

            this.pendingUpdates.set(entry.target, entry.isIntersecting);
          }
          this.scheduleUpdate();
        },
        {
          rootMargin: config.rootMargin,
          threshold: config.threshold,
        },
      );

      this.observers.set(key, observer);
    }

    return this.observers.get(key)!;
  }

  // RAF throttling for batch updates
  private scheduleUpdate() {
    if (this.rafId !== null) return;

    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;

      // Process all pending updates in a single batch
      this.pendingUpdates.forEach((isIntersecting, element) => {
        const callback = this.callbacks.get(element);

        if (callback) {
          callback(isIntersecting);
        }
      });

      this.pendingUpdates.clear();
    });
  }

  observe(element: Element, callback: ObserverCallback, config: ObserverConfig = {}) {
    const observer = this.getObserver(config);

    this.callbacks.set(element, callback);
    observer.observe(element);
  }

  unobserve(element: Element, config: ObserverConfig = {}) {
    const observer = this.getObserver(config);

    observer.unobserve(element);
    this.callbacks.delete(element);
    this.pendingUpdates.delete(element);
  }

  cleanup() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
    this.callbacks.clear();
    this.pendingUpdates.clear();
  }
}

// Global singleton instance
const globalObserverManager = new GlobalIntersectionObserverManager();

/**
 * useGlobalIntersectionObserver Hook
 * Uses global observer manager for efficient element visibility detection
 *
 * @example
 * const [ref, isVisible] = useGlobalIntersectionObserver({
 *   rootMargin: "100px 0px",
 *   threshold: 0.1,
 *   initialIsIntersecting: false
 * });
 */
export function useGlobalIntersectionObserver<T extends Element = HTMLDivElement>(
  config: {
    initialIsIntersecting?: boolean;
    rootMargin?: string;
    threshold?: number | number[];
  } = {},
) {
  const {initialIsIntersecting = true, rootMargin = "0px", threshold = 0} = config;

  const [isIntersecting, setIsIntersecting] = useState(initialIsIntersecting);
  const elementRef = useRef<T | null>(null);

  // Stable callback reference to prevent unnecessary effect re-runs
  const callbackRef = useRef<ObserverCallback>((visible: boolean) => {
    setIsIntersecting(visible);
  });

  useEffect(() => {
    const element = elementRef.current;

    if (!element || !callbackRef.current) return;

    globalObserverManager.observe(element, callbackRef.current, {rootMargin, threshold});

    return () => {
      if (element) {
        globalObserverManager.unobserve(element, {rootMargin, threshold});
      }
    };
  }, [rootMargin, threshold]);

  return [elementRef, isIntersecting] as const;
}

// Cleanup utility (rarely needed)
export function cleanupGlobalObserver() {
  globalObserverManager.cleanup();
}
