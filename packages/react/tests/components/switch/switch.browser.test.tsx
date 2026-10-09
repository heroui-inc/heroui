import type {CSSProperties} from "react";

import {render} from "@heroui/testing/browser";
import {page} from "vitest/browser";

import {Switch} from "@/components/switch";

// The thumb motion lives in CSS; Vite Tailwind compiles `@/styles.css`.
import "@/styles.css";

/** A black track and a flat white thumb, so a pixel's brightness is how much of it the thumb covers. */
const BLACK_TRACK = {
  "--switch-control-bg": "#000",
  "--switch-control-bg-checked": "#000",
  "--switch-control-bg-checked-hover": "#000",
  "--switch-control-bg-hover": "#000",
} as CSSProperties;

const Stage = ({dir, size}: {dir?: "ltr" | "rtl"; size?: "sm" | "md" | "lg"}) => (
  <div data-testid="stage" dir={dir} style={{padding: 8, width: "fit-content"}}>
    <Switch aria-label="Notifications" size={size} style={BLACK_TRACK}>
      <Switch.Content>
        <Switch.Control>
          <Switch.Thumb className="rounded-none bg-white shadow-none" />
        </Switch.Control>
      </Switch.Content>
    </Switch>
  </div>
);

const partsOf = () => {
  const stage = page.getByTestId("stage").element() as HTMLElement;

  return {
    control: stage.querySelector<HTMLElement>('[data-slot="switch-control"]')!,
    stage,
    thumb: stage.querySelector<HTMLElement>('[data-slot="switch-thumb"]')!,
  };
};

/** Presses the visible track; the `role="switch"` input itself is visually hidden. */
const toggle = () => page.elementLocator(partsOf().control).click();

/**
 * Sums the brightness of the track's middle row, in device pixels. With a black
 * track and a white thumb this is the thumb's painted width, independent of
 * where it sits.
 */
const paintedThumbWidth = async () => {
  const {control, stage} = partsOf();
  // `save: false` hands back a data URL rather than writing a file.
  const shot = await page.screenshot({
    base64: true,
    element: page.elementLocator(stage),
    save: false,
  });
  const binary = atob(shot.replace(/^data:[^,]*,/, ""));
  const bitmap = await createImageBitmap(
    new Blob([Uint8Array.from(binary, (char) => char.charCodeAt(0))], {type: "image/png"}),
  );
  const canvas = document.createElement("canvas");

  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d")!;

  ctx.drawImage(bitmap, 0, 0);

  const stageRect = stage.getBoundingClientRect();
  const track = control.getBoundingClientRect();
  const scale = bitmap.width / stageRect.width;
  // Stay a pixel inside the track so its anti-aliased edges are never sampled.
  const from = Math.ceil((track.left - stageRect.left) * scale) + 1;
  const to = Math.floor((track.right - stageRect.left) * scale) - 1;
  const y = Math.round((track.top + track.height / 2 - stageRect.top) * scale);
  const row = ctx.getImageData(from, y, to - from, 1).data;

  let width = 0;

  for (let i = 0; i < row.length; i += 4) {
    width += (row[i]! + row[i + 1]! + row[i + 2]!) / (3 * 255);
  }

  return width;
};

/** Toggles the switch on and samples the thumb's painted width across its transition. */
const sampleThumbWidths = async () => {
  const {thumb} = partsOf();

  await toggle();

  const animations = thumb.getAnimations();

  expect(animations.length).toBeGreaterThan(0);

  const widths: number[] = [];

  for (let time = 0; time <= 320; time += 20) {
    for (const animation of animations) {
      animation.pause();
      animation.currentTime = time;
    }
    widths.push(await paintedThumbWidth());
  }

  return widths;
};

describe("Switch (browser)", () => {
  // The default 414x896 frame is scaled down to fit the runner window, which resamples
  // screenshots; a frame that fits is captured 1:1.
  beforeEach(async () => {
    await page.viewport(400, 300);
  });

  describe("thumb transition", () => {
    // sm and lg thumbs are a fractional number of pixels wide at the default 16px root,
    // which is where a layout-driven slide snaps each edge to a different pixel.
    it.each(["sm", "lg"] as const)(
      "keeps the thumb's painted width constant while it slides at size=%s",
      async (size) => {
        await render(<Stage size={size} />);

        const widths = await sampleThumbWidths();

        expect(Math.max(...widths) - Math.min(...widths)).toBeLessThan(0.1);
      },
    );

    it("keeps the thumb's painted width constant while it slides in RTL", async () => {
      await render(<Stage dir="rtl" size="lg" />);

      const widths = await sampleThumbWidths();

      expect(Math.max(...widths) - Math.min(...widths)).toBeLessThan(0.1);
    });
  });

  describe("resting position", () => {
    const insetsOf = () => {
      const {control, thumb} = partsOf();

      for (const animation of thumb.getAnimations()) animation.finish();

      const track = control.getBoundingClientRect();
      const rect = thumb.getBoundingClientRect();

      return {end: track.right - rect.right, start: rect.left - track.left};
    };

    it.each(["sm", "md", "lg"] as const)(
      "insets the thumb 0.125rem from the leading edge when off and the trailing edge when on at size=%s",
      async (size) => {
        await render(<Stage size={size} />);

        expect(insetsOf().start).toBeCloseTo(2, 1);

        await toggle();

        expect(insetsOf().end).toBeCloseTo(2, 1);
      },
    );

    it("mirrors the thumb's travel in RTL", async () => {
      await render(<Stage dir="rtl" />);

      expect(insetsOf().end).toBeCloseTo(2, 1);

      await toggle();

      expect(insetsOf().start).toBeCloseTo(2, 1);
    });

    it("follows a custom track width", async () => {
      await render(<Stage />);

      const {control} = partsOf();

      control.style.width = "4rem";

      await toggle();

      expect(insetsOf().end).toBeCloseTo(2, 1);
    });
  });
});
