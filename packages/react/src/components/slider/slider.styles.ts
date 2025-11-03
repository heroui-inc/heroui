import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const sliderVariants = tv({
  slots: {
    base: "slider",
    output: "slider__output",
    track: "slider__track",
    fill: "slider__fill",
    thumb: "slider__thumb",
    marks: "slider__marks",
  },
});

export type SliderVariants = VariantProps<typeof sliderVariants>;
