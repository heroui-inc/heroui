"use client";

import type {InputVariants} from "./input.styles";
import type {ComponentPropsWithRef} from "react";

import React, {useContext} from "react";
import {Input as InputPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";
import {SurfaceContext} from "../surface";

import {inputVariants} from "./input.styles";

/* -------------------------------------------------------------------------------------------------
 * Input Root
 * -----------------------------------------------------------------------------------------------*/
interface InputRootProps extends ComponentPropsWithRef<typeof InputPrimitive>, InputVariants {}

const InputRoot = ({className, fullWidth, inSurface, ...rest}: InputRootProps) => {
  const surfaceContext = useContext(SurfaceContext);
  const resolvedInSurface = inSurface ?? surfaceContext.variant;

  return (
    <InputPrimitive
      data-slot="input"
      className={composeTwRenderProps(
        className,
        inputVariants({fullWidth, inSurface: resolvedInSurface}),
      )}
      {...rest}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {InputRoot};

export type {InputRootProps};
