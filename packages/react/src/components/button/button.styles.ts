import type {ButtonRenderProps} from "react-aria-components";
import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {disabledClasses, focusRingClasses} from "../../utils/compose";

export const buttonVariants = tv({
  base: [
    // basic
    "relative isolate select-none whitespace-nowrap rounded-lg transition-[transform,background-color] duration-150",
    // layout
    "inline-flex items-center justify-center gap-x-2 border border-transparent",
    "origin-center",
    // font
    "font-medium",
    // sizing
    "px-4",
    // cursor
    "cursor-interactive",
    // icon
    "[&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:my-0.5 [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:self-center sm:[&_svg]:my-1 sm:[&_svg]:size-4",
    // pending
    "data-pending:pointer-events-none",
    focusRingClasses,
    disabledClasses,
  ],
  compoundVariants: [
    {
      className: "w-9 md:w-8",
      isIconOnly: true,
      size: "sm",
    },
    {
      className: "w-10 md:w-9",
      isIconOnly: true,
      size: "md",
    },
    {
      className: "w-11 md:w-10",
      isIconOnly: true,
      size: "lg",
    },
  ],
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
  variants: {
    isIconOnly: {
      true: "",
    },
    size: {
      lg: "h-11 md:h-10",
      md: "h-10 md:h-9",
      sm: "h-9 px-3 text-sm md:h-8 [&_svg]:size-4",
    },
    variant: {
      danger:
        "bg-danger text-danger-foreground hover:bg-danger-hover active:bg-danger-hover data-[pressed]:bg-danger-hover",
      ghost: "hover:bg-accent-soft data-[pressed]:bg-accent-soft",
      primary:
        "bg-accent text-accent-foreground hover:bg-accent-hover active:bg-accent-hover data-[pressed]:bg-accent-hover",
      secondary: [
        "bg-accent-soft text-accent-soft-foreground hover:bg-accent-soft-hover active:bg-accent-soft-hover data-[pressed]:bg-accent-soft-hover",
      ],
      tertiary:
        "bg-base border-border hover:bg-base-hover active:bg-base-hover data-[pressed]:bg-base-hover",
    },
  },
});

export type ButtonVariants = Omit<VariantProps<typeof buttonVariants>, keyof ButtonRenderProps>;
