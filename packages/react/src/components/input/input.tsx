"use client";

import type {InputVariants} from "./input.styles.js";
import type {InputProps as InputPrimitiveProps} from "react-aria-components";

import {Input as InputPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/index.js";

import {inputVariants} from "./input.styles.js";

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
