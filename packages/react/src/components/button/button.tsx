"use client";

import type {VariantProps} from "../../utils";
import type {Ref} from "react";
import type {ButtonProps as ButtonPrimitiveProps} from "react-aria-components";

import React from "react";
import {Button as ButtonPrimitive} from "react-aria-components";

import {composeTwRenderProps, createClassBuilder} from "../../utils";

// Create button class builder with complete class name mappings
const getButtonClasses = createClassBuilder({
  base: "button",
  variants: {
    size: {
      sm: "button--sm",
      md: "button--md",
      lg: "button--lg",
    },
    variant: {
      primary: "button--primary",
      secondary: "button--secondary",
      tertiary: "button--tertiary",
      ghost: "button--ghost",
      danger: "button--danger",
    },
  },
});

// Extract variant props using the VariantProps utility
type ButtonVariants = VariantProps<typeof getButtonClasses>;

// Extract individual types for export if needed
export type ButtonSize = ButtonVariants["size"];
export type ButtonVariant = ButtonVariants["variant"];

interface ButtonProps extends ButtonPrimitiveProps, ButtonVariants {
  ref?: Ref<HTMLButtonElement>;
  isIconOnly?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({children, className, isIconOnly = false, size = "md", variant = "primary", ...rest}, ref) => {
    return (
      <ButtonPrimitive
        ref={ref}
        className={composeTwRenderProps(
          className,
          getButtonClasses({size, variant}, {"icon-only": isIconOnly}),
        )}
        {...rest}
      >
        {(renderProps) => (typeof children === "function" ? children(renderProps) : children)}
      </ButtonPrimitive>
    );
  },
);

Button.displayName = "HeroUI.Button";

export type {ButtonProps};
export {Button};
