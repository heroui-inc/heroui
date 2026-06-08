import type {ToastQueueOptions} from "./toast-queue";

import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";

import {ToastQueue} from "./toast-queue";

const mocks = vi.hoisted(() => {
  const flushSync = vi.fn((fn: () => void) => {
    fn();
  });
  let wrapUpdate: ToastQueueOptions["wrapUpdate"];

  const toastQueuePrimitive = vi.fn((options: ToastQueueOptions) => {
    wrapUpdate = options.wrapUpdate;

    return {
      add: vi.fn(() => "toast-id"),
      clear: vi.fn(),
      close: vi.fn(),
      pauseAll: vi.fn(),
      resumeAll: vi.fn(),
      subscribe: vi.fn(() => vi.fn()),
      get visibleToasts() {
        return [];
      },
    };
  });

  return {
    flushSync,
    toastQueuePrimitive,
    get wrapUpdate() {
      return wrapUpdate;
    },
    set wrapUpdate(value: ToastQueueOptions["wrapUpdate"]) {
      wrapUpdate = value;
    },
  };
});

const originalDocumentDescriptor = Object.getOwnPropertyDescriptor(globalThis, "document");

vi.mock("react-dom", () => ({
  flushSync: mocks.flushSync,
}));

vi.mock("react-aria-components/Toast", () => ({
  UNSTABLE_ToastQueue: mocks.toastQueuePrimitive,
}));

function createViewTransition(finished: Promise<void> = Promise.resolve()): ViewTransition {
  return {
    finished,
    ready: Promise.resolve(),
    skipTransition: vi.fn(),
    updateCallbackDone: Promise.resolve(),
  };
}

function getWrapUpdate() {
  new ToastQueue();

  expect(mocks.wrapUpdate).toBeDefined();

  return mocks.wrapUpdate!;
}

function resetDocument() {
  if (originalDocumentDescriptor) {
    Object.defineProperty(globalThis, "document", originalDocumentDescriptor);
  } else {
    delete (globalThis as {document?: Partial<Document>}).document;
  }
}

function setDocument(documentMock: Partial<Document>) {
  Object.defineProperty(globalThis, "document", {
    configurable: true,
    value: documentMock,
  });
}

function setStartViewTransition(startViewTransition: (callback: () => void) => ViewTransition) {
  setDocument({startViewTransition: startViewTransition as Document["startViewTransition"]});
}

describe("ToastQueue", () => {
  beforeEach(() => {
    mocks.flushSync.mockClear();
    mocks.toastQueuePrimitive.mockClear();
    mocks.wrapUpdate = undefined;
  });

  afterEach(() => {
    resetDocument();
  });

  it("wraps updates in a view transition when supported", () => {
    const fn = vi.fn();
    const startViewTransition = vi.fn((callback: () => void) => {
      callback();

      return createViewTransition();
    });

    setStartViewTransition(startViewTransition);

    getWrapUpdate()(fn);

    expect(startViewTransition).toHaveBeenCalledTimes(1);
    expect(mocks.flushSync).toHaveBeenCalledTimes(1);
    expect(mocks.flushSync).toHaveBeenCalledWith(fn);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("swallows rejected view transition finished promises", async () => {
    const fn = vi.fn();
    const finished = Promise.reject(
      new DOMException("Transition was aborted because of invalid state", "InvalidStateError"),
    );
    const finishedCatch = vi.spyOn(finished, "catch");
    const startViewTransition = vi.fn((callback: () => void) => {
      callback();

      return createViewTransition(finished);
    });

    setStartViewTransition(startViewTransition);

    getWrapUpdate()(fn);
    await Promise.resolve();

    expect(finishedCatch).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("runs updates directly when view transitions are not supported", () => {
    const fn = vi.fn();

    setDocument({});

    getWrapUpdate()(fn);

    expect(mocks.flushSync).not.toHaveBeenCalled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("runs updates directly when starting a view transition throws", () => {
    const fn = vi.fn();
    const startViewTransition = vi.fn(() => {
      throw new DOMException("Transition was skipped", "AbortError");
    });

    setStartViewTransition(startViewTransition);

    expect(() => getWrapUpdate()(fn)).not.toThrow();
    expect(mocks.flushSync).not.toHaveBeenCalled();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
