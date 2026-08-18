import {render} from "@heroui/testing/browser";
import {page} from "vitest/browser";

import {ScrollShadow} from "@/components/scroll-shadow";

// The fade lives entirely in CSS, so this suite needs the compiled stylesheet rather than
// the Tailwind sources. Every `pnpm test*` entry point builds `@heroui/styles` first.
import "../../../../styles/dist/heroui.min.css";

const SHADOW_SIZE = 40;
const VIEWPORT = 240;

const supportsScrollTimelines = () => CSS.supports("animation-timeline", "scroll(self)");

/** Lets the compositor apply the scroll-driven animation before styles are read. */
const nextFrames = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });

const fadesOf = async (element: Element) => {
  await nextFrames();
  const computed = getComputedStyle(element);

  return {
    start: computed.getPropertyValue("--scroll-shadow-start-fade").trim(),
    end: computed.getPropertyValue("--scroll-shadow-end-fade").trim(),
  };
};

const Overflowing = ({offset}: {offset?: number} = {}) => (
  <ScrollShadow
    data-testid="scroller"
    offset={offset}
    size={SHADOW_SIZE}
    style={{height: VIEWPORT}}
  >
    <div style={{height: 1200}}>Tall content</div>
  </ScrollShadow>
);

const Fitting = () => (
  <ScrollShadow data-testid="scroller" size={SHADOW_SIZE} style={{height: VIEWPORT}}>
    <div>Short content</div>
  </ScrollShadow>
);

const OverflowingRow = () => (
  <ScrollShadow
    data-testid="scroller"
    orientation="horizontal"
    size={SHADOW_SIZE}
    style={{width: VIEWPORT}}
  >
    <div style={{width: 1200}}>Wide content</div>
  </ScrollShadow>
);

const FittingRow = () => (
  <ScrollShadow
    data-testid="scroller"
    orientation="horizontal"
    size={SHADOW_SIZE}
    style={{width: VIEWPORT}}
  >
    <div style={{width: 20}}>Narrow</div>
  </ScrollShadow>
);

const scrollerOf = () => page.getByTestId("scroller").element();

describe("ScrollShadow (browser)", () => {
  describe("scroll-driven fade", () => {
    it("fades only the end edge while resting at the start", async () => {
      await render(<Overflowing />);

      if (!supportsScrollTimelines()) return;

      expect(await fadesOf(scrollerOf())).toEqual({start: "0px", end: `${SHADOW_SIZE}px`});
    });

    it("fades both edges once scrolled into the middle", async () => {
      await render(<Overflowing />);

      if (!supportsScrollTimelines()) return;

      const scroller = scrollerOf();

      scroller.scrollTop = 400;

      expect(await fadesOf(scroller)).toEqual({
        start: `${SHADOW_SIZE}px`,
        end: `${SHADOW_SIZE}px`,
      });
    });

    it("fades only the start edge at the end of the scroll range", async () => {
      await render(<Overflowing />);

      if (!supportsScrollTimelines()) return;

      const scroller = scrollerOf();

      scroller.scrollTop = scroller.scrollHeight;

      expect(await fadesOf(scroller)).toEqual({start: `${SHADOW_SIZE}px`, end: "0px"});
    });

    it("scrubs the start fade in across the shadow size", async () => {
      await render(<Overflowing />);

      if (!supportsScrollTimelines()) return;

      const scroller = scrollerOf();

      scroller.scrollTop = SHADOW_SIZE / 2;

      expect((await fadesOf(scroller)).start).toBe(`${SHADOW_SIZE / 2}px`);
    });

    it("holds the start fade back until the offset is passed", async () => {
      await render(<Overflowing offset={80} />);

      if (!supportsScrollTimelines()) return;

      const scroller = scrollerOf();

      scroller.scrollTop = 80;

      expect((await fadesOf(scroller)).start).toBe("0px");
    });

    // A container without overflow has an inactive timeline, which has to hold both fades
    // at 0px rather than fade content that fits.
    it("renders no fade when the content fits", async () => {
      await render(<Fitting />);

      if (!supportsScrollTimelines()) return;

      expect(await fadesOf(scrollerOf())).toEqual({start: "0px", end: "0px"});
    });

    // The hook still writes the state attributes, so the attribute rules match too. The
    // scroll-driven rules have to win the cascade, including the prefixed properties.
    it("resolves the mask from the scroll-driven gradient, not the attribute fallback", async () => {
      await render(<Overflowing />);

      if (!supportsScrollTimelines()) return;

      const scroller = scrollerOf();

      await nextFrames();
      expect(scroller).toHaveAttribute("data-bottom-scroll", "true");

      const computed = getComputedStyle(scroller);

      // The scroll-driven gradient opens with a transparent stop; the fallback opens with black.
      expect(computed.maskImage).toMatch(/^linear-gradient\(rgba\(0, 0, 0, 0\)/);
      expect(computed.webkitMaskImage).toMatch(/^linear-gradient\(rgba\(0, 0, 0, 0\)/);
    });

    it("keeps the shadow size and offset when a style prop is supplied", async () => {
      await render(<Overflowing offset={80} />);

      const computed = getComputedStyle(scrollerOf());

      expect(computed.getPropertyValue("--scroll-shadow-size").trim()).toBe(`${SHADOW_SIZE}px`);
      expect(computed.getPropertyValue("--scroll-shadow-offset").trim()).toBe("80px");
    });
  });

  // The inline axis drives Tabs' scroller, which is the common non-overflowing case.
  describe("horizontal orientation", () => {
    it("fades only the end edge while resting at the start", async () => {
      await render(<OverflowingRow />);

      if (!supportsScrollTimelines()) return;

      expect(await fadesOf(scrollerOf())).toEqual({start: "0px", end: `${SHADOW_SIZE}px`});
    });

    it("fades only the start edge at the end of the scroll range", async () => {
      await render(<OverflowingRow />);

      if (!supportsScrollTimelines()) return;

      const scroller = scrollerOf();

      scroller.scrollLeft = scroller.scrollWidth;

      expect(await fadesOf(scroller)).toEqual({start: `${SHADOW_SIZE}px`, end: "0px"});
    });

    it("renders no fade when the content fits", async () => {
      await render(<FittingRow />);

      if (!supportsScrollTimelines()) return;

      expect(await fadesOf(scrollerOf())).toEqual({start: "0px", end: "0px"});
    });
  });

  describe("disabled detection", () => {
    it("renders no fade when detection is turned off", async () => {
      await render(
        <ScrollShadow
          data-testid="scroller"
          isEnabled={false}
          size={SHADOW_SIZE}
          style={{height: VIEWPORT}}
        >
          <div style={{height: 1200}}>Tall content</div>
        </ScrollShadow>,
      );

      const scroller = scrollerOf();

      await nextFrames();

      expect(getComputedStyle(scroller).maskImage).toBe("none");
    });
  });

  describe("controlled visibility", () => {
    it("keeps using the attribute-driven mask", async () => {
      await render(
        <ScrollShadow data-testid="scroller" size={SHADOW_SIZE} visibility="both">
          <div style={{height: 20}}>Short content</div>
        </ScrollShadow>,
      );

      const scroller = scrollerOf();

      expect(scroller).toHaveAttribute("data-shadow-mode", "manual");
      expect(getComputedStyle(scroller).maskImage).toContain("linear-gradient");
    });
  });
});
