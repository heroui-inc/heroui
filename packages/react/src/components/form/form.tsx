"use client";

import type {FormProps as FormPrimitiveProps} from "react-aria-components";

import React from "react";
import {Form as FormPrimitive} from "react-aria-components";

interface FormProps extends FormPrimitiveProps {}

const Form = ({...props}: FormProps) => {
  return <FormPrimitive {...props} />;
};

export type {FormProps};
export {Form};
