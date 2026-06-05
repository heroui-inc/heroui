"use client";

import type {RadioButtonRenderProps} from "react-aria-components/RadioGroup";

import {createContext} from "react";

export interface RadioButtonContextValue {
  buttonState?: RadioButtonRenderProps;
  /** True when rendered inside the root RadioButton (the clickable label). */
  isInsideRadioButton?: boolean;
}

export const RadioButtonContext = createContext<RadioButtonContextValue>({});

export interface RadioFieldContextValue {
  inputId?: string;
}

export const RadioFieldIdContext = createContext<RadioFieldContextValue>({});
