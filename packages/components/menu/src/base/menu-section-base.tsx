import type {MenuSectionSlots, SlotsToClasses} from "@heroui/theme";
import type {SectionProps} from "@heroui/aria-utils";
import type {DividerProps} from "@heroui/divider";
import type {MenuItemProps} from "../menu-item";

import {BaseSection} from "@heroui/aria-utils";

export interface MenuSectionBaseProps<T extends object = {}> extends SectionProps<"ul", T> {
  /**
   * The menu section classNames.
   */
  classNames?: SlotsToClasses<MenuSectionSlots>;
  /**
   * The menu items classNames.
   */
  itemClasses?: MenuItemProps["classNames"];
  /**
   * Shows a divider between sections
   * @default false
   */
  showDivider?: boolean;
  /**
   * Whether to hide the check icon when the items are selected.
   * @default false
   */
  hideSelectedIcon?: boolean;
  /**
   * The divider props
   */
  dividerProps?: DividerProps;
}

const MenuSectionBase = BaseSection as <T extends object>(
  props: MenuSectionBaseProps<T>,
) => JSX.Element;

export default MenuSectionBase;
