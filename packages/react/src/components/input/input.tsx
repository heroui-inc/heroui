"use client";

import type {InputVariants} from "./input.styles";
import type {InputProps as InputPrimitiveProps} from "react-aria-components";

import React from "react";
import {Input as InputPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";

import {inputVariants} from "./input.styles";

interface InputProps extends InputPrimitiveProps, InputVariants {
  ref?: React.Ref<HTMLInputElement>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({className, ...rest}, ref) => {
  return (
    <InputPrimitive
      ref={ref}
      className={composeTwRenderProps(className, inputVariants({}))}
      data-slot="input"
      {...rest}
    />
  );
});

Input.displayName = "HeroUI.Input";

export type {InputProps};
export {Input};
