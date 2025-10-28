import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const inputOTPVariants = tv({
  slots: {
    base: "input-otp",
    container: "input-otp__container",
    group: "input-otp__group",
    slot: "input-otp__slot",
    slotValue: "input-otp__slot-value",
    caret: "input-otp__caret",
    separator: "input-otp__separator",
  },
});

export type InputOTPVariants = VariantProps<typeof inputOTPVariants>;
