import type {ListboxItemProps, ListboxSectionProps} from "@vezham/listbox";
import type {MenuTriggerAction as BaseMenuTriggerAction} from "@react-types/combobox";

import {ListboxItem, ListboxSection} from "@vezham/listbox";

import Autocomplete from "./autocomplete";

// export types
export type {AutocompleteProps} from "./autocomplete";
export type {ListboxItemProps as AutocompleteItemProps};
export type {ListboxSectionProps as AutocompleteSectionProps};
export type MenuTriggerAction = BaseMenuTriggerAction | undefined;

// export hooks
export {useAutocomplete} from "./use-autocomplete";

// export components
export {Autocomplete, ListboxItem as AutocompleteItem, ListboxSection as AutocompleteSection};
