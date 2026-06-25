"use client";

import type {ButtonProps} from "../button";
import type {ReactNode} from "react";
import type {
  ToastOptions as RACToastOptions,
  UNSTABLE_ToastQueue as ToastQueuePrimitiveType,
} from "react-aria-components/Toast";

import {UNSTABLE_ToastQueue as ToastQueuePrimitive} from "react-aria-components/Toast";
import {flushSync} from "react-dom";

import {DEFAULT_RAC_MAX_VISIBLE_TOAST, DEFAULT_TOAST_TIMEOUT} from "./constants";

/* ------------------------------------------------------------------------------------------------
 * Toast Queue Options
 * --------------------------------------------------------------------------------------------- */
export interface ToastQueueOptions {
  /** The maximum number of toasts to display at a time (visual only). */
  maxVisibleToasts?: number;
  /** Function to wrap updates in (i.e. document.startViewTransition()). */
  wrapUpdate?: (fn: () => void) => void;
}

/* ------------------------------------------------------------------------------------------------
 * Toast Queue
 * --------------------------------------------------------------------------------------------- */
/** The underlying react-stately queue passed to `ToastRegion` (not the HeroUI `ToastQueue` wrapper). */
export type StatelyToastQueue<T extends object = ToastContentValue> = ToastQueuePrimitiveType<T>;

export class ToastQueue<T extends object = ToastContentValue> {
  private queue: ToastQueuePrimitiveType<T>;
  readonly maxVisibleToasts?: number;

  constructor(options?: ToastQueueOptions) {
    this.maxVisibleToasts = options?.maxVisibleToasts;

    // Serialize successive ViewTransitions through a tail-extending promise
    // chain. The View Transitions API only allows one active transition at a
    // time — starting a second while the first is still animating aborts the
    // first with a "Transition was skipped" DOMException (which surfaces as an
    // unhandled rejection on .ready). Appending each new transition to the end
    // of the chain (rather than attaching them all to the first active one)
    // keeps them strictly ordered even when three or more mutations stack
    // inside a single microtask, as happens during toast.promise() while the
    // loading toast's own add transition is still in flight.
    let transitionChain: Promise<unknown> = Promise.resolve();

    const defaultWrapUpdate = (fn: () => void): void => {
      if (typeof document === "undefined" || !("startViewTransition" in document)) {
        fn();

        return;
      }

      const runNext = (): Promise<unknown> => {
        const transition = document.startViewTransition(() => {
          flushSync(fn);
        });

        // When a transition is superseded or aborted, it's `ready` that
        // rejects (e.g. "AbortError: Transition was skipped" /
        // "InvalidStateError: Transition was aborted because of invalid
        // state"); `finished` still fulfills. Catch `ready` so the rejection
        // doesn't surface as an unhandled promise rejection.
        transition.ready.catch(() => {});

        // Swallow the "skipped" rejection so that chain steps after a
        // superseded transition still run.
        return transition.finished.catch(() => {});
      };

      transitionChain = transitionChain.then(runNext, runNext);
    };

    this.queue = new ToastQueuePrimitive<T>({
      maxVisibleToasts: DEFAULT_RAC_MAX_VISIBLE_TOAST,
      wrapUpdate: options?.wrapUpdate ?? defaultWrapUpdate,
    });
  }

  add(content: T, options?: RACToastOptions): string {
    // Apply default timeout if not provided, but respect explicit 0 (persistent toast)
    const timeout = options?.timeout !== undefined ? options.timeout : DEFAULT_TOAST_TIMEOUT;

    return this.queue.add(content, {
      ...options,
      timeout,
    });
  }

  close(key: string): void {
    this.queue.close(key);
  }

  pauseAll(): void {
    this.queue.pauseAll();
  }

  resumeAll(): void {
    this.queue.resumeAll();
  }

  clear(): void {
    this.queue.clear();
  }

  subscribe(fn: () => void): () => void {
    return this.queue.subscribe(fn);
  }

  get visibleToasts() {
    return this.queue.visibleToasts;
  }

  getQueue(): ToastQueuePrimitiveType<T> {
    return this.queue;
  }
}

/* ------------------------------------------------------------------------------------------------
 * Toast Queue Instance
 * --------------------------------------------------------------------------------------------- */

export interface ToastContentValue {
  indicator?: ReactNode | undefined;
  title?: ReactNode | undefined;
  description?: ReactNode | undefined;
  variant?: "default" | "accent" | "success" | "warning" | "danger" | undefined;
  actionProps?: ButtonProps | undefined;
  isLoading?: boolean | undefined;
}

export interface HeroUIToastOptions {
  description?: ReactNode;
  indicator?: ReactNode;
  variant?: ToastContentValue["variant"];
  actionProps?: ButtonProps;
  isLoading?: boolean;
  timeout?: number;
  onClose?: () => void;
}

export interface ToastPromiseOptions<T = unknown> {
  loading: ReactNode;
  success: ((data: T) => ReactNode) | ReactNode;
  error: ((error: Error) => ReactNode) | ReactNode;
}

// Helper function to create toast
function createToastFunction(queue: ToastQueue<ToastContentValue>) {
  const toastFn = (message: ReactNode, options?: HeroUIToastOptions): string => {
    // Use default timeout if not provided, but respect explicit 0 (persistent toast)
    const timeout = options?.timeout !== undefined ? options.timeout : DEFAULT_TOAST_TIMEOUT;

    return queue.add(
      {
        title: message,
        description: options?.description,
        indicator: options?.indicator,
        variant: options?.variant || "default",
        actionProps: options?.actionProps,
        isLoading: options?.isLoading,
      },
      {
        timeout,
        onClose: () => {
          requestAnimationFrame(() => {
            options?.onClose?.();
          });
        },
      },
    );
  };

  // Variant methods
  toastFn.success = (message: ReactNode, options?: Omit<HeroUIToastOptions, "variant">): string => {
    return toastFn(message, {...options, variant: "success"});
  };

  toastFn.danger = (message: ReactNode, options?: Omit<HeroUIToastOptions, "variant">): string => {
    return toastFn(message, {...options, variant: "danger"});
  };

  toastFn.info = (message: ReactNode, options?: Omit<HeroUIToastOptions, "variant">): string => {
    return toastFn(message, {...options, variant: "accent"});
  };

  toastFn.warning = (message: ReactNode, options?: Omit<HeroUIToastOptions, "variant">): string => {
    return toastFn(message, {...options, variant: "warning"});
  };

  // Promise support
  toastFn.promise = <T>(
    promise: Promise<T> | (() => Promise<T>),
    options: ToastPromiseOptions<T>,
  ): string => {
    const promiseFn = typeof promise === "function" ? promise() : promise;
    const loadingId = queue.add(
      {
        title: options.loading,
        variant: "default",
        isLoading: true,
      },
      {
        timeout: 0, // Don't auto-close loading toasts
      },
    );

    promiseFn
      .then((data) => {
        const successMessage =
          typeof options.success === "function" ? options.success(data) : options.success;

        queue.close(loadingId);

        return toastFn.success(successMessage);
      })
      .catch((error: Error) => {
        const errorMessage =
          typeof options.error === "function" ? options.error(error) : options.error;

        queue.close(loadingId);

        return toastFn.danger(errorMessage);
      });

    return loadingId;
  };

  // Expose queue methods for advanced usage
  toastFn.getQueue = () => queue.getQueue();
  toastFn.close = (key: string) => queue.close(key);
  toastFn.pauseAll = () => queue.pauseAll();
  toastFn.resumeAll = () => queue.resumeAll();
  toastFn.clear = () => queue.clear();

  return toastFn as typeof toastFn & {
    success: typeof toastFn.success;
    danger: typeof toastFn.danger;
    info: typeof toastFn.info;
    warning: typeof toastFn.warning;
    promise: typeof toastFn.promise;
    getQueue: () => ReturnType<typeof queue.getQueue>;
    close: typeof queue.close;
    pauseAll: typeof queue.pauseAll;
    resumeAll: typeof queue.resumeAll;
    clear: typeof queue.clear;
  };
}

const toastQueue = new ToastQueue<ToastContentValue>({
  maxVisibleToasts: DEFAULT_RAC_MAX_VISIBLE_TOAST,
});

export const toast = createToastFunction(toastQueue);
export {toastQueue};
