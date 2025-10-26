"use client";

import type {FormProps as FormPrimitiveProps} from "react-aria-components";

import React from "react";
import {Form as FormPrimitive} from "react-aria-components";

/* -------------------------------------------------------------------------------------------------
 * Form Root
 * -----------------------------------------------------------------------------------------------*/
interface FormRootProps extends FormPrimitiveProps {}

const FormRoot = ({...props}: FormRootProps) => {
  return <FormPrimitive {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {FormRoot};

export type {FormRootProps};
