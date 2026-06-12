/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix */
import type {ComponentType} from "react";

import * as AccordionDemos from "./accordion";
import * as AlertDemos from "./alert";
import * as AlertDialogDemos from "./alert-dialog";
import * as AutocompleteDemos from "./autocomplete";
import * as AvatarDemos from "./avatar";
import * as BadgeDemos from "./badge";
import * as BreadcrumbsDemos from "./breadcrumbs";
import * as ButtonDemos from "./button";
import * as ButtonGroupDemos from "./button-group";
import * as CalendarDemos from "./calendar";
import * as CardDemos from "./card";
import * as CheckboxDemos from "./checkbox";
import * as CheckboxGroupDemos from "./checkbox-group";
import * as ChipDemos from "./chip";
import * as CloseButtonDemos from "./close-button";
import * as ColorAreaDemos from "./color-area";
import * as ColorFieldDemos from "./color-field";
import * as ColorPickerDemos from "./color-picker";
import * as ColorSliderDemos from "./color-slider";
import * as ColorSwatchDemos from "./color-swatch";
import * as ColorSwatchPickerDemos from "./color-swatch-picker";
import * as ComboBoxDemos from "./combo-box";
import * as DateFieldDemos from "./date-field";
import * as DatePickerDemos from "./date-picker";
import * as DateRangePickerDemos from "./date-range-picker";
import * as DescriptionDemos from "./description";
import * as DisclosureDemos from "./disclosure";
import * as DisclosureGroupDemos from "./disclosure-group";
import * as DrawerDemos from "./drawer";
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
import * as ListBoxDemos from "./list-box";
import * as MeterDemos from "./meter";
import * as ModalDemos from "./modal";
import * as NumberFieldDemos from "./number-field";
import * as PaginationDemos from "./pagination";
import * as PopoverDemos from "./popover";
import * as ProgressBarDemos from "./progress-bar";
import * as ProgressCircleDemos from "./progress-circle";
import * as RadioGroupDemos from "./radio-group";
import * as RangeCalendarDemos from "./range-calendar";
import * as ScrollShadowDemos from "./scroll-shadow";
import * as SearchFieldDemos from "./search-field";
import * as SelectDemos from "./select";
import * as SeparatorDemos from "./separator";
import * as SkeletonDemos from "./skeleton";
import * as SliderDemos from "./slider";
import * as SpinnerDemos from "./spinner";
import * as SurfaceDemos from "./surface";
import * as SwitchDemos from "./switch";
import * as TableDemos from "./table";
import * as TabsDemos from "./tabs";
import * as TagGroupDemos from "./tag-group";
import * as TextAreaDemos from "./textarea";
import * as TextFieldDemos from "./textfield";
import * as TimeFieldDemos from "./time-field";
import * as ToastDemos from "./toast";
import * as ToggleButtonDemos from "./toggle-button";
import * as ToggleButtonGroupDemos from "./toggle-button-group";
import * as ToolbarDemos from "./toolbar";
import * as TooltipDemos from "./tooltip";
import * as TypographyDemos from "./typography";

export interface DemoItem {
  component: ComponentType;
  file: string;
}

// Registry mapping demo names to their components
export const demos: Record<string, DemoItem> = {
  // Accordion demos
  "accordion-basic": {
    component: AccordionDemos.Basic,
    file: "cn/accordion/basic.tsx",
  },
  "accordion-surface": {
    component: AccordionDemos.Surface,
    file: "cn/accordion/surface.tsx",
  },
  "accordion-multiple": {
    component: AccordionDemos.Multiple,
    file: "cn/accordion/multiple.tsx",
  },
  "accordion-disabled": {
    component: AccordionDemos.Disabled,
    file: "cn/accordion/disabled.tsx",
  },
  "accordion-custom-indicator": {
    component: AccordionDemos.CustomIndicator,
    file: "cn/accordion/custom-indicator.tsx",
  },
  "accordion-faq": {
    component: AccordionDemos.FAQ,
    file: "cn/accordion/faq.tsx",
  },
  "accordion-custom-styles": {
    component: AccordionDemos.CustomStyles,
    file: "cn/accordion/custom-styles.tsx",
  },
  "accordion-without-separator": {
    component: AccordionDemos.WithoutSeparator,
    file: "cn/accordion/without-separator.tsx",
  },
  "accordion-custom-render-function": {
    component: AccordionDemos.CustomRenderFunction,
    file: "cn/accordion/custom-render-function.tsx",
  },
  "accordion-controlled": {
    component: AccordionDemos.Controlled,
    file: "cn/accordion/controlled.tsx",
  },
  // Alert demos
  "alert-basic": {
    component: AlertDemos.Basic,
    file: "cn/alert/basic.tsx",
  },
  // AlertDialog demos
  "alert-dialog-default": {
    component: AlertDialogDemos.Default,
    file: "cn/alert-dialog/default.tsx",
  },
  "alert-dialog-statuses": {
    component: AlertDialogDemos.Statuses,
    file: "cn/alert-dialog/statuses.tsx",
  },
  "alert-dialog-placements": {
    component: AlertDialogDemos.Placements,
    file: "cn/alert-dialog/placements.tsx",
  },
  "alert-dialog-backdrop-variants": {
    component: AlertDialogDemos.BackdropVariants,
    file: "cn/alert-dialog/backdrop-variants.tsx",
  },
  "alert-dialog-sizes": {
    component: AlertDialogDemos.Sizes,
    file: "cn/alert-dialog/sizes.tsx",
  },
  "alert-dialog-controlled": {
    component: AlertDialogDemos.Controlled,
    file: "cn/alert-dialog/controlled.tsx",
  },
  "alert-dialog-dismiss-behavior": {
    component: AlertDialogDemos.DismissBehavior,
    file: "cn/alert-dialog/dismiss-behavior.tsx",
  },
  "alert-dialog-custom-icon": {
    component: AlertDialogDemos.CustomIcon,
    file: "cn/alert-dialog/custom-icon.tsx",
  },
  "alert-dialog-custom-backdrop": {
    component: AlertDialogDemos.CustomBackdrop,
    file: "cn/alert-dialog/custom-backdrop.tsx",
  },
  "alert-dialog-custom-trigger": {
    component: AlertDialogDemos.CustomTrigger,
    file: "cn/alert-dialog/custom-trigger.tsx",
  },
  "alert-dialog-with-close-button": {
    component: AlertDialogDemos.WithCloseButton,
    file: "cn/alert-dialog/with-close-button.tsx",
  },
  "alert-dialog-custom-animations": {
    component: AlertDialogDemos.CustomAnimations,
    file: "cn/alert-dialog/custom-animations.tsx",
  },
  "alert-dialog-close-methods": {
    component: AlertDialogDemos.CloseMethods,
    file: "cn/alert-dialog/close-methods.tsx",
  },
  "alert-dialog-custom-portal": {
    component: AlertDialogDemos.CustomPortal,
    file: "cn/alert-dialog/custom-portal.tsx",
  },
  // Avatar demos
  "avatar-basic": {
    component: AvatarDemos.Basic,
    file: "cn/avatar/basic.tsx",
  },
  "avatar-sizes": {
    component: AvatarDemos.Sizes,
    file: "cn/avatar/sizes.tsx",
  },
  "avatar-colors": {
    component: AvatarDemos.Colors,
    file: "cn/avatar/colors.tsx",
  },
  "avatar-variants": {
    component: AvatarDemos.Variants,
    file: "cn/avatar/variants.tsx",
  },
  "avatar-fallback": {
    component: AvatarDemos.Fallback,
    file: "cn/avatar/fallback.tsx",
  },
  "avatar-group": {
    component: AvatarDemos.Group,
    file: "cn/avatar/group.tsx",
  },
  "avatar-custom-styles": {
    component: AvatarDemos.CustomStyles,
    file: "cn/avatar/custom-styles.tsx",
  },
  // Badge demos
  "badge-basic": {
    component: BadgeDemos.Basic,
    file: "cn/badge/basic.tsx",
  },
  "badge-colors": {
    component: BadgeDemos.Colors,
    file: "cn/badge/colors.tsx",
  },
  "badge-sizes": {
    component: BadgeDemos.Sizes,
    file: "cn/badge/sizes.tsx",
  },
  "badge-variants": {
    component: BadgeDemos.Variants,
    file: "cn/badge/variants.tsx",
  },
  "badge-placements": {
    component: BadgeDemos.Placements,
    file: "cn/badge/placements.tsx",
  },
  "badge-with-content": {
    component: BadgeDemos.WithContent,
    file: "cn/badge/with-content.tsx",
  },
  "badge-dot": {
    component: BadgeDemos.Dot,
    file: "cn/badge/dot.tsx",
  },
  // Breadcrumbs demos
  "breadcrumbs-basic": {
    component: BreadcrumbsDemos.BreadcrumbsBasic,
    file: "cn/breadcrumbs/basic.tsx",
  },
  "breadcrumbs-level-2": {
    component: BreadcrumbsDemos.BreadcrumbsLevel2,
    file: "cn/breadcrumbs/level-2.tsx",
  },
  "breadcrumbs-level-3": {
    component: BreadcrumbsDemos.BreadcrumbsLevel3,
    file: "cn/breadcrumbs/level-3.tsx",
  },
  "breadcrumbs-custom-separator": {
    component: BreadcrumbsDemos.BreadcrumbsCustomSeparator,
    file: "cn/breadcrumbs/custom-separator.tsx",
  },
  "breadcrumbs-disabled": {
    component: BreadcrumbsDemos.BreadcrumbsDisabled,
    file: "cn/breadcrumbs/disabled.tsx",
  },
  "breadcrumbs-custom-render-function": {
    component: BreadcrumbsDemos.CustomRenderFunction,
    file: "cn/breadcrumbs/custom-render-function.tsx",
  },
  // Button demos
  "button-basic": {
    component: ButtonDemos.Basic,
    file: "cn/button/basic.tsx",
  },
  "button-custom-variants": {
    component: ButtonDemos.CustomVariants,
    file: "cn/button/custom-variants.tsx",
  },
  "button-disabled": {
    component: ButtonDemos.Disabled,
    file: "cn/button/disabled.tsx",
  },
  "button-icon-only": {
    component: ButtonDemos.IconOnly,
    file: "cn/button/icon-only.tsx",
  },
  "button-loading": {
    component: ButtonDemos.Loading,
    file: "cn/button/loading.tsx",
  },
  "button-loading-state": {
    component: ButtonDemos.LoadingState,
    file: "cn/button/loading-state.tsx",
  },
  "button-sizes": {
    component: ButtonDemos.Sizes,
    file: "cn/button/sizes.tsx",
  },
  "button-full-width": {
    component: ButtonDemos.FullWidth,
    file: "cn/button/full-width.tsx",
  },
  "button-social": {
    component: ButtonDemos.Social,
    file: "cn/button/social.tsx",
  },
  "button-ripple-effect": {
    component: ButtonDemos.RippleEffect,
    file: "cn/button/ripple-effect.tsx",
  },
  "button-variants": {
    component: ButtonDemos.Variants,
    file: "cn/button/variants.tsx",
  },
  "button-outline-variant": {
    component: ButtonDemos.OutlineVariant,
    file: "cn/button/outline-variant.tsx",
  },
  "button-with-icons": {
    component: ButtonDemos.WithIcons,
    file: "cn/button/with-icons.tsx",
  },
  "button-custom-render-function": {
    component: ButtonDemos.CustomRenderFunction,
    file: "cn/button/custom-render-function.tsx",
  },
  // ButtonGroup demos
  "button-group-basic": {
    component: ButtonGroupDemos.Basic,
    file: "cn/button-group/basic.tsx",
  },
  "button-group-disabled": {
    component: ButtonGroupDemos.Disabled,
    file: "cn/button-group/disabled.tsx",
  },
  "button-group-sizes": {
    component: ButtonGroupDemos.Sizes,
    file: "cn/button-group/sizes.tsx",
  },
  "button-group-full-width": {
    component: ButtonGroupDemos.FullWidth,
    file: "cn/button-group/full-width.tsx",
  },
  "button-group-variants": {
    component: ButtonGroupDemos.Variants,
    file: "cn/button-group/variants.tsx",
  },
  "button-group-with-icons": {
    component: ButtonGroupDemos.WithIcons,
    file: "cn/button-group/with-icons.tsx",
  },
  "button-group-orientation": {
    component: ButtonGroupDemos.Orientation,
    file: "cn/button-group/orientation.tsx",
  },
  "button-group-without-separator": {
    component: ButtonGroupDemos.WithoutSeparator,
    file: "cn/button-group/without-separator.tsx",
  },
  // Card demos
  "card-default": {
    component: CardDemos.Default,
    file: "cn/card/default.tsx",
  },
  "card-horizontal": {
    component: CardDemos.Horizontal,
    file: "cn/card/horizontal.tsx",
  },
  "card-variants": {
    component: CardDemos.Variants,
    file: "cn/card/variants.tsx",
  },
  "card-with-avatar": {
    component: CardDemos.WithAvatar,
    file: "cn/card/with-avatar.tsx",
  },
  "card-with-form": {
    component: CardDemos.WithForm,
    file: "cn/card/with-form.tsx",
  },
  "card-with-images": {
    component: CardDemos.WithImages,
    file: "cn/card/with-images.tsx",
  },
  // Calendar demos
  "calendar-basic": {
    component: CalendarDemos.Basic,
    file: "cn/calendar/basic.tsx",
  },
  "calendar-custom-styles": {
    component: CalendarDemos.CustomStyles,
    file: "cn/calendar/custom-styles.tsx",
  },
  "calendar-default-value": {
    component: CalendarDemos.DefaultValue,
    file: "cn/calendar/default-value.tsx",
  },
  "calendar-controlled": {
    component: CalendarDemos.Controlled,
    file: "cn/calendar/controlled.tsx",
  },
  "calendar-min-max-dates": {
    component: CalendarDemos.MinMaxDates,
    file: "cn/calendar/min-max-dates.tsx",
  },
  "calendar-unavailable-dates": {
    component: CalendarDemos.UnavailableDates,
    file: "cn/calendar/unavailable-dates.tsx",
  },
  "calendar-weeks-in-month": {
    component: CalendarDemos.WeeksInMonth,
    file: "cn/calendar/weeks-in-month.tsx",
  },
  "calendar-week-view": {
    component: CalendarDemos.WeekView,
    file: "cn/calendar/week-view.tsx",
  },
  "calendar-day-view": {
    component: CalendarDemos.DayView,
    file: "cn/calendar/day-view.tsx",
  },
  "calendar-multiple-selection": {
    component: CalendarDemos.MultipleSelection,
    file: "cn/calendar/multiple-selection.tsx",
  },
  "calendar-disabled": {
    component: CalendarDemos.Disabled,
    file: "cn/calendar/disabled.tsx",
  },
  "calendar-read-only": {
    component: CalendarDemos.ReadOnly,
    file: "cn/calendar/read-only.tsx",
  },
  "calendar-focused-value": {
    component: CalendarDemos.FocusedValue,
    file: "cn/calendar/focused-value.tsx",
  },
  "calendar-with-indicators": {
    component: CalendarDemos.WithIndicators,
    file: "cn/calendar/with-indicators.tsx",
  },
  "calendar-multiple-months": {
    component: CalendarDemos.MultipleMonths,
    file: "cn/calendar/multiple-months.tsx",
  },
  "calendar-year-picker": {
    component: CalendarDemos.YearPicker,
    file: "cn/calendar/year-picker.tsx",
  },
  "calendar-international-calendar": {
    component: CalendarDemos.InternationalCalendar,
    file: "cn/calendar/international-calendar.tsx",
  },
  "calendar-booking-calendar": {
    component: CalendarDemos.BookingCalendar,
    file: "cn/calendar/booking-calendar.tsx",
  },
  "calendar-custom-icons": {
    component: CalendarDemos.CustomIcons,
    file: "cn/calendar/custom-icons.tsx",
  },
  // RangeCalendar demos
  "range-calendar-basic": {
    component: RangeCalendarDemos.Basic,
    file: "cn/range-calendar/basic.tsx",
  },
  "range-calendar-year-picker": {
    component: RangeCalendarDemos.YearPicker,
    file: "cn/range-calendar/year-picker.tsx",
  },
  "range-calendar-default-value": {
    component: RangeCalendarDemos.DefaultValue,
    file: "cn/range-calendar/default-value.tsx",
  },
  "range-calendar-controlled": {
    component: RangeCalendarDemos.Controlled,
    file: "cn/range-calendar/controlled.tsx",
  },
  "range-calendar-min-max-dates": {
    component: RangeCalendarDemos.MinMaxDates,
    file: "cn/range-calendar/min-max-dates.tsx",
  },
  "range-calendar-unavailable-dates": {
    component: RangeCalendarDemos.UnavailableDates,
    file: "cn/range-calendar/unavailable-dates.tsx",
  },
  "range-calendar-anchor-unavailable-dates": {
    component: RangeCalendarDemos.AnchorUnavailableDates,
    file: "cn/range-calendar/anchor-unavailable-dates.tsx",
  },
  "range-calendar-weeks-in-month": {
    component: RangeCalendarDemos.WeeksInMonth,
    file: "cn/range-calendar/weeks-in-month.tsx",
  },
  "range-calendar-week-view": {
    component: RangeCalendarDemos.WeekView,
    file: "cn/range-calendar/week-view.tsx",
  },
  "range-calendar-day-view": {
    component: RangeCalendarDemos.DayView,
    file: "cn/range-calendar/day-view.tsx",
  },
  "range-calendar-allows-non-contiguous-ranges": {
    component: RangeCalendarDemos.AllowsNonContiguousRanges,
    file: "cn/range-calendar/allows-non-contiguous-ranges.tsx",
  },
  "range-calendar-disabled": {
    component: RangeCalendarDemos.Disabled,
    file: "cn/range-calendar/disabled.tsx",
  },
  "range-calendar-read-only": {
    component: RangeCalendarDemos.ReadOnly,
    file: "cn/range-calendar/read-only.tsx",
  },
  "range-calendar-invalid": {
    component: RangeCalendarDemos.Invalid,
    file: "cn/range-calendar/invalid.tsx",
  },
  "range-calendar-focused-value": {
    component: RangeCalendarDemos.FocusedValue,
    file: "cn/range-calendar/focused-value.tsx",
  },
  "range-calendar-with-indicators": {
    component: RangeCalendarDemos.WithIndicators,
    file: "cn/range-calendar/with-indicators.tsx",
  },
  "range-calendar-multiple-months": {
    component: RangeCalendarDemos.MultipleMonths,
    file: "cn/range-calendar/multiple-months.tsx",
  },
  "range-calendar-three-months": {
    component: RangeCalendarDemos.ThreeMonths,
    file: "cn/range-calendar/three-months.tsx",
  },
  "range-calendar-international-calendar": {
    component: RangeCalendarDemos.InternationalCalendar,
    file: "cn/range-calendar/international-calendar.tsx",
  },
  "range-calendar-booking-calendar": {
    component: RangeCalendarDemos.BookingCalendar,
    file: "cn/range-calendar/booking-calendar.tsx",
  },
  // Checkbox demos
  "checkbox-basic": {
    component: CheckboxDemos.Basic,
    file: "cn/checkbox/basic.tsx",
  },
  "checkbox-disabled": {
    component: CheckboxDemos.Disabled,
    file: "cn/checkbox/disabled.tsx",
  },
  "checkbox-default-selected": {
    component: CheckboxDemos.DefaultSelected,
    file: "cn/checkbox/default-selected.tsx",
  },
  "checkbox-controlled": {
    component: CheckboxDemos.Controlled,
    file: "cn/checkbox/controlled.tsx",
  },
  "checkbox-indeterminate": {
    component: CheckboxDemos.Indeterminate,
    file: "cn/checkbox/indeterminate.tsx",
  },
  "checkbox-external-label": {
    component: CheckboxDemos.ExternalLabel,
    file: "cn/checkbox/external-label.tsx",
  },
  "checkbox-with-description": {
    component: CheckboxDemos.WithDescription,
    file: "cn/checkbox/with-description.tsx",
  },
  "checkbox-render-props": {
    component: CheckboxDemos.RenderProps,
    file: "cn/checkbox/render-props.tsx",
  },
  "checkbox-form": {
    component: CheckboxDemos.Form,
    file: "cn/checkbox/form.tsx",
  },
  "checkbox-custom-styles": {
    component: CheckboxDemos.CustomStyles,
    file: "cn/checkbox/custom-styles.tsx",
  },
  "checkbox-invalid": {
    component: CheckboxDemos.Invalid,
    file: "cn/checkbox/invalid.tsx",
  },
  "checkbox-custom-indicator": {
    component: CheckboxDemos.CustomIndicator,
    file: "cn/checkbox/custom-indicator.tsx",
  },
  "checkbox-full-rounded": {
    component: CheckboxDemos.FullRounded,
    file: "cn/checkbox/full-rounded.tsx",
  },
  "checkbox-variants": {
    component: CheckboxDemos.Variants,
    file: "cn/checkbox/variants.tsx",
  },
  "checkbox-custom-render-function": {
    component: CheckboxDemos.CustomRenderFunction,
    file: "cn/checkbox/custom-render-function.tsx",
  },
  // CheckboxGroup demos
  "checkbox-group-basic": {
    component: CheckboxGroupDemos.Basic,
    file: "cn/checkbox-group/basic.tsx",
  },
  "checkbox-group-on-surface": {
    component: CheckboxGroupDemos.OnSurface,
    file: "cn/checkbox-group/on-surface.tsx",
  },
  "checkbox-group-with-custom-indicator": {
    component: CheckboxGroupDemos.WithCustomIndicator,
    file: "cn/checkbox-group/with-custom-indicator.tsx",
  },
  "checkbox-group-indeterminate": {
    component: CheckboxGroupDemos.Indeterminate,
    file: "cn/checkbox-group/indeterminate.tsx",
  },
  "checkbox-group-validation": {
    component: CheckboxGroupDemos.Validation,
    file: "cn/checkbox-group/validation.tsx",
  },
  "checkbox-group-controlled": {
    component: CheckboxGroupDemos.Controlled,
    file: "cn/checkbox-group/controlled.tsx",
  },
  "checkbox-group-disabled": {
    component: CheckboxGroupDemos.Disabled,
    file: "cn/checkbox-group/disabled.tsx",
  },
  "checkbox-group-features-and-addons": {
    component: CheckboxGroupDemos.FeaturesAndAddOns,
    file: "cn/checkbox-group/features-and-addons.tsx",
  },
  "checkbox-group-custom-render-function": {
    component: CheckboxGroupDemos.CustomRenderFunction,
    file: "cn/checkbox-group/custom-render-function.tsx",
  },
  // Chip demos
  "chip-basic": {
    component: ChipDemos.Basic,
    file: "cn/chip/basic.tsx",
  },
  "chip-variants": {
    component: ChipDemos.Variants,
    file: "cn/chip/variants.tsx",
  },
  "chip-with-icon": {
    component: ChipDemos.WithIcon,
    file: "cn/chip/with-icon.tsx",
  },
  "chip-statuses": {
    component: ChipDemos.Statuses,
    file: "cn/chip/statuses.tsx",
  },
  "chip-vibrant-palette": {
    component: ChipDemos.VibrantPalette,
    file: "cn/chip/vibrant-palette.tsx",
  },
  // ColorField demos
  "color-field-basic": {
    component: ColorFieldDemos.Basic,
    file: "cn/color-field/basic.tsx",
  },
  "color-field-channel-editing": {
    component: ColorFieldDemos.ChannelEditing,
    file: "cn/color-field/channel-editing.tsx",
  },
  "color-field-controlled": {
    component: ColorFieldDemos.Controlled,
    file: "cn/color-field/controlled.tsx",
  },
  "color-field-disabled": {
    component: ColorFieldDemos.Disabled,
    file: "cn/color-field/disabled.tsx",
  },
  "color-field-form-example": {
    component: ColorFieldDemos.FormExample,
    file: "cn/color-field/form-example.tsx",
  },
  "color-field-full-width": {
    component: ColorFieldDemos.FullWidth,
    file: "cn/color-field/full-width.tsx",
  },
  "color-field-invalid": {
    component: ColorFieldDemos.Invalid,
    file: "cn/color-field/invalid.tsx",
  },
  "color-field-on-surface": {
    component: ColorFieldDemos.OnSurface,
    file: "cn/color-field/on-surface.tsx",
  },
  "color-field-required": {
    component: ColorFieldDemos.Required,
    file: "cn/color-field/required.tsx",
  },
  "color-field-variants": {
    component: ColorFieldDemos.Variants,
    file: "cn/color-field/variants.tsx",
  },
  "color-field-with-description": {
    component: ColorFieldDemos.WithDescription,
    file: "cn/color-field/with-description.tsx",
  },
  "color-field-custom-render-function": {
    component: ColorFieldDemos.CustomRenderFunction,
    file: "cn/color-field/custom-render-function.tsx",
  },
  // ColorPicker demos
  "color-picker-basic": {
    component: ColorPickerDemos.Basic,
    file: "cn/color-picker/basic.tsx",
  },
  "color-picker-controlled": {
    component: ColorPickerDemos.Controlled,
    file: "cn/color-picker/controlled.tsx",
  },
  "color-picker-with-swatches": {
    component: ColorPickerDemos.WithSwatches,
    file: "cn/color-picker/with-swatches.tsx",
  },
  "color-picker-with-fields": {
    component: ColorPickerDemos.WithFields,
    file: "cn/color-picker/with-fields.tsx",
  },
  "color-picker-with-sliders": {
    component: ColorPickerDemos.WithSliders,
    file: "cn/color-picker/with-sliders.tsx",
  },
  // ColorArea demos
  "color-area-basic": {
    component: ColorAreaDemos.Basic,
    file: "cn/color-area/basic.tsx",
  },
  "color-area-with-dots": {
    component: ColorAreaDemos.WithDots,
    file: "cn/color-area/with-dots.tsx",
  },
  "color-area-space-and-channels": {
    component: ColorAreaDemos.SpaceAndChannels,
    file: "cn/color-area/space-and-channels.tsx",
  },
  "color-area-controlled": {
    component: ColorAreaDemos.Controlled,
    file: "cn/color-area/controlled.tsx",
  },
  "color-area-disabled": {
    component: ColorAreaDemos.Disabled,
    file: "cn/color-area/disabled.tsx",
  },
  "color-area-custom-render-function": {
    component: ColorAreaDemos.CustomRenderFunction,
    file: "cn/color-area/custom-render-function.tsx",
  },
  // ColorSwatch demos
  "color-swatch-basic": {
    component: ColorSwatchDemos.Basic,
    file: "cn/color-swatch/basic.tsx",
  },
  "color-swatch-sizes": {
    component: ColorSwatchDemos.Sizes,
    file: "cn/color-swatch/sizes.tsx",
  },
  "color-swatch-shapes": {
    component: ColorSwatchDemos.Shapes,
    file: "cn/color-swatch/shapes.tsx",
  },
  "color-swatch-transparency": {
    component: ColorSwatchDemos.Transparency,
    file: "cn/color-swatch/transparency.tsx",
  },
  "color-swatch-custom-styles": {
    component: ColorSwatchDemos.CustomStyles,
    file: "cn/color-swatch/custom-styles.tsx",
  },
  "color-swatch-accessibility": {
    component: ColorSwatchDemos.Accessibility,
    file: "cn/color-swatch/accessibility.tsx",
  },
  "color-swatch-custom-render-function": {
    component: ColorSwatchDemos.CustomRenderFunction,
    file: "cn/color-swatch/custom-render-function.tsx",
  },
  // ColorSlider demos
  "color-slider-basic": {
    component: ColorSliderDemos.Basic,
    file: "cn/color-slider/basic.tsx",
  },
  "color-slider-channels": {
    component: ColorSliderDemos.Channels,
    file: "cn/color-slider/channels.tsx",
  },
  "color-slider-alpha-channel": {
    component: ColorSliderDemos.AlphaChannel,
    file: "cn/color-slider/alpha-channel.tsx",
  },
  "color-slider-rgb-channels": {
    component: ColorSliderDemos.RGBChannels,
    file: "cn/color-slider/rgb-channels.tsx",
  },
  "color-slider-vertical": {
    component: ColorSliderDemos.Vertical,
    file: "cn/color-slider/vertical.tsx",
  },
  "color-slider-disabled": {
    component: ColorSliderDemos.Disabled,
    file: "cn/color-slider/disabled.tsx",
  },
  "color-slider-controlled": {
    component: ColorSliderDemos.Controlled,
    file: "cn/color-slider/controlled.tsx",
  },
  "color-slider-custom-render-function": {
    component: ColorSliderDemos.CustomRenderFunction,
    file: "cn/color-slider/custom-render-function.tsx",
  },
  // CloseButton demos
  "close-button-default": {
    component: CloseButtonDemos.Default,
    file: "cn/close-button/default.tsx",
  },
  "close-button-with-custom-icon": {
    component: CloseButtonDemos.WithCustomIcon,
    file: "cn/close-button/with-custom-icon.tsx",
  },
  "close-button-interactive": {
    component: CloseButtonDemos.Interactive,
    file: "cn/close-button/interactive.tsx",
  },
  // ColorSwatchPicker demos
  "color-swatch-picker-basic": {
    component: ColorSwatchPickerDemos.Basic,
    file: "cn/color-swatch-picker/basic.tsx",
  },
  "color-swatch-picker-sizes": {
    component: ColorSwatchPickerDemos.Sizes,
    file: "cn/color-swatch-picker/sizes.tsx",
  },
  "color-swatch-picker-variants": {
    component: ColorSwatchPickerDemos.Variants,
    file: "cn/color-swatch-picker/variants.tsx",
  },
  "color-swatch-picker-stack-layout": {
    component: ColorSwatchPickerDemos.StackLayout,
    file: "cn/color-swatch-picker/stack-layout.tsx",
  },
  "color-swatch-picker-controlled": {
    component: ColorSwatchPickerDemos.Controlled,
    file: "cn/color-swatch-picker/controlled.tsx",
  },
  "color-swatch-picker-disabled": {
    component: ColorSwatchPickerDemos.Disabled,
    file: "cn/color-swatch-picker/disabled.tsx",
  },
  "color-swatch-picker-default-value": {
    component: ColorSwatchPickerDemos.DefaultValue,
    file: "cn/color-swatch-picker/default-value.tsx",
  },
  "color-swatch-picker-custom-indicator": {
    component: ColorSwatchPickerDemos.CustomIndicator,
    file: "cn/color-swatch-picker/custom-indicator.tsx",
  },
  "color-swatch-picker-custom-render-function": {
    component: ColorSwatchPickerDemos.CustomRenderFunction,
    file: "cn/color-swatch-picker/custom-render-function.tsx",
  },
  // Autocomplete demos
  "autocomplete-default": {
    component: AutocompleteDemos.Default,
    file: "cn/autocomplete/default.tsx",
  },
  "autocomplete-single-select": {
    component: AutocompleteDemos.SingleSelect,
    file: "cn/autocomplete/single-select.tsx",
  },
  "autocomplete-variants": {
    component: AutocompleteDemos.Variants,
    file: "cn/autocomplete/variants.tsx",
  },
  "autocomplete-multiple-select": {
    component: AutocompleteDemos.MultipleSelect,
    file: "cn/autocomplete/multiple-select.tsx",
  },
  "autocomplete-full-width": {
    component: AutocompleteDemos.FullWidth,
    file: "cn/autocomplete/full-width.tsx",
  },
  "autocomplete-with-description": {
    component: AutocompleteDemos.WithDescription,
    file: "cn/autocomplete/with-description.tsx",
  },
  "autocomplete-with-sections": {
    component: AutocompleteDemos.WithSections,
    file: "cn/autocomplete/with-sections.tsx",
  },
  "autocomplete-with-disabled-options": {
    component: AutocompleteDemos.WithDisabledOptions,
    file: "cn/autocomplete/with-disabled-options.tsx",
  },
  "autocomplete-allows-empty-collection": {
    component: AutocompleteDemos.AllowsEmptyCollection,
    file: "cn/autocomplete/allows-empty-collection.tsx",
  },
  "autocomplete-custom-indicator": {
    component: AutocompleteDemos.CustomIndicator,
    file: "cn/autocomplete/custom-indicator.tsx",
  },
  "autocomplete-required": {
    component: AutocompleteDemos.Required,
    file: "cn/autocomplete/required.tsx",
  },
  "autocomplete-controlled": {
    component: AutocompleteDemos.Controlled,
    file: "cn/autocomplete/controlled.tsx",
  },
  "autocomplete-controlled-open-state": {
    component: AutocompleteDemos.ControlledOpenState,
    file: "cn/autocomplete/controlled-open-state.tsx",
  },
  "autocomplete-asynchronous-filtering": {
    component: AutocompleteDemos.AsynchronousFiltering,
    file: "cn/autocomplete/asynchronous-filtering.tsx",
  },
  "autocomplete-virtualization": {
    component: AutocompleteDemos.Virtualization,
    file: "cn/autocomplete/virtualization.tsx",
  },
  "autocomplete-disabled": {
    component: AutocompleteDemos.Disabled,
    file: "cn/autocomplete/disabled.tsx",
  },
  "autocomplete-user-selection": {
    component: AutocompleteDemos.UserSelection,
    file: "cn/autocomplete/user-selection.tsx",
  },
  "autocomplete-user-selection-multiple": {
    component: AutocompleteDemos.UserSelectionMultiple,
    file: "cn/autocomplete/user-selection-multiple.tsx",
  },
  "autocomplete-location-search": {
    component: AutocompleteDemos.LocationSearch,
    file: "cn/autocomplete/location-search.tsx",
  },
  "autocomplete-tag-group-selection": {
    component: AutocompleteDemos.TagGroupSelection,
    file: "cn/autocomplete/tag-group-selection.tsx",
  },
  "autocomplete-email-recipients": {
    component: AutocompleteDemos.EmailRecipients,
    file: "cn/autocomplete/email-recipients.tsx",
  },
  // ComboBox demos
  "combo-box-default": {
    component: ComboBoxDemos.Default,
    file: "cn/combo-box/default.tsx",
  },
  "combo-box-default-selected-key": {
    component: ComboBoxDemos.DefaultSelectedKey,
    file: "cn/combo-box/default-selected-key.tsx",
  },
  "combo-box-with-description": {
    component: ComboBoxDemos.WithDescription,
    file: "cn/combo-box/with-description.tsx",
  },
  "combo-box-with-sections": {
    component: ComboBoxDemos.WithSections,
    file: "cn/combo-box/with-sections.tsx",
  },
  "combo-box-with-disabled-options": {
    component: ComboBoxDemos.WithDisabledOptions,
    file: "cn/combo-box/with-disabled-options.tsx",
  },
  "combo-box-custom-indicator": {
    component: ComboBoxDemos.CustomIndicator,
    file: "cn/combo-box/custom-indicator.tsx",
  },
  "combo-box-required": {
    component: ComboBoxDemos.Required,
    file: "cn/combo-box/required.tsx",
  },
  "combo-box-full-width": {
    component: ComboBoxDemos.FullWidth,
    file: "cn/combo-box/full-width.tsx",
  },
  "combo-box-custom-value": {
    component: ComboBoxDemos.CustomValue,
    file: "cn/combo-box/custom-value.tsx",
  },
  "combo-box-controlled": {
    component: ComboBoxDemos.Controlled,
    file: "cn/combo-box/controlled.tsx",
  },
  "combo-box-controlled-input-value": {
    component: ComboBoxDemos.ControlledInputValue,
    file: "cn/combo-box/controlled-input-value.tsx",
  },
  "combo-box-asynchronous-loading": {
    component: ComboBoxDemos.AsynchronousLoading,
    file: "cn/combo-box/asynchronous-loading.tsx",
  },
  "combo-box-custom-filtering": {
    component: ComboBoxDemos.CustomFiltering,
    file: "cn/combo-box/custom-filtering.tsx",
  },
  "combo-box-allows-custom-value": {
    component: ComboBoxDemos.AllowsCustomValue,
    file: "cn/combo-box/allows-custom-value.tsx",
  },
  "combo-box-disabled": {
    component: ComboBoxDemos.Disabled,
    file: "cn/combo-box/disabled.tsx",
  },
  "combo-box-on-surface": {
    component: ComboBoxDemos.OnSurface,
    file: "cn/combo-box/on-surface.tsx",
  },
  "combo-box-menu-trigger": {
    component: ComboBoxDemos.MenuTrigger,
    file: "cn/combo-box/menu-trigger.tsx",
  },
  "combo-box-custom-render-function": {
    component: ComboBoxDemos.CustomRenderFunction,
    file: "cn/combo-box/custom-render-function.tsx",
  },
  // Drawer demos
  "drawer-basic": {
    component: DrawerDemos.Basic,
    file: "cn/drawer/basic.tsx",
  },
  "drawer-placements": {
    component: DrawerDemos.Placements,
    file: "cn/drawer/placements.tsx",
  },
  "drawer-backdrop-variants": {
    component: DrawerDemos.BackdropVariants,
    file: "cn/drawer/backdrop-variants.tsx",
  },
  "drawer-with-form": {
    component: DrawerDemos.WithForm,
    file: "cn/drawer/with-form.tsx",
  },
  "drawer-scrollable-content": {
    component: DrawerDemos.ScrollableContent,
    file: "cn/drawer/scrollable-content.tsx",
  },
  "drawer-navigation": {
    component: DrawerDemos.Navigation,
    file: "cn/drawer/navigation.tsx",
  },
  "drawer-non-dismissable": {
    component: DrawerDemos.NonDismissable,
    file: "cn/drawer/non-dismissable.tsx",
  },
  "drawer-controlled": {
    component: DrawerDemos.Controlled,
    file: "cn/drawer/controlled.tsx",
  },
  // Disclosure demos
  "disclosure-basic": {
    component: DisclosureDemos.Basic,
    file: "cn/disclosure/basic.tsx",
  },
  "disclosure-custom-render-function": {
    component: DisclosureDemos.CustomRenderFunction,
    file: "cn/disclosure/custom-render-function.tsx",
  },
  // DisclosureGroup demos
  "disclosure-group-basic": {
    component: DisclosureGroupDemos.Basic,
    file: "cn/disclosure-group/basic.tsx",
  },
  "disclosure-group-controlled": {
    component: DisclosureGroupDemos.Controlled,
    file: "cn/disclosure-group/controlled.tsx",
  },
  // Dropdown demos
  "dropdown-default": {
    component: DropdownDemos.Default,
    file: "cn/dropdown/default.tsx",
  },
  "dropdown-with-single-selection": {
    component: DropdownDemos.WithSingleSelection,
    file: "cn/dropdown/with-single-selection.tsx",
  },
  "dropdown-single-with-custom-indicator": {
    component: DropdownDemos.SingleWithCustomIndicator,
    file: "cn/dropdown/single-with-custom-indicator.tsx",
  },
  "dropdown-with-multiple-selection": {
    component: DropdownDemos.WithMultipleSelection,
    file: "cn/dropdown/with-multiple-selection.tsx",
  },
  "dropdown-with-section-level-selection": {
    component: DropdownDemos.WithSectionLevelSelection,
    file: "cn/dropdown/with-section-level-selection.tsx",
  },
  "dropdown-with-keyboard-shortcuts": {
    component: DropdownDemos.WithKeyboardShortcuts,
    file: "cn/dropdown/with-keyboard-shortcuts.tsx",
  },
  "dropdown-with-icons": {
    component: DropdownDemos.WithIcons,
    file: "cn/dropdown/with-icons.tsx",
  },
  "dropdown-long-press-trigger": {
    component: DropdownDemos.LongPressTrigger,
    file: "cn/dropdown/long-press-trigger.tsx",
  },
  "dropdown-with-descriptions": {
    component: DropdownDemos.WithDescriptions,
    file: "cn/dropdown/with-descriptions.tsx",
  },
  "dropdown-with-sections": {
    component: DropdownDemos.WithSections,
    file: "cn/dropdown/with-sections.tsx",
  },
  "dropdown-with-disabled-items": {
    component: DropdownDemos.WithDisabledItems,
    file: "cn/dropdown/with-disabled-items.tsx",
  },
  "dropdown-with-submenus": {
    component: DropdownDemos.WithSubmenus,
    file: "cn/dropdown/with-submenus.tsx",
  },
  "dropdown-with-custom-submenu-indicator": {
    component: DropdownDemos.WithCustomSubmenuIndicator,
    file: "cn/dropdown/with-custom-submenu-indicator.tsx",
  },
  "dropdown-controlled": {
    component: DropdownDemos.Controlled,
    file: "cn/dropdown/controlled.tsx",
  },
  "dropdown-controlled-open-state": {
    component: DropdownDemos.ControlledOpenState,
    file: "cn/dropdown/controlled-open-state.tsx",
  },
  "dropdown-custom-trigger": {
    component: DropdownDemos.CustomTrigger,
    file: "cn/dropdown/custom-trigger.tsx",
  },
  // ErrorMessage demos
  "error-message-basic": {
    component: ErrorMessageDemos.Basic,
    file: "cn/error-message/basic.tsx",
  },
  "error-message-with-tag-group": {
    component: ErrorMessageDemos.WithTagGroup,
    file: "cn/error-message/with-tag-group.tsx",
  },
  // Form demos
  "form-basic": {
    component: FormDemos.Basic,
    file: "cn/form/basic.tsx",
  },
  "form-custom-render-function": {
    component: FormDemos.CustomRenderFunction,
    file: "cn/form/custom-render-function.tsx",
  },
  // Fieldset demos
  "fieldset-basic": {
    component: FieldsetDemos.Basic,
    file: "cn/fieldset/basic.tsx",
  },
  "fieldset-on-surface": {
    component: FieldsetDemos.OnSurface,
    file: "cn/fieldset/on-surface.tsx",
  },
  // Input demos
  "input-basic": {
    component: InputDemos.Basic,
    file: "cn/input/basic.tsx",
  },
  "input-full-width": {
    component: InputDemos.FullWidth,
    file: "cn/input/full-width.tsx",
  },
  "input-types": {
    component: InputDemos.Types,
    file: "cn/input/types.tsx",
  },
  "input-controlled": {
    component: InputDemos.Controlled,
    file: "cn/input/controlled.tsx",
  },
  "input-on-surface": {
    component: InputDemos.OnSurface,
    file: "cn/input/on-surface.tsx",
  },
  "input-variants": {
    component: InputDemos.Variants,
    file: "cn/input/variants.tsx",
  },
  // DateField demos
  "date-field-basic": {
    component: DateFieldDemos.Basic,
    file: "cn/date-field/basic.tsx",
  },
  "date-field-controlled": {
    component: DateFieldDemos.Controlled,
    file: "cn/date-field/controlled.tsx",
  },
  "date-field-disabled": {
    component: DateFieldDemos.Disabled,
    file: "cn/date-field/disabled.tsx",
  },
  "date-field-form-example": {
    component: DateFieldDemos.FormExample,
    file: "cn/date-field/form-example.tsx",
  },
  "date-field-invalid": {
    component: DateFieldDemos.Invalid,
    file: "cn/date-field/invalid.tsx",
  },
  "date-field-on-surface": {
    component: DateFieldDemos.OnSurface,
    file: "cn/date-field/on-surface.tsx",
  },
  "date-field-required": {
    component: DateFieldDemos.Required,
    file: "cn/date-field/required.tsx",
  },
  "date-field-with-description": {
    component: DateFieldDemos.WithDescription,
    file: "cn/date-field/with-description.tsx",
  },
  "date-field-with-prefix-and-suffix": {
    component: DateFieldDemos.WithPrefixAndSuffix,
    file: "cn/date-field/with-prefix-and-suffix.tsx",
  },
  "date-field-with-prefix-icon": {
    component: DateFieldDemos.WithPrefixIcon,
    file: "cn/date-field/with-prefix-icon.tsx",
  },
  "date-field-with-suffix-icon": {
    component: DateFieldDemos.WithSuffixIcon,
    file: "cn/date-field/with-suffix-icon.tsx",
  },
  "date-field-full-width": {
    component: DateFieldDemos.FullWidth,
    file: "cn/date-field/full-width.tsx",
  },
  "date-field-granularity": {
    component: DateFieldDemos.Granularity,
    file: "cn/date-field/granularity.tsx",
  },
  "date-field-with-validation": {
    component: DateFieldDemos.WithValidation,
    file: "cn/date-field/with-validation.tsx",
  },
  "date-field-variants": {
    component: DateFieldDemos.Variants,
    file: "cn/date-field/variants.tsx",
  },
  "date-field-custom-render-function": {
    component: DateFieldDemos.CustomRenderFunction,
    file: "cn/date-field/custom-render-function.tsx",
  },
  // DatePicker demos
  "date-picker-basic": {
    component: DatePickerDemos.Basic,
    file: "cn/date-picker/basic.tsx",
  },
  "date-picker-controlled": {
    component: DatePickerDemos.Controlled,
    file: "cn/date-picker/controlled.tsx",
  },
  "date-picker-disabled": {
    component: DatePickerDemos.Disabled,
    file: "cn/date-picker/disabled.tsx",
  },
  "date-picker-format-options": {
    component: DatePickerDemos.FormatOptions,
    file: "cn/date-picker/format-options.tsx",
  },
  "date-picker-form-example": {
    component: DatePickerDemos.FormExample,
    file: "cn/date-picker/form-example.tsx",
  },
  "date-picker-with-custom-indicator": {
    component: DatePickerDemos.WithCustomIndicator,
    file: "cn/date-picker/with-custom-indicator.tsx",
  },
  "date-picker-with-validation": {
    component: DatePickerDemos.WithValidation,
    file: "cn/date-picker/with-validation.tsx",
  },
  "date-picker-international-calendar": {
    component: DatePickerDemos.InternationalCalendar,
    file: "cn/date-picker/international-calendar.tsx",
  },
  "date-picker-custom-render-function": {
    component: DatePickerDemos.CustomRenderFunction,
    file: "cn/date-picker/custom-render-function.tsx",
  },
  // DateRangePicker demos
  "date-range-picker-basic": {
    component: DateRangePickerDemos.Basic,
    file: "cn/date-range-picker/basic.tsx",
  },
  "date-range-picker-controlled": {
    component: DateRangePickerDemos.Controlled,
    file: "cn/date-range-picker/controlled.tsx",
  },
  "date-range-picker-disabled": {
    component: DateRangePickerDemos.Disabled,
    file: "cn/date-range-picker/disabled.tsx",
  },
  "date-range-picker-format-options": {
    component: DateRangePickerDemos.FormatOptions,
    file: "cn/date-range-picker/format-options.tsx",
  },
  "date-range-picker-form-example": {
    component: DateRangePickerDemos.FormExample,
    file: "cn/date-range-picker/form-example.tsx",
  },
  "date-range-picker-with-custom-indicator": {
    component: DateRangePickerDemos.WithCustomIndicator,
    file: "cn/date-range-picker/with-custom-indicator.tsx",
  },
  "date-range-picker-with-validation": {
    component: DateRangePickerDemos.WithValidation,
    file: "cn/date-range-picker/with-validation.tsx",
  },
  "date-range-picker-international-calendar": {
    component: DateRangePickerDemos.InternationalCalendar,
    file: "cn/date-range-picker/international-calendar.tsx",
  },
  "date-range-picker-custom-render-function": {
    component: DateRangePickerDemos.CustomRenderFunction,
    file: "cn/date-range-picker/custom-render-function.tsx",
  },
  "date-range-picker-input-container": {
    component: DateRangePickerDemos.InputContainer,
    file: "cn/date-range-picker/input-container.tsx",
  },
  // InputOTP demos
  "input-otp-basic": {
    component: InputOTPDemos.Basic,
    file: "cn/input-otp/basic.tsx",
  },
  "input-otp-four-digits": {
    component: InputOTPDemos.FourDigits,
    file: "cn/input-otp/four-digits.tsx",
  },
  "input-otp-disabled": {
    component: InputOTPDemos.Disabled,
    file: "cn/input-otp/disabled.tsx",
  },
  "input-otp-with-pattern": {
    component: InputOTPDemos.WithPattern,
    file: "cn/input-otp/with-pattern.tsx",
  },
  "input-otp-controlled": {
    component: InputOTPDemos.Controlled,
    file: "cn/input-otp/controlled.tsx",
  },
  "input-otp-with-validation": {
    component: InputOTPDemos.WithValidation,
    file: "cn/input-otp/with-validation.tsx",
  },
  "input-otp-on-complete": {
    component: InputOTPDemos.OnComplete,
    file: "cn/input-otp/on-complete.tsx",
  },
  "input-otp-form-example": {
    component: InputOTPDemos.FormExample,
    file: "cn/input-otp/form-example.tsx",
  },
  "input-otp-on-surface": {
    component: InputOTPDemos.OnSurface,
    file: "cn/input-otp/on-surface.tsx",
  },
  "input-otp-variants": {
    component: InputOTPDemos.Variants,
    file: "cn/input-otp/variants.tsx",
  },
  // InputGroup demos
  "input-group-default": {
    component: InputGroupDemos.Default,
    file: "cn/input-group/default.tsx",
  },
  "input-group-full-width": {
    component: InputGroupDemos.FullWidth,
    file: "cn/input-group/full-width.tsx",
  },
  "input-group-with-prefix-icon": {
    component: InputGroupDemos.WithPrefixIcon,
    file: "cn/input-group/with-prefix-icon.tsx",
  },
  "input-group-with-suffix-icon": {
    component: InputGroupDemos.WithSuffixIcon,
    file: "cn/input-group/with-suffix-icon.tsx",
  },
  "input-group-with-prefix-and-suffix": {
    component: InputGroupDemos.WithPrefixAndSuffix,
    file: "cn/input-group/with-prefix-and-suffix.tsx",
  },
  "input-group-with-text-prefix": {
    component: InputGroupDemos.WithTextPrefix,
    file: "cn/input-group/with-text-prefix.tsx",
  },
  "input-group-with-text-suffix": {
    component: InputGroupDemos.WithTextSuffix,
    file: "cn/input-group/with-text-suffix.tsx",
  },
  "input-group-with-icon-prefix-and-text-suffix": {
    component: InputGroupDemos.WithIconPrefixAndTextSuffix,
    file: "cn/input-group/with-icon-prefix-and-text-suffix.tsx",
  },
  "input-group-with-copy-suffix": {
    component: InputGroupDemos.WithCopySuffix,
    file: "cn/input-group/with-copy-suffix.tsx",
  },
  "input-group-with-icon-prefix-and-copy-suffix": {
    component: InputGroupDemos.WithIconPrefixAndCopySuffix,
    file: "cn/input-group/with-icon-prefix-and-copy-suffix.tsx",
  },
  "input-group-password-with-toggle": {
    component: InputGroupDemos.PasswordWithToggle,
    file: "cn/input-group/password-with-toggle.tsx",
  },
  "input-group-with-loading-suffix": {
    component: InputGroupDemos.WithLoadingSuffix,
    file: "cn/input-group/with-loading-suffix.tsx",
  },
  "input-group-with-keyboard-shortcut": {
    component: InputGroupDemos.WithKeyboardShortcut,
    file: "cn/input-group/with-keyboard-shortcut.tsx",
  },
  "input-group-with-badge-suffix": {
    component: InputGroupDemos.WithBadgeSuffix,
    file: "cn/input-group/with-badge-suffix.tsx",
  },
  "input-group-required": {
    component: InputGroupDemos.Required,
    file: "cn/input-group/required.tsx",
  },
  "input-group-invalid": {
    component: InputGroupDemos.Invalid,
    file: "cn/input-group/invalid.tsx",
  },
  "input-group-disabled": {
    component: InputGroupDemos.Disabled,
    file: "cn/input-group/disabled.tsx",
  },
  "input-group-on-surface": {
    component: InputGroupDemos.OnSurface,
    file: "cn/input-group/on-surface.tsx",
  },
  "input-group-with-textarea": {
    component: InputGroupDemos.WithTextArea,
    file: "cn/input-group/with-textarea.tsx",
  },
  "input-group-variants": {
    component: InputGroupDemos.Variants,
    file: "cn/input-group/variants.tsx",
  },
  // Kbd demos
  "kbd-basic": {
    component: KbdDemos.Basic,
    file: "cn/kbd/basic.tsx",
  },
  "kbd-navigation-keys": {
    component: KbdDemos.NavigationKeys,
    file: "cn/kbd/navigation.tsx",
  },
  "kbd-inline-usage": {
    component: KbdDemos.InlineUsage,
    file: "cn/kbd/inline.tsx",
  },
  "kbd-instructional-text": {
    component: KbdDemos.InstructionalText,
    file: "cn/kbd/instructional.tsx",
  },
  "kbd-special-keys": {
    component: KbdDemos.SpecialKeys,
    file: "cn/kbd/special.tsx",
  },
  "kbd-variants": {
    component: KbdDemos.Variants,
    file: "cn/kbd/variants.tsx",
  },
  // Link demos
  "link-basic": {
    component: LinkDemos.Basic,
    file: "cn/link/basic.tsx",
  },
  "link-custom-icon": {
    component: LinkDemos.CustomIcon,
    file: "cn/link/custom-icon.tsx",
  },
  "link-icon-placement": {
    component: LinkDemos.IconPlacement,
    file: "cn/link/icon-placement.tsx",
  },
  "link-underline-and-offset": {
    component: LinkDemos.UnderlineAndOffset,
    file: "cn/link/underline-and-offset.tsx",
  },
  "link-custom-render-function": {
    component: LinkDemos.CustomRenderFunction,
    file: "cn/link/custom-render-function.tsx",
  },
  // RadioGroup demos
  "radio-group-basic": {
    component: RadioGroupDemos.Basic,
    file: "cn/radio-group/basic.tsx",
  },
  "radio-group-controlled": {
    component: RadioGroupDemos.Controlled,
    file: "cn/radio-group/controlled.tsx",
  },
  "radio-group-custom-indicator": {
    component: RadioGroupDemos.CustomIndicator,
    file: "cn/radio-group/custom-indicator.tsx",
  },
  "radio-group-delivery-and-payment": {
    component: RadioGroupDemos.DeliveryAndPayment,
    file: "cn/radio-group/delivery-and-payment.tsx",
  },
  "radio-group-disabled": {
    component: RadioGroupDemos.Disabled,
    file: "cn/radio-group/disabled.tsx",
  },
  "radio-group-horizontal": {
    component: RadioGroupDemos.Horizontal,
    file: "cn/radio-group/horizontal.tsx",
  },
  "radio-group-uncontrolled": {
    component: RadioGroupDemos.Uncontrolled,
    file: "cn/radio-group/uncontrolled.tsx",
  },
  "radio-group-validation": {
    component: RadioGroupDemos.Validation,
    file: "cn/radio-group/validation.tsx",
  },
  "radio-group-on-surface": {
    component: RadioGroupDemos.OnSurface,
    file: "cn/radio-group/on-surface.tsx",
  },
  "radio-group-variants": {
    component: RadioGroupDemos.Variants,
    file: "cn/radio-group/variants.tsx",
  },
  "radio-group-custom-render-function": {
    component: RadioGroupDemos.CustomRenderFunction,
    file: "cn/radio-group/custom-render-function.tsx",
  },
  // Skeleton demos
  "skeleton-basic": {
    component: SkeletonDemos.Basic,
    file: "cn/skeleton/basic.tsx",
  },
  "skeleton-text-content": {
    component: SkeletonDemos.TextContent,
    file: "cn/skeleton/text-content.tsx",
  },
  "skeleton-user-profile": {
    component: SkeletonDemos.UserProfile,
    file: "cn/skeleton/user-profile.tsx",
  },
  "skeleton-list": {
    component: SkeletonDemos.List,
    file: "cn/skeleton/list.tsx",
  },
  "skeleton-animation-types": {
    component: SkeletonDemos.AnimationTypes,
    file: "cn/skeleton/animation-types.tsx",
  },
  "skeleton-grid": {
    component: SkeletonDemos.Grid,
    file: "cn/skeleton/grid.tsx",
  },
  "skeleton-single-shimmer": {
    component: SkeletonDemos.SingleShimmer,
    file: "cn/skeleton/single-shimmer.tsx",
  },
  // Separator demos
  "separator-basic": {
    component: SeparatorDemos.Basic,
    file: "cn/separator/basic.tsx",
  },
  "separator-vertical": {
    component: SeparatorDemos.Vertical,
    file: "cn/separator/vertical.tsx",
  },
  "separator-with-content": {
    component: SeparatorDemos.WithContent,
    file: "cn/separator/with-content.tsx",
  },
  "separator-variants": {
    component: SeparatorDemos.Variants,
    file: "cn/separator/variants.tsx",
  },
  "separator-with-surface": {
    component: SeparatorDemos.WithSurface,
    file: "cn/separator/with-surface.tsx",
  },
  "separator-manual-variant-override": {
    component: SeparatorDemos.ManualVariantOverride,
    file: "cn/separator/manual-variant-override.tsx",
  },
  "separator-custom-render-function": {
    component: SeparatorDemos.CustomRenderFunction,
    file: "cn/separator/custom-render-function.tsx",
  },
  // Spinner demos
  "spinner-basic": {
    component: SpinnerDemos.Basic,
    file: "cn/spinner/basic.tsx",
  },
  "spinner-colors": {
    component: SpinnerDemos.Colors,
    file: "cn/spinner/colors.tsx",
  },
  "spinner-sizes": {
    component: SpinnerDemos.Sizes,
    file: "cn/spinner/sizes.tsx",
  },
  // Surface demos
  "surface-variants": {
    component: SurfaceDemos.Variants,
    file: "cn/surface/variants.tsx",
  },
  // Switch demos
  "switch-basic": {
    component: SwitchDemos.Basic,
    file: "cn/switch/basic.tsx",
  },
  "switch-disabled": {
    component: SwitchDemos.Disabled,
    file: "cn/switch/disabled.tsx",
  },
  "switch-default-selected": {
    component: SwitchDemos.DefaultSelected,
    file: "cn/switch/default-selected.tsx",
  },
  "switch-controlled": {
    component: SwitchDemos.Controlled,
    file: "cn/switch/controlled.tsx",
  },
  "switch-without-label": {
    component: SwitchDemos.WithoutLabel,
    file: "cn/switch/without-label.tsx",
  },
  "switch-sizes": {
    component: SwitchDemos.Sizes,
    file: "cn/switch/sizes.tsx",
  },
  "switch-label-position": {
    component: SwitchDemos.LabelPosition,
    file: "cn/switch/label-position.tsx",
  },
  "switch-with-icons": {
    component: SwitchDemos.WithIcons,
    file: "cn/switch/with-icons.tsx",
  },
  "switch-with-description": {
    component: SwitchDemos.WithDescription,
    file: "cn/switch/with-description.tsx",
  },
  "switch-group": {
    component: SwitchDemos.Group,
    file: "cn/switch/group.tsx",
  },
  "switch-group-horizontal": {
    component: SwitchDemos.GroupHorizontal,
    file: "cn/switch/group-horizontal.tsx",
  },
  "switch-render-props": {
    component: SwitchDemos.RenderProps,
    file: "cn/switch/render-props.tsx",
  },
  "switch-form": {
    component: SwitchDemos.Form,
    file: "cn/switch/form.tsx",
  },
  "switch-custom-styles": {
    component: SwitchDemos.CustomStyles,
    file: "cn/switch/custom-styles.tsx",
  },
  "switch-custom-render-function": {
    component: SwitchDemos.CustomRenderFunction,
    file: "cn/switch/custom-render-function.tsx",
  },
  // Tabs demos
  "tabs-basic": {
    component: TabsDemos.Basic,
    file: "cn/tabs/basic.tsx",
  },
  "tabs-vertical": {
    component: TabsDemos.Vertical,
    file: "cn/tabs/vertical.tsx",
  },
  "tabs-disabled": {
    component: TabsDemos.Disabled,
    file: "cn/tabs/disabled.tsx",
  },
  "tabs-custom-styles": {
    component: TabsDemos.CustomStyles,
    file: "cn/tabs/custom-styles.tsx",
  },
  "tabs-with-separator": {
    component: TabsDemos.WithSeparator,
    file: "cn/tabs/with-separator.tsx",
  },
  "tabs-secondary": {
    component: TabsDemos.Secondary,
    file: "cn/tabs/secondary.tsx",
  },
  "tabs-secondary-vertical": {
    component: TabsDemos.SecondaryVertical,
    file: "cn/tabs/secondary-vertical.tsx",
  },
  "tabs-custom-render-function": {
    component: TabsDemos.CustomRenderFunction,
    file: "cn/tabs/custom-render-function.tsx",
  },
  // TagGroup demos
  "tag-group-basic": {
    component: TagGroupDemos.Basic,
    file: "cn/tag-group/basic.tsx",
  },
  "tag-group-sizes": {
    component: TagGroupDemos.Sizes,
    file: "cn/tag-group/sizes.tsx",
  },
  "tag-group-variants": {
    component: TagGroupDemos.Variants,
    file: "cn/tag-group/variants.tsx",
  },
  "tag-group-disabled": {
    component: TagGroupDemos.Disabled,
    file: "cn/tag-group/disabled.tsx",
  },
  "tag-group-selection-modes": {
    component: TagGroupDemos.SelectionModes,
    file: "cn/tag-group/selection-modes.tsx",
  },
  "tag-group-controlled": {
    component: TagGroupDemos.Controlled,
    file: "cn/tag-group/controlled.tsx",
  },
  "tag-group-with-error-message": {
    component: TagGroupDemos.WithErrorMessage,
    file: "cn/tag-group/with-error-message.tsx",
  },
  "tag-group-with-prefix": {
    component: TagGroupDemos.WithPrefix,
    file: "cn/tag-group/with-prefix.tsx",
  },
  "tag-group-with-remove-button": {
    component: TagGroupDemos.WithRemoveButton,
    file: "cn/tag-group/with-remove-button.tsx",
  },
  "tag-group-with-list-data": {
    component: TagGroupDemos.WithListData,
    file: "cn/tag-group/with-list-data.tsx",
  },
  "tag-group-custom-render-function": {
    component: TagGroupDemos.CustomRenderFunction,
    file: "cn/tag-group/custom-render-function.tsx",
  },
  // Table demos
  "table-basic": {
    component: TableDemos.Basic,
    file: "cn/table/basic.tsx",
  },
  "table-secondary-variant": {
    component: TableDemos.SecondaryVariant,
    file: "cn/table/secondary-variant.tsx",
  },
  "table-sorting": {
    component: TableDemos.Sorting,
    file: "cn/table/sorting.tsx",
  },
  "table-selection": {
    component: TableDemos.SelectionDemo,
    file: "cn/table/selection.tsx",
  },
  "table-custom-cells": {
    component: TableDemos.CustomCells,
    file: "cn/table/custom-cells.tsx",
  },
  "table-expandable-rows": {
    component: TableDemos.ExpandableRows,
    file: "cn/table/expandable-rows.tsx",
  },
  "table-pagination": {
    component: TableDemos.PaginationDemo,
    file: "cn/table/pagination.tsx",
  },
  "table-column-resizing": {
    component: TableDemos.ColumnResizing,
    file: "cn/table/column-resizing.tsx",
  },
  "table-empty-state": {
    component: TableDemos.EmptyStateDemo,
    file: "cn/table/empty-state.tsx",
  },
  "table-async-loading": {
    component: TableDemos.AsyncLoading,
    file: "cn/table/async-loading.tsx",
  },
  "table-virtualization": {
    component: TableDemos.Virtualization,
    file: "cn/table/virtualization.tsx",
  },
  "table-tanstack-table": {
    component: TableDemos.TanstackTable,
    file: "cn/table/tanstack-table.tsx",
  },
  // TextArea demos
  "textarea-basic": {
    component: TextAreaDemos.Basic,
    file: "cn/textarea/basic.tsx",
  },
  "textarea-full-width": {
    component: TextAreaDemos.FullWidth,
    file: "cn/textarea/full-width.tsx",
  },
  "textarea-rows": {
    component: TextAreaDemos.Rows,
    file: "cn/textarea/rows.tsx",
  },
  "textarea-controlled": {
    component: TextAreaDemos.Controlled,
    file: "cn/textarea/controlled.tsx",
  },
  "textarea-on-surface": {
    component: TextAreaDemos.OnSurface,
    file: "cn/textarea/on-surface.tsx",
  },
  "textarea-variants": {
    component: TextAreaDemos.Variants,
    file: "cn/textarea/variants.tsx",
  },
  // Typography demos
  "typography-default": {
    component: TypographyDemos.Default,
    file: "cn/typography/default.tsx",
  },
  "typography-primitives": {
    component: TypographyDemos.Primitives,
    file: "cn/typography/primitives.tsx",
  },
  "typography-prose": {
    component: TypographyDemos.Prose,
    file: "cn/typography/prose.tsx",
  },
  "typography-render-props": {
    component: TypographyDemos.RenderProps,
    file: "cn/typography/render-props.tsx",
  },
  "typography-typography-scale": {
    component: TypographyDemos.TypographyScale,
    file: "cn/typography/typography-scale.tsx",
  },
  // TextField demos
  "textfield-basic": {
    component: TextFieldDemos.Basic,
    file: "cn/textfield/basic.tsx",
  },
  "textfield-with-description": {
    component: TextFieldDemos.WithDescription,
    file: "cn/textfield/with-description.tsx",
  },
  "textfield-required": {
    component: TextFieldDemos.Required,
    file: "cn/textfield/required.tsx",
  },
  "textfield-with-error": {
    component: TextFieldDemos.WithError,
    file: "cn/textfield/with-error.tsx",
  },
  "textfield-disabled": {
    component: TextFieldDemos.Disabled,
    file: "cn/textfield/disabled.tsx",
  },
  "textfield-textarea": {
    component: TextFieldDemos.TextArea,
    file: "cn/textfield/textarea.tsx",
  },
  "textfield-input-types": {
    component: TextFieldDemos.InputTypes,
    file: "cn/textfield/input-types.tsx",
  },
  "textfield-full-width": {
    component: TextFieldDemos.FullWidth,
    file: "cn/textfield/full-width.tsx",
  },
  "textfield-controlled": {
    component: TextFieldDemos.Controlled,
    file: "cn/textfield/controlled.tsx",
  },
  "textfield-validation": {
    component: TextFieldDemos.Validation,
    file: "cn/textfield/validation.tsx",
  },
  "textfield-on-surface": {
    component: TextFieldDemos.OnSurface,
    file: "cn/textfield/on-surface.tsx",
  },
  "textfield-custom-render-function": {
    component: TextFieldDemos.CustomRenderFunction,
    file: "cn/textfield/custom-render-function.tsx",
  },
  // TimeField demos
  "time-field-basic": {
    component: TimeFieldDemos.Basic,
    file: "cn/time-field/basic.tsx",
  },
  "time-field-controlled": {
    component: TimeFieldDemos.Controlled,
    file: "cn/time-field/controlled.tsx",
  },
  "time-field-disabled": {
    component: TimeFieldDemos.Disabled,
    file: "cn/time-field/disabled.tsx",
  },
  "time-field-form-example": {
    component: TimeFieldDemos.FormExample,
    file: "cn/time-field/form-example.tsx",
  },
  "time-field-invalid": {
    component: TimeFieldDemos.Invalid,
    file: "cn/time-field/invalid.tsx",
  },
  "time-field-on-surface": {
    component: TimeFieldDemos.OnSurface,
    file: "cn/time-field/on-surface.tsx",
  },
  "time-field-required": {
    component: TimeFieldDemos.Required,
    file: "cn/time-field/required.tsx",
  },
  "time-field-with-description": {
    component: TimeFieldDemos.WithDescription,
    file: "cn/time-field/with-description.tsx",
  },
  "time-field-with-prefix-and-suffix": {
    component: TimeFieldDemos.WithPrefixAndSuffix,
    file: "cn/time-field/with-prefix-and-suffix.tsx",
  },
  "time-field-with-prefix-icon": {
    component: TimeFieldDemos.WithPrefixIcon,
    file: "cn/time-field/with-prefix-icon.tsx",
  },
  "time-field-with-suffix-icon": {
    component: TimeFieldDemos.WithSuffixIcon,
    file: "cn/time-field/with-suffix-icon.tsx",
  },
  "time-field-full-width": {
    component: TimeFieldDemos.FullWidth,
    file: "cn/time-field/full-width.tsx",
  },
  "time-field-with-validation": {
    component: TimeFieldDemos.WithValidation,
    file: "cn/time-field/with-validation.tsx",
  },
  "time-field-custom-render-function": {
    component: TimeFieldDemos.CustomRenderFunction,
    file: "cn/time-field/custom-render-function.tsx",
  },
  // Toast demos
  "toast-default": {
    component: ToastDemos.Default,
    file: "cn/toast/default.tsx",
  },
  "toast-simple": {
    component: ToastDemos.Simple,
    file: "cn/toast/simple.tsx",
  },
  "toast-variants": {
    component: ToastDemos.Variants,
    file: "cn/toast/variants.tsx",
  },
  "toast-custom-indicator": {
    component: ToastDemos.CustomIndicator,
    file: "cn/toast/custom-indicator.tsx",
  },
  "toast-promise": {
    component: ToastDemos.Promise,
    file: "cn/toast/promise.tsx",
  },
  "toast-callbacks": {
    component: ToastDemos.Callbacks,
    file: "cn/toast/callbacks.tsx",
  },
  "toast-placements": {
    component: ToastDemos.Placements,
    file: "cn/toast/placements.tsx",
  },
  "toast-custom-toast": {
    component: ToastDemos.CustomToast,
    file: "cn/toast/custom-toast.tsx",
  },
  "toast-custom-queue": {
    component: ToastDemos.CustomQueue,
    file: "cn/toast/custom-queue.tsx",
  },
  // ToggleButton demos
  "toggle-button-basic": {
    component: ToggleButtonDemos.Basic,
    file: "cn/toggle-button/basic.tsx",
  },
  "toggle-button-variants": {
    component: ToggleButtonDemos.Variants,
    file: "cn/toggle-button/variants.tsx",
  },
  "toggle-button-sizes": {
    component: ToggleButtonDemos.Sizes,
    file: "cn/toggle-button/sizes.tsx",
  },
  "toggle-button-icon-only": {
    component: ToggleButtonDemos.IconOnly,
    file: "cn/toggle-button/icon-only.tsx",
  },
  "toggle-button-controlled": {
    component: ToggleButtonDemos.Controlled,
    file: "cn/toggle-button/controlled.tsx",
  },
  "toggle-button-disabled": {
    component: ToggleButtonDemos.Disabled,
    file: "cn/toggle-button/disabled.tsx",
  },
  // ToggleButtonGroup demos
  "toggle-button-group-basic": {
    component: ToggleButtonGroupDemos.Basic,
    file: "cn/toggle-button-group/basic.tsx",
  },
  "toggle-button-group-sizes": {
    component: ToggleButtonGroupDemos.Sizes,
    file: "cn/toggle-button-group/sizes.tsx",
  },
  "toggle-button-group-orientation": {
    component: ToggleButtonGroupDemos.Orientation,
    file: "cn/toggle-button-group/orientation.tsx",
  },
  "toggle-button-group-attached": {
    component: ToggleButtonGroupDemos.Attached,
    file: "cn/toggle-button-group/attached.tsx",
  },
  "toggle-button-group-full-width": {
    component: ToggleButtonGroupDemos.FullWidth,
    file: "cn/toggle-button-group/full-width.tsx",
  },
  "toggle-button-group-selection-mode": {
    component: ToggleButtonGroupDemos.SelectionMode,
    file: "cn/toggle-button-group/selection-mode.tsx",
  },
  "toggle-button-group-controlled": {
    component: ToggleButtonGroupDemos.Controlled,
    file: "cn/toggle-button-group/controlled.tsx",
  },
  "toggle-button-group-disabled": {
    component: ToggleButtonGroupDemos.Disabled,
    file: "cn/toggle-button-group/disabled.tsx",
  },
  "toggle-button-group-without-separator": {
    component: ToggleButtonGroupDemos.WithoutSeparator,
    file: "cn/toggle-button-group/without-separator.tsx",
  },
  // Toolbar demos
  "toolbar-basic": {
    component: ToolbarDemos.Basic,
    file: "cn/toolbar/basic.tsx",
  },
  "toolbar-vertical": {
    component: ToolbarDemos.Vertical,
    file: "cn/toolbar/vertical.tsx",
  },
  "toolbar-with-button-group": {
    component: ToolbarDemos.WithButtonGroup,
    file: "cn/toolbar/with-button-group.tsx",
  },
  "toolbar-attached": {
    component: ToolbarDemos.Attached,
    file: "cn/toolbar/custom-styles.tsx",
  },
  // Tooltip demos
  "tooltip-basic": {
    component: TooltipDemos.Basic,
    file: "cn/tooltip/basic.tsx",
  },
  "tooltip-with-arrow": {
    component: TooltipDemos.WithArrow,
    file: "cn/tooltip/with-arrow.tsx",
  },
  "tooltip-placement": {
    component: TooltipDemos.Placement,
    file: "cn/tooltip/placement.tsx",
  },
  "tooltip-custom-trigger": {
    component: TooltipDemos.CustomTrigger,
    file: "cn/tooltip/custom-trigger.tsx",
  },
  "tooltip-custom-render-function": {
    component: TooltipDemos.CustomRenderFunction,
    file: "cn/tooltip/custom-render-function.tsx",
  },
  // Popover demos
  "popover-basic": {
    component: PopoverDemos.Basic,
    file: "cn/popover/basic.tsx",
  },
  "popover-with-arrow": {
    component: PopoverDemos.WithArrow,
    file: "cn/popover/with-arrow.tsx",
  },
  "popover-placement": {
    component: PopoverDemos.Placement,
    file: "cn/popover/placement.tsx",
  },
  "popover-interactive": {
    component: PopoverDemos.Interactive,
    file: "cn/popover/interactive.tsx",
  },
  "popover-custom-render-function": {
    component: PopoverDemos.CustomRenderFunction,
    file: "cn/popover/custom-render-function.tsx",
  },
  // Label demos
  "label-basic": {
    component: LabelDemos.Basic,
    file: "cn/label/basic.tsx",
  },
  // ListBox demos
  "list-box-controlled": {
    component: ListBoxDemos.Controlled,
    file: "cn/list-box/controlled.tsx",
  },
  "list-box-custom-check-icon": {
    component: ListBoxDemos.CustomCheckIcon,
    file: "cn/list-box/custom-check-icon.tsx",
  },
  "list-box-default": {
    component: ListBoxDemos.Default,
    file: "cn/list-box/default.tsx",
  },
  "list-box-multi-select": {
    component: ListBoxDemos.MultiSelect,
    file: "cn/list-box/multi-select.tsx",
  },
  "list-box-scrollbar-modes": {
    component: ListBoxDemos.ScrollbarModes,
    file: "cn/list-box/scrollbar-modes.tsx",
  },
  "list-box-with-disabled-items": {
    component: ListBoxDemos.WithDisabledItems,
    file: "cn/list-box/with-disabled-items.tsx",
  },
  "list-box-with-sections": {
    component: ListBoxDemos.WithSections,
    file: "cn/list-box/with-sections.tsx",
  },
  "list-box-custom-render-function": {
    component: ListBoxDemos.CustomRenderFunction,
    file: "cn/list-box/custom-render-function.tsx",
  },
  "list-box-virtualization": {
    component: ListBoxDemos.Virtualization,
    file: "cn/list-box/virtualization.tsx",
  },
  // Meter demos
  "meter-basic": {
    component: MeterDemos.Basic,
    file: "cn/meter/basic.tsx",
  },
  "meter-sizes": {
    component: MeterDemos.Sizes,
    file: "cn/meter/sizes.tsx",
  },
  "meter-colors": {
    component: MeterDemos.Colors,
    file: "cn/meter/colors.tsx",
  },
  "meter-custom-value": {
    component: MeterDemos.CustomValue,
    file: "cn/meter/custom-value.tsx",
  },
  "meter-without-label": {
    component: MeterDemos.WithoutLabel,
    file: "cn/meter/without-label.tsx",
  },
  // ProgressBar demos
  "progress-bar-basic": {
    component: ProgressBarDemos.Basic,
    file: "cn/progress-bar/basic.tsx",
  },
  "progress-bar-sizes": {
    component: ProgressBarDemos.Sizes,
    file: "cn/progress-bar/sizes.tsx",
  },
  "progress-bar-colors": {
    component: ProgressBarDemos.Colors,
    file: "cn/progress-bar/colors.tsx",
  },
  "progress-bar-indeterminate": {
    component: ProgressBarDemos.Indeterminate,
    file: "cn/progress-bar/indeterminate.tsx",
  },
  "progress-bar-custom-value": {
    component: ProgressBarDemos.CustomValue,
    file: "cn/progress-bar/custom-value.tsx",
  },
  "progress-bar-without-label": {
    component: ProgressBarDemos.WithoutLabel,
    file: "cn/progress-bar/without-label.tsx",
  },
  // ProgressCircle demos
  "progress-circle-basic": {
    component: ProgressCircleDemos.Basic,
    file: "cn/progress-circle/basic.tsx",
  },
  "progress-circle-sizes": {
    component: ProgressCircleDemos.Sizes,
    file: "cn/progress-circle/sizes.tsx",
  },
  "progress-circle-colors": {
    component: ProgressCircleDemos.Colors,
    file: "cn/progress-circle/colors.tsx",
  },
  "progress-circle-indeterminate": {
    component: ProgressCircleDemos.Indeterminate,
    file: "cn/progress-circle/indeterminate.tsx",
  },
  "progress-circle-with-label": {
    component: ProgressCircleDemos.WithLabel,
    file: "cn/progress-circle/with-label.tsx",
  },
  "progress-circle-custom-svg": {
    component: ProgressCircleDemos.CustomSvg,
    file: "cn/progress-circle/custom-svg.tsx",
  },
  // Modal demos
  "modal-default": {
    component: ModalDemos.Default,
    file: "cn/modal/default.tsx",
  },
  "modal-placements": {
    component: ModalDemos.Placements,
    file: "cn/modal/placements.tsx",
  },
  "modal-backdrop-variants": {
    component: ModalDemos.BackdropVariants,
    file: "cn/modal/backdrop-variants.tsx",
  },
  "modal-scroll-comparison": {
    component: ModalDemos.ScrollComparison,
    file: "cn/modal/scroll-comparison.tsx",
  },
  "modal-dismiss-behavior": {
    component: ModalDemos.DismissBehavior,
    file: "cn/modal/dismiss-behavior.tsx",
  },
  "modal-with-form": {
    component: ModalDemos.WithForm,
    file: "cn/modal/with-form.tsx",
  },
  "modal-controlled": {
    component: ModalDemos.Controlled,
    file: "cn/modal/controlled.tsx",
  },
  "modal-custom-trigger": {
    component: ModalDemos.CustomTrigger,
    file: "cn/modal/custom-trigger.tsx",
  },
  "modal-custom-backdrop": {
    component: ModalDemos.CustomBackdrop,
    file: "cn/modal/custom-backdrop.tsx",
  },
  "modal-custom-animations": {
    component: ModalDemos.CustomAnimations,
    file: "cn/modal/custom-animations.tsx",
  },
  "modal-sizes": {
    component: ModalDemos.Sizes,
    file: "cn/modal/sizes.tsx",
  },
  "modal-close-methods": {
    component: ModalDemos.CloseMethods,
    file: "cn/modal/close-methods.tsx",
  },
  "modal-custom-portal": {
    component: ModalDemos.CustomPortal,
    file: "cn/modal/custom-portal.tsx",
  },
  // NumberField demos
  "number-field-basic": {
    component: NumberFieldDemos.Basic,
    file: "cn/number-field/basic.tsx",
  },
  "number-field-with-description": {
    component: NumberFieldDemos.WithDescription,
    file: "cn/number-field/with-description.tsx",
  },
  "number-field-required": {
    component: NumberFieldDemos.Required,
    file: "cn/number-field/required.tsx",
  },
  "number-field-validation": {
    component: NumberFieldDemos.Validation,
    file: "cn/number-field/validation.tsx",
  },
  "number-field-disabled": {
    component: NumberFieldDemos.Disabled,
    file: "cn/number-field/disabled.tsx",
  },
  "number-field-full-width": {
    component: NumberFieldDemos.FullWidth,
    file: "cn/number-field/full-width.tsx",
  },
  "number-field-controlled": {
    component: NumberFieldDemos.Controlled,
    file: "cn/number-field/controlled.tsx",
  },
  "number-field-with-validation": {
    component: NumberFieldDemos.WithValidation,
    file: "cn/number-field/with-validation.tsx",
  },
  "number-field-with-step": {
    component: NumberFieldDemos.WithStep,
    file: "cn/number-field/with-step.tsx",
  },
  "number-field-with-format-options": {
    component: NumberFieldDemos.WithFormatOptions,
    file: "cn/number-field/with-format-options.tsx",
  },
  "number-field-custom-icons": {
    component: NumberFieldDemos.CustomIcons,
    file: "cn/number-field/custom-icons.tsx",
  },
  "number-field-on-surface": {
    component: NumberFieldDemos.OnSurface,
    file: "cn/number-field/on-surface.tsx",
  },
  "number-field-with-chevrons": {
    component: NumberFieldDemos.WithChevrons,
    file: "cn/number-field/with-chevrons.tsx",
  },
  "number-field-form-example": {
    component: NumberFieldDemos.FormExample,
    file: "cn/number-field/form-example.tsx",
  },
  "number-field-variants": {
    component: NumberFieldDemos.Variants,
    file: "cn/number-field/variants.tsx",
  },
  "number-field-custom-render-function": {
    component: NumberFieldDemos.CustomRenderFunction,
    file: "cn/number-field/custom-render-function.tsx",
  },
  // Pagination demos
  "pagination-basic": {
    component: PaginationDemos.Basic,
    file: "cn/pagination/basic.tsx",
  },
  "pagination-sizes": {
    component: PaginationDemos.Sizes,
    file: "cn/pagination/sizes.tsx",
  },
  "pagination-with-ellipsis": {
    component: PaginationDemos.WithEllipsis,
    file: "cn/pagination/with-ellipsis.tsx",
  },
  "pagination-simple-prev-next": {
    component: PaginationDemos.SimplePrevNext,
    file: "cn/pagination/simple-prev-next.tsx",
  },
  "pagination-with-summary": {
    component: PaginationDemos.WithSummary,
    file: "cn/pagination/with-summary.tsx",
  },
  "pagination-custom-icons": {
    component: PaginationDemos.CustomIcons,
    file: "cn/pagination/custom-icons.tsx",
  },
  "pagination-controlled": {
    component: PaginationDemos.Controlled,
    file: "cn/pagination/controlled.tsx",
  },
  "pagination-disabled": {
    component: PaginationDemos.Disabled,
    file: "cn/pagination/disabled.tsx",
  },
  // Select demos
  "select-default": {
    component: SelectDemos.Default,
    file: "cn/select/default.tsx",
  },
  "select-with-description": {
    component: SelectDemos.WithDescription,
    file: "cn/select/with-description.tsx",
  },
  "select-multiple-select": {
    component: SelectDemos.MultipleSelect,
    file: "cn/select/multiple-select.tsx",
  },
  "select-with-sections": {
    component: SelectDemos.WithSections,
    file: "cn/select/with-sections.tsx",
  },
  "select-with-disabled-options": {
    component: SelectDemos.WithDisabledOptions,
    file: "cn/select/with-disabled-options.tsx",
  },
  "select-custom-indicator": {
    component: SelectDemos.CustomIndicator,
    file: "cn/select/custom-indicator.tsx",
  },
  "select-required": {
    component: SelectDemos.Required,
    file: "cn/select/required.tsx",
  },
  "select-full-width": {
    component: SelectDemos.FullWidth,
    file: "cn/select/full-width.tsx",
  },
  "select-on-surface": {
    component: SelectDemos.OnSurface,
    file: "cn/select/on-surface.tsx",
  },
  "select-custom-value": {
    component: SelectDemos.CustomValue,
    file: "cn/select/custom-value.tsx",
  },
  "select-custom-value-multiple": {
    component: SelectDemos.CustomValueMultiple,
    file: "cn/select/custom-value-multiple.tsx",
  },
  "select-controlled": {
    component: SelectDemos.Controlled,
    file: "cn/select/controlled.tsx",
  },
  "select-controlled-multiple": {
    component: SelectDemos.ControlledMultiple,
    file: "cn/select/controlled-multiple.tsx",
  },
  "select-controlled-open-state": {
    component: SelectDemos.ControlledOpenState,
    file: "cn/select/controlled-open-state.tsx",
  },
  "select-asynchronous-loading": {
    component: SelectDemos.AsynchronousLoading,
    file: "cn/select/asynchronous-loading.tsx",
  },
  "select-disabled": {
    component: SelectDemos.Disabled,
    file: "cn/select/disabled.tsx",
  },
  "select-variants": {
    component: SelectDemos.Variants,
    file: "cn/select/variants.tsx",
  },
  "select-custom-render-function": {
    component: SelectDemos.CustomRenderFunction,
    file: "cn/select/custom-render-function.tsx",
  },
  // SearchField demos
  "search-field-basic": {
    component: SearchFieldDemos.Basic,
    file: "cn/search-field/basic.tsx",
  },
  "search-field-with-description": {
    component: SearchFieldDemos.WithDescription,
    file: "cn/search-field/with-description.tsx",
  },
  "search-field-required": {
    component: SearchFieldDemos.Required,
    file: "cn/search-field/required.tsx",
  },
  "search-field-validation": {
    component: SearchFieldDemos.Validation,
    file: "cn/search-field/validation.tsx",
  },
  "search-field-disabled": {
    component: SearchFieldDemos.Disabled,
    file: "cn/search-field/disabled.tsx",
  },
  "search-field-full-width": {
    component: SearchFieldDemos.FullWidth,
    file: "cn/search-field/full-width.tsx",
  },
  "search-field-controlled": {
    component: SearchFieldDemos.Controlled,
    file: "cn/search-field/controlled.tsx",
  },
  "search-field-with-validation": {
    component: SearchFieldDemos.WithValidation,
    file: "cn/search-field/with-validation.tsx",
  },
  "search-field-custom-icons": {
    component: SearchFieldDemos.CustomIcons,
    file: "cn/search-field/custom-icons.tsx",
  },
  "search-field-on-surface": {
    component: SearchFieldDemos.OnSurface,
    file: "cn/search-field/on-surface.tsx",
  },
  "search-field-form-example": {
    component: SearchFieldDemos.FormExample,
    file: "cn/search-field/form-example.tsx",
  },
  "search-field-with-keyboard-shortcut": {
    component: SearchFieldDemos.WithKeyboardShortcut,
    file: "cn/search-field/with-keyboard-shortcut.tsx",
  },
  "search-field-variants": {
    component: SearchFieldDemos.Variants,
    file: "cn/search-field/variants.tsx",
  },
  "search-field-custom-render-function": {
    component: SearchFieldDemos.CustomRenderFunction,
    file: "cn/search-field/custom-render-function.tsx",
  },
  // ScrollShadow demos
  "scroll-shadow-default": {
    component: ScrollShadowDemos.Default,
    file: "cn/scroll-shadow/default.tsx",
  },
  "scroll-shadow-orientation": {
    component: ScrollShadowDemos.Orientation,
    file: "cn/scroll-shadow/orientation.tsx",
  },
  "scroll-shadow-hide-scroll-bar": {
    component: ScrollShadowDemos.HideScrollBar,
    file: "cn/scroll-shadow/hide-scroll-bar.tsx",
  },
  "scroll-shadow-custom-size": {
    component: ScrollShadowDemos.CustomSize,
    file: "cn/scroll-shadow/custom-size.tsx",
  },
  "scroll-shadow-visibility-change": {
    component: ScrollShadowDemos.VisibilityChange,
    file: "cn/scroll-shadow/visibility-change.tsx",
  },
  "scroll-shadow-with-card": {
    component: ScrollShadowDemos.WithCard,
    file: "cn/scroll-shadow/with-card.tsx",
  },
  // Slider demos
  "slider-default": {
    component: SliderDemos.Default,
    file: "cn/slider/default.tsx",
  },
  "slider-vertical": {
    component: SliderDemos.Vertical,
    file: "cn/slider/vertical.tsx",
  },
  "slider-range": {
    component: SliderDemos.Range,
    file: "cn/slider/range.tsx",
  },
  "slider-disabled": {
    component: SliderDemos.Disabled,
    file: "cn/slider/disabled.tsx",
  },
  "slider-custom-render-function": {
    component: SliderDemos.CustomRenderFunction,
    file: "cn/slider/custom-render-function.tsx",
  },
  // Description demos
  "description-basic": {
    component: DescriptionDemos.Basic,
    file: "cn/description/basic.tsx",
  },
  // FieldError demos
  "field-error-basic": {
    component: FieldErrorDemos.Basic,
    file: "cn/field-error/basic.tsx",
  },
};

export function getDemo(name: string): DemoItem | undefined {
  return demos[name];
}
