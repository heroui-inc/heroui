import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

const colorPicker = tv({
  slots: {
    base: ["w-fit", "h-fit", "flex", "outline-none", "overflow-hidden"],
    input: ["w-fit"],
    copyBtn: ["p-0", "size-7", "min-w-7"],
  },
  variants: {
    variant: {
      solid: "",
      bordered: {
        base: "border-medium bg-transparent",
      },
      light: "bg-transparent",
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
        base: "",
      },
      md: {
        base: "",
      },
      lg: {
        base: "",
      },
    },
    radius: {
      none: {
        base: "rounded-none",
        input: "rounded-none",
      },
      sm: {
        base: "rounded-small",
        input: "rounded-small",
      },
      md: {
        base: "rounded-medium",
        input: "rounded-medium",
      },
      lg: {
        base: "rounded-large",
        input: "rounded-large",
      },
      full: {
        base: "rounded-full",
        input: "rounded-full",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-disabled pointer-events-none",
      },
    },
    fullWidth: {
      true: {base: "w-full", input: "w-full"},
    },
  },
  defaultVariants: {
    variant: "solid",
    color: "default",
    size: "md",
    radius: "sm",
    isDisabled: false,
    fullWidth: false,
  },
  compoundVariants: [],
});

export type ColorPickerVariantProps = VariantProps<typeof colorPicker>;
export type ColorPickerSlots = keyof ReturnType<typeof colorPicker>;
export type ColorPickerReturnType = ReturnType<typeof colorPicker>;

export {colorPicker};
