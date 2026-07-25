import type {ComponentProps} from "react";

import {
  ComboBoxInputGroup,
  ComboBoxPopover,
  ComboBoxRoot,
  ComboBoxTrigger,
  ComboBoxValue,
} from "./combo-box";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const ComboBox = Object.assign(ComboBoxRoot, {
  Root: ComboBoxRoot,
  InputGroup: ComboBoxInputGroup,
  Value: ComboBoxValue,
  Trigger: ComboBoxTrigger,
  Popover: ComboBoxPopover,
});

export type ComboBox<T extends object = object, M extends "single" | "multiple" = "single"> = {
  Props: ComponentProps<typeof ComboBoxRoot<T, M>>;
  RootProps: ComponentProps<typeof ComboBoxRoot<T, M>>;
  InputGroupProps: ComponentProps<typeof ComboBoxInputGroup>;
  ValueProps: ComponentProps<typeof ComboBoxValue<T>>;
  TriggerProps: ComponentProps<typeof ComboBoxTrigger>;
  PopoverProps: ComponentProps<typeof ComboBoxPopover>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ComboBoxInputGroup, ComboBoxPopover, ComboBoxRoot, ComboBoxTrigger, ComboBoxValue};

export type {
  ComboBoxRootProps,
  ComboBoxRootProps as ComboBoxProps,
  ComboBoxInputGroupProps,
  ComboBoxValueProps,
  ComboBoxValueRenderProps,
  ComboBoxTriggerProps,
  ComboBoxPopoverProps,
} from "./combo-box";

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/
export {ComboBoxContext} from "./combo-box";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {comboBoxVariants} from "@heroui/styles";

export type {ComboBoxVariants} from "@heroui/styles";
