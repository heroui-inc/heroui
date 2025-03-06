import {forwardRef} from "react";
import {tv, VariantProps} from "tailwind-variants";
import {Slot} from "@radix-ui/react-slot";

export const buttonVariants = tv({
  base: [
    // Base
    "relative isolate whitespace-nowrap inline-flex rounded items-baseline justify-center gap-x-2 border border-transparent font-medium",
    // Sizing
    "px-[calc(--spacing(4)-1px)] py-[calc(--spacing(2)-1px)] sm:text-sm/6",
    // Focus
    "outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus:ring-offset-background focus-visible:ring-focus",
    // Disabled
    "data-disabled:opacity-50",
    // Icon
    "*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0.5 *:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center *:data-[slot=icon]:text-(--btn-icon) sm:*:data-[slot=icon]:my-1 sm:*:data-[slot=icon]:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-hover:[--btn-icon:ButtonText]",
  ],
  variants: {
    variant: {
      solid: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/85",
      flat: "bg-primary-flat text-primary-flat-foreground hover:bg-primary-flat/80 active:bg-primary-flat/75",
      ghost: "hover:bg-primary-flat active:bg-primary-flat/75",
      bordered: "border-stroke hover:bg-primary-flat/50 active:bg-primary-flat/75",
      link: "underline-offset-4 hover:underline active:opacity-75 focus-visible:underline",
      danger:
        "bg-danger-background text-danger-foreground hover:bg-danger-background/90 active:bg-danger-background/85",
    },
  },
  defaultVariants: {
    variant: "solid",
  },
  compoundVariants: [
    {
      variant: ["solid", "flat", "bordered", "ghost", "danger"],
      className: "active:scale-[0.98]",
    },
  ],
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants & {
    asChild?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, children, variant, asChild, ...props}, ref) => {
    const Component = asChild ? Slot : "button";

    return (
      <Component ref={ref} className={buttonVariants({variant, className})} {...props}>
        {children}
      </Component>
    );
  },
);

Button.displayName = "HeroUI.Button";
