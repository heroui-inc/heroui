"use client";

import type {TextFieldVariants} from "./text-field.styles.js";
import type {TextFieldProps as TextFieldPrimitiveProps} from "react-aria-components";

import React from "react";
import {TextField as TextFieldPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose.js";

import {textFieldVariants} from "./text-field.styles.js";

interface TextFieldProps extends TextFieldPrimitiveProps, TextFieldVariants {}

const TextField = ({children, className, ...props}: TextFieldProps) => {
  const styles = React.useMemo(() => textFieldVariants({}), []);

  return (
    <TextFieldPrimitive
      data-slot="text-field"
      {...props}
      className={composeTwRenderProps(className, styles)}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </TextFieldPrimitive>
  );
};

export {TextField};
export type {TextFieldProps};
