"use client";

import type {FormProps as FormPrimitiveProps} from "react-aria-components";

import React from "react";
import {Form as FormPrimitive} from "react-aria-components";

interface FormProps extends FormPrimitiveProps {
  ref?: React.Ref<HTMLFormElement>;
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(({...props}, ref) => {
  return <FormPrimitive ref={ref} {...props} />;
});

Form.displayName = "HeroUI.Form";

export type {FormProps};
export {Form};
