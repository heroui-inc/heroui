"use client";

import type {RadioGroupVariants} from "./radio-group.styles";
import type {RadioGroupProps as RadioGroupPrimitiveProps} from "react-aria-components";

import React from "react";
import {RadioGroup as RadioGroupPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {radioGroupVariants} from "./radio-group.styles";

/* -------------------------------------------------------------------------------------------------
 * Radio Group Root
 * -----------------------------------------------------------------------------------------------*/
interface RadioGroupRootProps extends RadioGroupPrimitiveProps, RadioGroupVariants {}

const RadioGroupRoot = ({children, className, ...props}: RadioGroupRootProps) => {
  const styles = React.useMemo(() => radioGroupVariants(), []);

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
