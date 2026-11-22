import {render} from "@heroui/testing/browser";
import {page} from "vitest/browser";

import {Skeleton} from "@/components/skeleton";

// The shimmer lives in CSS; Vite Tailwind compiles `@/styles.css`.
import "@/styles.css";

type Direction = "ltr" | "rtl";
type Pseudo = "::after" | "::before";

const WIDTH = 160;

const ShimmerSkeleton = ({dir}: {dir: Direction}) => (
  <div dir={dir}>
    <Skeleton
      animationType="shimmer"
      className="h-4"
      data-testid="skeleton"
      style={{width: WIDTH}}
    />
  </div>
);

// One shared shimmer on the parent passes over every child skeleton.
const ShimmerGroup = ({dir}: {dir: Direction}) => (
  <div dir={dir}>
    <Skeleton animationType="shimmer" data-testid="skeleton" style={{width: WIDTH}}>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-1/2" />
    </Skeleton>
  </div>
);

const skeletonOf = () => page.getByTestId("skeleton").element() as HTMLElement;

/**
 * Pauses the shimmer at `progress` (0–1) of one iteration and returns the pseudo-element's
 * physical offset from its resting box, as a fraction of the skeleton's width.
 */
const offsetAt = (pseudo: Pseudo, progress: number) => {
  const host = skeletonOf();
  const shimmer = document
    .getAnimations()
    .find(
      (animation) =>
        animation.effect instanceof KeyframeEffect &&
        animation.effect.target === host &&
        animation.effect.pseudoElement === pseudo,
    )!;
  const duration = Number(shimmer.effect!.getComputedTiming().duration);

  shimmer.pause();
  // The end of an infinite iteration wraps to 0, so stop just short of it.
  shimmer.currentTime = Math.min(progress * duration, duration - 1);

  const style = getComputedStyle(host, pseudo);
  const [translateX = "0px"] = style.translate.split(" ");
  const translate = translateX.endsWith("%")
    ? (Number.parseFloat(translateX) / 100) * WIDTH
    : Number.parseFloat(translateX);
  const transform = style.transform === "none" ? 0 : new DOMMatrix(style.transform).m41;

  return (translate + transform) / WIDTH;
};

describe("Skeleton (browser)", () => {
  // The shimmer enters at inline-start and leaves past inline-end, so RTL mirrors the sweep.
  describe("shimmer direction", () => {
    it.each([
      ["LTR", "ltr", -1, 1],
      ["RTL", "rtl", 1, -1],
    ] as const)("renders the shimmer toward inline-end in %s", async (_, dir, start, end) => {
      await render(<ShimmerSkeleton dir={dir} />);

      expect(offsetAt("::after", 0)).toBeCloseTo(start, 1);
      expect(offsetAt("::after", 1)).toBeCloseTo(end, 1);
    });

    it.each([
      ["LTR", "ltr", -1, 1],
      ["RTL", "rtl", 1, -1],
    ] as const)(
      "renders the shared group shimmer toward inline-end in %s",
      async (_, dir, start, end) => {
        await render(<ShimmerGroup dir={dir} />);

        expect(offsetAt("::before", 0)).toBeCloseTo(start, 1);
        expect(offsetAt("::before", 1)).toBeCloseTo(end, 1);
      },
    );
  });
});
