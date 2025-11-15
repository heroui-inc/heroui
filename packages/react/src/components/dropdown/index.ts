import type {ComponentProps} from "react";

import {
  DropdownContent,
  DropdownItem,
  DropdownItemIndicator,
  DropdownMenu,
  DropdownRoot,
  DropdownSection,
  DropdownSubmenuIndicator,
  DropdownSubmenuTrigger,
  DropdownTrigger,
} from "./dropdown";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Dropdown = Object.assign(DropdownRoot, {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Menu: DropdownMenu,
  Section: DropdownSection,
  Item: DropdownItem,
  ItemIndicator: DropdownItemIndicator,
  SubmenuIndicator: DropdownSubmenuIndicator,
  SubmenuTrigger: DropdownSubmenuTrigger,
});

export type Dropdown<T extends object = object> = {
  Props: ComponentProps<typeof DropdownRoot>;
  RootProps: ComponentProps<typeof DropdownRoot>;
  TriggerProps: ComponentProps<typeof DropdownTrigger>;
  ContentProps: ComponentProps<typeof DropdownContent>;
  MenuProps: ComponentProps<typeof DropdownMenu<T>>;
  SectionProps: ComponentProps<typeof DropdownSection>;
  ItemProps: ComponentProps<typeof DropdownItem>;
  ItemIndicatorProps: ComponentProps<typeof DropdownItemIndicator>;
  SubmenuIndicatorProps: ComponentProps<typeof DropdownSubmenuIndicator>;
  SubmenuTriggerProps: ComponentProps<typeof DropdownSubmenuTrigger>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {
  DropdownContent,
  DropdownItem,
  DropdownItemIndicator,
  DropdownMenu,
  DropdownRoot,
  DropdownSection,
  DropdownSubmenuIndicator,
  DropdownSubmenuTrigger,
  DropdownTrigger,
};

export type {
  DropdownContentProps,
  DropdownItemIndicatorProps,
  DropdownItemProps,
  DropdownMenuProps,
  DropdownRootProps,
  DropdownRootProps as DropdownProps,
  DropdownSectionProps,
  DropdownSubmenuIndicatorProps,
  DropdownSubmenuTriggerProps,
  DropdownTriggerProps,
} from "./dropdown";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {dropdownVariants} from "./dropdown.styles";

export type {DropdownVariants} from "./dropdown.styles";
