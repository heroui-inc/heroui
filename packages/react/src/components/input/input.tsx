"use client";

import type {InputVariants} from "./input.styles";
import type {InputProps as InputPrimitiveProps} from "react-aria-components";

import React, {useContext} from "react";
import {Input as InputPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";
import {SurfaceContext} from "../surface";

import {inputVariants} from "./input.styles";

/* -------------------------------------------------------------------------------------------------
 * Input Root
 * -----------------------------------------------------------------------------------------------*/
interface InputRootProps extends InputPrimitiveProps, InputVariants {}

const InputRoot = ({className, isOnSurface, ...rest}: InputRootProps) => {
  const surfaceContext = useContext(SurfaceContext);
  const isOnSurfaceValue = isOnSurface ?? (surfaceContext.variant !== undefined ? true : false);

  return (
    <InputPrimitive
      className={composeTwRenderProps(className, inputVariants({isOnSurface: isOnSurfaceValue}))}
      data-slot="input"
      {...rest}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {InputRoot};

export type {InputRootProps};
