/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type {ButtonVariants} from "./button.styles";
import type {Ref} from "react";
import type {ButtonProps as ButtonPrimitiveProps} from "react-aria-components";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
import React from "react";
import {Button as ButtonPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";

import {buttonVariants} from "./button.styles";

interface ButtonProps extends ButtonPrimitiveProps, ButtonVariants {
  ref?: Ref<HTMLButtonElement>;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({asChild, children, className, isIconOnly, size, slot, style, variant, ...rest}, ref) => {
    const styles = buttonVariants({
      isIconOnly,
      size,
      variant,
      class: typeof className === "string" ? className : undefined,
    });

    if (asChild) {
      return (
        <SlotPrimitive
          className={styles}
          slot={slot as string}
          style={style as React.CSSProperties}
          {...rest}
        >
          {typeof children === "function" ? children({} as any) : children}
        </SlotPrimitive>
      );
    }

    return (
      <ButtonPrimitive
        ref={ref}
        className={composeTwRenderProps(className, styles)}
        slot={slot}
        style={style}
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
