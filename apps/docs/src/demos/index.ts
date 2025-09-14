/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix */
import type {ComponentType} from "react";

import * as AccordionDemos from "./accordion";
import * as AlertDemos from "./alert";
import * as AvatarDemos from "./avatar";
import * as ButtonDemos from "./button";
import * as CheckboxDemos from "./checkbox";
import * as ChipDemos from "./chip";
import * as DisclosureDemos from "./disclosure";
import * as DisclosureGroupDemos from "./disclosure-group";
import * as KbdDemos from "./kbd";
import * as LinkDemos from "./link";
import * as PopoverDemos from "./popover";
import * as SeparatorDemos from "./separator";
import * as SkeletonDemos from "./skeleton";
import * as SpinnerDemos from "./spinner";
import * as TabsDemos from "./tabs";
import * as TextFieldDemos from "./text-field";
import * as TooltipDemos from "./tooltip";

export interface DemoItem {
  component: ComponentType;
  file: string;
}

// Registry mapping demo names to their components
export const demos: Record<string, DemoItem> = {
  // Accordion demos
  "accordion-basic": {
    component: AccordionDemos.Basic,
    file: "accordion/basic.tsx",
  },
  "accordion-outline": {
    component: AccordionDemos.Oultine,
    file: "accordion/outline.tsx",
  },
  "accordion-multiple": {
    component: AccordionDemos.Multiple,
    file: "accordion/multiple.tsx",
  },
  "accordion-disabled": {
    component: AccordionDemos.Disabled,
    file: "accordion/disabled.tsx",
  },
  "accordion-custom-indicator": {
    component: AccordionDemos.CustomIndicator,
    file: "accordion/custom-indicator.tsx",
  },
  "accordion-faq": {
    component: AccordionDemos.FAQ,
    file: "accordion/faq.tsx",
  },
  "accordion-custom-styles": {
    component: AccordionDemos.CustomStyles,
    file: "accordion/custom-styles.tsx",
  },
  // Alert demos
  "alert-basic": {
    component: AlertDemos.Basic,
    file: "alert/basic.tsx",
  },
  "alert-variants": {
    component: AlertDemos.Variants,
    file: "alert/variants.tsx",
  },
  "alert-with-action": {
    component: AlertDemos.WithAction,
    file: "alert/with-action.tsx",
  },
  "alert-dismissible": {
    component: AlertDemos.Dismissible,
    file: "alert/dismissible.tsx",
  },
  "alert-custom-icon": {
    component: AlertDemos.CustomIcon,
    file: "alert/custom-icon.tsx",
  },
  // Avatar demos
  "avatar-basic": {
    component: AvatarDemos.Basic,
    file: "avatar/basic.tsx",
  },
  "avatar-sizes": {
    component: AvatarDemos.Sizes,
    file: "avatar/sizes.tsx",
  },
  "avatar-colors": {
    component: AvatarDemos.Colors,
    file: "avatar/colors.tsx",
  },
  "avatar-fallback": {
    component: AvatarDemos.Fallback,
    file: "avatar/fallback.tsx",
  },
  "avatar-group": {
    component: AvatarDemos.Group,
    file: "avatar/group.tsx",
  },
  "avatar-custom-styles": {
    component: AvatarDemos.CustomStyles,
    file: "avatar/custom-styles.tsx",
  },
  // Button demos
  "button-basic": {
    component: ButtonDemos.Basic,
    file: "button/basic.tsx",
  },
  "button-custom-variants": {
    component: ButtonDemos.CustomVariants,
    file: "button/custom-variants.tsx",
  },
  "button-disabled": {
    component: ButtonDemos.Disabled,
    file: "button/disabled.tsx",
  },
  "button-icon-only": {
    component: ButtonDemos.IconOnly,
    file: "button/icon-only.tsx",
  },
  "button-loading": {
    component: ButtonDemos.Loading,
    file: "button/loading.tsx",
  },
  "button-loading-state": {
    component: ButtonDemos.LoadingState,
    file: "button/loading-state.tsx",
  },
  "button-sizes": {
    component: ButtonDemos.Sizes,
    file: "button/sizes.tsx",
  },
  "button-social": {
    component: ButtonDemos.Social,
    file: "button/social.tsx",
  },
  "button-variants": {
    component: ButtonDemos.Variants,
    file: "button/variants.tsx",
  },
  "button-with-icons": {
    component: ButtonDemos.WithIcons,
    file: "button/with-icons.tsx",
  },
  // Checkbox demos
  "checkbox-basic": {
    component: CheckboxDemos.Basic,
    file: "checkbox/basic.tsx",
  },
  "checkbox-with-description": {
    component: CheckboxDemos.WithDescription,
    file: "checkbox/with-description.tsx",
  },
  "checkbox-indeterminate": {
    component: CheckboxDemos.Indeterminate,
    file: "checkbox/indeterminate.tsx",
  },
  "checkbox-states": {
    component: CheckboxDemos.States,
    file: "checkbox/states.tsx",
  },
  "checkbox-controlled": {
    component: CheckboxDemos.Controlled,
    file: "checkbox/controlled.tsx",
  },
  "checkbox-group": {
    component: CheckboxDemos.Group,
    file: "checkbox/group.tsx",
  },
  // Chip demos
  "chip-basic": {
    component: ChipDemos.Basic,
    file: "chip/basic.tsx",
  },
  "chip-variants": {
    component: ChipDemos.Variants,
    file: "chip/variants.tsx",
  },
  "chip-with-icon": {
    component: ChipDemos.WithIcon,
    file: "chip/with-icon.tsx",
  },
  "chip-statuses": {
    component: ChipDemos.Statuses,
    file: "chip/statuses.tsx",
  },
  // Disclosure demos
  "disclosure-basic": {
    component: DisclosureDemos.Basic,
    file: "disclosure/basic.tsx",
  },
  // DisclosureGroup demos
  "disclosure-group-basic": {
    component: DisclosureGroupDemos.Basic,
    file: "disclosure-group/basic.tsx",
  },
  "disclosure-group-controlled": {
    component: DisclosureGroupDemos.Controlled,
    file: "disclosure-group/controlled.tsx",
  },
  // Kbd demos
  "kbd-basic": {
    component: KbdDemos.Basic,
    file: "kbd/basic.tsx",
  },
  "kbd-navigation-keys": {
    component: KbdDemos.NavigationKeys,
    file: "kbd/navigation.tsx",
  },
  "kbd-inline-usage": {
    component: KbdDemos.InlineUsage,
    file: "kbd/inline.tsx",
  },
  "kbd-instructional-text": {
    component: KbdDemos.InstructionalText,
    file: "kbd/instructional.tsx",
  },
  "kbd-special-keys": {
    component: KbdDemos.SpecialKeys,
    file: "kbd/special.tsx",
  },
  // Link demos
  "link-basic": {
    component: LinkDemos.Basic,
    file: "link/basic.tsx",
  },
  "link-with-icon": {
    component: LinkDemos.WithIcon,
    file: "link/with-icon.tsx",
  },
  // Skeleton demos
  "skeleton-basic": {
    component: SkeletonDemos.Basic,
    file: "skeleton/basic.tsx",
  },
  "skeleton-text-content": {
    component: SkeletonDemos.TextContent,
    file: "skeleton/text-content.tsx",
  },
  "skeleton-user-profile": {
    component: SkeletonDemos.UserProfile,
    file: "skeleton/user-profile.tsx",
  },
  "skeleton-list": {
    component: SkeletonDemos.List,
    file: "skeleton/list.tsx",
  },
  "skeleton-animation-types": {
    component: SkeletonDemos.AnimationTypes,
    file: "skeleton/animation-types.tsx",
  },
  // Separator demos
  "separator-basic": {
    component: SeparatorDemos.Basic,
    file: "separator/basic.tsx",
  },
  "separator-vertical": {
    component: SeparatorDemos.Vertical,
    file: "separator/vertical.tsx",
  },
  "separator-with-content": {
    component: SeparatorDemos.WithContent,
    file: "separator/with-content.tsx",
  },
  // Spinner demos
  "spinner-basic": {
    component: SpinnerDemos.Basic,
    file: "spinner/basic.tsx",
  },
  "spinner-colors": {
    component: SpinnerDemos.Colors,
    file: "spinner/colors.tsx",
  },
  "spinner-sizes": {
    component: SpinnerDemos.Sizes,
    file: "spinner/sizes.tsx",
  },
  // Tabs demos
  "tabs-basic": {
    component: TabsDemos.Basic,
    file: "tabs/basic.tsx",
  },
  "tabs-vertical": {
    component: TabsDemos.Vertical,
    file: "tabs/vertical.tsx",
  },
  "tabs-disabled": {
    component: TabsDemos.Disabled,
    file: "tabs/disabled.tsx",
  },
  "tabs-custom-styles": {
    component: TabsDemos.CustomStyles,
    file: "tabs/custom-styles.tsx",
  },
  // TextField demos
  "text-field-basic": {
    component: TextFieldDemos.Basic,
    file: "text-field/basic.tsx",
  },
  "text-field-with-description": {
    component: TextFieldDemos.WithDescription,
    file: "text-field/with-description.tsx",
  },
  "text-field-required": {
    component: TextFieldDemos.Required,
    file: "text-field/required.tsx",
  },
  "text-field-with-error": {
    component: TextFieldDemos.WithError,
    file: "text-field/with-error.tsx",
  },
  "text-field-disabled": {
    component: TextFieldDemos.Disabled,
    file: "text-field/disabled.tsx",
  },
  "text-field-textarea": {
    component: TextFieldDemos.TextArea,
    file: "text-field/textarea.tsx",
  },
  "text-field-input-types": {
    component: TextFieldDemos.InputTypes,
    file: "text-field/input-types.tsx",
  },
  // Tooltip demos
  "tooltip-basic": {
    component: TooltipDemos.Basic,
    file: "tooltip/basic.tsx",
  },
  "tooltip-with-arrow": {
    component: TooltipDemos.WithArrow,
    file: "tooltip/with-arrow.tsx",
  },
  "tooltip-placement": {
    component: TooltipDemos.Placement,
    file: "tooltip/placement.tsx",
  },
  "tooltip-custom-trigger": {
    component: TooltipDemos.CustomTrigger,
    file: "tooltip/custom-trigger.tsx",
  },
  // Popover demos
  "popover-basic": {
    component: PopoverDemos.Basic,
    file: "popover/basic.tsx",
  },
  "popover-with-arrow": {
    component: PopoverDemos.WithArrow,
    file: "popover/with-arrow.tsx",
  },
  "popover-placement": {
    component: PopoverDemos.Placement,
    file: "popover/placement.tsx",
  },
  "popover-interactive": {
    component: PopoverDemos.Interactive,
    file: "popover/interactive.tsx",
  },
};

export function getDemo(name: string): DemoItem | undefined {
  return demos[name];
}
