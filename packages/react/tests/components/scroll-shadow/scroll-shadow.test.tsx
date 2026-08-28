import type {ScrollShadowVisibility} from "@/components/scroll-shadow";

import {act, fireEvent, render, screen, setupUser, waitFor} from "@heroui/testing/helpers";
import {useState} from "react";

import {ScrollShadow} from "@/components/scroll-shadow";

/** jsdom reports zero for every layout box, so the scroll metrics are stubbed. */
const stubScrollMetrics = (
  element: HTMLElement,
  metrics: {clientHeight: number; scrollHeight: number; scrollTop: number},
) => {
  for (const [property, value] of Object.entries(metrics)) {
    Object.defineProperty(element, property, {configurable: true, value});
  }
};

/** The visibility callback is dispatched from a rAF, so drain a couple of frames. */
const flushFrames = async () => {
  await act(async () => {
    await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
    await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
  });
};

const VisibilityHarness = ({
  onVisibilityChange,
}: {
  onVisibilityChange: (visibility: ScrollShadowVisibility, renderCount: number) => void;
}) => {
  const [renderCount, setRenderCount] = useState(0);

  return (
    <>
      <button type="button" onClick={() => setRenderCount((count) => count + 1)}>
        Re-render
      </button>
      <ScrollShadow
        data-testid="scroll-shadow"
        // Inline on purpose, and closing over renderCount so a stale callback is
        // distinguishable from the current one: a fresh identity each render must
        // not re-notify, but the newest closure must be the one invoked.
        onVisibilityChange={(visibility) => onVisibilityChange(visibility, renderCount)}
      >
        Content {renderCount}
      </ScrollShadow>
    </>
  );
};

describe("ScrollShadow", () => {
  it("renders children content", () => {
    render(<ScrollShadow>Scrollable content</ScrollShadow>);

    expect(screen.getByText("Scrollable content")).toBeInTheDocument();
  });

  it("exposes BEM block and data-slot", () => {
    render(<ScrollShadow data-testid="scroll-shadow">Content</ScrollShadow>);
    const scrollShadow = screen.getByTestId("scroll-shadow");

    expect(scrollShadow).toHaveAttribute("data-slot", "scroll-shadow");
    expect(scrollShadow.className).toEqual(expect.stringContaining("scroll-shadow"));
  });

  it("exposes orientation BEM modifier and data attribute", () => {
    render(
      <ScrollShadow data-testid="scroll-shadow" orientation="horizontal">
        Content
      </ScrollShadow>,
    );
    const scrollShadow = screen.getByTestId("scroll-shadow");

    expect(scrollShadow).toHaveAttribute("data-orientation", "horizontal");
    expect(scrollShadow.className).toEqual(expect.stringContaining("scroll-shadow--horizontal"));
  });

  it("exposes hideScrollBar BEM modifier", () => {
    render(
      <ScrollShadow hideScrollBar data-testid="scroll-shadow">
        Content
      </ScrollShadow>,
    );

    expect(screen.getByTestId("scroll-shadow").className).toEqual(
      expect.stringContaining("scroll-shadow--hide-scrollbar"),
    );
  });

  describe("shadow mode", () => {
    it("exposes the auto mode that drives the scroll-timeline fade", () => {
      render(<ScrollShadow data-testid="scroll-shadow">Content</ScrollShadow>);

      expect(screen.getByTestId("scroll-shadow")).toHaveAttribute(
        "data-scroll-shadow-mode",
        "auto",
      );
    });

    it("falls back to manual mode when visibility is controlled", () => {
      render(
        <ScrollShadow data-testid="scroll-shadow" visibility="both">
          Content
        </ScrollShadow>,
      );

      expect(screen.getByTestId("scroll-shadow")).toHaveAttribute(
        "data-scroll-shadow-mode",
        "manual",
      );
    });

    it("falls back to manual mode when detection is disabled", () => {
      render(
        <ScrollShadow data-testid="scroll-shadow" isEnabled={false}>
          Content
        </ScrollShadow>,
      );

      expect(screen.getByTestId("scroll-shadow")).toHaveAttribute(
        "data-scroll-shadow-mode",
        "manual",
      );
    });
  });

  it("keeps the shadow size and offset variables when a style prop is supplied", () => {
    render(
      <ScrollShadow data-testid="scroll-shadow" offset={20} size={64} style={{height: 240}}>
        Content
      </ScrollShadow>,
    );
    const scrollShadow = screen.getByTestId("scroll-shadow");

    expect(scrollShadow.style.getPropertyValue("--scroll-shadow-size")).toBe("64px");
    expect(scrollShadow.style.getPropertyValue("--scroll-shadow-offset")).toBe("20px");
    expect(scrollShadow.style.height).toBe("240px");
  });

  it("supports data attribute passthrough", () => {
    render(
      <ScrollShadow data-foo="bar" data-testid="scroll-shadow">
        Content
      </ScrollShadow>,
    );

    expect(screen.getByTestId("scroll-shadow")).toHaveAttribute("data-foo", "bar");
  });

  describe("visibility callback", () => {
    it("calls onVisibilityChange when the scroll state changes", async () => {
      const onVisibilityChange = vi.fn();

      render(<VisibilityHarness onVisibilityChange={onVisibilityChange} />);

      await waitFor(() => expect(onVisibilityChange).toHaveBeenLastCalledWith("none", 0));

      const scrollShadow = screen.getByTestId("scroll-shadow");

      stubScrollMetrics(scrollShadow, {clientHeight: 100, scrollHeight: 300, scrollTop: 0});
      fireEvent.scroll(scrollShadow);

      await waitFor(() => expect(onVisibilityChange).toHaveBeenLastCalledWith("bottom", 0));

      stubScrollMetrics(scrollShadow, {clientHeight: 100, scrollHeight: 300, scrollTop: 50});
      fireEvent.scroll(scrollShadow);

      await waitFor(() => expect(onVisibilityChange).toHaveBeenLastCalledWith("both", 0));
    });

    it("does not call onVisibilityChange again while the scroll state is unchanged", async () => {
      const onVisibilityChange = vi.fn();
      const user = setupUser();

      render(<VisibilityHarness onVisibilityChange={onVisibilityChange} />);

      await waitFor(() => expect(onVisibilityChange).toHaveBeenCalledTimes(1));

      const rerender = screen.getByRole("button", {name: "Re-render"});

      await user.click(rerender);
      await user.click(rerender);
      await flushFrames();

      expect(onVisibilityChange).toHaveBeenCalledTimes(1);
    });

    it("calls the newest callback, not the one captured on mount", async () => {
      const onVisibilityChange = vi.fn();
      const user = setupUser();

      render(<VisibilityHarness onVisibilityChange={onVisibilityChange} />);

      await waitFor(() => expect(onVisibilityChange).toHaveBeenLastCalledWith("none", 0));

      await user.click(screen.getByRole("button", {name: "Re-render"}));
      await user.click(screen.getByRole("button", {name: "Re-render"}));
      await flushFrames();

      const scrollShadow = screen.getByTestId("scroll-shadow");

      stubScrollMetrics(scrollShadow, {clientHeight: 100, scrollHeight: 300, scrollTop: 0});
      fireEvent.scroll(scrollShadow);

      // renderCount 2 proves the ref was resynced; a stale closure would report 0.
      await waitFor(() => expect(onVisibilityChange).toHaveBeenLastCalledWith("bottom", 2));
    });
  });
});
