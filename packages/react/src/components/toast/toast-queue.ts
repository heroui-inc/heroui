"use client";

import type {ButtonProps} from "../button";
import type {ReactNode} from "react";
import type {
  ToastOptions as RACToastOptions,
  UNSTABLE_ToastQueue as ToastQueuePrimitiveType,
} from "react-aria-components/Toast";

import {UNSTABLE_ToastQueue as ToastQueuePrimitive} from "react-aria-components/Toast";

import {
  DEFAULT_EXIT_DURATION,
  DEFAULT_RAC_MAX_VISIBLE_TOAST,
  DEFAULT_TOAST_TIMEOUT,
} from "./constants";

/* ------------------------------------------------------------------------------------------------
 * Toast Queue Options
 * --------------------------------------------------------------------------------------------- */
export interface ToastQueueOptions {
  /**
   * How long a closing toast stays mounted for its exit animation, in
   * milliseconds. Set to 0 to remove toasts immediately.
   * @default 350
   */
  exitDuration?: number;
  /**
   * The maximum number of toasts to display at a time (visual only).
   * @default 3
   */
  maxVisibleToasts?: number;
  // Wraps state updates (e.g. document.startViewTransition()).
  wrapUpdate?: (fn: () => void) => void;
}

/* ------------------------------------------------------------------------------------------------
 * Toast Queue
 * --------------------------------------------------------------------------------------------- */
// The underlying react-stately queue passed to ToastRegion (not the HeroUI wrapper).
export type StatelyToastQueue<T extends object = ToastContentValue> = ToastQueuePrimitiveType<T>;

// Runtime shape of react-stately's unexported Timer. Its resume() has no running guard, which guardTimerResume() compensates for.
type StatelyTimer = {
  pause(): void;
  reset(delay: number): void;
  resume(): void;
  timerId?: ReturnType<typeof setTimeout> | null;
};

// Monotonic clock: Date.now() can jump on wall-clock adjustments.
const now: () => number =
  typeof performance !== "undefined" && typeof performance.now === "function"
    ? () => performance.now()
    : () => Date.now();

// Already-wrapped timers; a WeakSet avoids mutating possibly frozen objects.
const guardedTimers = new WeakSet<StatelyTimer>();

// Replica of react-stately's Timer for timers attached by updateToast().
// The shape must match: React Aria calls reset() on timer identity change and the queue's pauseAll/resumeAll duck-type toast.timer.
class ManagedToastTimer {
  timerId: ReturnType<typeof setTimeout> | null | undefined;
  private startTime: number | null = null;
  private remaining: number;
  private readonly callback: () => void;

  constructor(callback: () => void, delay: number) {
    this.remaining = delay;
    this.callback = callback;
  }

  reset(delay: number): void {
    this.remaining = delay;
    this.resume();
  }

  pause(): void {
    if (this.timerId == null) {
      return;
    }

    clearTimeout(this.timerId);
    this.timerId = null;
    this.remaining -= now() - (this.startTime ?? now());
  }

  resume(): void {
    if (this.remaining <= 0) {
      return;
    }

    this.startTime = now();
    this.timerId = setTimeout(() => {
      this.timerId = null;
      this.remaining = 0;
      this.callback();
    }, this.remaining);
  }
}

// A react-stately ToastQueue that keeps closing toasts mounted for exitDuration (so CSS exit animations can play), supports in-place updates, and centralizes timer pausing. Every close path funnels through close().
class ExitAwareToastQueue<T extends object> extends ToastQueuePrimitive<T> {
  private static didWarnMissingNotify = false;

  private readonly exitDuration: number;
  private exitTimers = new Map<string, ReturnType<typeof setTimeout>>();
  private exitingSnapshot: ReadonlySet<string> = new Set();
  private exitSubscriptions = new Set<() => void>();
  private suspensions = new Set<string>();
  // True while clear() drains the queue; close() then defers snapshot rebuilds and subscriber notifications so they happen once per batch.
  private isBatchingExits = false;

  constructor(
    options: {maxVisibleToasts?: number; wrapUpdate?: (fn: () => void) => void},
    exitDuration: number = DEFAULT_EXIT_DURATION,
  ) {
    super(options);
    this.exitDuration = exitDuration;
  }

  // Sources form a set, not a refcount: timers pause once when the set becomes non-empty and resume once when it empties.
  suspendTimers(source: string): void {
    const wasEmpty = this.suspensions.size === 0;

    this.suspensions.add(source);

    if (wasEmpty) {
      super.pauseAll();
    }
  }

  resumeTimers(source: string): void {
    this.suspensions.delete(source);

    // Pass through on an empty set so userland resumeAll() keeps its "kick the timers" semantics (safe via the per-timer running guard).
    if (this.suspensions.size === 0) {
      super.resumeAll();
    }
  }

  override pauseAll(): void {
    this.suspendTimers("external");
  }

  override resumeAll(): void {
    this.resumeTimers("external");
  }

  // React Aria starts timers itself (useToast calls timer.reset on mount).
  // The wrap parks a timer while suspended and stops a resume-while-running from scheduling a second, orphaned timeout.
  private guardTimerResume(timer: StatelyTimer): void {
    if (guardedTimers.has(timer)) {
      return;
    }

    guardedTimers.add(timer);

    const originalResume = timer.resume.bind(timer);

    timer.resume = () => {
      if (this.suspensions.size > 0 || timer.timerId != null) {
        return;
      }

      originalResume();
    };
  }

  override add(content: T, options?: RACToastOptions): string {
    const key = super.add(content, options);
    const timer = this.visibleToasts.find((t) => t.key === key)?.timer as StatelyTimer | undefined;

    if (timer) {
      this.guardTimerResume(timer);
    }

    return key;
  }

  // Updates a toast in place: same key, same DOM node, same stack position.
  // options.timeout replaces the countdown (0 = persistent); omitting it keeps the current countdown. Returns false when the key is unknown or the toast is animating out.
  updateToast(
    key: string,
    content: T,
    options?: {onClose?: () => void; timeout?: number},
  ): boolean {
    if (this.exitTimers.has(key)) {
      return false;
    }

    const queuedToast = this.visibleToasts.find((t) => t.key === key);

    if (!queuedToast) {
      return false;
    }

    queuedToast.content = content;

    if (options && "onClose" in options) {
      queuedToast.onClose = options.onClose;
    }

    if (options?.timeout !== undefined) {
      // A fresh timer identity makes React Aria's [timer, timeout] effect restart the countdown.
      (queuedToast.timer as StatelyTimer | undefined)?.pause();
      queuedToast.timeout = options.timeout;

      if (options.timeout > 0) {
        const timer = new ManagedToastTimer(() => this.close(key), options.timeout);

        this.guardTimerResume(timer);
        // Stately's Timer type is unexported and nominally typed.
        queuedToast.timer = timer as unknown as typeof queuedToast.timer;
      } else {
        queuedToast.timer = undefined;
      }
    }

    // React reads the queue through useSyncExternalStore, so a mutation alone would not re-render. updateVisibleToasts is TypeScript-private but a plain method at runtime; stately has no "update" action.
    const notify = (this as unknown as {updateVisibleToasts?: unknown}).updateVisibleToasts;

    if (typeof notify === "function") {
      (notify as (action: "add") => void).call(this, "add");
    } else {
      // Unstable API drifted. Best effort: a fresh exiting snapshot still re-renders the provider, which re-renders the mutated content.
      if (!ExitAwareToastQueue.didWarnMissingNotify) {
        ExitAwareToastQueue.didWarnMissingNotify = true;
        // eslint-disable-next-line no-console
        console.warn(
          "[HeroUI Toast] react-stately no longer exposes updateVisibleToasts; " +
            "toast updates fall back to a partial re-render.",
        );
      }

      this.exitingSnapshot = new Set(this.exitTimers.keys());
      this.notifyExitSubscribers();
    }

    return true;
  }

  // Stable snapshot of the keys currently in their exit animation.
  getExitingKeys = (): ReadonlySet<string> => this.exitingSnapshot;

  // Subscribe to exiting-key changes (for useSyncExternalStore).
  subscribeExiting = (fn: () => void): (() => void) => {
    this.exitSubscriptions.add(fn);

    return () => {
      this.exitSubscriptions.delete(fn);
    };
  };

  private notifyExitSubscribers(): void {
    for (const fn of this.exitSubscriptions) {
      fn();
    }
  }

  override close(key: string): void {
    const queuedToast = this.visibleToasts.find((t) => t.key === key);

    // Already exiting or already removed.
    if (this.exitTimers.has(key) || !queuedToast) {
      return;
    }

    const canAnimate =
      this.exitDuration > 0 &&
      typeof window !== "undefined" &&
      !window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (!canAnimate) {
      super.close(key);

      return;
    }

    // Fire onClose at dismissal, not at removal: super.close() runs after the exit animation and would delay the callback by exitDuration.
    // Nulling it on the queued toast keeps super.close() from re-firing it.
    const onClose = queuedToast.onClose;

    queuedToast.onClose = undefined;

    this.exitTimers.set(
      key,
      setTimeout(() => {
        // Rebuild the snapshot before super.close notifies React so no render sees the toast as exiting after removal.
        this.exitTimers.delete(key);
        this.exitingSnapshot = new Set(this.exitTimers.keys());
        super.close(key);

        if (!this.isBatchingExits) {
          this.notifyExitSubscribers();
        }
      }, this.exitDuration),
    );

    if (!this.isBatchingExits) {
      this.exitingSnapshot = new Set(this.exitTimers.keys());
      this.notifyExitSubscribers();
    }

    onClose?.();
  }

  override clear(): void {
    // Route through close() so exits animate and each onClose fires (stately's clear() does neither). Batching defers the snapshot rebuild and subscriber notification to a single flush at the end.
    this.isBatchingExits = true;

    try {
      for (const t of [...this.visibleToasts]) {
        this.close(t.key);
      }
    } finally {
      this.isBatchingExits = false;
      this.exitingSnapshot = new Set(this.exitTimers.keys());
      this.notifyExitSubscribers();
    }
  }

  // Releases pending exit timeouts, subscriptions, suspension state, and running timers, for HMR and test teardown. The queue stays usable.
  destroy(): void {
    for (const timeoutId of this.exitTimers.values()) {
      clearTimeout(timeoutId);
    }

    this.exitTimers.clear();
    this.exitingSnapshot = new Set();
    this.exitSubscriptions.clear();
    this.suspensions.clear();

    for (const t of this.visibleToasts) {
      (t.timer as StatelyTimer | undefined)?.pause();
    }
  }
}

export type {ExitAwareToastQueue};
export const isExitAwareToastQueue = <T extends object>(
  queue: ToastQueuePrimitiveType<T>,
): queue is ExitAwareToastQueue<T> => queue instanceof ExitAwareToastQueue;

// Manages toast state outside React so toasts can be triggered from anywhere.
export class ToastQueue<T extends object = ToastContentValue> {
  private queue: ExitAwareToastQueue<T>;
  readonly maxVisibleToasts?: number;

  constructor(options?: ToastQueueOptions) {
    this.maxVisibleToasts = options?.maxVisibleToasts;

    this.queue = new ExitAwareToastQueue<T>(
      {
        // The stately queue keeps every toast; maxVisibleToasts is applied visually by the provider.
        maxVisibleToasts: DEFAULT_RAC_MAX_VISIBLE_TOAST,
        wrapUpdate: options?.wrapUpdate,
      },
      options?.exitDuration ?? DEFAULT_EXIT_DURATION,
    );
  }

  // Adds a toast and returns its key; explicit timeout 0 keeps it open.
  add(content: T, options?: RACToastOptions): string {
    return this.queue.add(content, {
      ...options,
      timeout: options?.timeout ?? DEFAULT_TOAST_TIMEOUT,
    });
  }

  close(key: string): void {
    this.queue.close(key);
  }

  // Updates a toast in place, preserving its stack position. timeout restarts the countdown (0 keeps it open); omit it to keep the current countdown. Returns false if the toast no longer exists.
  update(key: string, content: T, options?: {onClose?: () => void; timeout?: number}): boolean {
    return this.queue.updateToast(key, content, options);
  }

  pauseAll(): void {
    this.queue.pauseAll();
  }

  resumeAll(): void {
    this.queue.resumeAll();
  }

  // Closes all toasts; each animates out and fires its onClose.
  clear(): void {
    this.queue.clear();
  }

  subscribe(fn: () => void): () => void {
    return this.queue.subscribe(fn);
  }

  // The currently rendered toasts, newest first.
  get visibleToasts() {
    return this.queue.visibleToasts;
  }

  // The underlying react-stately queue consumed by ToastRegion.
  getQueue(): ToastQueuePrimitiveType<T> {
    return this.queue;
  }

  // Releases pending timeouts, subscriptions, and running timers, for HMR and test teardown.
  destroy(): void {
    this.queue.destroy();
  }
}

/* ------------------------------------------------------------------------------------------------
 * Toast Queue Instance
 * --------------------------------------------------------------------------------------------- */

export interface ToastContentValue {
  // null hides the indicator.
  indicator?: ReactNode | undefined;
  title?: ReactNode | undefined;
  description?: ReactNode | undefined;
  variant?: "default" | "accent" | "success" | "warning" | "danger" | undefined;
  actionProps?: ButtonProps | undefined;
  // Shows a spinner in place of the indicator.
  isLoading?: boolean | undefined;
}

export interface HeroUIToastOptions {
  description?: ReactNode;
  // null hides the indicator.
  indicator?: ReactNode;
  variant?: ToastContentValue["variant"];
  actionProps?: ButtonProps;
  // Shows a spinner in place of the indicator.
  isLoading?: boolean;
  /**
   * Auto-dismiss timeout in milliseconds; 0 keeps the toast open.
   * @default 4000
   */
  timeout?: number;
  // Called when the toast is dismissed; the exit animation may still be playing.
  onClose?: () => void;
}

export interface ToastPromiseOptions<T = unknown> {
  loading: ReactNode;
  success: ((data: T) => ReactNode) | ReactNode;
  error: ((error: Error) => ReactNode) | ReactNode;
}

function createToastFunction(queue: ToastQueue<ToastContentValue>) {
  const createContent = (message: ReactNode, options?: HeroUIToastOptions): ToastContentValue => ({
    title: message,
    description: options?.description,
    indicator: options?.indicator,
    variant: options?.variant || "default",
    actionProps: options?.actionProps,
    isLoading: options?.isLoading,
  });

  const createQueueOptions = (options?: HeroUIToastOptions) => ({
    timeout: options?.timeout ?? DEFAULT_TOAST_TIMEOUT,
    onClose: options?.onClose,
  });

  const toastFn = (message: ReactNode, options?: HeroUIToastOptions): string => {
    return queue.add(createContent(message, options), createQueueOptions(options));
  };

  toastFn.success = (message: ReactNode, options?: Omit<HeroUIToastOptions, "variant">): string => {
    return toastFn(message, {...options, variant: "success"});
  };

  toastFn.danger = (message: ReactNode, options?: Omit<HeroUIToastOptions, "variant">): string => {
    return toastFn(message, {...options, variant: "danger"});
  };

  // Maps to the accent variant.
  toastFn.info = (message: ReactNode, options?: Omit<HeroUIToastOptions, "variant">): string => {
    return toastFn(message, {...options, variant: "accent"});
  };

  toastFn.warning = (message: ReactNode, options?: Omit<HeroUIToastOptions, "variant">): string => {
    return toastFn(message, {...options, variant: "warning"});
  };

  // Updates a toast in place (same key, same stack position); falls back to a new toast when the id no longer exists.
  toastFn.update = (id: string, message: ReactNode, options?: HeroUIToastOptions): string => {
    const content = createContent(message, options);
    const queueOptions = createQueueOptions(options);

    if (queue.update(id, content, queueOptions)) {
      return id;
    }

    return queue.add(content, queueOptions);
  };

  // Shows a loading toast that settles in place when the promise resolves or rejects; the auto-dismiss countdown starts at that point.
  toastFn.promise = <T>(
    promise: Promise<T> | (() => Promise<T>),
    options: ToastPromiseOptions<T>,
  ): string => {
    const promiseFn = typeof promise === "function" ? promise() : promise;
    const loadingId = queue.add(createContent(options.loading, {isLoading: true}), {timeout: 0});

    promiseFn
      .then((data) => {
        const message =
          typeof options.success === "function" ? options.success(data) : options.success;

        return toastFn.update(loadingId, message, {isLoading: false, variant: "success"});
      })
      .catch((error: Error) => {
        const message = typeof options.error === "function" ? options.error(error) : options.error;

        return toastFn.update(loadingId, message, {isLoading: false, variant: "danger"});
      });

    return loadingId;
  };

  toastFn.getQueue = () => queue.getQueue();
  toastFn.close = (key: string) => queue.close(key);
  toastFn.pauseAll = () => queue.pauseAll();
  toastFn.resumeAll = () => queue.resumeAll();
  toastFn.clear = () => queue.clear();

  return toastFn;
}

const toastQueue = new ToastQueue<ToastContentValue>();

// Global helper bound to the default queue used by <Toast.Provider>.
export const toast = createToastFunction(toastQueue);
export {toastQueue};
