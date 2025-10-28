"use client";

import type {ButtonVariants} from "./button.styles.js";
import type {ButtonProps as ButtonPrimitiveProps} from "react-aria-components";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
import {Button as ButtonPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/index.js";

import {buttonVariants} from "./button.styles.js";

interface ButtonProps extends ButtonPrimitiveProps, ButtonVariants {
  asChild?: boolean;
}
const Button = ({
  asChild,
  children,
  className,
  isIconOnly,
  size,
  slot,
  style,
  variant,
  ...rest
}: ButtonProps) => {
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
      className={composeTwRenderProps(className, styles)}
      slot={slot}
      style={style}
      {...rest}
    >
      {(renderProps) => (typeof children === "function" ? children(renderProps) : children)}
    </ButtonPrimitive>
  );
};

export type {ButtonProps};
export {Button};
