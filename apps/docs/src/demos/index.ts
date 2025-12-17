/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix */
import type {ComponentType} from "react";

import * as AccordionDemos from "./accordion";
import * as AlertDemos from "./alert";
import * as AlertDialogDemos from "./alert-dialog";
import * as AvatarDemos from "./avatar";
import * as ButtonDemos from "./button";
import * as CardDemos from "./card";
import * as CheckboxDemos from "./checkbox";
import * as CheckboxGroupDemos from "./checkbox-group";
import * as ChipDemos from "./chip";
import * as CloseButtonDemos from "./close-button";
import * as ComboBoxDemos from "./combobox";
import * as DateFieldDemos from "./date-field";
import * as DescriptionDemos from "./description";
import * as DisclosureDemos from "./disclosure";
import * as DisclosureGroupDemos from "./disclosure-group";
import * as DropdownDemos from "./dropdown";
import * as ErrorMessageDemos from "./error-message";
import * as FieldErrorDemos from "./field-error";
import * as FieldsetDemos from "./fieldset";
import * as FormDemos from "./form";
import * as InputDemos from "./input";
import * as InputGroupDemos from "./input-group";
import * as InputOTPDemos from "./input-otp";
import * as KbdDemos from "./kbd";
import * as LabelDemos from "./label";
import * as LinkDemos from "./link";
import * as ListBoxDemos from "./listbox";
import * as ModalDemos from "./modal";
import * as NumberFieldDemos from "./number-field";
import * as PopoverDemos from "./popover";
import * as RadioGroupDemos from "./radio-group";
import * as ScrollShadowDemos from "./scroll-shadow";
import * as SearchFieldDemos from "./search-field";
import * as SelectDemos from "./select";
import * as SeparatorDemos from "./separator";
import * as SkeletonDemos from "./skeleton";
import * as SliderDemos from "./slider";
import * as SpinnerDemos from "./spinner";
import * as SurfaceDemos from "./surface";
import * as SwitchDemos from "./switch";
import * as TabsDemos from "./tabs";
import * as TagGroupDemos from "./tag-group";
import * as TextFieldDemos from "./text-field";
import * as TextAreaDemos from "./textarea";
import * as TimeFieldDemos from "./time-field";
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
  "accordion-surface": {
    component: AccordionDemos.Surface,
    file: "accordion/surface.tsx",
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
  // AlertDialog demos
  "alert-dialog-default": {
    component: AlertDialogDemos.Default,
    file: "alert-dialog/default.tsx",
  },
  "alert-dialog-statuses": {
    component: AlertDialogDemos.Statuses,
    file: "alert-dialog/statuses.tsx",
  },
  "alert-dialog-placements": {
    component: AlertDialogDemos.Placements,
    file: "alert-dialog/placements.tsx",
  },
  "alert-dialog-backdrop-variants": {
    component: AlertDialogDemos.BackdropVariants,
    file: "alert-dialog/backdrop-variants.tsx",
  },
  "alert-dialog-controlled": {
    component: AlertDialogDemos.Controlled,
    file: "alert-dialog/controlled.tsx",
  },
  "alert-dialog-dismiss-behavior": {
    component: AlertDialogDemos.DismissBehavior,
    file: "alert-dialog/dismiss-behavior.tsx",
  },
  "alert-dialog-custom-icon": {
    component: AlertDialogDemos.CustomIcon,
    file: "alert-dialog/custom-icon.tsx",
  },
  "alert-dialog-custom-backdrop": {
    component: AlertDialogDemos.CustomBackdrop,
    file: "alert-dialog/custom-backdrop.tsx",
  },
  "alert-dialog-custom-trigger": {
    component: AlertDialogDemos.CustomTrigger,
    file: "alert-dialog/custom-trigger.tsx",
  },
  "alert-dialog-with-close-button": {
    component: AlertDialogDemos.WithCloseButton,
    file: "alert-dialog/with-close-button.tsx",
  },
  "alert-dialog-custom-animations": {
    component: AlertDialogDemos.CustomAnimations,
    file: "alert-dialog/custom-animations.tsx",
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
  "avatar-variants": {
    component: AvatarDemos.Variants,
    file: "avatar/variants.tsx",
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
  "card-with-images": {
    component: CardDemos.WithImages,
    file: "card/with-images.tsx",
  },
  // Checkbox demos
  "checkbox-basic": {
    component: CheckboxDemos.Basic,
    file: "checkbox/basic.tsx",
  },
  "checkbox-disabled": {
    component: CheckboxDemos.Disabled,
    file: "checkbox/disabled.tsx",
  },
  "checkbox-default-selected": {
    component: CheckboxDemos.DefaultSelected,
    file: "checkbox/default-selected.tsx",
  },
  "checkbox-controlled": {
    component: CheckboxDemos.Controlled,
    file: "checkbox/controlled.tsx",
  },
  "checkbox-indeterminate": {
    component: CheckboxDemos.Indeterminate,
    file: "checkbox/indeterminate.tsx",
  },
  "checkbox-with-label": {
    component: CheckboxDemos.WithLabel,
    file: "checkbox/with-label.tsx",
  },
  "checkbox-with-description": {
    component: CheckboxDemos.WithDescription,
    file: "checkbox/with-description.tsx",
  },
  "checkbox-render-props": {
    component: CheckboxDemos.RenderProps,
    file: "checkbox/render-props.tsx",
  },
  "checkbox-form": {
    component: CheckboxDemos.Form,
    file: "checkbox/form.tsx",
  },
  "checkbox-custom-styles": {
    component: CheckboxDemos.CustomStyles,
    file: "checkbox/custom-styles.tsx",
  },
  "checkbox-invalid": {
    component: CheckboxDemos.Invalid,
    file: "checkbox/invalid.tsx",
  },
  "checkbox-custom-indicator": {
    component: CheckboxDemos.CustomIndicator,
    file: "checkbox/custom-indicator.tsx",
  },
  "checkbox-full-rounded": {
    component: CheckboxDemos.FullRounded,
    file: "checkbox/full-rounded.tsx",
  },
  // CheckboxGroup demos
  "checkbox-group-basic": {
    component: CheckboxGroupDemos.Basic,
    file: "checkbox-group/basic.tsx",
  },
  "checkbox-group-on-surface": {
    component: CheckboxGroupDemos.OnSurface,
    file: "checkbox-group/on-surface.tsx",
  },
  "checkbox-group-with-custom-indicator": {
    component: CheckboxGroupDemos.WithCustomIndicator,
    file: "checkbox-group/with-custom-indicator.tsx",
  },
  "checkbox-group-indeterminate": {
    component: CheckboxGroupDemos.Indeterminate,
    file: "checkbox-group/indeterminate.tsx",
  },
  "checkbox-group-validation": {
    component: CheckboxGroupDemos.Validation,
    file: "checkbox-group/validation.tsx",
  },
  "checkbox-group-controlled": {
    component: CheckboxGroupDemos.Controlled,
    file: "checkbox-group/controlled.tsx",
  },
  "checkbox-group-disabled": {
    component: CheckboxGroupDemos.Disabled,
    file: "checkbox-group/disabled.tsx",
  },
  "checkbox-group-features-and-addons": {
    component: CheckboxGroupDemos.FeaturesAndAddOns,
    file: "checkbox-group/features-and-addons.tsx",
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
  // ComboBox demos
  "combobox-default": {
    component: ComboBoxDemos.Default,
    file: "combobox/default.tsx",
  },
  "combobox-default-selected-key": {
    component: ComboBoxDemos.DefaultSelectedKey,
    file: "combobox/default-selected-key.tsx",
  },
  "combobox-with-description": {
    component: ComboBoxDemos.WithDescription,
    file: "combobox/with-description.tsx",
  },
  "combobox-with-sections": {
    component: ComboBoxDemos.WithSections,
    file: "combobox/with-sections.tsx",
  },
  "combobox-with-disabled-options": {
    component: ComboBoxDemos.WithDisabledOptions,
    file: "combobox/with-disabled-options.tsx",
  },
  "combobox-custom-indicator": {
    component: ComboBoxDemos.CustomIndicator,
    file: "combobox/custom-indicator.tsx",
  },
  "combobox-required": {
    component: ComboBoxDemos.Required,
    file: "combobox/required.tsx",
  },
  "combobox-custom-value": {
    component: ComboBoxDemos.CustomValue,
    file: "combobox/custom-value.tsx",
  },
  "combobox-controlled": {
    component: ComboBoxDemos.Controlled,
    file: "combobox/controlled.tsx",
  },
  "combobox-controlled-input-value": {
    component: ComboBoxDemos.ControlledInputValue,
    file: "combobox/controlled-input-value.tsx",
  },
  "combobox-asynchronous-loading": {
    component: ComboBoxDemos.AsynchronousLoading,
    file: "combobox/asynchronous-loading.tsx",
  },
  "combobox-custom-filtering": {
    component: ComboBoxDemos.CustomFiltering,
    file: "combobox/custom-filtering.tsx",
  },
  "combobox-allows-custom-value": {
    component: ComboBoxDemos.AllowsCustomValue,
    file: "combobox/allows-custom-value.tsx",
  },
  "combobox-disabled": {
    component: ComboBoxDemos.Disabled,
    file: "combobox/disabled.tsx",
  },
  "combobox-on-surface": {
    component: ComboBoxDemos.OnSurface,
    file: "combobox/on-surface.tsx",
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
  // Dropdown demos
  "dropdown-default": {
    component: DropdownDemos.Default,
    file: "dropdown/default.tsx",
  },
  "dropdown-with-single-selection": {
    component: DropdownDemos.WithSingleSelection,
    file: "dropdown/with-single-selection.tsx",
  },
  "dropdown-single-with-custom-indicator": {
    component: DropdownDemos.SingleWithCustomIndicator,
    file: "dropdown/single-with-custom-indicator.tsx",
  },
  "dropdown-with-multiple-selection": {
    component: DropdownDemos.WithMultipleSelection,
    file: "dropdown/with-multiple-selection.tsx",
  },
  "dropdown-with-section-level-selection": {
    component: DropdownDemos.WithSectionLevelSelection,
    file: "dropdown/with-section-level-selection.tsx",
  },
  "dropdown-with-keyboard-shortcuts": {
    component: DropdownDemos.WithKeyboardShortcuts,
    file: "dropdown/with-keyboard-shortcuts.tsx",
  },
  "dropdown-with-icons": {
    component: DropdownDemos.WithIcons,
    file: "dropdown/with-icons.tsx",
  },
  "dropdown-long-press-trigger": {
    component: DropdownDemos.LongPressTrigger,
    file: "dropdown/long-press-trigger.tsx",
  },
  "dropdown-with-descriptions": {
    component: DropdownDemos.WithDescriptions,
    file: "dropdown/with-descriptions.tsx",
  },
  "dropdown-with-sections": {
    component: DropdownDemos.WithSections,
    file: "dropdown/with-sections.tsx",
  },
  "dropdown-with-disabled-items": {
    component: DropdownDemos.WithDisabledItems,
    file: "dropdown/with-disabled-items.tsx",
  },
  "dropdown-with-submenus": {
    component: DropdownDemos.WithSubmenus,
    file: "dropdown/with-submenus.tsx",
  },
  "dropdown-with-custom-submenu-indicator": {
    component: DropdownDemos.WithCustomSubmenuIndicator,
    file: "dropdown/with-custom-submenu-indicator.tsx",
  },
  "dropdown-controlled": {
    component: DropdownDemos.Controlled,
    file: "dropdown/controlled.tsx",
  },
  "dropdown-controlled-open-state": {
    component: DropdownDemos.ControlledOpenState,
    file: "dropdown/controlled-open-state.tsx",
  },
  "dropdown-custom-trigger": {
    component: DropdownDemos.CustomTrigger,
    file: "dropdown/custom-trigger.tsx",
  },
  // ErrorMessage demos
  "error-message-basic": {
    component: ErrorMessageDemos.Basic,
    file: "error-message/basic.tsx",
  },
  "error-message-with-tag-group": {
    component: ErrorMessageDemos.WithTagGroup,
    file: "error-message/with-tag-group.tsx",
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
  "fieldset-on-surface": {
    component: FieldsetDemos.OnSurface,
    file: "fieldset/on-surface.tsx",
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
  "input-on-surface": {
    component: InputDemos.OnSurface,
    file: "input/on-surface.tsx",
  },
  // DateField demos
  "date-field-basic": {
    component: DateFieldDemos.Basic,
    file: "date-field/basic.tsx",
  },
  "date-field-controlled": {
    component: DateFieldDemos.Controlled,
    file: "date-field/controlled.tsx",
  },
  "date-field-disabled": {
    component: DateFieldDemos.Disabled,
    file: "date-field/disabled.tsx",
  },
  "date-field-form-example": {
    component: DateFieldDemos.FormExample,
    file: "date-field/form-example.tsx",
  },
  "date-field-invalid": {
    component: DateFieldDemos.Invalid,
    file: "date-field/invalid.tsx",
  },
  "date-field-on-surface": {
    component: DateFieldDemos.OnSurface,
    file: "date-field/on-surface.tsx",
  },
  "date-field-required": {
    component: DateFieldDemos.Required,
    file: "date-field/required.tsx",
  },
  "date-field-with-description": {
    component: DateFieldDemos.WithDescription,
    file: "date-field/with-description.tsx",
  },
  "date-field-with-prefix-and-suffix": {
    component: DateFieldDemos.WithPrefixAndSuffix,
    file: "date-field/with-prefix-and-suffix.tsx",
  },
  "date-field-with-prefix-icon": {
    component: DateFieldDemos.WithPrefixIcon,
    file: "date-field/with-prefix-icon.tsx",
  },
  "date-field-with-suffix-icon": {
    component: DateFieldDemos.WithSuffixIcon,
    file: "date-field/with-suffix-icon.tsx",
  },
  "date-field-with-validation": {
    component: DateFieldDemos.WithValidation,
    file: "date-field/with-validation.tsx",
  },
  // InputOTP demos
  "input-otp-basic": {
    component: InputOTPDemos.Basic,
    file: "input-otp/basic.tsx",
  },
  "input-otp-four-digits": {
    component: InputOTPDemos.FourDigits,
    file: "input-otp/four-digits.tsx",
  },
  "input-otp-disabled": {
    component: InputOTPDemos.Disabled,
    file: "input-otp/disabled.tsx",
  },
  "input-otp-with-pattern": {
    component: InputOTPDemos.WithPattern,
    file: "input-otp/with-pattern.tsx",
  },
  "input-otp-controlled": {
    component: InputOTPDemos.Controlled,
    file: "input-otp/controlled.tsx",
  },
  "input-otp-with-validation": {
    component: InputOTPDemos.WithValidation,
    file: "input-otp/with-validation.tsx",
  },
  "input-otp-on-complete": {
    component: InputOTPDemos.OnComplete,
    file: "input-otp/on-complete.tsx",
  },
  "input-otp-form-example": {
    component: InputOTPDemos.FormExample,
    file: "input-otp/form-example.tsx",
  },
  "input-otp-on-surface": {
    component: InputOTPDemos.OnSurface,
    file: "input-otp/on-surface.tsx",
  },
  // InputGroup demos
  "input-group-default": {
    component: InputGroupDemos.Default,
    file: "input-group/default.tsx",
  },
  "input-group-with-prefix-icon": {
    component: InputGroupDemos.WithPrefixIcon,
    file: "input-group/with-prefix-icon.tsx",
  },
  "input-group-with-suffix-icon": {
    component: InputGroupDemos.WithSuffixIcon,
    file: "input-group/with-suffix-icon.tsx",
  },
  "input-group-with-prefix-and-suffix": {
    component: InputGroupDemos.WithPrefixAndSuffix,
    file: "input-group/with-prefix-and-suffix.tsx",
  },
  "input-group-with-text-prefix": {
    component: InputGroupDemos.WithTextPrefix,
    file: "input-group/with-text-prefix.tsx",
  },
  "input-group-with-text-suffix": {
    component: InputGroupDemos.WithTextSuffix,
    file: "input-group/with-text-suffix.tsx",
  },
  "input-group-with-icon-prefix-and-text-suffix": {
    component: InputGroupDemos.WithIconPrefixAndTextSuffix,
    file: "input-group/with-icon-prefix-and-text-suffix.tsx",
  },
  "input-group-with-copy-suffix": {
    component: InputGroupDemos.WithCopySuffix,
    file: "input-group/with-copy-suffix.tsx",
  },
  "input-group-with-icon-prefix-and-copy-suffix": {
    component: InputGroupDemos.WithIconPrefixAndCopySuffix,
    file: "input-group/with-icon-prefix-and-copy-suffix.tsx",
  },
  "input-group-password-with-toggle": {
    component: InputGroupDemos.PasswordWithToggle,
    file: "input-group/password-with-toggle.tsx",
  },
  "input-group-with-loading-suffix": {
    component: InputGroupDemos.WithLoadingSuffix,
    file: "input-group/with-loading-suffix.tsx",
  },
  "input-group-with-keyboard-shortcut": {
    component: InputGroupDemos.WithKeyboardShortcut,
    file: "input-group/with-keyboard-shortcut.tsx",
  },
  "input-group-with-badge-suffix": {
    component: InputGroupDemos.WithBadgeSuffix,
    file: "input-group/with-badge-suffix.tsx",
  },
  "input-group-required": {
    component: InputGroupDemos.Required,
    file: "input-group/required.tsx",
  },
  "input-group-invalid": {
    component: InputGroupDemos.Invalid,
    file: "input-group/invalid.tsx",
  },
  "input-group-disabled": {
    component: InputGroupDemos.Disabled,
    file: "input-group/disabled.tsx",
  },
  "input-group-on-surface": {
    component: InputGroupDemos.OnSurface,
    file: "input-group/on-surface.tsx",
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
  "kbd-variants": {
    component: KbdDemos.Variants,
    file: "kbd/variants.tsx",
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
  "link-underline-variants": {
    component: LinkDemos.UnderlineVariants,
    file: "link/underline-variants.tsx",
  },
  "link-underline-offset": {
    component: LinkDemos.UnderlineOffset,
    file: "link/underline-offset.tsx",
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
  "radio-group-on-surface": {
    component: RadioGroupDemos.OnSurface,
    file: "radio-group/on-surface.tsx",
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
  "skeleton-grid": {
    component: SkeletonDemos.Grid,
    file: "skeleton/grid.tsx",
  },
  "skeleton-single-shimmer": {
    component: SkeletonDemos.SingleShimmer,
    file: "skeleton/single-shimmer.tsx",
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
  // Surface demos
  "surface-variants": {
    component: SurfaceDemos.Variants,
    file: "surface/variants.tsx",
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
  "tabs-without-separator": {
    component: TabsDemos.WithoutSeparator,
    file: "tabs/without-separator.tsx",
  },
  // TagGroup demos
  "tag-group-basic": {
    component: TagGroupDemos.Basic,
    file: "tag-group/basic.tsx",
  },
  "tag-group-sizes": {
    component: TagGroupDemos.Sizes,
    file: "tag-group/sizes.tsx",
  },
  "tag-group-disabled": {
    component: TagGroupDemos.Disabled,
    file: "tag-group/disabled.tsx",
  },
  "tag-group-selection-modes": {
    component: TagGroupDemos.SelectionModes,
    file: "tag-group/selection-modes.tsx",
  },
  "tag-group-controlled": {
    component: TagGroupDemos.Controlled,
    file: "tag-group/controlled.tsx",
  },
  "tag-group-on-surface": {
    component: TagGroupDemos.OnSurface,
    file: "tag-group/on-surface.tsx",
  },
  "tag-group-with-error-message": {
    component: TagGroupDemos.WithErrorMessage,
    file: "tag-group/with-error-message.tsx",
  },
  "tag-group-with-prefix": {
    component: TagGroupDemos.WithPrefix,
    file: "tag-group/with-prefix.tsx",
  },
  "tag-group-with-remove-button": {
    component: TagGroupDemos.WithRemoveButton,
    file: "tag-group/with-remove-button.tsx",
  },
  "tag-group-with-list-data": {
    component: TagGroupDemos.WithListData,
    file: "tag-group/with-list-data.tsx",
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
  "textarea-on-surface": {
    component: TextAreaDemos.OnSurface,
    file: "textarea/on-surface.tsx",
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
  "text-field-on-surface": {
    component: TextFieldDemos.OnSurface,
    file: "text-field/on-surface.tsx",
  },
  // TimeField demos
  "time-field-basic": {
    component: TimeFieldDemos.Basic,
    file: "time-field/basic.tsx",
  },
  "time-field-controlled": {
    component: TimeFieldDemos.Controlled,
    file: "time-field/controlled.tsx",
  },
  "time-field-disabled": {
    component: TimeFieldDemos.Disabled,
    file: "time-field/disabled.tsx",
  },
  "time-field-form-example": {
    component: TimeFieldDemos.FormExample,
    file: "time-field/form-example.tsx",
  },
  "time-field-invalid": {
    component: TimeFieldDemos.Invalid,
    file: "time-field/invalid.tsx",
  },
  "time-field-on-surface": {
    component: TimeFieldDemos.OnSurface,
    file: "time-field/on-surface.tsx",
  },
  "time-field-required": {
    component: TimeFieldDemos.Required,
    file: "time-field/required.tsx",
  },
  "time-field-with-description": {
    component: TimeFieldDemos.WithDescription,
    file: "time-field/with-description.tsx",
  },
  "time-field-with-prefix-and-suffix": {
    component: TimeFieldDemos.WithPrefixAndSuffix,
    file: "time-field/with-prefix-and-suffix.tsx",
  },
  "time-field-with-prefix-icon": {
    component: TimeFieldDemos.WithPrefixIcon,
    file: "time-field/with-prefix-icon.tsx",
  },
  "time-field-with-suffix-icon": {
    component: TimeFieldDemos.WithSuffixIcon,
    file: "time-field/with-suffix-icon.tsx",
  },
  "time-field-with-validation": {
    component: TimeFieldDemos.WithValidation,
    file: "time-field/with-validation.tsx",
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
  // ListBox demos
  "listbox-controlled": {
    component: ListBoxDemos.Controlled,
    file: "listbox/controlled.tsx",
  },
  "listbox-custom-check-icon": {
    component: ListBoxDemos.CustomCheckIcon,
    file: "listbox/custom-check-icon.tsx",
  },
  "listbox-default": {
    component: ListBoxDemos.Default,
    file: "listbox/default.tsx",
  },
  "listbox-multi-select": {
    component: ListBoxDemos.MultiSelect,
    file: "listbox/multi-select.tsx",
  },
  "listbox-with-disabled-items": {
    component: ListBoxDemos.WithDisabledItems,
    file: "listbox/with-disabled-items.tsx",
  },
  "listbox-with-sections": {
    component: ListBoxDemos.WithSections,
    file: "listbox/with-sections.tsx",
  },
  // Modal demos
  "modal-default": {
    component: ModalDemos.Default,
    file: "modal/default.tsx",
  },
  "modal-placements": {
    component: ModalDemos.Placements,
    file: "modal/placements.tsx",
  },
  "modal-backdrop-variants": {
    component: ModalDemos.BackdropVariants,
    file: "modal/backdrop-variants.tsx",
  },
  "modal-scroll-comparison": {
    component: ModalDemos.ScrollComparison,
    file: "modal/scroll-comparison.tsx",
  },
  "modal-dismiss-behavior": {
    component: ModalDemos.DismissBehavior,
    file: "modal/dismiss-behavior.tsx",
  },
  "modal-with-form": {
    component: ModalDemos.WithForm,
    file: "modal/with-form.tsx",
  },
  "modal-controlled": {
    component: ModalDemos.Controlled,
    file: "modal/controlled.tsx",
  },
  "modal-custom-trigger": {
    component: ModalDemos.CustomTrigger,
    file: "modal/custom-trigger.tsx",
  },
  "modal-custom-backdrop": {
    component: ModalDemos.CustomBackdrop,
    file: "modal/custom-backdrop.tsx",
  },
  "modal-custom-animations": {
    component: ModalDemos.CustomAnimations,
    file: "modal/custom-animations.tsx",
  },
  // NumberField demos
  "number-field-basic": {
    component: NumberFieldDemos.Basic,
    file: "number-field/basic.tsx",
  },
  "number-field-with-description": {
    component: NumberFieldDemos.WithDescription,
    file: "number-field/with-description.tsx",
  },
  "number-field-required": {
    component: NumberFieldDemos.Required,
    file: "number-field/required.tsx",
  },
  "number-field-validation": {
    component: NumberFieldDemos.Validation,
    file: "number-field/validation.tsx",
  },
  "number-field-disabled": {
    component: NumberFieldDemos.Disabled,
    file: "number-field/disabled.tsx",
  },
  "number-field-controlled": {
    component: NumberFieldDemos.Controlled,
    file: "number-field/controlled.tsx",
  },
  "number-field-with-validation": {
    component: NumberFieldDemos.WithValidation,
    file: "number-field/with-validation.tsx",
  },
  "number-field-with-step": {
    component: NumberFieldDemos.WithStep,
    file: "number-field/with-step.tsx",
  },
  "number-field-with-format-options": {
    component: NumberFieldDemos.WithFormatOptions,
    file: "number-field/with-format-options.tsx",
  },
  "number-field-custom-icons": {
    component: NumberFieldDemos.CustomIcons,
    file: "number-field/custom-icons.tsx",
  },
  "number-field-on-surface": {
    component: NumberFieldDemos.OnSurface,
    file: "number-field/on-surface.tsx",
  },
  "number-field-with-chevrons": {
    component: NumberFieldDemos.WithChevrons,
    file: "number-field/with-chevrons.tsx",
  },
  "number-field-form-example": {
    component: NumberFieldDemos.FormExample,
    file: "number-field/form-example.tsx",
  },
  // Select demos
  "select-default": {
    component: SelectDemos.Default,
    file: "select/default.tsx",
  },
  "select-with-description": {
    component: SelectDemos.WithDescription,
    file: "select/with-description.tsx",
  },
  "select-multiple-select": {
    component: SelectDemos.MultipleSelect,
    file: "select/multiple-select.tsx",
  },
  "select-with-sections": {
    component: SelectDemos.WithSections,
    file: "select/with-sections.tsx",
  },
  "select-with-disabled-options": {
    component: SelectDemos.WithDisabledOptions,
    file: "select/with-disabled-options.tsx",
  },
  "select-custom-indicator": {
    component: SelectDemos.CustomIndicator,
    file: "select/custom-indicator.tsx",
  },
  "select-required": {
    component: SelectDemos.Required,
    file: "select/required.tsx",
  },
  "select-on-surface": {
    component: SelectDemos.OnSurface,
    file: "select/on-surface.tsx",
  },
  "select-custom-value": {
    component: SelectDemos.CustomValue,
    file: "select/custom-value.tsx",
  },
  "select-custom-value-multiple": {
    component: SelectDemos.CustomValueMultiple,
    file: "select/custom-value-multiple.tsx",
  },
  "select-controlled": {
    component: SelectDemos.Controlled,
    file: "select/controlled.tsx",
  },
  "select-controlled-multiple": {
    component: SelectDemos.ControlledMultiple,
    file: "select/controlled-multiple.tsx",
  },
  "select-controlled-open-state": {
    component: SelectDemos.ControlledOpenState,
    file: "select/controlled-open-state.tsx",
  },
  "select-asynchronous-loading": {
    component: SelectDemos.AsynchronousLoading,
    file: "select/asynchronous-loading.tsx",
  },
  "select-disabled": {
    component: SelectDemos.Disabled,
    file: "select/disabled.tsx",
  },
  // SearchField demos
  "search-field-basic": {
    component: SearchFieldDemos.Basic,
    file: "search-field/basic.tsx",
  },
  "search-field-with-description": {
    component: SearchFieldDemos.WithDescription,
    file: "search-field/with-description.tsx",
  },
  "search-field-required": {
    component: SearchFieldDemos.Required,
    file: "search-field/required.tsx",
  },
  "search-field-validation": {
    component: SearchFieldDemos.Validation,
    file: "search-field/validation.tsx",
  },
  "search-field-disabled": {
    component: SearchFieldDemos.Disabled,
    file: "search-field/disabled.tsx",
  },
  "search-field-controlled": {
    component: SearchFieldDemos.Controlled,
    file: "search-field/controlled.tsx",
  },
  "search-field-with-validation": {
    component: SearchFieldDemos.WithValidation,
    file: "search-field/with-validation.tsx",
  },
  "search-field-custom-icons": {
    component: SearchFieldDemos.CustomIcons,
    file: "search-field/custom-icons.tsx",
  },
  "search-field-on-surface": {
    component: SearchFieldDemos.OnSurface,
    file: "search-field/on-surface.tsx",
  },
  "search-field-form-example": {
    component: SearchFieldDemos.FormExample,
    file: "search-field/form-example.tsx",
  },
  "search-field-with-keyboard-shortcut": {
    component: SearchFieldDemos.WithKeyboardShortcut,
    file: "search-field/with-keyboard-shortcut.tsx",
  },
  // ScrollShadow demos
  "scroll-shadow-default": {
    component: ScrollShadowDemos.Default,
    file: "scroll-shadow/default.tsx",
  },
  "scroll-shadow-orientation": {
    component: ScrollShadowDemos.Orientation,
    file: "scroll-shadow/orientation.tsx",
  },
  "scroll-shadow-hide-scroll-bar": {
    component: ScrollShadowDemos.HideScrollBar,
    file: "scroll-shadow/hide-scroll-bar.tsx",
  },
  "scroll-shadow-on-surface": {
    component: ScrollShadowDemos.OnSurface,
    file: "scroll-shadow/on-surface.tsx",
  },
  "scroll-shadow-custom-size": {
    component: ScrollShadowDemos.CustomSize,
    file: "scroll-shadow/custom-size.tsx",
  },
  "scroll-shadow-visibility-change": {
    component: ScrollShadowDemos.VisibilityChange,
    file: "scroll-shadow/visibility-change.tsx",
  },
  "scroll-shadow-with-card": {
    component: ScrollShadowDemos.WithCard,
    file: "scroll-shadow/with-card.tsx",
  },
  // Slider demos
  "slider-default": {
    component: SliderDemos.Default,
    file: "slider/default.tsx",
  },
  "slider-vertical": {
    component: SliderDemos.Vertical,
    file: "slider/vertical.tsx",
  },
  "slider-range": {
    component: SliderDemos.Range,
    file: "slider/range.tsx",
  },
  "slider-disabled": {
    component: SliderDemos.Disabled,
    file: "slider/disabled.tsx",
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
