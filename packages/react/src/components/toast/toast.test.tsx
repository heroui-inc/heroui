import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";

import {ToastQueue, toast} from "./toast-queue";

type MockViewTransition = {
  finished?: Promise<unknown>;
  ready?: Promise<unknown>;
  updateCallbackDone?: Promise<unknown>;
};

const flushMicrotasks = async () => {
  await Promise.resolve();
  await Promise.resolve();
};

const setStartViewTransition = (callback: (update: () => void) => MockViewTransition) => {
  Object.defineProperty(document, "startViewTransition", {
    configurable: true,
    value: vi.fn(callback),
    writable: true,
  });
};

describe("toast view transitions", () => {
  beforeEach(() => {
    toast.clear();
    Object.defineProperty(globalThis, "document", {
      configurable: true,
      value: {},
      writable: true,
    });
  });

  afterEach(() => {
    toast.clear();
    vi.restoreAllMocks();
    delete (globalThis as typeof globalThis & {document?: Document}).document;
  });

  it("falls back to a normal update when starting a view transition throws", () => {
    const queue = new ToastQueue();

    setStartViewTransition(() => {
      throw new DOMException(
        "Transition was aborted because of invalid state",
        "InvalidStateError",
      );
    });

    expect(() =>
      queue.add(
        {
          title: "Saved",
          variant: "success",
        },
        {timeout: 0},
      ),
    ).not.toThrow();
    expect(queue.visibleToasts).toHaveLength(1);
  });

  it("does not leak aborted transition promises when a pending toast resolves after unmount", async () => {
    let resolvePromise!: (value: {count: number}) => void;
    const pendingPromise = new Promise<{count: number}>((resolve) => {
      resolvePromise = resolve;
    });
    const transitionError = new DOMException(
      "Transition was aborted because of invalid state",
      "InvalidStateError",
    );

    setStartViewTransition((update) => {
      update();

      return {
        finished: Promise.reject(transitionError),
        ready: Promise.reject(transitionError),
        updateCallbackDone: Promise.reject(transitionError),
      };
    });

    const queue = toast.getQueue();
    const subscriber = vi.fn();
    const unsubscribe = queue.subscribe(subscriber);

    toast.promise(pendingPromise, {
      error: (error) => error.message,
      loading: "Saving changes...",
      success: (result) => `Saved ${result.count} items`,
    });

    expect(subscriber).toHaveBeenCalledTimes(1);

    unsubscribe();

    resolvePromise({count: 3});
    await pendingPromise;
    await flushMicrotasks();

    expect(subscriber).toHaveBeenCalledTimes(1);
    expect(queue.visibleToasts).toHaveLength(1);
    expect(queue.visibleToasts[0]?.content).toMatchObject({
      title: "Saved 3 items",
      variant: "success",
    });
  });
});
