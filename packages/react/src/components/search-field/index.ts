import type {ComponentProps} from "react";

import {
  SearchFieldClearButton,
  SearchFieldGroup,
  SearchFieldInput,
  SearchFieldRoot,
  SearchFieldSearchIcon,
} from "./search-field";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const SearchField = Object.assign(SearchFieldRoot, {
  Root: SearchFieldRoot,
  Group: SearchFieldGroup,
  Input: SearchFieldInput,
  SearchIcon: SearchFieldSearchIcon,
  ClearButton: SearchFieldClearButton,
});

export type SearchField = {
  Props: ComponentProps<typeof SearchFieldRoot>;
  RootProps: ComponentProps<typeof SearchFieldRoot>;
  GroupProps: ComponentProps<typeof SearchFieldGroup>;
  InputProps: ComponentProps<typeof SearchFieldInput>;
  SearchIconProps: ComponentProps<typeof SearchFieldSearchIcon>;
  ClearButtonProps: ComponentProps<typeof SearchFieldClearButton>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {
  SearchFieldClearButton,
  SearchFieldGroup,
  SearchFieldInput,
  SearchFieldRoot,
  SearchFieldSearchIcon,
};

export type {
  SearchFieldRootProps,
  SearchFieldRootProps as SearchFieldProps,
  SearchFieldGroupProps,
  SearchFieldInputProps,
  SearchFieldSearchIconProps,
  SearchFieldClearButtonProps,
} from "./search-field";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {searchFieldVariants} from "./search-field.styles";

export type {SearchFieldVariants} from "./search-field.styles";
