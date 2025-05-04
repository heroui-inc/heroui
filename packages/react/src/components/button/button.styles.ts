import type {ButtonRenderProps} from "react-aria-components";
import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

import {disabledClasses} from "../../utils/compose";

export const buttonVariants = tv({
  base: [
    // basic
    "duration-50 relative isolate select-none whitespace-nowrap rounded-lg transition-[background-color,border-color,color,transform]",
    // layout
    "inline-flex items-center justify-center gap-x-2 border border-transparent",
    // scaling
    "active:scale-[0.98]",
    // font
    "font-medium",
    // sizing
    "px-[calc(--spacing(4)-1px)]",
    // icon
    "[&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:my-0.5 [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:self-center sm:[&_svg]:my-1 sm:[&_svg]:size-4",
    // pending
    "data-pending:pointer-events-none",
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
      sm: "h-9 px-[calc(--spacing(3)-1px)] text-sm md:h-8 [&_svg]:size-4",
    },
    variant: {
      danger: "bg-danger text-danger-foreground hover:bg-danger/90 active:bg-danger/85",
      ghost: "hover:bg-accent-soft",
      primary: "bg-accent text-accent-foreground hover:bg-accent/90 active:bg-accent/85",
      secondary:
        "bg-accent-soft text-accent-soft-foreground hover:bg-accent-soft/80 active:bg-accent-soft/75",
      tertiary: "bg-base border-border hover:bg-base-foreground/5",
    },
  },
});

export type ButtonVariants = Omit<VariantProps<typeof buttonVariants>, keyof ButtonRenderProps>;
