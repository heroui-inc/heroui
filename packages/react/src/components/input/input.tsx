"use client";

import type {InputVariants} from "./input.styles";
import type {InputProps as InputPrimitiveProps} from "react-aria-components";

import {Input as InputPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";

import {inputVariants} from "./input.styles";

interface InputProps extends InputPrimitiveProps, InputVariants {}

const Input = ({className, ...rest}: InputProps) => {
  return (
    <InputPrimitive
      className={composeTwRenderProps(className, inputVariants({}))}
      data-slot="input"
      {...rest}
    />
  );
};

export type {InputProps};
export {Input};
