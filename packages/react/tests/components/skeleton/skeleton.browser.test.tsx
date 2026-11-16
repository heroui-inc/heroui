import {render} from "@heroui/testing/browser";

import {Skeleton} from "@/components/skeleton";

// The shimmer lives in CSS; Vite Tailwind compiles `@/styles.css`.
import "@/styles.css";

const ShimmerSkeleton = ({dir}: {dir: "ltr" | "rtl"}) => (
  <div dir={dir}>
    <Skeleton animationType="shimmer" className="h-4 w-40" data-testid="skeleton" />
  </div>
);

const shimmerOf = () =>
  getComputedStyle(document.querySelector<HTMLElement>("[data-testid='skeleton']")!, "::after");

describe("Skeleton (browser)", () => {
  // The shimmer travels from inline-start to inline-end, so RTL mirrors the physical sweep.
  describe("shimmer direction", () => {
    it("sweeps left to right in LTR", async () => {
      await render(<ShimmerSkeleton dir="ltr" />);

      expect(shimmerOf().animationName).toBe("skeleton");
    });

    it("sweeps right to left in RTL", async () => {
      await render(<ShimmerSkeleton dir="rtl" />);

      expect(shimmerOf().animationName).toBe("skeleton-rtl");
    });
  });
});
