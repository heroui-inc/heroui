import type {ComponentProps} from "react";

import {SelectContent, SelectIndicator, SelectRoot, SelectTrigger, SelectValue} from "./select";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Select = Object.assign(SelectRoot, {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Indicator: SelectIndicator,
  Content: SelectContent,
});

export type Select<T extends object = object> = {
  Props: ComponentProps<typeof SelectRoot<T>>;
  RootProps: ComponentProps<typeof SelectRoot<T>>;
  TriggerProps: ComponentProps<typeof SelectTrigger>;
  ValueProps: ComponentProps<typeof SelectValue>;
  IndicatorProps: ComponentProps<typeof SelectIndicator>;
  ContentProps: ComponentProps<typeof SelectContent>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {SelectIndicator, SelectRoot, SelectTrigger, SelectValue};

export type {
  SelectRootProps,
  SelectRootProps as SelectProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectIndicatorProps,
  SelectContentProps,
} from "./select";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {selectVariants} from "./select.styles";

export type {SelectVariants} from "./select.styles";
