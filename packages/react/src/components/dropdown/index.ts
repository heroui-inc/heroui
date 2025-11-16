import type {ComponentProps} from "react";

import {
  DropdownItem,
  DropdownItemIndicator,
  DropdownMenu,
  DropdownPopover,
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
  Popover: DropdownPopover,
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
  PopoverProps: ComponentProps<typeof DropdownPopover>;
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
  DropdownItem,
  DropdownItemIndicator,
  DropdownMenu,
  DropdownPopover,
  DropdownRoot,
  DropdownSection,
  DropdownSubmenuIndicator,
  DropdownSubmenuTrigger,
  DropdownTrigger,
};

export type {
  DropdownItemIndicatorProps,
  DropdownItemProps,
  DropdownMenuProps,
  DropdownPopoverProps,
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
