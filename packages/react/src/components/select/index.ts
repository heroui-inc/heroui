import type {ComponentProps} from "react";

import {
  SelectClearButton,
  SelectIndicator,
  SelectPopover,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from "./select";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Select = Object.assign(SelectRoot, {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Indicator: SelectIndicator,
  Popover: SelectPopover,
  ClearButton: SelectClearButton,
});

export type Select<T extends object = object> = {
  Props: ComponentProps<typeof SelectRoot<T>>;
  RootProps: ComponentProps<typeof SelectRoot<T>>;
  TriggerProps: ComponentProps<typeof SelectTrigger>;
  ValueProps: ComponentProps<typeof SelectValue>;
  IndicatorProps: ComponentProps<typeof SelectIndicator>;
  PopoverProps: ComponentProps<typeof SelectPopover>;
  ClearButtonProps: ComponentProps<typeof SelectClearButton>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {SelectClearButton, SelectIndicator, SelectPopover, SelectRoot, SelectTrigger, SelectValue};

export type {
  SelectRootProps,
  SelectRootProps as SelectProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectIndicatorProps,
  SelectPopoverProps,
  SelectClearButtonProps,
} from "./select";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {selectVariants} from "@heroui/styles";

export type {SelectVariants} from "@heroui/styles";
