import type {ButtonRenderProps} from "react-aria-components";
import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const buttonVariants = tv({
  base: [
    // basic
    "relative isolate select-none whitespace-nowrap",
    // layout
    "inline-flex items-baseline justify-center gap-x-2",
    // font
    "font-medium",
    // sizing
    "px-[calc(--spacing(4)-1px)] py-[calc(--spacing(2)-1px)] sm:text-sm/6",
    // outline
    "outline-hidden rounded border-[length:var(--stroke-width)] border-transparent",
    // icon
    "*:data-[slot=icon]:text-(--btn-icon) forced-colors:data-hover:[--btn-icon:ButtonText] *:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0.5 *:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center sm:*:data-[slot=icon]:my-1 sm:*:data-[slot=icon]:size-4 forced-colors:[--btn-icon:ButtonText]",
  ],
  compoundVariants: [
    {
      className: "active:scale-[0.98]",
      variant: ["solid", "flat", "bordered", "ghost", "danger"],
    },
  ],
  defaultVariants: {
    variant: "solid",
  },
  variants: {
    isDisabled: {
      false: "",
      true: "opacity-50",
    },
    isFocusVisible: {
      false: "",
      true: "ring-focus ring-2 ring-offset-2",
    },
    isFocused: {
      false: "",
      true: "ring-offset-background",
    },
    isHovered: {
      false: "",
      true: "",
    },
    isPending: {
      false: "",
      true: "",
    },
    isPressed: {
      false: "",
      true: "",
    },
    variant: {
      bordered: ["border-stroke hover:bg-primary-flat/50 active:bg-primary-flat/75"],
      danger: ["bg-danger text-danger-foreground hover:bg-danger/90 active:bg-danger/85"],
      flat: [
        "bg-primary-flat text-primary-flat-foreground hover:bg-primary-flat/80 active:bg-primary-flat/75",
      ],
      ghost: ["hover:bg-primary-flat active:bg-primary-flat/75"],
      link: ["underline-offset-4 hover:underline focus-visible:underline active:opacity-75"],
      solid: ["bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/85"],
    },
  },
});

export type ButtonVariants = Omit<VariantProps<typeof buttonVariants>, keyof ButtonRenderProps>;
