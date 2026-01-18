"use client";

import type {InputVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {inputVariants} from "@heroui/styles";
import React from "react";
import {Input as InputPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";

/* -------------------------------------------------------------------------------------------------
 * Input Root
 * -----------------------------------------------------------------------------------------------*/
interface InputRootProps extends ComponentPropsWithRef<typeof InputPrimitive>, InputVariants {}

const InputRoot = ({className, fullWidth, variant, ...rest}: InputRootProps) => {
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
