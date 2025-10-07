"use client";

import type {FieldErrorVariants} from "./field-error.styles";
import type {FieldErrorProps as FieldErrorPrimitiveProps} from "react-aria-components";

import React from "react";
import {FieldError as FieldErrorPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {fieldErrorVariants} from "./field-error.styles";

interface FieldErrorProps extends FieldErrorPrimitiveProps, FieldErrorVariants {
  ref?: React.Ref<HTMLElement>;
}

const FieldError = React.forwardRef<React.ElementRef<typeof FieldErrorPrimitive>, FieldErrorProps>(
  ({children, className, ...rest}, ref) => {
    return (
      <FieldErrorPrimitive
        ref={ref}
        data-visible
        className={composeTwRenderProps(className, fieldErrorVariants())}
        data-slot="field-error"
        {...rest}
      >
        {(renderProps) => (typeof children === "function" ? children(renderProps) : children)}
      </FieldErrorPrimitive>
    );
  },
);

FieldError.displayName = "HeroUI.FieldError";

export type {FieldErrorProps};
export {FieldError};
