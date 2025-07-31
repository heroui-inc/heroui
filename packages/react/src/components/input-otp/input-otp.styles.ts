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
      "rounded-xl",
      "bg-neutral-50 backdrop-blur-0",
      "min-h-8 min-w-8 flex-1",
      "transition-all duration-200",
      "border border-[rgba(0,0,0,0.01)]",
      "shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]",
      "shadow-[0px_0px_0px_0px_inset_rgba(255,255,255,0.1)]",
      "text-sm font-semibold",
      "text-foreground",
      "hover:bg-neutral-100",
      focusRingClasses,
    ],
    slotValue: ["text-[13.5px] leading-[18px]", "tracking-[-0.27px]"],
    caret: ["absolute", "h-4 w-[2px]", "bg-foreground", "animate-blink"],
    separator: ["bg-neutral-200", "h-0.5 w-[5px]", "shrink-0"],
  },
  variants: {
    isDisabled: {
      true: {
        slot: [disabledClasses, "bg-neutral-50/50"],
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
          "bg-white",
          "shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)]",
          "ring-2 ring-neutral-900/20 ring-offset-2",
        ],
      },
    },
    isFilled: {
      true: {
        slot: ["bg-white"],
      },
    },
  },
  compoundVariants: [
    {
      isDisabled: false,
      isInvalid: false,
      isActive: false,
      class: {
        slot: ["hover:bg-neutral-100"],
      },
    },
  ],
});

export type InputOTPVariants = VariantProps<typeof inputOTPVariants>;
