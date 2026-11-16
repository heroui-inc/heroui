import {render} from "@heroui/testing/browser";

import {ProgressBar} from "@/components/progress-bar";

// The indeterminate sweep lives in CSS; Vite Tailwind compiles `@/styles.css`.
import "@/styles.css";

const IndeterminateBar = ({dir}: {dir: "ltr" | "rtl"}) => (
  <div dir={dir}>
    <ProgressBar isIndeterminate aria-label="Loading" data-testid="progress-bar">
      <ProgressBar.Track>
        <ProgressBar.Fill />
      </ProgressBar.Track>
    </ProgressBar>
  </div>
);

const fillOf = () => document.querySelector<HTMLElement>(".progress-bar__fill")!;

describe("ProgressBar (browser)", () => {
  // The fill is anchored at inline-start, so the sweep has to run toward inline-end in both
  // directions; a physical left-to-right sweep would start off-track in RTL.
  describe("indeterminate direction", () => {
    it("sweeps left to right in LTR", async () => {
      await render(<IndeterminateBar dir="ltr" />);

      expect(getComputedStyle(fillOf()).animationName).toBe("progress-bar-indeterminate");
    });

    it("sweeps right to left in RTL", async () => {
      await render(<IndeterminateBar dir="rtl" />);

      expect(getComputedStyle(fillOf()).animationName).toBe("progress-bar-indeterminate-rtl");
    });
  });
});
