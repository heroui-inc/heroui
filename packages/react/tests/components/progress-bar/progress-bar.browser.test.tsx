import {render} from "@heroui/testing/browser";
import {cdp} from "vitest/browser";

import {ProgressBar} from "@/components/progress-bar";

// The indeterminate sweep lives in CSS; Vite Tailwind compiles `@/styles.css`.
import "@/styles.css";

type CDPSession = {
  send: (method: string, params: Record<string, unknown>) => Promise<unknown>;
};

type Direction = "ltr" | "rtl";

const IndeterminateBar = ({dir}: {dir: Direction}) => (
  <div dir={dir} style={{width: 200}}>
    <ProgressBar isIndeterminate aria-label="Loading">
      <ProgressBar.Track>
        <ProgressBar.Fill />
      </ProgressBar.Track>
    </ProgressBar>
  </div>
);

const slotOf = (name: string) =>
  document.querySelector<HTMLElement>(`[data-slot="progress-bar-${name}"]`)!;

/** Pauses the sweep at `progress` (0–1) of one iteration and returns the fill and track rects. */
const rectsAt = (progress: number) => {
  const fill = slotOf("fill");
  const [sweep] = fill.getAnimations();
  const duration = Number(sweep!.effect!.getComputedTiming().duration);

  sweep!.pause();
  // The end of an infinite iteration wraps to 0, so stop just short of it.
  sweep!.currentTime = Math.min(progress * duration, duration - 1);

  return {fill: fill.getBoundingClientRect(), track: slotOf("track").getBoundingClientRect()};
};

afterEach(async () => {
  await (cdp() as CDPSession).send("Emulation.setEmulatedMedia", {features: []});
});

describe("ProgressBar (browser)", () => {
  // The fill is anchored at inline-start, so the sweep has to enter at inline-start and leave
  // past inline-end in both directions; a physical left-to-right sweep pops in mid-track in RTL.
  describe("indeterminate direction", () => {
    it("renders the sweep from left to right in LTR", async () => {
      await render(<IndeterminateBar dir="ltr" />);

      const start = rectsAt(0);

      expect(start.fill.right).toBeCloseTo(start.track.left, 0);

      const end = rectsAt(1);

      expect(end.fill.left).toBeGreaterThanOrEqual(end.track.right);
    });

    it("renders the sweep from right to left in RTL", async () => {
      await render(<IndeterminateBar dir="rtl" />);

      const start = rectsAt(0);

      expect(start.fill.left).toBeCloseTo(start.track.right, 0);

      const end = rectsAt(1);

      expect(end.fill.right).toBeLessThanOrEqual(end.track.left);
    });

    it("renders the fill at rest under reduced motion in RTL", async () => {
      await (cdp() as CDPSession).send("Emulation.setEmulatedMedia", {
        features: [{name: "prefers-reduced-motion", value: "reduce"}],
      });
      await render(<IndeterminateBar dir="rtl" />);

      expect(getComputedStyle(slotOf("fill")).animationName).toBe("none");
    });
  });
});
