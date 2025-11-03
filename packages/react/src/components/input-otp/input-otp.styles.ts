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
    isOnSurface: {
      true: {
        base: "input-otp--on-surface",
      },
      false: {},
    },
  },
  defaultVariants: {
    isOnSurface: false,
  },
});

export type InputOTPVariants = VariantProps<typeof inputOTPVariants>;
