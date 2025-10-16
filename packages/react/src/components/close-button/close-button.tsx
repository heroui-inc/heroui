"use client";

import type {CloseButtonVariants} from "./close-button.styles";
import type {Ref} from "react";
import type {ButtonProps as ButtonPrimitiveProps} from "react-aria-components";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
import React from "react";
import {Button as ButtonPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";
import {CloseIcon} from "../icons";

import {closeButtonVariants} from "./close-button.styles";

interface CloseButtonProps extends ButtonPrimitiveProps, CloseButtonVariants {
  ref?: Ref<HTMLButtonElement>;
  asChild?: boolean;
}

const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({asChild, children, className, slot, style, variant, ...rest}, ref) => {
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
        ref={ref}
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
  },
);

CloseButton.displayName = "HeroUI.CloseButton";

export type {CloseButtonProps};
export {CloseButton};
