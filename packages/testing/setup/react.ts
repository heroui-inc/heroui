import {installPointerEvent} from "@react-aria/test-utils";
import "@testing-library/jest-dom/vitest";

// RAC usePress needs PointerEvent in jsdom.
installPointerEvent();

// Common jsdom gaps used by overlays / measured layouts / OTP.
if (typeof globalThis.ResizeObserver === "undefined") {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

if (typeof window.matchMedia !== "function") {
  Object.defineProperty(window, "matchMedia", {
    value: (query: string) => ({
      addEventListener() {},
      addListener() {},
      dispatchEvent() {
        return false;
      },
      matches: false,
      media: query,
      onchange: null,
      removeEventListener() {},
      removeListener() {},
    }),
    writable: true,
  });
}

if (typeof document.elementFromPoint !== "function") {
  document.elementFromPoint = () => null;
}

if (typeof Element.prototype.getAnimations !== "function") {
  Element.prototype.getAnimations = () => [];
}
