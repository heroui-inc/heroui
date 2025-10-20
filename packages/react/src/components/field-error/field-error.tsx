"use client";

import type {FieldErrorVariants} from "./field-error.styles";
import type {FieldErrorProps as FieldErrorPrimitiveProps} from "react-aria-components";

import {FieldError as FieldErrorPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {fieldErrorVariants} from "./field-error.styles";

interface FieldErrorProps extends FieldErrorPrimitiveProps, FieldErrorVariants {
  ref?: React.Ref<HTMLElement>;
}
const FieldError = ({children, className, ...rest}: FieldErrorProps) => {
  return (
    <FieldErrorPrimitive
      data-visible
      className={composeTwRenderProps(className, fieldErrorVariants())}
      data-slot="field-error"
      {...rest}
    >
      {(renderProps) => (typeof children === "function" ? children(renderProps) : children)}
    </FieldErrorPrimitive>
  );
};

export type {FieldErrorProps};
export {FieldError};
