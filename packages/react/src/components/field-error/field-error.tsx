"use client";

import type {FieldErrorVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {fieldErrorVariants} from "@heroui/styles";
import {FieldError as FieldErrorPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * Field Error Root
 * -----------------------------------------------------------------------------------------------*/
interface FieldErrorRootProps
  extends ComponentPropsWithRef<typeof FieldErrorPrimitive>, FieldErrorVariants {}

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
