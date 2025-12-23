import {renderHook, waitFor} from "@testing-library/react";
import {mocks} from "@heroui/test-utils";

import {useImage} from "../src";

describe("use-image hook", () => {
  let mockImage: {restore: any; simulate: (value: "loaded" | "error") => void};

  beforeEach(() => {
    mockImage = mocks.image();
  });
  afterEach(() => {
    mockImage.restore();
  });

  describe("basic loading states", () => {
    it("returns pending when no src provided", () => {
      const {result} = renderHook(() => useImage({}));

      expect(result.current).toEqual("pending");
    });

    it("returns loading then loaded for successful image load", async () => {
      const {result} = renderHook(() => useImage({src: "/test.png"}));

      expect(result.current).toEqual("loading");
      mockImage.simulate("loaded");
      await waitFor(() => expect(result.current).toBe("loaded"));
    });

    it("returns loading then failed for error image", async () => {
      mockImage.simulate("error");
      const {result} = renderHook(() => useImage({src: "/test.png"}));

      expect(result.current).toEqual("loading");
      await waitFor(() => expect(result.current).toBe("failed"));
    });
  });

  describe("cached images", () => {
    it("handles asynchronously cached images", async () => {
      mockImage.simulate("loaded");
      const {result} = renderHook(() => useImage({src: "/test.png"}));

      await waitFor(() => expect(result.current).toBe("loaded"));
    });

    it("handles synchronously cached images (Firefox/Safari race condition)", async () => {
      // This test simulates the race condition where cached images fire onload
      // synchronously when src is set - a scenario that occurs in Firefox/Safari
      mockImage.restore();

      const originalImage = window.Image;

      // Mock Image that fires onload synchronously when src is set
      // @ts-expect-error - mocking global Image
      window.Image = class SyncImage {
        onload: VoidFunction = () => {};
        onerror: VoidFunction = () => {};
        _src = "";
        alt = "";
        naturalWidth = 100;
        naturalHeight = 100;
        complete = true;

        get src() {
          return this._src;
        }

        set src(value: string) {
          this._src = value;
          // Fire onload SYNCHRONOUSLY when src is set (simulates cached image behavior)
          this.onload();
        }

        hasAttribute(name: string) {
          return name in this;
        }
        getAttribute(name: string) {
          // @ts-expect-error - dynamic property access
          return name in this ? this[name] : null;
        }
      };

      try {
        const {result} = renderHook(() => useImage({src: "/cached-image.png"}));

        // With the fix, the status should be "loaded" because handlers are attached
        // BEFORE src is set, so the synchronous onload callback is caught
        await waitFor(() => expect(result.current).toBe("loaded"));
      } finally {
        // Always restore, even if test fails
        window.Image = originalImage;
      }
    });

    it("handles synchronous error for cached failed images", async () => {
      mockImage.restore();

      const originalImage = window.Image;

      // Mock Image that fires onerror synchronously when src is set
      // @ts-expect-error - mocking global Image
      window.Image = class SyncErrorImage {
        onload: VoidFunction = () => {};
        onerror: VoidFunction = () => {};
        _src = "";
        naturalWidth = 0;
        naturalHeight = 0;
        complete = true;

        get src() {
          return this._src;
        }

        set src(value: string) {
          this._src = value;
          // Fire onerror SYNCHRONOUSLY when src is set
          this.onerror();
        }

        hasAttribute(name: string) {
          return name in this;
        }
        getAttribute(name: string) {
          // @ts-expect-error - dynamic property access
          return name in this ? this[name] : null;
        }
      };

      try {
        const {result} = renderHook(() => useImage({src: "/broken-image.png"}));

        await waitFor(() => expect(result.current).toBe("failed"));
      } finally {
        window.Image = originalImage;
      }
    });
  });

  describe("dynamic src changes", () => {
    it("transitions from pending to loading when src changes from undefined to valid", async () => {
      const {result, rerender} = renderHook(({src}: {src?: string}) => useImage({src}), {
        initialProps: {src: undefined},
      });

      expect(result.current).toEqual("pending");

      // Rerender with a valid src
      rerender({src: "/test.png"});

      // Should be loading
      expect(result.current).toEqual("loading");

      // Simulate the image load
      mockImage.simulate("loaded");
      await waitFor(() => expect(result.current).toBe("loaded"));
    });

    it("reloads when src changes from one valid URL to another", async () => {
      const {result, rerender} = renderHook(({src}: {src?: string}) => useImage({src}), {
        initialProps: {src: "/image1.png"},
      });

      expect(result.current).toEqual("loading");
      mockImage.simulate("loaded");
      await waitFor(() => expect(result.current).toBe("loaded"));

      // Reset the mock for the new image - the new image shouldn't be "already loaded"
      mockImage.restore();
      mockImage = mocks.image();

      // Change to a different image
      rerender({src: "/image2.png"});

      // Should go back to loading for the new image
      expect(result.current).toEqual("loading");

      mockImage.simulate("loaded");
      await waitFor(() => expect(result.current).toBe("loaded"));
    });
  });

  describe("bypass options", () => {
    it("returns loaded immediately when ignoreFallback is true", () => {
      const {result} = renderHook(() => useImage({src: "/test.png", ignoreFallback: true}));

      expect(result.current).toEqual("loaded");
    });

    it("returns loaded immediately when shouldBypassImageLoad is true", () => {
      const {result} = renderHook(() => useImage({src: "/test.png", shouldBypassImageLoad: true}));

      // The hook returns status but ignoreFallback takes precedence in the return
      // shouldBypassImageLoad makes load() return "loaded"
      expect(result.current).toEqual("loaded");
    });
  });

  describe("callbacks", () => {
    it("calls onLoad callback when image loads", async () => {
      const onLoad = jest.fn();

      renderHook(() => useImage({src: "/test.png", onLoad}));

      mockImage.simulate("loaded");
      await waitFor(() => expect(onLoad).toHaveBeenCalled());
    });

    it("calls onError callback when image fails", async () => {
      const onError = jest.fn();

      mockImage.simulate("error");
      renderHook(() => useImage({src: "/test.png", onError}));

      await waitFor(() => expect(onError).toHaveBeenCalled());
    });
  });

  describe("image properties", () => {
    it("sets crossOrigin property on image element", async () => {
      mockImage.restore();

      const originalImage = window.Image;
      let capturedCrossOrigin: string | null = null;

      // @ts-expect-error - mocking global Image
      window.Image = class MockImage {
        onload: VoidFunction = () => {};
        onerror: VoidFunction = () => {};
        src = "";
        naturalWidth = 100;
        naturalHeight = 100;
        complete = false;
        _crossOrigin: string | null = null;

        get crossOrigin() {
          return this._crossOrigin;
        }
        set crossOrigin(value: string | null) {
          this._crossOrigin = value;
          capturedCrossOrigin = value;
        }

        hasAttribute(name: string) {
          return name in this;
        }
        getAttribute(name: string) {
          // @ts-expect-error - dynamic property access
          return name in this ? this[name] : null;
        }
      };

      try {
        renderHook(() => useImage({src: "/test.png", crossOrigin: "anonymous"}));

        expect(capturedCrossOrigin).toBe("anonymous");
      } finally {
        window.Image = originalImage;
      }
    });

    it("sets srcset and sizes properties on image element", async () => {
      mockImage.restore();

      const originalImage = window.Image;
      let capturedSrcset: string | null = null;
      let capturedSizes: string | null = null;

      // @ts-expect-error - mocking global Image
      window.Image = class MockImage {
        onload: VoidFunction = () => {};
        onerror: VoidFunction = () => {};
        src = "";
        naturalWidth = 100;
        naturalHeight = 100;
        complete = false;
        _srcset = "";
        _sizes = "";

        get srcset() {
          return this._srcset;
        }
        set srcset(value: string) {
          this._srcset = value;
          capturedSrcset = value;
        }
        get sizes() {
          return this._sizes;
        }
        set sizes(value: string) {
          this._sizes = value;
          capturedSizes = value;
        }

        hasAttribute(name: string) {
          return name in this;
        }
        getAttribute(name: string) {
          // @ts-expect-error - dynamic property access
          return name in this ? this[name] : null;
        }
      };

      try {
        renderHook(() =>
          useImage({
            src: "/test.png",
            srcSet: "/test-2x.png 2x, /test-3x.png 3x",
            sizes: "(max-width: 600px) 100vw, 50vw",
          }),
        );

        expect(capturedSrcset).toBe("/test-2x.png 2x, /test-3x.png 3x");
        expect(capturedSizes).toBe("(max-width: 600px) 100vw, 50vw");
      } finally {
        window.Image = originalImage;
      }
    });

    it("sets loading property on image element", async () => {
      mockImage.restore();

      const originalImage = window.Image;
      let capturedLoading: string | null = null;

      // @ts-expect-error - mocking global Image
      window.Image = class MockImage {
        onload: VoidFunction = () => {};
        onerror: VoidFunction = () => {};
        src = "";
        naturalWidth = 100;
        naturalHeight = 100;
        complete = false;
        _loading = "";

        get loading() {
          return this._loading;
        }
        set loading(value: string) {
          this._loading = value;
          capturedLoading = value;
        }

        hasAttribute(name: string) {
          return name in this;
        }
        getAttribute(name: string) {
          // @ts-expect-error - dynamic property access
          return name in this ? this[name] : null;
        }
      };

      try {
        renderHook(() => useImage({src: "/test.png", loading: "lazy"}));

        expect(capturedLoading).toBe("lazy");
      } finally {
        window.Image = originalImage;
      }
    });
  });
});
