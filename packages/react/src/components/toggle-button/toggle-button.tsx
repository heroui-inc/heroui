"use client";

import type {ToggleButtonVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {toggleButtonVariants} from "@heroui/styles";
import {ToggleButton as ToggleButtonPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";

/* -------------------------------------------------------------------------------------------------
 * ToggleButton Root
 * -----------------------------------------------------------------------------------------------*/
interface ToggleButtonRootProps
  extends ComponentPropsWithRef<typeof ToggleButtonPrimitive>, ToggleButtonVariants {}

const ToggleButtonRoot = ({
  children,
  className,
  isIconOnly,
  size,
  style,
  variant,
  ...rest
}: ToggleButtonRootProps) => {
  const styles = toggleButtonVariants({
    isIconOnly,
    size,
    variant,
  });

  return (
    <ToggleButtonPrimitive
      className={composeTwRenderProps(className, styles)}
      data-slot="toggle-button"
      style={style}
      {...rest}
    >
      {(renderProps) => (typeof children === "function" ? children(renderProps) : children)}
    </ToggleButtonPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ToggleButtonRoot};

export type {ToggleButtonRootProps};
