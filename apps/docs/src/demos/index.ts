import type {ComponentType} from "react";

// Accordion demos
import * as AccordionDemos from "./accordion";
// Avatar demos
import * as AvatarDemos from "./avatar";
// Button demos
import * as ButtonDemos from "./button";
// Chip demos
import * as ChipDemos from "./chip";
// Link demos
import * as LinkDemos from "./link";
// Spinner demos
import * as SpinnerDemos from "./spinner";
// Tooltip demos
import * as TooltipDemos from "./tooltip";
// Popover demos
import * as PopoverDemos from "./popover";

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
  "accordion-variants": {
    component: AccordionDemos.Variants,
    file: "accordion/variants.tsx",
  },
  "accordion-with-icons": {
    component: AccordionDemos.WithIcons,
    file: "accordion/with-icons.tsx",
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
  // Link demos
  "link-basic": {
    component: LinkDemos.Basic,
    file: "link/basic.tsx",
  },
  "link-with-icon": {
    component: LinkDemos.WithIcon,
    file: "link/with-icon.tsx",
  },
  "link-styled": {
    component: LinkDemos.Styled,
    file: "link/styled.tsx",
  },
  "link-navigation": {
    component: LinkDemos.Navigation,
    file: "link/navigation.tsx",
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
  "spinner-usage": {
    component: SpinnerDemos.Usage,
    file: "spinner/usage.tsx",
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
  "popover-custom-trigger": {
    component: PopoverDemos.CustomTrigger,
    file: "popover/custom-trigger.tsx",
  },
  "popover-interactive": {
    component: PopoverDemos.Interactive,
    file: "popover/interactive.tsx",
  },
};

export function getDemo(name: string): DemoItem | undefined {
  return demos[name];
}
