import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const inputOTPVariants = tv({
  slots: {
    base: "input-otp",
    input: "input-otp__input",
    group: "input-otp__group",
    slot: "input-otp__slot",
    slotValue: "input-otp__slot-value",
    caret: "input-otp__caret",
    separator: "input-otp__separator",
  },
  variants: {
    inSurface: {
      default: {
        base: "input-otp--in-surface-default",
      },
      secondary: {
        base: "input-otp--in-surface-secondary",
      },
      tertiary: {
        base: "input-otp--in-surface-tertiary",
      },
    },
  },
  defaultVariants: {},
});

export type InputOTPVariants = VariantProps<typeof inputOTPVariants>;
