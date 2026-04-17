"use client";

import type {ToggleButtonVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {toggleButtonVariants} from "@heroui/styles";
import {useContext} from "react";
import {ToggleButton as ToggleButtonPrimitive} from "react-aria-components/ToggleButton";

import {composeTwRenderProps} from "../../utils";
import {ToggleButtonGroupContext} from "../toggle-button-group";

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
  const groupContext = useContext(ToggleButtonGroupContext);

  // Merge props with precedence: direct props > context props
  const finalSize = size ?? groupContext?.size;

  const styles = toggleButtonVariants({
    isIconOnly,
    size: finalSize,
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
