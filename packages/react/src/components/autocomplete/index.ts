import {
  AutocompleteFilter,
  AutocompleteGroup,
  AutocompleteIndicator,
  AutocompletePopover,
  AutocompleteRoot,
  AutocompleteValue,
} from "./autocomplete";

const CompoundAutocomplete = Object.assign(AutocompleteRoot, {
  Root: AutocompleteRoot,
  Group: AutocompleteGroup,
  Value: AutocompleteValue,
  Indicator: AutocompleteIndicator,
  Popover: AutocompletePopover,
  Filter: AutocompleteFilter,
});

export type {
  AutocompleteRootProps,
  AutocompleteGroupProps,
  AutocompleteValueProps,
  AutocompleteIndicatorProps,
  AutocompletePopoverProps,
  AutocompleteFilterProps,
} from "./autocomplete";

export type {AutocompleteVariants} from "./autocomplete.styles";

export {autocompleteVariants} from "./autocomplete.styles";

export default CompoundAutocomplete;
