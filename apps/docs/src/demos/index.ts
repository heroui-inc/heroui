/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix */
import type {ComponentType} from "react";

import * as AccordionDemos from "./accordion";
import * as AlertDemos from "./alert";
import * as AvatarDemos from "./avatar";
import * as ButtonDemos from "./button";
import * as CardDemos from "./card";
import * as ChipDemos from "./chip";
import * as CloseButtonDemos from "./close-button";
import * as DescriptionDemos from "./description";
import * as DisclosureDemos from "./disclosure";
import * as DisclosureGroupDemos from "./disclosure-group";
import * as FieldErrorDemos from "./field-error";
import * as FieldsetDemos from "./fieldset";
import * as FormDemos from "./form";
import * as InputDemos from "./input";
import * as KbdDemos from "./kbd";
import * as LabelDemos from "./label";
import * as LinkDemos from "./link";
import * as PopoverDemos from "./popover";
import * as RadioGroupDemos from "./radio-group";
import * as SeparatorDemos from "./separator";
import * as SkeletonDemos from "./skeleton";
import * as SpinnerDemos from "./spinner";
import * as SwitchDemos from "./switch";
import * as TabsDemos from "./tabs";
import * as TextFieldDemos from "./text-field";
import * as TextAreaDemos from "./textarea";
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
  // Card demos
  "card-default": {
    component: CardDemos.Default,
    file: "card/default.tsx",
  },
  "card-horizontal": {
    component: CardDemos.Horizontal,
    file: "card/horizontal.tsx",
  },
  "card-variants": {
    component: CardDemos.Variants,
    file: "card/variants.tsx",
  },
  "card-with-avatar": {
    component: CardDemos.WithAvatar,
    file: "card/with-avatar.tsx",
  },
  "card-with-form": {
    component: CardDemos.WithForm,
    file: "card/with-form.tsx",
  },
  "card-with-image": {
    component: CardDemos.WithImage,
    file: "card/with-image.tsx",
  },
  "card-with-background-image": {
    component: CardDemos.WithBackgroundImage,
    file: "card/with-background-image.tsx",
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
  // CloseButton demos
  "close-button-default": {
    component: CloseButtonDemos.Default,
    file: "close-button/default.tsx",
  },
  "close-button-with-custom-icon": {
    component: CloseButtonDemos.WithCustomIcon,
    file: "close-button/with-custom-icon.tsx",
  },
  "close-button-interactive": {
    component: CloseButtonDemos.Interactive,
    file: "close-button/interactive.tsx",
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
  // Form demos
  "form-basic": {
    component: FormDemos.Basic,
    file: "form/basic.tsx",
  },
  // Fieldset demos
  "fieldset-basic": {
    component: FieldsetDemos.Basic,
    file: "fieldset/basic.tsx",
  },
  // Input demos
  "input-basic": {
    component: InputDemos.Basic,
    file: "input/basic.tsx",
  },
  "input-types": {
    component: InputDemos.Types,
    file: "input/types.tsx",
  },
  "input-controlled": {
    component: InputDemos.Controlled,
    file: "input/controlled.tsx",
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
  "link-custom-icon": {
    component: LinkDemos.CustomIcon,
    file: "link/custom-icon.tsx",
  },
  "link-icon-placement": {
    component: LinkDemos.IconPlacement,
    file: "link/icon-placement.tsx",
  },
  // RadioGroup demos
  "radio-group-basic": {
    component: RadioGroupDemos.Basic,
    file: "radio-group/basic.tsx",
  },
  "radio-group-controlled": {
    component: RadioGroupDemos.Controlled,
    file: "radio-group/controlled.tsx",
  },
  "radio-group-custom-indicator": {
    component: RadioGroupDemos.CustomIndicator,
    file: "radio-group/custom-indicator.tsx",
  },
  "radio-group-delivery-and-payment": {
    component: RadioGroupDemos.DeliveryAndPayment,
    file: "radio-group/delivery-and-payment.tsx",
  },
  "radio-group-disabled": {
    component: RadioGroupDemos.Disabled,
    file: "radio-group/disabled.tsx",
  },
  "radio-group-horizontal": {
    component: RadioGroupDemos.Horizontal,
    file: "radio-group/horizontal.tsx",
  },
  "radio-group-uncontrolled": {
    component: RadioGroupDemos.Uncontrolled,
    file: "radio-group/uncontrolled.tsx",
  },
  "radio-group-validation": {
    component: RadioGroupDemos.Validation,
    file: "radio-group/validation.tsx",
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
  // Switch demos
  "switch-basic": {
    component: SwitchDemos.Basic,
    file: "switch/basic.tsx",
  },
  "switch-disabled": {
    component: SwitchDemos.Disabled,
    file: "switch/disabled.tsx",
  },
  "switch-default-selected": {
    component: SwitchDemos.DefaultSelected,
    file: "switch/default-selected.tsx",
  },
  "switch-controlled": {
    component: SwitchDemos.Controlled,
    file: "switch/controlled.tsx",
  },
  "switch-without-label": {
    component: SwitchDemos.WithoutLabel,
    file: "switch/without-label.tsx",
  },
  "switch-sizes": {
    component: SwitchDemos.Sizes,
    file: "switch/sizes.tsx",
  },
  "switch-label-position": {
    component: SwitchDemos.LabelPosition,
    file: "switch/label-position.tsx",
  },
  "switch-with-icons": {
    component: SwitchDemos.WithIcons,
    file: "switch/with-icons.tsx",
  },
  "switch-with-description": {
    component: SwitchDemos.WithDescription,
    file: "switch/with-description.tsx",
  },
  "switch-group": {
    component: SwitchDemos.Group,
    file: "switch/group.tsx",
  },
  "switch-group-horizontal": {
    component: SwitchDemos.GroupHorizontal,
    file: "switch/group-horizontal.tsx",
  },
  "switch-render-props": {
    component: SwitchDemos.RenderProps,
    file: "switch/render-props.tsx",
  },
  "switch-form": {
    component: SwitchDemos.Form,
    file: "switch/form.tsx",
  },
  "switch-custom-styles": {
    component: SwitchDemos.CustomStyles,
    file: "switch/custom-styles.tsx",
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
  // TextArea demos
  "textarea-basic": {
    component: TextAreaDemos.Basic,
    file: "textarea/basic.tsx",
  },
  "textarea-rows": {
    component: TextAreaDemos.Rows,
    file: "textarea/rows.tsx",
  },
  "textarea-controlled": {
    component: TextAreaDemos.Controlled,
    file: "textarea/controlled.tsx",
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
  "text-field-controlled": {
    component: TextFieldDemos.Controlled,
    file: "text-field/controlled.tsx",
  },
  "text-field-validation": {
    component: TextFieldDemos.Validation,
    file: "text-field/validation.tsx",
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
  // Label demos
  "label-basic": {
    component: LabelDemos.Basic,
    file: "label/basic.tsx",
  },
  // Description demos
  "description-basic": {
    component: DescriptionDemos.Basic,
    file: "description/basic.tsx",
  },
  // FieldError demos
  "field-error-basic": {
    component: FieldErrorDemos.Basic,
    file: "field-error/basic.tsx",
  },
};

export function getDemo(name: string): DemoItem | undefined {
  return demos[name];
}
