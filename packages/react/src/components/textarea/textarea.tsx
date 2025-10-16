"use client";

import type {TextAreaVariants} from "./textarea.styles";
import type {TextAreaProps as TextAreaPrimitiveProps} from "react-aria-components";

import React from "react";
import {TextArea as TextAreaPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";

import {textAreaVariants} from "./textarea.styles";

interface TextAreaProps extends TextAreaPrimitiveProps, TextAreaVariants {
  ref?: React.Ref<HTMLTextAreaElement>;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({className, ...rest}, ref) => {
    return (
      <TextAreaPrimitive
        ref={ref}
        className={composeTwRenderProps(className, textAreaVariants({}))}
        data-slot="textarea"
        {...rest}
      />
    );
  },
);

TextArea.displayName = "HeroUI.Textarea";

export type {TextAreaProps};
export {TextArea};
