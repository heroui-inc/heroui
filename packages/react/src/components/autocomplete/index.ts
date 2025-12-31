import type {ComponentProps} from "react";

import {
  AutocompleteFilter,
  AutocompleteGroup,
  AutocompleteIndicator,
  AutocompletePopover,
  AutocompleteRoot,
  AutocompleteValue,
} from "./autocomplete";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Autocomplete = Object.assign(AutocompleteRoot, {
  Root: AutocompleteRoot,
  Group: AutocompleteGroup,
  Value: AutocompleteValue,
  Indicator: AutocompleteIndicator,
  Popover: AutocompletePopover,
  Filter: AutocompleteFilter,
});

export type Autocomplete<T extends object = object, M extends "single" | "multiple" = "single"> = {
  Props: ComponentProps<typeof AutocompleteRoot<T, M>>;
  RootProps: ComponentProps<typeof AutocompleteRoot<T, M>>;
  GroupProps: ComponentProps<typeof AutocompleteGroup>;
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
  AutocompleteGroup,
  AutocompleteIndicator,
  AutocompletePopover,
  AutocompleteRoot,
  AutocompleteValue,
};

export type {
  AutocompleteRootProps,
  AutocompleteRootProps as AutocompleteProps,
  AutocompleteGroupProps,
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
