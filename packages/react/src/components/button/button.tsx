"use client";

import type {ButtonVariants} from "./button.styles";
import type {ComponentPropsWithRef} from "react";

import {useContext} from "react";
import {Button as ButtonPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";
import {ButtonGroupContext} from "../button-group";

import {buttonVariants} from "./button.styles";

/* -------------------------------------------------------------------------------------------------
 * Button Root
 * -----------------------------------------------------------------------------------------------*/
interface ButtonRootProps extends ComponentPropsWithRef<typeof ButtonPrimitive>, ButtonVariants {}

const ButtonRoot = ({
  children,
  className,
  isDisabled,
  isIconOnly,
  size,
  slot,
  style,
  variant,
  ...rest
}: ButtonRootProps) => {
  const buttonGroupContext = useContext(ButtonGroupContext);

  // Merge props with precedence: direct props > context props
  const finalSize = size ?? buttonGroupContext?.size;
  const finalVariant = variant ?? buttonGroupContext?.variant;
  const finalIsDisabled = isDisabled ?? buttonGroupContext?.isDisabled;

  const styles = buttonVariants({
    class: typeof className === "string" ? className : undefined,
    isIconOnly,
    size: finalSize,
    variant: finalVariant,
  });

  return (
    <ButtonPrimitive
      className={composeTwRenderProps(className, styles)}
      data-slot="button"
      isDisabled={finalIsDisabled}
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
