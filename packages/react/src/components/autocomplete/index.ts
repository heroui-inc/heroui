import type {ComponentProps} from "react";

import {
  AutocompleteFilter,
  AutocompleteIndicator,
  AutocompletePopover,
  AutocompleteRoot,
  AutocompleteTrigger,
  AutocompleteValue,
} from "./autocomplete";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Autocomplete = Object.assign(AutocompleteRoot, {
  Root: AutocompleteRoot,
  Trigger: AutocompleteTrigger,
  Value: AutocompleteValue,
  Indicator: AutocompleteIndicator,
  Popover: AutocompletePopover,
  Filter: AutocompleteFilter,
});

export type Autocomplete<T extends object = object, M extends "single" | "multiple" = "single"> = {
  Props: ComponentProps<typeof AutocompleteRoot<T, M>>;
  RootProps: ComponentProps<typeof AutocompleteRoot<T, M>>;
  TriggerProps: ComponentProps<typeof AutocompleteTrigger>;
  ValueProps: ComponentProps<typeof AutocompleteValue>;
  IndicatorProps: ComponentProps<typeof AutocompleteIndicator>;
  PopoverProps: ComponentProps<typeof AutocompletePopover>;
  FilterProps: ComponentProps<typeof AutocompleteFilter>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {
  AutocompleteFilter,
  AutocompleteTrigger,
  AutocompleteIndicator,
  AutocompletePopover,
  AutocompleteRoot,
  AutocompleteValue,
};

export type {
  AutocompleteRootProps,
  AutocompleteRootProps as AutocompleteProps,
  AutocompleteTriggerProps,
  AutocompleteValueProps,
  AutocompleteIndicatorProps,
  AutocompletePopoverProps,
  AutocompleteFilterProps,
} from "./autocomplete";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {autocompleteVariants} from "./autocomplete.styles";

export type {AutocompleteVariants} from "./autocomplete.styles";
