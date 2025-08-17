import type {ButtonProps} from "@heroui/react";
import type {VariantProps} from "tailwind-variants";

import {Button, buttonVariants} from "@heroui/react";
import {tv} from "tailwind-variants";

const myButtonVariants = tv({
  extend: buttonVariants,
  base: "text-md text-shadow-lg font-semibold shadow-md data-[pending=true]:opacity-40",
  variants: {
    radius: {
      lg: "rounded-lg",
      md: "rounded-md",
      sm: "rounded-sm",
      full: "rounded-full",
    },
    size: {
      sm: "h-10 px-4",
      md: "h-11 px-6",
      lg: "h-12 px-8",
      xl: "h-13 px-10",
    },
    variant: {
      primary: "text-white dark:bg-white/10 dark:text-white dark:hover:bg-white/15",
    },
  },
  defaultVariants: {
    radius: "full",
    variant: "primary",
  },
});

type MyButtonVariants = VariantProps<typeof myButtonVariants>;
export type MyButtonProps = Omit<ButtonProps, "className"> &
  MyButtonVariants & {className?: string};

function CustomButton({className, radius, variant, ...props}: MyButtonProps) {
  return <Button className={myButtonVariants({className, radius, variant})} {...props} />;
}

export function CustomVariants() {
  return <CustomButton>Custom Button</CustomButton>;
}
