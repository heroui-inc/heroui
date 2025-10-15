"use client";

import type {TextFieldVariants} from "./text-field.styles";
import type {TextFieldProps as TextFieldPrimitiveProps} from "react-aria-components";

import React from "react";
import {TextField as TextFieldPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {textFieldVariants} from "./text-field.styles";

interface TextFieldProps extends TextFieldPrimitiveProps, TextFieldVariants {}

const TextField = React.forwardRef<React.ElementRef<typeof TextFieldPrimitive>, TextFieldProps>(
  ({children, className, ...props}, ref) => {
    const styles = React.useMemo(() => textFieldVariants({}), []);

    return (
      <TextFieldPrimitive
        ref={ref}
        data-slot="text-field"
        {...props}
        className={composeTwRenderProps(className, styles)}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </TextFieldPrimitive>
    );
  },
);

TextField.displayName = "HeroUI.TextField";

export {TextField};
export type {TextFieldProps};
