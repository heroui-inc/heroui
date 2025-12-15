"use client";

import type {ButtonVariants} from "./button.styles";
import type {ComponentPropsWithRef} from "react";

import {Button as ButtonPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";

import {buttonVariants} from "./button.styles";

/* -------------------------------------------------------------------------------------------------
 * Button Root
 * -----------------------------------------------------------------------------------------------*/
interface ButtonRootProps extends ComponentPropsWithRef<typeof ButtonPrimitive>, ButtonVariants {}

const ButtonRoot = ({
  children,
  className,
  isIconOnly,
  size,
  slot,
  style,
  variant,
  ...rest
}: ButtonRootProps) => {
  const styles = buttonVariants({
    isIconOnly,
    size,
    variant,
    class: typeof className === "string" ? className : undefined,
  });

  return (
    <ButtonPrimitive
      className={composeTwRenderProps(className, styles)}
      data-slot="button"
      slot={slot}
      style={style}
      {...rest}
    >
      {(renderProps) => (typeof children === "function" ? children(renderProps) : children)}
    </ButtonPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ButtonRoot};

export type {ButtonRootProps};
