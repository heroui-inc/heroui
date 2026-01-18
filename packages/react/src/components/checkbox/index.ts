import type {ComponentProps} from "react";

import {CheckboxContent, CheckboxControl, CheckboxIndicator, CheckboxRoot} from "./checkbox";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Checkbox = Object.assign(CheckboxRoot, {
  Root: CheckboxRoot,
  Control: CheckboxControl,
  Indicator: CheckboxIndicator,
  Content: CheckboxContent,
});

export type Checkbox = {
  Props: ComponentProps<typeof CheckboxRoot>;
  RootProps: ComponentProps<typeof CheckboxRoot>;
  ControlProps: ComponentProps<typeof CheckboxControl>;
  IndicatorProps: ComponentProps<typeof CheckboxIndicator>;
  ContentProps: ComponentProps<typeof CheckboxContent>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {CheckboxContent, CheckboxControl, CheckboxIndicator, CheckboxRoot};

export type {
  CheckboxRootProps,
  CheckboxRootProps as CheckboxProps,
  CheckboxControlProps,
  CheckboxIndicatorProps,
  CheckboxContentProps,
} from "./checkbox";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {checkboxVariants} from "@heroui/styles";

export type {CheckboxVariants} from "@heroui/styles";
