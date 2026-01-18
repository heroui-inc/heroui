import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const sliderVariants = tv({
  slots: {
    base: "slider",
    fill: "slider__fill",
    marks: "slider__marks",
    output: "slider__output",
    thumb: "slider__thumb",
    track: "slider__track",
  },
});

export type SliderVariants = VariantProps<typeof sliderVariants>;
