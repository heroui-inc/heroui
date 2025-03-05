import {forwardRef} from "react";
import {tv, VariantProps} from "tailwind-variants";

const buttonVariants = tv({
  base: [
    // Base
    "relative isolate whitespace-nowrap inline-flex items-baseline justify-center gap-x-2 rounded-lg border text-base/6 font-semibold",
    // Sizing
    "px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)] sm:text-sm/6",
    // Focus
    "focus:outline-hidden data-focus:outline data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500",
    // Disabled
    "data-disabled:opacity-50",
    // Icon
    "*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0.5 *:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center *:data-[slot=icon]:text-(--btn-icon) sm:*:data-[slot=icon]:my-1 sm:*:data-[slot=icon]:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-hover:[--btn-icon:ButtonText]",
  ],
  variants: {
    variant: {
      default: "",
      flat: "",
      bordered: "",
      light: "",
    },
    color: {
      primary: "bg-primary text-primary-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
    color: "primary",
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, children, ...props}, ref) => {
    return (
      <button ref={ref} className={buttonVariants({variant: "default", className})} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
