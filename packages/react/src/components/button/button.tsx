"use client";

import type {VariantProps} from "../../utils";
import type {Ref} from "react";
import type {ButtonProps as ButtonPrimitiveProps} from "react-aria-components";

import React from "react";
import {Button as ButtonPrimitive} from "react-aria-components";

import {composeTwRenderProps, tv} from "../../utils";

// Create button class builder with complete class name mappings
const getButtonClasses = tv({
  base: "button",
  defaultVariants: {
    isIconOnly: false,
    size: "md",
    variant: "primary",
  },
  variants: {
    isIconOnly: {
      true: "button--icon-only",
    },
    size: {
      lg: "button--lg",
      md: "button--md",
      sm: "button--sm",
    },
    variant: {
      danger: "button--danger",
      ghost: "button--ghost",
      primary: "button--primary",
      secondary: "button--secondary",
      tertiary: "button--tertiary",
    },
  },
});

// Extract variant props using the VariantProps utility
type ButtonVariants = VariantProps<typeof getButtonClasses>;

interface ButtonProps extends ButtonPrimitiveProps, ButtonVariants {
  ref?: Ref<HTMLButtonElement>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({children, className, isIconOnly, size, variant, ...rest}, ref) => {
    return (
      <ButtonPrimitive
        ref={ref}
        className={composeTwRenderProps(className, getButtonClasses({isIconOnly, size, variant}))}
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
