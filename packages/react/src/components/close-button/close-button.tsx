"use client";

import type {CloseButtonVariants} from "./close-button.styles";
import type {ButtonProps as ButtonPrimitiveProps} from "react-aria-components";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
import {Button as ButtonPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";
import {CloseIcon} from "../icons";

import {closeButtonVariants} from "./close-button.styles";

interface CloseButtonProps extends ButtonPrimitiveProps, CloseButtonVariants {
  asChild?: boolean;
}
const CloseButton = ({
  asChild,
  children,
  className,
  slot,
  style,
  variant,
  ...rest
}: CloseButtonProps) => {
  const styles = closeButtonVariants({
    variant,
    class: typeof className === "string" ? className : undefined,
  });

  if (asChild) {
    return (
      <SlotPrimitive
        className={styles}
        data-slot="close-button"
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
      aria-label="Close"
      className={composeTwRenderProps(className, styles)}
      data-slot="close-button"
      slot={slot}
      style={style}
      {...rest}
    >
      {(renderProps) =>
        typeof children === "function" ? children(renderProps) : (children ?? <CloseIcon />)
      }
    </ButtonPrimitive>
  );
};

export type {CloseButtonProps};
export {CloseButton};
