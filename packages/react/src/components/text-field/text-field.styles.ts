import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {disabledClasses, focusRingClasses} from "../../utils";

export const textFieldVariants = tv({
  slots: {
    base: "flex w-full flex-col gap-1",
    labelWrapper: "flex items-center gap-1",
    label: ["text-foreground text-sm font-medium", "transition-colors duration-200"],
    required: "text-danger text-sm font-medium",
    inputWrapper: [
      "relative rounded-xl",
      "bg-neutral-50 backdrop-blur-0",
      "min-h-8",
      "transition-all duration-200",
      "border border-[rgba(0,0,0,0.01)]",
      "shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]",
      "shadow-[0px_0px_0px_0px_inset_rgba(255,255,255,0.1)]",
      focusRingClasses,
    ],
    input: [
      "w-full",
      "bg-transparent",
      "px-3 py-2",
      "text-sm leading-5",
      "text-foreground placeholder:text-neutral-500",
      "outline-none",
      "min-h-inherit",
    ],
    textarea: [
      "w-full",
      "bg-transparent",
      "px-3 py-2",
      "text-sm leading-5",
      "text-foreground placeholder:text-neutral-500",
      "outline-none",
      "resize-y",
      "min-h-[80px]",
    ],
    description: ["text-xs text-neutral-500", "px-1 pt-1"],
    error: ["text-danger text-xs", "px-1 pt-1"],
  },
  variants: {
    isDisabled: {
      true: {
        label: disabledClasses,
        inputWrapper: [disabledClasses, "bg-neutral-50/50"],
        input: disabledClasses,
        textarea: disabledClasses,
        description: disabledClasses,
      },
    },
    isInvalid: {
      true: {
        inputWrapper: ["border-danger", "hover:border-danger", "focus-within:border-danger"],
      },
    },
  },
  compoundVariants: [
    {
      isDisabled: false,
      isInvalid: false,
      class: {
        inputWrapper: [
          "hover:bg-neutral-100",
          "focus-within:bg-white",
          "focus-within:shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)]",
        ],
      },
    },
  ],
});

export type TextFieldVariants = VariantProps<typeof textFieldVariants>;
