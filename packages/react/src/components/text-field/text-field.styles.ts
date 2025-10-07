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
      "rounded-field relative",
      "bg-field backdrop-blur-0",
      "min-h-8",
      "border-field border",
      "[border-width:var(--border-width-field)]",
      "shadow-field",
      "transition-all duration-200",
      "hover:border-field-border-hover",
      "focus-within:border-field-border-focus",
      focusRingClasses,
    ],
    input: [
      "w-full",
      "bg-transparent",
      "px-3 py-2",
      "text-sm leading-5",
      "text-field-foreground placeholder:text-field-placeholder",
      "outline-none",
      "min-h-inherit",
    ],
    textarea: [
      "w-full",
      "bg-transparent",
      "px-3 py-2",
      "text-sm leading-5",
      "text-field-foreground placeholder:text-field-placeholder",
      "outline-none",
      "resize-y",
      "min-h-[80px]",
    ],
    description: ["text-field-placeholder text-xs", "px-1 pt-1"],
    error: ["text-danger text-xs", "px-1 pt-1"],
  },
  variants: {
    isDisabled: {
      true: {
        label: disabledClasses,
        inputWrapper: [disabledClasses, "bg-field/60"],
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
          "hover:bg-field-hover",
          "focus-within:bg-field-focus",
          "focus-within:shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)]",
        ],
      },
    },
  ],
});

export type TextFieldVariants = VariantProps<typeof textFieldVariants>;
