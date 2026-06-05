"use client";

import type {CheckboxButtonRenderProps} from "react-aria-components/Checkbox";

import {createContext} from "react";

export interface CheckboxButtonContextValue {
  buttonState?: CheckboxButtonRenderProps;
  /** True when rendered inside a CheckboxButton (the clickable label). */
  isInsideCheckboxButton?: boolean;
}

export const CheckboxButtonContext = createContext<CheckboxButtonContextValue>({});

export interface CheckboxFieldContextValue {
  inputId?: string;
}

export const CheckboxFieldIdContext = createContext<CheckboxFieldContextValue>({});
