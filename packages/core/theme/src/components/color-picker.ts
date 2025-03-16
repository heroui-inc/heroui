import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

const colorPicker = tv({
  slots: {
    base: ["w-fit", "flex", "outline-none", "box-border"],
    content: [],
  },
  variants: {
    variant: {
      solid: {},
      bordered: {},
      light: {},
      flat: {},
      faded: {},
      shadow: {},
    },
    color: {
      default: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      danger: {},
    },
    size: {
      sm: {
        base: "px-1 h-6 text-tiny",
      },
      md: {
        base: "px-1 h-7 text-small",
      },
      lg: {
        base: "px-2 h-8 text-medium",
      },
    },
    radius: {
      none: {
        base: "rounded-none",
      },
      sm: {
        base: "rounded-small",
      },
      md: {
        base: "rounded-medium",
      },
      lg: {
        base: "rounded-large",
      },
      full: {
        base: "rounded-full",
      },
    },
    hasStartContent: {
      true: {},
    },
    hasEndContent: {
      true: {},
    },
    isDisabled: {
      true: {base: "opacity-disabled pointer-events-none"},
    },
  },
  defaultVariants: {
    variant: "solid",
    color: "default",
    size: "md",
    radius: "sm",
    isDisabled: false,
  },
  compoundVariants: [],
});

export type ColorPickerVariantProps = VariantProps<typeof colorPicker>;
export type ColorPickerSlots = keyof ReturnType<typeof colorPicker>;
export type ColorPickerReturnType = ReturnType<typeof colorPicker>;

export {colorPicker};
