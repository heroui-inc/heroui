import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const inputOTPVariants = tv({
  defaultVariants: {
    variant: "primary",
  },
  slots: {
    base: "input-otp",
    caret: "input-otp__caret",
    group: "input-otp__group",
    input: "input-otp__input",
    separator: "input-otp__separator",
    slot: "input-otp__slot",
    slotValue: "input-otp__slot-value",
  },
  variants: {
    variant: {
      primary: {
        base: "input-otp--primary",
      },
      secondary: {
        base: "input-otp--secondary",
      },
    },
  },
});

export type InputOTPVariants = VariantProps<typeof inputOTPVariants>;
