// @vitest-environment jsdom
import type {Root} from "react-dom/client";

import {act, useState} from "react";
import {createRoot} from "react-dom/client";
import {afterEach, beforeEach, describe, expect, it} from "vitest";

import {ComponentPreviewContainer} from "@/components/component-preview-container";

type ObserverCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;

let observerCallback: ObserverCallback | undefined;

class MockIntersectionObserver {
  constructor(callback: ObserverCallback) {
    observerCallback = callback;
  }

  disconnect() {}
  observe() {}
  unobserve() {}
}

const Toggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button type="button" onClick={() => setIsOpen((open) => !open)}>
      {isOpen ? "Open" : "Closed"}
    </button>
  );
};

const fireIntersection = (isIntersecting: boolean, height = 0) =>
  act(() => observerCallback?.([{boundingClientRect: {height} as DOMRect, isIntersecting}]));

describe("ComponentPreviewContainer", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    (globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;
    globalThis.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    observerCallback = undefined;
  });

  it("keeps example state and reserves height only while off-screen", () => {
    act(() =>
      root.render(
        <ComponentPreviewContainer hideCode name="toggle-demo">
          <Toggle />
        </ComponentPreviewContainer>,
      ),
    );

    const preview = container.querySelector<HTMLDivElement>(".component-preview-container")!;
    const button = container.querySelector("button")!;

    act(() => button.click());
    expect(button.textContent).toBe("Open");

    fireIntersection(false, 480);
    expect(preview.style.minHeight).toBe("480px");
    expect(button.closest<HTMLElement>(".demo-frame")!.style.display).toBe("none");

    fireIntersection(true);
    expect(preview.style.minHeight).toBe("");
    expect(container.querySelector("button")).toBe(button);
    expect(button.textContent).toBe("Open");
  });
});
