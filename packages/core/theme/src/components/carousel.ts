import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

const carousel = tv({
  slots: {
    base: "w-fit flex flex-col gap-2 overflow-hidden",
    wrapper: "relative",
    nextSlideButton:
      "z-10 min-w-0 min-h-0 w-auto h-auto px-2.5 py-2.5 absolute top-1/2 -translate-y-1/2 right-2",
    prevSlideButton:
      "z-10 min-w-0 min-h-0 w-auto h-auto px-2.5 py-2.5 absolute top-1/2 -translate-y-1/2 left-2",
    slideControlIcon: "w-5 h-5",
    slideContainer: "relative overflow-hidden w-96 h-96 rounded-lg",
    slideWrapper: "flex h-full",
    indicatorWrapper: "absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-1",
    indicator:
      "min-w-0 flex-none w-2 h-2 border border-default-500 rounded-full bg-default-300 data-[selected=true]:bg-default-800",
    thumbnailContainer: "overflow-hidden w-96 px-2",
    thumbnailWrapper: "flex gap-x-3",
  },
  variants: {
    size: {
      sm: {},
      md: {},
      lg: {},
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none",
      },
    },
    radius: {
      none: "",
      sm: "",
      md: "",
      lg: "",
      full: "",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
    isDisabled: false,
  },
});

const carouselItem = tv({
  slots: {
    base: "min-w-0 flex-none w-full h-full rounded-lg overflow-hidden bg-default-50 data-[loaded=false]:animate-pulse m-1",
  },
});

const carouselThumb = tv({
  slots: {
    base: [
      "min-w-0 flex-none w-16 h-16 my-2 rounded-xl bg-background",
      "outline outline-default-200 data-[selected=true]:outline-none",
      "data-[selected=true]:ring-2 data-[selected=true]:ring-offset-1",
      "data-[selected=true]:ring-offset-background data-[selected=true]:ring-primary",
      "transition-ring duration-300",
    ],
  },
  variants: {
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    radius: "md",
  },
});

export type CarouselVariantProps = VariantProps<typeof carousel>;
export type CarouselSlots = keyof ReturnType<typeof carousel>;

export type CarouselThumbVariantProps = VariantProps<typeof carouselThumb>;

export {carousel, carouselItem, carouselThumb};
