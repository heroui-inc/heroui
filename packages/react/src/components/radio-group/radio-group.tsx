"use client";

import type {RadioGroupVariants} from "./radio-group.styles";
import type {ComponentPropsWithRef} from "react";

import React, {useContext} from "react";
import {RadioGroup as RadioGroupPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";
import {SurfaceContext} from "../surface";

import {radioGroupVariants} from "./radio-group.styles";

/* -------------------------------------------------------------------------------------------------
 * Radio Group Root
 * -----------------------------------------------------------------------------------------------*/
interface RadioGroupRootProps
  extends ComponentPropsWithRef<typeof RadioGroupPrimitive>, RadioGroupVariants {}

const RadioGroupRoot = ({children, className, isOnSurface, ...props}: RadioGroupRootProps) => {
  const surfaceContext = useContext(SurfaceContext);
  const isOnSurfaceValue = isOnSurface ?? (surfaceContext.variant !== undefined ? true : false);
  const styles = React.useMemo(
    () => radioGroupVariants({isOnSurface: isOnSurfaceValue}),
    [isOnSurfaceValue],
  );

  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      {...props}
      className={composeTwRenderProps(className, styles)}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </RadioGroupPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {RadioGroupRoot};

export type {RadioGroupRootProps};
