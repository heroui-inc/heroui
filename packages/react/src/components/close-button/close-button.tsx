"use client";

import type {CloseButtonVariants} from "./close-button.styles";
import type {ComponentPropsWithRef} from "react";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
import {Button as ButtonPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";
import {CloseIcon} from "../icons";

import {closeButtonVariants} from "./close-button.styles";

/* -------------------------------------------------------------------------------------------------
 * Close Button Root
 * -----------------------------------------------------------------------------------------------*/
interface CloseButtonRootProps
  extends ComponentPropsWithRef<typeof ButtonPrimitive>, CloseButtonVariants {
  asChild?: boolean;
}

const CloseButtonRoot = ({
  asChild,
  children,
  className,
  slot,
  style,
  variant,
  ...rest
}: CloseButtonRootProps) => {
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
        typeof children === "function"
          ? children(renderProps)
          : (children ?? <CloseIcon data-slot="close-button-icon" />)
      }
    </ButtonPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {CloseButtonRoot};

export type {CloseButtonRootProps};
