"use client";

import type {TextAreaVariants} from "./textarea.styles";
import type {TextAreaProps as TextAreaPrimitiveProps} from "react-aria-components";

import {TextArea as TextAreaPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";

import {textAreaVariants} from "./textarea.styles";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
interface TextAreaRootProps extends TextAreaPrimitiveProps, TextAreaVariants {}

const TextAreaRoot = ({className, ...rest}: TextAreaRootProps) => {
  return (
    <TextAreaPrimitive
      className={composeTwRenderProps(className, textAreaVariants({}))}
      data-slot="textarea"
      {...rest}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {TextAreaRoot};

export type {TextAreaRootProps};
