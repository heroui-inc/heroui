"use client";

import type {FieldErrorVariants} from "./field-error.styles";
import type {ComponentPropsWithRef} from "react";

import {FieldError as FieldErrorPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {fieldErrorVariants} from "./field-error.styles";

/* -------------------------------------------------------------------------------------------------
 * Field Error Root
 * -----------------------------------------------------------------------------------------------*/
interface FieldErrorRootProps
  extends ComponentPropsWithRef<typeof FieldErrorPrimitive>,
    FieldErrorVariants {}

const FieldErrorRoot = ({children, className, ...rest}: FieldErrorRootProps) => {
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

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {FieldErrorRoot};

export type {FieldErrorRootProps};
