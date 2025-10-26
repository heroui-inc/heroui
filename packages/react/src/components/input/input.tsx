"use client";

import type {InputVariants} from "./input.styles";
import type {InputProps as InputPrimitiveProps} from "react-aria-components";

import {Input as InputPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";

import {inputVariants} from "./input.styles";

/* -------------------------------------------------------------------------------------------------
 * Form Root
 * -----------------------------------------------------------------------------------------------*/
interface InputRootProps extends InputPrimitiveProps, InputVariants {}

const InputRoot = ({className, ...rest}: InputRootProps) => {
  return (
    <InputPrimitive
      className={composeTwRenderProps(className, inputVariants({}))}
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
