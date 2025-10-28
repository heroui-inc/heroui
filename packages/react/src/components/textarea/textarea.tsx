"use client";

import type {TextAreaVariants} from "./textarea.styles.js";
import type {TextAreaProps as TextAreaPrimitiveProps} from "react-aria-components";

import {TextArea as TextAreaPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/index.js";

import {textAreaVariants} from "./textarea.styles.js";

interface TextAreaProps extends TextAreaPrimitiveProps, TextAreaVariants {}

const TextArea = ({className, ...rest}: TextAreaProps) => {
  return (
    <TextAreaPrimitive
      className={composeTwRenderProps(className, textAreaVariants({}))}
      data-slot="textarea"
      {...rest}
    />
  );
};

export type {TextAreaProps};
export {TextArea};
