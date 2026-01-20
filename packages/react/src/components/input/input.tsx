"use client";

import type {InputVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {inputVariants} from "@heroui/styles";
import React, {useContext} from "react";
import {Input as InputPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";
import {TextFieldContext} from "../text-field";

/* -------------------------------------------------------------------------------------------------
 * Input Root
 * -----------------------------------------------------------------------------------------------*/
interface InputRootProps extends ComponentPropsWithRef<typeof InputPrimitive>, InputVariants {}

const InputRoot = ({className, fullWidth, variant: variantProp, ...rest}: InputRootProps) => {
  const context = useContext(TextFieldContext);
  // Use variant from context if not explicitly provided
  const variant = variantProp ?? context.variant;

  return (
    <InputPrimitive
      className={composeTwRenderProps(className, inputVariants({fullWidth, variant}))}
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
