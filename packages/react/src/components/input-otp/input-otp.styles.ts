import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {disabledClasses, focusRingClasses} from "../../utils";

export const inputOTPVariants = tv({
  slots: {
    base: "flex w-full flex-col gap-1",
    container: "relative flex items-center gap-2",
    group: "flex items-center gap-2",
    slot: [
      "relative flex items-center justify-center",
      "rounded-field",
      "bg-field backdrop-blur-0",
      "min-h-8 min-w-8 flex-1",
      "transition-all duration-200",
      "border-field border",
      "[border-width:var(--border-width-field)]",
      "shadow-field",
      "text-sm font-semibold",
      "text-field-foreground",
      "hover:bg-field-hover",
      "hover:border-field-border-hover",
      "focus-within:bg-field-focus",
      "focus-within:border-field-border-focus",
      focusRingClasses,
    ],
    slotValue: ["text-[13.5px] leading-[18px]", "tracking-[-0.27px]"],
    caret: ["absolute", "h-4 w-[2px]", "bg-field-foreground", "animate-blink"],
    separator: ["bg-field-border", "h-0.5 w-[5px]", "shrink-0"],
  },
  variants: {
    isDisabled: {
      true: {
        slot: [disabledClasses, "bg-field/60"],
      },
    },
    isInvalid: {
      true: {
        slot: ["border-danger", "hover:border-danger", "focus-within:border-danger"],
      },
    },
    isActive: {
      true: {
        slot: [
          "bg-field-focus",
          "shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)]",
          "ring-field-border-focus ring-2 ring-offset-2",
        ],
      },
    },
    isFilled: {
      true: {
        slot: ["bg-field-focus"],
      },
    },
  },
  compoundVariants: [
    {
      isDisabled: false,
      isInvalid: false,
      isActive: false,
      class: {
        slot: ["hover:bg-field-hover"],
      },
    },
  ],
});

export type InputOTPVariants = VariantProps<typeof inputOTPVariants>;
