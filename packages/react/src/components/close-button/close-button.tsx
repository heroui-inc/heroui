"use client";

import type {CloseButtonVariants} from "./close-button.styles";
import type {ComponentRef} from "react";
import type {ButtonProps as ButtonPrimitiveProps} from "react-aria-components";

import {forwardRef} from "react";
import {Button as ButtonPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";
import {CloseIcon} from "../icons";

import {closeButtonVariants} from "./close-button.styles";

export interface CloseButtonProps extends ButtonPrimitiveProps, CloseButtonVariants {
  /**
   * The size of the close button.
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * The variant of the close button.
   * @default "default"
   */
  variant?: "default";
}

export const CloseButton = forwardRef<ComponentRef<typeof ButtonPrimitive>, CloseButtonProps>(
  ({children, className, size = "md", variant = "default", ...props}, ref) => {
    return (
      <ButtonPrimitive
        ref={ref}
        data-close-button
        className={composeTwRenderProps(
          className,
          closeButtonVariants({
            size,
            variant,
          }),
        )}
        {...props}
      >
        {(renderProps) =>
          typeof children === "function" ? children(renderProps) : (children ?? <CloseIcon />)
        }
      </ButtonPrimitive>
    );
  },
);

CloseButton.displayName = "HeroUI.CloseButton";
