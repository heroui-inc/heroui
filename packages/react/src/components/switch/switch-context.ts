"use client";

import type {SwitchButtonRenderProps} from "react-aria-components/Switch";

import {createContext} from "react";

export interface SwitchButtonContextValue {
  buttonState?: SwitchButtonRenderProps;
}

export const SwitchButtonContext = createContext<SwitchButtonContextValue>({});

export interface SwitchFieldContextValue {
  inputId?: string;
}

export const SwitchFieldIdContext = createContext<SwitchFieldContextValue>({});
