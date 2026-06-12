/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix */
import type {DemoItem} from "@/demos";

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

export const demos: Record<string, DemoItem> = {
  // Accordion demos
  "accordion-basic": {
    component: AccordionDemos.Basic,
    file: "en/accordion/basic.tsx",
  },
  "accordion-surface": {
    component: AccordionDemos.Surface,
    file: "en/accordion/surface.tsx",
  },
  "accordion-multiple": {
    component: AccordionDemos.Multiple,
    file: "en/accordion/multiple.tsx",
  },
  "accordion-disabled": {
    component: AccordionDemos.Disabled,
    file: "en/accordion/disabled.tsx",
  },
  "accordion-custom-indicator": {
    component: AccordionDemos.CustomIndicator,
    file: "en/accordion/custom-indicator.tsx",
  },
  "accordion-faq": {
    component: AccordionDemos.FAQ,
    file: "en/accordion/faq.tsx",
  },
  "accordion-custom-styles": {
    component: AccordionDemos.CustomStyles,
    file: "en/accordion/custom-styles.tsx",
  },
  "accordion-without-separator": {
    component: AccordionDemos.WithoutSeparator,
    file: "en/accordion/without-separator.tsx",
  },
  "accordion-custom-render-function": {
    component: AccordionDemos.CustomRenderFunction,
    file: "en/accordion/custom-render-function.tsx",
  },
  "accordion-controlled": {
    component: AccordionDemos.Controlled,
    file: "en/accordion/controlled.tsx",
  },
  // Alert demos
  "alert-basic": {
    component: AlertDemos.Basic,
    file: "en/alert/basic.tsx",
  },
  // AlertDialog demos
  "alert-dialog-default": {
    component: AlertDialogDemos.Default,
    file: "en/alert-dialog/default.tsx",
  },
  "alert-dialog-statuses": {
    component: AlertDialogDemos.Statuses,
    file: "en/alert-dialog/statuses.tsx",
  },
  "alert-dialog-placements": {
    component: AlertDialogDemos.Placements,
    file: "en/alert-dialog/placements.tsx",
  },
  "alert-dialog-backdrop-variants": {
    component: AlertDialogDemos.BackdropVariants,
    file: "en/alert-dialog/backdrop-variants.tsx",
  },
  "alert-dialog-sizes": {
    component: AlertDialogDemos.Sizes,
    file: "en/alert-dialog/sizes.tsx",
  },
  "alert-dialog-controlled": {
    component: AlertDialogDemos.Controlled,
    file: "en/alert-dialog/controlled.tsx",
  },
  "alert-dialog-dismiss-behavior": {
    component: AlertDialogDemos.DismissBehavior,
    file: "en/alert-dialog/dismiss-behavior.tsx",
  },
  "alert-dialog-custom-icon": {
    component: AlertDialogDemos.CustomIcon,
    file: "en/alert-dialog/custom-icon.tsx",
  },
  "alert-dialog-custom-backdrop": {
    component: AlertDialogDemos.CustomBackdrop,
    file: "en/alert-dialog/custom-backdrop.tsx",
  },
  "alert-dialog-custom-trigger": {
    component: AlertDialogDemos.CustomTrigger,
    file: "en/alert-dialog/custom-trigger.tsx",
  },
  "alert-dialog-with-close-button": {
    component: AlertDialogDemos.WithCloseButton,
    file: "en/alert-dialog/with-close-button.tsx",
  },
  "alert-dialog-custom-animations": {
    component: AlertDialogDemos.CustomAnimations,
    file: "en/alert-dialog/custom-animations.tsx",
  },
  "alert-dialog-close-methods": {
    component: AlertDialogDemos.CloseMethods,
    file: "en/alert-dialog/close-methods.tsx",
  },
  "alert-dialog-custom-portal": {
    component: AlertDialogDemos.CustomPortal,
    file: "en/alert-dialog/custom-portal.tsx",
  },
  // Avatar demos
  "avatar-basic": {
    component: AvatarDemos.Basic,
    file: "en/avatar/basic.tsx",
  },
  "avatar-sizes": {
    component: AvatarDemos.Sizes,
    file: "en/avatar/sizes.tsx",
  },
  "avatar-colors": {
    component: AvatarDemos.Colors,
    file: "en/avatar/colors.tsx",
  },
  "avatar-variants": {
    component: AvatarDemos.Variants,
    file: "en/avatar/variants.tsx",
  },
  "avatar-fallback": {
    component: AvatarDemos.Fallback,
    file: "en/avatar/fallback.tsx",
  },
  "avatar-group": {
    component: AvatarDemos.Group,
    file: "en/avatar/group.tsx",
  },
  "avatar-custom-styles": {
    component: AvatarDemos.CustomStyles,
    file: "en/avatar/custom-styles.tsx",
  },
  // Badge demos
  "badge-basic": {
    component: BadgeDemos.Basic,
    file: "en/badge/basic.tsx",
  },
  "badge-colors": {
    component: BadgeDemos.Colors,
    file: "en/badge/colors.tsx",
  },
  "badge-sizes": {
    component: BadgeDemos.Sizes,
    file: "en/badge/sizes.tsx",
  },
  "badge-variants": {
    component: BadgeDemos.Variants,
    file: "en/badge/variants.tsx",
  },
  "badge-placements": {
    component: BadgeDemos.Placements,
    file: "en/badge/placements.tsx",
  },
  "badge-with-content": {
    component: BadgeDemos.WithContent,
    file: "en/badge/with-content.tsx",
  },
  "badge-dot": {
    component: BadgeDemos.Dot,
    file: "en/badge/dot.tsx",
  },
  // Breadcrumbs demos
  "breadcrumbs-basic": {
    component: BreadcrumbsDemos.BreadcrumbsBasic,
    file: "en/breadcrumbs/basic.tsx",
  },
  "breadcrumbs-level-2": {
    component: BreadcrumbsDemos.BreadcrumbsLevel2,
    file: "en/breadcrumbs/level-2.tsx",
  },
  "breadcrumbs-level-3": {
    component: BreadcrumbsDemos.BreadcrumbsLevel3,
    file: "en/breadcrumbs/level-3.tsx",
  },
  "breadcrumbs-custom-separator": {
    component: BreadcrumbsDemos.BreadcrumbsCustomSeparator,
    file: "en/breadcrumbs/custom-separator.tsx",
  },
  "breadcrumbs-disabled": {
    component: BreadcrumbsDemos.BreadcrumbsDisabled,
    file: "en/breadcrumbs/disabled.tsx",
  },
  "breadcrumbs-custom-render-function": {
    component: BreadcrumbsDemos.CustomRenderFunction,
    file: "en/breadcrumbs/custom-render-function.tsx",
  },
  // Button demos
  "button-basic": {
    component: ButtonDemos.Basic,
    file: "en/button/basic.tsx",
  },
  "button-custom-variants": {
    component: ButtonDemos.CustomVariants,
    file: "en/button/custom-variants.tsx",
  },
  "button-disabled": {
    component: ButtonDemos.Disabled,
    file: "en/button/disabled.tsx",
  },
  "button-icon-only": {
    component: ButtonDemos.IconOnly,
    file: "en/button/icon-only.tsx",
  },
  "button-loading": {
    component: ButtonDemos.Loading,
    file: "en/button/loading.tsx",
  },
  "button-loading-state": {
    component: ButtonDemos.LoadingState,
    file: "en/button/loading-state.tsx",
  },
  "button-sizes": {
    component: ButtonDemos.Sizes,
    file: "en/button/sizes.tsx",
  },
  "button-full-width": {
    component: ButtonDemos.FullWidth,
    file: "en/button/full-width.tsx",
  },
  "button-social": {
    component: ButtonDemos.Social,
    file: "en/button/social.tsx",
  },
  "button-ripple-effect": {
    component: ButtonDemos.RippleEffect,
    file: "en/button/ripple-effect.tsx",
  },
  "button-variants": {
    component: ButtonDemos.Variants,
    file: "en/button/variants.tsx",
  },
  "button-outline-variant": {
    component: ButtonDemos.OutlineVariant,
    file: "en/button/outline-variant.tsx",
  },
  "button-with-icons": {
    component: ButtonDemos.WithIcons,
    file: "en/button/with-icons.tsx",
  },
  "button-custom-render-function": {
    component: ButtonDemos.CustomRenderFunction,
    file: "en/button/custom-render-function.tsx",
  },
  // ButtonGroup demos
  "button-group-basic": {
    component: ButtonGroupDemos.Basic,
    file: "en/button-group/basic.tsx",
  },
  "button-group-disabled": {
    component: ButtonGroupDemos.Disabled,
    file: "en/button-group/disabled.tsx",
  },
  "button-group-sizes": {
    component: ButtonGroupDemos.Sizes,
    file: "en/button-group/sizes.tsx",
  },
  "button-group-full-width": {
    component: ButtonGroupDemos.FullWidth,
    file: "en/button-group/full-width.tsx",
  },
  "button-group-variants": {
    component: ButtonGroupDemos.Variants,
    file: "en/button-group/variants.tsx",
  },
  "button-group-with-icons": {
    component: ButtonGroupDemos.WithIcons,
    file: "en/button-group/with-icons.tsx",
  },
  "button-group-orientation": {
    component: ButtonGroupDemos.Orientation,
    file: "en/button-group/orientation.tsx",
  },
  "button-group-without-separator": {
    component: ButtonGroupDemos.WithoutSeparator,
    file: "en/button-group/without-separator.tsx",
  },
  // Card demos
  "card-default": {
    component: CardDemos.Default,
    file: "en/card/default.tsx",
  },
  "card-horizontal": {
    component: CardDemos.Horizontal,
    file: "en/card/horizontal.tsx",
  },
  "card-variants": {
    component: CardDemos.Variants,
    file: "en/card/variants.tsx",
  },
  "card-with-avatar": {
    component: CardDemos.WithAvatar,
    file: "en/card/with-avatar.tsx",
  },
  "card-with-form": {
    component: CardDemos.WithForm,
    file: "en/card/with-form.tsx",
  },
  "card-with-images": {
    component: CardDemos.WithImages,
    file: "en/card/with-images.tsx",
  },
  // Calendar demos
  "calendar-basic": {
    component: CalendarDemos.Basic,
    file: "en/calendar/basic.tsx",
  },
  "calendar-custom-styles": {
    component: CalendarDemos.CustomStyles,
    file: "en/calendar/custom-styles.tsx",
  },
  "calendar-default-value": {
    component: CalendarDemos.DefaultValue,
    file: "en/calendar/default-value.tsx",
  },
  "calendar-controlled": {
    component: CalendarDemos.Controlled,
    file: "en/calendar/controlled.tsx",
  },
  "calendar-min-max-dates": {
    component: CalendarDemos.MinMaxDates,
    file: "en/calendar/min-max-dates.tsx",
  },
  "calendar-unavailable-dates": {
    component: CalendarDemos.UnavailableDates,
    file: "en/calendar/unavailable-dates.tsx",
  },
  "calendar-weeks-in-month": {
    component: CalendarDemos.WeeksInMonth,
    file: "en/calendar/weeks-in-month.tsx",
  },
  "calendar-week-view": {
    component: CalendarDemos.WeekView,
    file: "en/calendar/week-view.tsx",
  },
  "calendar-day-view": {
    component: CalendarDemos.DayView,
    file: "en/calendar/day-view.tsx",
  },
  "calendar-multiple-selection": {
    component: CalendarDemos.MultipleSelection,
    file: "en/calendar/multiple-selection.tsx",
  },
  "calendar-disabled": {
    component: CalendarDemos.Disabled,
    file: "en/calendar/disabled.tsx",
  },
  "calendar-read-only": {
    component: CalendarDemos.ReadOnly,
    file: "en/calendar/read-only.tsx",
  },
  "calendar-focused-value": {
    component: CalendarDemos.FocusedValue,
    file: "en/calendar/focused-value.tsx",
  },
  "calendar-with-indicators": {
    component: CalendarDemos.WithIndicators,
    file: "en/calendar/with-indicators.tsx",
  },
  "calendar-multiple-months": {
    component: CalendarDemos.MultipleMonths,
    file: "en/calendar/multiple-months.tsx",
  },
  "calendar-year-picker": {
    component: CalendarDemos.YearPicker,
    file: "en/calendar/year-picker.tsx",
  },
  "calendar-international-calendar": {
    component: CalendarDemos.InternationalCalendar,
    file: "en/calendar/international-calendar.tsx",
  },
  "calendar-booking-calendar": {
    component: CalendarDemos.BookingCalendar,
    file: "en/calendar/booking-calendar.tsx",
  },
  "calendar-custom-icons": {
    component: CalendarDemos.CustomIcons,
    file: "en/calendar/custom-icons.tsx",
  },
  // RangeCalendar demos
  "range-calendar-basic": {
    component: RangeCalendarDemos.Basic,
    file: "en/range-calendar/basic.tsx",
  },
  "range-calendar-year-picker": {
    component: RangeCalendarDemos.YearPicker,
    file: "en/range-calendar/year-picker.tsx",
  },
  "range-calendar-default-value": {
    component: RangeCalendarDemos.DefaultValue,
    file: "en/range-calendar/default-value.tsx",
  },
  "range-calendar-controlled": {
    component: RangeCalendarDemos.Controlled,
    file: "en/range-calendar/controlled.tsx",
  },
  "range-calendar-min-max-dates": {
    component: RangeCalendarDemos.MinMaxDates,
    file: "en/range-calendar/min-max-dates.tsx",
  },
  "range-calendar-unavailable-dates": {
    component: RangeCalendarDemos.UnavailableDates,
    file: "en/range-calendar/unavailable-dates.tsx",
  },
  "range-calendar-anchor-unavailable-dates": {
    component: RangeCalendarDemos.AnchorUnavailableDates,
    file: "en/range-calendar/anchor-unavailable-dates.tsx",
  },
  "range-calendar-weeks-in-month": {
    component: RangeCalendarDemos.WeeksInMonth,
    file: "en/range-calendar/weeks-in-month.tsx",
  },
  "range-calendar-week-view": {
    component: RangeCalendarDemos.WeekView,
    file: "en/range-calendar/week-view.tsx",
  },
  "range-calendar-day-view": {
    component: RangeCalendarDemos.DayView,
    file: "en/range-calendar/day-view.tsx",
  },
  "range-calendar-allows-non-contiguous-ranges": {
    component: RangeCalendarDemos.AllowsNonContiguousRanges,
    file: "en/range-calendar/allows-non-contiguous-ranges.tsx",
  },
  "range-calendar-disabled": {
    component: RangeCalendarDemos.Disabled,
    file: "en/range-calendar/disabled.tsx",
  },
  "range-calendar-read-only": {
    component: RangeCalendarDemos.ReadOnly,
    file: "en/range-calendar/read-only.tsx",
  },
  "range-calendar-invalid": {
    component: RangeCalendarDemos.Invalid,
    file: "en/range-calendar/invalid.tsx",
  },
  "range-calendar-focused-value": {
    component: RangeCalendarDemos.FocusedValue,
    file: "en/range-calendar/focused-value.tsx",
  },
  "range-calendar-with-indicators": {
    component: RangeCalendarDemos.WithIndicators,
    file: "en/range-calendar/with-indicators.tsx",
  },
  "range-calendar-multiple-months": {
    component: RangeCalendarDemos.MultipleMonths,
    file: "en/range-calendar/multiple-months.tsx",
  },
  "range-calendar-three-months": {
    component: RangeCalendarDemos.ThreeMonths,
    file: "en/range-calendar/three-months.tsx",
  },
  "range-calendar-international-calendar": {
    component: RangeCalendarDemos.InternationalCalendar,
    file: "en/range-calendar/international-calendar.tsx",
  },
  "range-calendar-booking-calendar": {
    component: RangeCalendarDemos.BookingCalendar,
    file: "en/range-calendar/booking-calendar.tsx",
  },
  // Checkbox demos
  "checkbox-basic": {
    component: CheckboxDemos.Basic,
    file: "en/checkbox/basic.tsx",
  },
  "checkbox-disabled": {
    component: CheckboxDemos.Disabled,
    file: "en/checkbox/disabled.tsx",
  },
  "checkbox-default-selected": {
    component: CheckboxDemos.DefaultSelected,
    file: "en/checkbox/default-selected.tsx",
  },
  "checkbox-controlled": {
    component: CheckboxDemos.Controlled,
    file: "en/checkbox/controlled.tsx",
  },
  "checkbox-indeterminate": {
    component: CheckboxDemos.Indeterminate,
    file: "en/checkbox/indeterminate.tsx",
  },
  "checkbox-external-label": {
    component: CheckboxDemos.ExternalLabel,
    file: "en/checkbox/external-label.tsx",
  },
  "checkbox-with-description": {
    component: CheckboxDemos.WithDescription,
    file: "en/checkbox/with-description.tsx",
  },
  "checkbox-render-props": {
    component: CheckboxDemos.RenderProps,
    file: "en/checkbox/render-props.tsx",
  },
  "checkbox-form": {
    component: CheckboxDemos.Form,
    file: "en/checkbox/form.tsx",
  },
  "checkbox-custom-styles": {
    component: CheckboxDemos.CustomStyles,
    file: "en/checkbox/custom-styles.tsx",
  },
  "checkbox-invalid": {
    component: CheckboxDemos.Invalid,
    file: "en/checkbox/invalid.tsx",
  },
  "checkbox-custom-indicator": {
    component: CheckboxDemos.CustomIndicator,
    file: "en/checkbox/custom-indicator.tsx",
  },
  "checkbox-full-rounded": {
    component: CheckboxDemos.FullRounded,
    file: "en/checkbox/full-rounded.tsx",
  },
  "checkbox-variants": {
    component: CheckboxDemos.Variants,
    file: "en/checkbox/variants.tsx",
  },
  "checkbox-custom-render-function": {
    component: CheckboxDemos.CustomRenderFunction,
    file: "en/checkbox/custom-render-function.tsx",
  },
  // CheckboxGroup demos
  "checkbox-group-basic": {
    component: CheckboxGroupDemos.Basic,
    file: "en/checkbox-group/basic.tsx",
  },
  "checkbox-group-on-surface": {
    component: CheckboxGroupDemos.OnSurface,
    file: "en/checkbox-group/on-surface.tsx",
  },
  "checkbox-group-with-custom-indicator": {
    component: CheckboxGroupDemos.WithCustomIndicator,
    file: "en/checkbox-group/with-custom-indicator.tsx",
  },
  "checkbox-group-indeterminate": {
    component: CheckboxGroupDemos.Indeterminate,
    file: "en/checkbox-group/indeterminate.tsx",
  },
  "checkbox-group-validation": {
    component: CheckboxGroupDemos.Validation,
    file: "en/checkbox-group/validation.tsx",
  },
  "checkbox-group-controlled": {
    component: CheckboxGroupDemos.Controlled,
    file: "en/checkbox-group/controlled.tsx",
  },
  "checkbox-group-disabled": {
    component: CheckboxGroupDemos.Disabled,
    file: "en/checkbox-group/disabled.tsx",
  },
  "checkbox-group-features-and-addons": {
    component: CheckboxGroupDemos.FeaturesAndAddOns,
    file: "en/checkbox-group/features-and-addons.tsx",
  },
  "checkbox-group-custom-render-function": {
    component: CheckboxGroupDemos.CustomRenderFunction,
    file: "en/checkbox-group/custom-render-function.tsx",
  },
  // Chip demos
  "chip-basic": {
    component: ChipDemos.Basic,
    file: "en/chip/basic.tsx",
  },
  "chip-variants": {
    component: ChipDemos.Variants,
    file: "en/chip/variants.tsx",
  },
  "chip-with-icon": {
    component: ChipDemos.WithIcon,
    file: "en/chip/with-icon.tsx",
  },
  "chip-statuses": {
    component: ChipDemos.Statuses,
    file: "en/chip/statuses.tsx",
  },
  "chip-vibrant-palette": {
    component: ChipDemos.VibrantPalette,
    file: "en/chip/vibrant-palette.tsx",
  },
  // ColorField demos
  "color-field-basic": {
    component: ColorFieldDemos.Basic,
    file: "en/color-field/basic.tsx",
  },
  "color-field-channel-editing": {
    component: ColorFieldDemos.ChannelEditing,
    file: "en/color-field/channel-editing.tsx",
  },
  "color-field-controlled": {
    component: ColorFieldDemos.Controlled,
    file: "en/color-field/controlled.tsx",
  },
  "color-field-disabled": {
    component: ColorFieldDemos.Disabled,
    file: "en/color-field/disabled.tsx",
  },
  "color-field-form-example": {
    component: ColorFieldDemos.FormExample,
    file: "en/color-field/form-example.tsx",
  },
  "color-field-full-width": {
    component: ColorFieldDemos.FullWidth,
    file: "en/color-field/full-width.tsx",
  },
  "color-field-invalid": {
    component: ColorFieldDemos.Invalid,
    file: "en/color-field/invalid.tsx",
  },
  "color-field-on-surface": {
    component: ColorFieldDemos.OnSurface,
    file: "en/color-field/on-surface.tsx",
  },
  "color-field-required": {
    component: ColorFieldDemos.Required,
    file: "en/color-field/required.tsx",
  },
  "color-field-variants": {
    component: ColorFieldDemos.Variants,
    file: "en/color-field/variants.tsx",
  },
  "color-field-with-description": {
    component: ColorFieldDemos.WithDescription,
    file: "en/color-field/with-description.tsx",
  },
  "color-field-custom-render-function": {
    component: ColorFieldDemos.CustomRenderFunction,
    file: "en/color-field/custom-render-function.tsx",
  },
  // ColorPicker demos
  "color-picker-basic": {
    component: ColorPickerDemos.Basic,
    file: "en/color-picker/basic.tsx",
  },
  "color-picker-controlled": {
    component: ColorPickerDemos.Controlled,
    file: "en/color-picker/controlled.tsx",
  },
  "color-picker-with-swatches": {
    component: ColorPickerDemos.WithSwatches,
    file: "en/color-picker/with-swatches.tsx",
  },
  "color-picker-with-fields": {
    component: ColorPickerDemos.WithFields,
    file: "en/color-picker/with-fields.tsx",
  },
  "color-picker-with-sliders": {
    component: ColorPickerDemos.WithSliders,
    file: "en/color-picker/with-sliders.tsx",
  },
  // ColorArea demos
  "color-area-basic": {
    component: ColorAreaDemos.Basic,
    file: "en/color-area/basic.tsx",
  },
  "color-area-with-dots": {
    component: ColorAreaDemos.WithDots,
    file: "en/color-area/with-dots.tsx",
  },
  "color-area-space-and-channels": {
    component: ColorAreaDemos.SpaceAndChannels,
    file: "en/color-area/space-and-channels.tsx",
  },
  "color-area-controlled": {
    component: ColorAreaDemos.Controlled,
    file: "en/color-area/controlled.tsx",
  },
  "color-area-disabled": {
    component: ColorAreaDemos.Disabled,
    file: "en/color-area/disabled.tsx",
  },
  "color-area-custom-render-function": {
    component: ColorAreaDemos.CustomRenderFunction,
    file: "en/color-area/custom-render-function.tsx",
  },
  // ColorSwatch demos
  "color-swatch-basic": {
    component: ColorSwatchDemos.Basic,
    file: "en/color-swatch/basic.tsx",
  },
  "color-swatch-sizes": {
    component: ColorSwatchDemos.Sizes,
    file: "en/color-swatch/sizes.tsx",
  },
  "color-swatch-shapes": {
    component: ColorSwatchDemos.Shapes,
    file: "en/color-swatch/shapes.tsx",
  },
  "color-swatch-transparency": {
    component: ColorSwatchDemos.Transparency,
    file: "en/color-swatch/transparency.tsx",
  },
  "color-swatch-custom-styles": {
    component: ColorSwatchDemos.CustomStyles,
    file: "en/color-swatch/custom-styles.tsx",
  },
  "color-swatch-accessibility": {
    component: ColorSwatchDemos.Accessibility,
    file: "en/color-swatch/accessibility.tsx",
  },
  "color-swatch-custom-render-function": {
    component: ColorSwatchDemos.CustomRenderFunction,
    file: "en/color-swatch/custom-render-function.tsx",
  },
  // ColorSlider demos
  "color-slider-basic": {
    component: ColorSliderDemos.Basic,
    file: "en/color-slider/basic.tsx",
  },
  "color-slider-channels": {
    component: ColorSliderDemos.Channels,
    file: "en/color-slider/channels.tsx",
  },
  "color-slider-alpha-channel": {
    component: ColorSliderDemos.AlphaChannel,
    file: "en/color-slider/alpha-channel.tsx",
  },
  "color-slider-rgb-channels": {
    component: ColorSliderDemos.RGBChannels,
    file: "en/color-slider/rgb-channels.tsx",
  },
  "color-slider-vertical": {
    component: ColorSliderDemos.Vertical,
    file: "en/color-slider/vertical.tsx",
  },
  "color-slider-disabled": {
    component: ColorSliderDemos.Disabled,
    file: "en/color-slider/disabled.tsx",
  },
  "color-slider-controlled": {
    component: ColorSliderDemos.Controlled,
    file: "en/color-slider/controlled.tsx",
  },
  "color-slider-custom-render-function": {
    component: ColorSliderDemos.CustomRenderFunction,
    file: "en/color-slider/custom-render-function.tsx",
  },
  // CloseButton demos
  "close-button-default": {
    component: CloseButtonDemos.Default,
    file: "en/close-button/default.tsx",
  },
  "close-button-with-custom-icon": {
    component: CloseButtonDemos.WithCustomIcon,
    file: "en/close-button/with-custom-icon.tsx",
  },
  "close-button-interactive": {
    component: CloseButtonDemos.Interactive,
    file: "en/close-button/interactive.tsx",
  },
  // ColorSwatchPicker demos
  "color-swatch-picker-basic": {
    component: ColorSwatchPickerDemos.Basic,
    file: "en/color-swatch-picker/basic.tsx",
  },
  "color-swatch-picker-sizes": {
    component: ColorSwatchPickerDemos.Sizes,
    file: "en/color-swatch-picker/sizes.tsx",
  },
  "color-swatch-picker-variants": {
    component: ColorSwatchPickerDemos.Variants,
    file: "en/color-swatch-picker/variants.tsx",
  },
  "color-swatch-picker-stack-layout": {
    component: ColorSwatchPickerDemos.StackLayout,
    file: "en/color-swatch-picker/stack-layout.tsx",
  },
  "color-swatch-picker-controlled": {
    component: ColorSwatchPickerDemos.Controlled,
    file: "en/color-swatch-picker/controlled.tsx",
  },
  "color-swatch-picker-disabled": {
    component: ColorSwatchPickerDemos.Disabled,
    file: "en/color-swatch-picker/disabled.tsx",
  },
  "color-swatch-picker-default-value": {
    component: ColorSwatchPickerDemos.DefaultValue,
    file: "en/color-swatch-picker/default-value.tsx",
  },
  "color-swatch-picker-custom-indicator": {
    component: ColorSwatchPickerDemos.CustomIndicator,
    file: "en/color-swatch-picker/custom-indicator.tsx",
  },
  "color-swatch-picker-custom-render-function": {
    component: ColorSwatchPickerDemos.CustomRenderFunction,
    file: "en/color-swatch-picker/custom-render-function.tsx",
  },
  // Autocomplete demos
  "autocomplete-default": {
    component: AutocompleteDemos.Default,
    file: "en/autocomplete/default.tsx",
  },
  "autocomplete-single-select": {
    component: AutocompleteDemos.SingleSelect,
    file: "en/autocomplete/single-select.tsx",
  },
  "autocomplete-variants": {
    component: AutocompleteDemos.Variants,
    file: "en/autocomplete/variants.tsx",
  },
  "autocomplete-multiple-select": {
    component: AutocompleteDemos.MultipleSelect,
    file: "en/autocomplete/multiple-select.tsx",
  },
  "autocomplete-full-width": {
    component: AutocompleteDemos.FullWidth,
    file: "en/autocomplete/full-width.tsx",
  },
  "autocomplete-with-description": {
    component: AutocompleteDemos.WithDescription,
    file: "en/autocomplete/with-description.tsx",
  },
  "autocomplete-with-sections": {
    component: AutocompleteDemos.WithSections,
    file: "en/autocomplete/with-sections.tsx",
  },
  "autocomplete-with-disabled-options": {
    component: AutocompleteDemos.WithDisabledOptions,
    file: "en/autocomplete/with-disabled-options.tsx",
  },
  "autocomplete-allows-empty-collection": {
    component: AutocompleteDemos.AllowsEmptyCollection,
    file: "en/autocomplete/allows-empty-collection.tsx",
  },
  "autocomplete-custom-indicator": {
    component: AutocompleteDemos.CustomIndicator,
    file: "en/autocomplete/custom-indicator.tsx",
  },
  "autocomplete-required": {
    component: AutocompleteDemos.Required,
    file: "en/autocomplete/required.tsx",
  },
  "autocomplete-controlled": {
    component: AutocompleteDemos.Controlled,
    file: "en/autocomplete/controlled.tsx",
  },
  "autocomplete-controlled-open-state": {
    component: AutocompleteDemos.ControlledOpenState,
    file: "en/autocomplete/controlled-open-state.tsx",
  },
  "autocomplete-asynchronous-filtering": {
    component: AutocompleteDemos.AsynchronousFiltering,
    file: "en/autocomplete/asynchronous-filtering.tsx",
  },
  "autocomplete-virtualization": {
    component: AutocompleteDemos.Virtualization,
    file: "en/autocomplete/virtualization.tsx",
  },
  "autocomplete-disabled": {
    component: AutocompleteDemos.Disabled,
    file: "en/autocomplete/disabled.tsx",
  },
  "autocomplete-user-selection": {
    component: AutocompleteDemos.UserSelection,
    file: "en/autocomplete/user-selection.tsx",
  },
  "autocomplete-user-selection-multiple": {
    component: AutocompleteDemos.UserSelectionMultiple,
    file: "en/autocomplete/user-selection-multiple.tsx",
  },
  "autocomplete-location-search": {
    component: AutocompleteDemos.LocationSearch,
    file: "en/autocomplete/location-search.tsx",
  },
  "autocomplete-tag-group-selection": {
    component: AutocompleteDemos.TagGroupSelection,
    file: "en/autocomplete/tag-group-selection.tsx",
  },
  "autocomplete-email-recipients": {
    component: AutocompleteDemos.EmailRecipients,
    file: "en/autocomplete/email-recipients.tsx",
  },
  // ComboBox demos
  "combo-box-default": {
    component: ComboBoxDemos.Default,
    file: "en/combo-box/default.tsx",
  },
  "combo-box-default-selected-key": {
    component: ComboBoxDemos.DefaultSelectedKey,
    file: "en/combo-box/default-selected-key.tsx",
  },
  "combo-box-with-description": {
    component: ComboBoxDemos.WithDescription,
    file: "en/combo-box/with-description.tsx",
  },
  "combo-box-with-sections": {
    component: ComboBoxDemos.WithSections,
    file: "en/combo-box/with-sections.tsx",
  },
  "combo-box-with-disabled-options": {
    component: ComboBoxDemos.WithDisabledOptions,
    file: "en/combo-box/with-disabled-options.tsx",
  },
  "combo-box-custom-indicator": {
    component: ComboBoxDemos.CustomIndicator,
    file: "en/combo-box/custom-indicator.tsx",
  },
  "combo-box-required": {
    component: ComboBoxDemos.Required,
    file: "en/combo-box/required.tsx",
  },
  "combo-box-full-width": {
    component: ComboBoxDemos.FullWidth,
    file: "en/combo-box/full-width.tsx",
  },
  "combo-box-custom-value": {
    component: ComboBoxDemos.CustomValue,
    file: "en/combo-box/custom-value.tsx",
  },
  "combo-box-controlled": {
    component: ComboBoxDemos.Controlled,
    file: "en/combo-box/controlled.tsx",
  },
  "combo-box-controlled-input-value": {
    component: ComboBoxDemos.ControlledInputValue,
    file: "en/combo-box/controlled-input-value.tsx",
  },
  "combo-box-asynchronous-loading": {
    component: ComboBoxDemos.AsynchronousLoading,
    file: "en/combo-box/asynchronous-loading.tsx",
  },
  "combo-box-custom-filtering": {
    component: ComboBoxDemos.CustomFiltering,
    file: "en/combo-box/custom-filtering.tsx",
  },
  "combo-box-allows-custom-value": {
    component: ComboBoxDemos.AllowsCustomValue,
    file: "en/combo-box/allows-custom-value.tsx",
  },
  "combo-box-disabled": {
    component: ComboBoxDemos.Disabled,
    file: "en/combo-box/disabled.tsx",
  },
  "combo-box-on-surface": {
    component: ComboBoxDemos.OnSurface,
    file: "en/combo-box/on-surface.tsx",
  },
  "combo-box-menu-trigger": {
    component: ComboBoxDemos.MenuTrigger,
    file: "en/combo-box/menu-trigger.tsx",
  },
  "combo-box-custom-render-function": {
    component: ComboBoxDemos.CustomRenderFunction,
    file: "en/combo-box/custom-render-function.tsx",
  },
  // Drawer demos
  "drawer-basic": {
    component: DrawerDemos.Basic,
    file: "en/drawer/basic.tsx",
  },
  "drawer-placements": {
    component: DrawerDemos.Placements,
    file: "en/drawer/placements.tsx",
  },
  "drawer-backdrop-variants": {
    component: DrawerDemos.BackdropVariants,
    file: "en/drawer/backdrop-variants.tsx",
  },
  "drawer-with-form": {
    component: DrawerDemos.WithForm,
    file: "en/drawer/with-form.tsx",
  },
  "drawer-scrollable-content": {
    component: DrawerDemos.ScrollableContent,
    file: "en/drawer/scrollable-content.tsx",
  },
  "drawer-navigation": {
    component: DrawerDemos.Navigation,
    file: "en/drawer/navigation.tsx",
  },
  "drawer-non-dismissable": {
    component: DrawerDemos.NonDismissable,
    file: "en/drawer/non-dismissable.tsx",
  },
  "drawer-controlled": {
    component: DrawerDemos.Controlled,
    file: "en/drawer/controlled.tsx",
  },
  // Disclosure demos
  "disclosure-basic": {
    component: DisclosureDemos.Basic,
    file: "en/disclosure/basic.tsx",
  },
  "disclosure-custom-render-function": {
    component: DisclosureDemos.CustomRenderFunction,
    file: "en/disclosure/custom-render-function.tsx",
  },
  // DisclosureGroup demos
  "disclosure-group-basic": {
    component: DisclosureGroupDemos.Basic,
    file: "en/disclosure-group/basic.tsx",
  },
  "disclosure-group-controlled": {
    component: DisclosureGroupDemos.Controlled,
    file: "en/disclosure-group/controlled.tsx",
  },
  // Dropdown demos
  "dropdown-default": {
    component: DropdownDemos.Default,
    file: "en/dropdown/default.tsx",
  },
  "dropdown-with-single-selection": {
    component: DropdownDemos.WithSingleSelection,
    file: "en/dropdown/with-single-selection.tsx",
  },
  "dropdown-single-with-custom-indicator": {
    component: DropdownDemos.SingleWithCustomIndicator,
    file: "en/dropdown/single-with-custom-indicator.tsx",
  },
  "dropdown-with-multiple-selection": {
    component: DropdownDemos.WithMultipleSelection,
    file: "en/dropdown/with-multiple-selection.tsx",
  },
  "dropdown-with-section-level-selection": {
    component: DropdownDemos.WithSectionLevelSelection,
    file: "en/dropdown/with-section-level-selection.tsx",
  },
  "dropdown-with-keyboard-shortcuts": {
    component: DropdownDemos.WithKeyboardShortcuts,
    file: "en/dropdown/with-keyboard-shortcuts.tsx",
  },
  "dropdown-with-icons": {
    component: DropdownDemos.WithIcons,
    file: "en/dropdown/with-icons.tsx",
  },
  "dropdown-long-press-trigger": {
    component: DropdownDemos.LongPressTrigger,
    file: "en/dropdown/long-press-trigger.tsx",
  },
  "dropdown-with-descriptions": {
    component: DropdownDemos.WithDescriptions,
    file: "en/dropdown/with-descriptions.tsx",
  },
  "dropdown-with-sections": {
    component: DropdownDemos.WithSections,
    file: "en/dropdown/with-sections.tsx",
  },
  "dropdown-with-disabled-items": {
    component: DropdownDemos.WithDisabledItems,
    file: "en/dropdown/with-disabled-items.tsx",
  },
  "dropdown-with-submenus": {
    component: DropdownDemos.WithSubmenus,
    file: "en/dropdown/with-submenus.tsx",
  },
  "dropdown-with-custom-submenu-indicator": {
    component: DropdownDemos.WithCustomSubmenuIndicator,
    file: "en/dropdown/with-custom-submenu-indicator.tsx",
  },
  "dropdown-controlled": {
    component: DropdownDemos.Controlled,
    file: "en/dropdown/controlled.tsx",
  },
  "dropdown-controlled-open-state": {
    component: DropdownDemos.ControlledOpenState,
    file: "en/dropdown/controlled-open-state.tsx",
  },
  "dropdown-custom-trigger": {
    component: DropdownDemos.CustomTrigger,
    file: "en/dropdown/custom-trigger.tsx",
  },
  // ErrorMessage demos
  "error-message-basic": {
    component: ErrorMessageDemos.Basic,
    file: "en/error-message/basic.tsx",
  },
  "error-message-with-tag-group": {
    component: ErrorMessageDemos.WithTagGroup,
    file: "en/error-message/with-tag-group.tsx",
  },
  // Form demos
  "form-basic": {
    component: FormDemos.Basic,
    file: "en/form/basic.tsx",
  },
  "form-custom-render-function": {
    component: FormDemos.CustomRenderFunction,
    file: "en/form/custom-render-function.tsx",
  },
  // Fieldset demos
  "fieldset-basic": {
    component: FieldsetDemos.Basic,
    file: "en/fieldset/basic.tsx",
  },
  "fieldset-on-surface": {
    component: FieldsetDemos.OnSurface,
    file: "en/fieldset/on-surface.tsx",
  },
  // Input demos
  "input-basic": {
    component: InputDemos.Basic,
    file: "en/input/basic.tsx",
  },
  "input-full-width": {
    component: InputDemos.FullWidth,
    file: "en/input/full-width.tsx",
  },
  "input-types": {
    component: InputDemos.Types,
    file: "en/input/types.tsx",
  },
  "input-controlled": {
    component: InputDemos.Controlled,
    file: "en/input/controlled.tsx",
  },
  "input-on-surface": {
    component: InputDemos.OnSurface,
    file: "en/input/on-surface.tsx",
  },
  "input-variants": {
    component: InputDemos.Variants,
    file: "en/input/variants.tsx",
  },
  // DateField demos
  "date-field-basic": {
    component: DateFieldDemos.Basic,
    file: "en/date-field/basic.tsx",
  },
  "date-field-controlled": {
    component: DateFieldDemos.Controlled,
    file: "en/date-field/controlled.tsx",
  },
  "date-field-disabled": {
    component: DateFieldDemos.Disabled,
    file: "en/date-field/disabled.tsx",
  },
  "date-field-form-example": {
    component: DateFieldDemos.FormExample,
    file: "en/date-field/form-example.tsx",
  },
  "date-field-invalid": {
    component: DateFieldDemos.Invalid,
    file: "en/date-field/invalid.tsx",
  },
  "date-field-on-surface": {
    component: DateFieldDemos.OnSurface,
    file: "en/date-field/on-surface.tsx",
  },
  "date-field-required": {
    component: DateFieldDemos.Required,
    file: "en/date-field/required.tsx",
  },
  "date-field-with-description": {
    component: DateFieldDemos.WithDescription,
    file: "en/date-field/with-description.tsx",
  },
  "date-field-with-prefix-and-suffix": {
    component: DateFieldDemos.WithPrefixAndSuffix,
    file: "en/date-field/with-prefix-and-suffix.tsx",
  },
  "date-field-with-prefix-icon": {
    component: DateFieldDemos.WithPrefixIcon,
    file: "en/date-field/with-prefix-icon.tsx",
  },
  "date-field-with-suffix-icon": {
    component: DateFieldDemos.WithSuffixIcon,
    file: "en/date-field/with-suffix-icon.tsx",
  },
  "date-field-full-width": {
    component: DateFieldDemos.FullWidth,
    file: "en/date-field/full-width.tsx",
  },
  "date-field-granularity": {
    component: DateFieldDemos.Granularity,
    file: "en/date-field/granularity.tsx",
  },
  "date-field-with-validation": {
    component: DateFieldDemos.WithValidation,
    file: "en/date-field/with-validation.tsx",
  },
  "date-field-variants": {
    component: DateFieldDemos.Variants,
    file: "en/date-field/variants.tsx",
  },
  "date-field-custom-render-function": {
    component: DateFieldDemos.CustomRenderFunction,
    file: "en/date-field/custom-render-function.tsx",
  },
  // DatePicker demos
  "date-picker-basic": {
    component: DatePickerDemos.Basic,
    file: "en/date-picker/basic.tsx",
  },
  "date-picker-controlled": {
    component: DatePickerDemos.Controlled,
    file: "en/date-picker/controlled.tsx",
  },
  "date-picker-disabled": {
    component: DatePickerDemos.Disabled,
    file: "en/date-picker/disabled.tsx",
  },
  "date-picker-format-options": {
    component: DatePickerDemos.FormatOptions,
    file: "en/date-picker/format-options.tsx",
  },
  "date-picker-form-example": {
    component: DatePickerDemos.FormExample,
    file: "en/date-picker/form-example.tsx",
  },
  "date-picker-with-custom-indicator": {
    component: DatePickerDemos.WithCustomIndicator,
    file: "en/date-picker/with-custom-indicator.tsx",
  },
  "date-picker-with-validation": {
    component: DatePickerDemos.WithValidation,
    file: "en/date-picker/with-validation.tsx",
  },
  "date-picker-international-calendar": {
    component: DatePickerDemos.InternationalCalendar,
    file: "en/date-picker/international-calendar.tsx",
  },
  "date-picker-custom-render-function": {
    component: DatePickerDemos.CustomRenderFunction,
    file: "en/date-picker/custom-render-function.tsx",
  },
  // DateRangePicker demos
  "date-range-picker-basic": {
    component: DateRangePickerDemos.Basic,
    file: "en/date-range-picker/basic.tsx",
  },
  "date-range-picker-controlled": {
    component: DateRangePickerDemos.Controlled,
    file: "en/date-range-picker/controlled.tsx",
  },
  "date-range-picker-disabled": {
    component: DateRangePickerDemos.Disabled,
    file: "en/date-range-picker/disabled.tsx",
  },
  "date-range-picker-format-options": {
    component: DateRangePickerDemos.FormatOptions,
    file: "en/date-range-picker/format-options.tsx",
  },
  "date-range-picker-form-example": {
    component: DateRangePickerDemos.FormExample,
    file: "en/date-range-picker/form-example.tsx",
  },
  "date-range-picker-with-custom-indicator": {
    component: DateRangePickerDemos.WithCustomIndicator,
    file: "en/date-range-picker/with-custom-indicator.tsx",
  },
  "date-range-picker-with-validation": {
    component: DateRangePickerDemos.WithValidation,
    file: "en/date-range-picker/with-validation.tsx",
  },
  "date-range-picker-international-calendar": {
    component: DateRangePickerDemos.InternationalCalendar,
    file: "en/date-range-picker/international-calendar.tsx",
  },
  "date-range-picker-custom-render-function": {
    component: DateRangePickerDemos.CustomRenderFunction,
    file: "en/date-range-picker/custom-render-function.tsx",
  },
  "date-range-picker-input-container": {
    component: DateRangePickerDemos.InputContainer,
    file: "en/date-range-picker/input-container.tsx",
  },
  // InputOTP demos
  "input-otp-basic": {
    component: InputOTPDemos.Basic,
    file: "en/input-otp/basic.tsx",
  },
  "input-otp-four-digits": {
    component: InputOTPDemos.FourDigits,
    file: "en/input-otp/four-digits.tsx",
  },
  "input-otp-disabled": {
    component: InputOTPDemos.Disabled,
    file: "en/input-otp/disabled.tsx",
  },
  "input-otp-with-pattern": {
    component: InputOTPDemos.WithPattern,
    file: "en/input-otp/with-pattern.tsx",
  },
  "input-otp-controlled": {
    component: InputOTPDemos.Controlled,
    file: "en/input-otp/controlled.tsx",
  },
  "input-otp-with-validation": {
    component: InputOTPDemos.WithValidation,
    file: "en/input-otp/with-validation.tsx",
  },
  "input-otp-on-complete": {
    component: InputOTPDemos.OnComplete,
    file: "en/input-otp/on-complete.tsx",
  },
  "input-otp-form-example": {
    component: InputOTPDemos.FormExample,
    file: "en/input-otp/form-example.tsx",
  },
  "input-otp-on-surface": {
    component: InputOTPDemos.OnSurface,
    file: "en/input-otp/on-surface.tsx",
  },
  "input-otp-variants": {
    component: InputOTPDemos.Variants,
    file: "en/input-otp/variants.tsx",
  },
  // InputGroup demos
  "input-group-default": {
    component: InputGroupDemos.Default,
    file: "en/input-group/default.tsx",
  },
  "input-group-full-width": {
    component: InputGroupDemos.FullWidth,
    file: "en/input-group/full-width.tsx",
  },
  "input-group-with-prefix-icon": {
    component: InputGroupDemos.WithPrefixIcon,
    file: "en/input-group/with-prefix-icon.tsx",
  },
  "input-group-with-suffix-icon": {
    component: InputGroupDemos.WithSuffixIcon,
    file: "en/input-group/with-suffix-icon.tsx",
  },
  "input-group-with-prefix-and-suffix": {
    component: InputGroupDemos.WithPrefixAndSuffix,
    file: "en/input-group/with-prefix-and-suffix.tsx",
  },
  "input-group-with-text-prefix": {
    component: InputGroupDemos.WithTextPrefix,
    file: "en/input-group/with-text-prefix.tsx",
  },
  "input-group-with-text-suffix": {
    component: InputGroupDemos.WithTextSuffix,
    file: "en/input-group/with-text-suffix.tsx",
  },
  "input-group-with-icon-prefix-and-text-suffix": {
    component: InputGroupDemos.WithIconPrefixAndTextSuffix,
    file: "en/input-group/with-icon-prefix-and-text-suffix.tsx",
  },
  "input-group-with-copy-suffix": {
    component: InputGroupDemos.WithCopySuffix,
    file: "en/input-group/with-copy-suffix.tsx",
  },
  "input-group-with-icon-prefix-and-copy-suffix": {
    component: InputGroupDemos.WithIconPrefixAndCopySuffix,
    file: "en/input-group/with-icon-prefix-and-copy-suffix.tsx",
  },
  "input-group-password-with-toggle": {
    component: InputGroupDemos.PasswordWithToggle,
    file: "en/input-group/password-with-toggle.tsx",
  },
  "input-group-with-loading-suffix": {
    component: InputGroupDemos.WithLoadingSuffix,
    file: "en/input-group/with-loading-suffix.tsx",
  },
  "input-group-with-keyboard-shortcut": {
    component: InputGroupDemos.WithKeyboardShortcut,
    file: "en/input-group/with-keyboard-shortcut.tsx",
  },
  "input-group-with-badge-suffix": {
    component: InputGroupDemos.WithBadgeSuffix,
    file: "en/input-group/with-badge-suffix.tsx",
  },
  "input-group-required": {
    component: InputGroupDemos.Required,
    file: "en/input-group/required.tsx",
  },
  "input-group-invalid": {
    component: InputGroupDemos.Invalid,
    file: "en/input-group/invalid.tsx",
  },
  "input-group-disabled": {
    component: InputGroupDemos.Disabled,
    file: "en/input-group/disabled.tsx",
  },
  "input-group-on-surface": {
    component: InputGroupDemos.OnSurface,
    file: "en/input-group/on-surface.tsx",
  },
  "input-group-with-textarea": {
    component: InputGroupDemos.WithTextArea,
    file: "en/input-group/with-textarea.tsx",
  },
  "input-group-variants": {
    component: InputGroupDemos.Variants,
    file: "en/input-group/variants.tsx",
  },
  // Kbd demos
  "kbd-basic": {
    component: KbdDemos.Basic,
    file: "en/kbd/basic.tsx",
  },
  "kbd-navigation-keys": {
    component: KbdDemos.NavigationKeys,
    file: "en/kbd/navigation.tsx",
  },
  "kbd-inline-usage": {
    component: KbdDemos.InlineUsage,
    file: "en/kbd/inline.tsx",
  },
  "kbd-instructional-text": {
    component: KbdDemos.InstructionalText,
    file: "en/kbd/instructional.tsx",
  },
  "kbd-special-keys": {
    component: KbdDemos.SpecialKeys,
    file: "en/kbd/special.tsx",
  },
  "kbd-variants": {
    component: KbdDemos.Variants,
    file: "en/kbd/variants.tsx",
  },
  // Link demos
  "link-basic": {
    component: LinkDemos.Basic,
    file: "en/link/basic.tsx",
  },
  "link-custom-icon": {
    component: LinkDemos.CustomIcon,
    file: "en/link/custom-icon.tsx",
  },
  "link-icon-placement": {
    component: LinkDemos.IconPlacement,
    file: "en/link/icon-placement.tsx",
  },
  "link-underline-and-offset": {
    component: LinkDemos.UnderlineAndOffset,
    file: "en/link/underline-and-offset.tsx",
  },
  "link-custom-render-function": {
    component: LinkDemos.CustomRenderFunction,
    file: "en/link/custom-render-function.tsx",
  },
  // RadioGroup demos
  "radio-group-basic": {
    component: RadioGroupDemos.Basic,
    file: "en/radio-group/basic.tsx",
  },
  "radio-group-controlled": {
    component: RadioGroupDemos.Controlled,
    file: "en/radio-group/controlled.tsx",
  },
  "radio-group-custom-indicator": {
    component: RadioGroupDemos.CustomIndicator,
    file: "en/radio-group/custom-indicator.tsx",
  },
  "radio-group-delivery-and-payment": {
    component: RadioGroupDemos.DeliveryAndPayment,
    file: "en/radio-group/delivery-and-payment.tsx",
  },
  "radio-group-disabled": {
    component: RadioGroupDemos.Disabled,
    file: "en/radio-group/disabled.tsx",
  },
  "radio-group-horizontal": {
    component: RadioGroupDemos.Horizontal,
    file: "en/radio-group/horizontal.tsx",
  },
  "radio-group-uncontrolled": {
    component: RadioGroupDemos.Uncontrolled,
    file: "en/radio-group/uncontrolled.tsx",
  },
  "radio-group-validation": {
    component: RadioGroupDemos.Validation,
    file: "en/radio-group/validation.tsx",
  },
  "radio-group-on-surface": {
    component: RadioGroupDemos.OnSurface,
    file: "en/radio-group/on-surface.tsx",
  },
  "radio-group-variants": {
    component: RadioGroupDemos.Variants,
    file: "en/radio-group/variants.tsx",
  },
  "radio-group-custom-render-function": {
    component: RadioGroupDemos.CustomRenderFunction,
    file: "en/radio-group/custom-render-function.tsx",
  },
  // Skeleton demos
  "skeleton-basic": {
    component: SkeletonDemos.Basic,
    file: "en/skeleton/basic.tsx",
  },
  "skeleton-text-content": {
    component: SkeletonDemos.TextContent,
    file: "en/skeleton/text-content.tsx",
  },
  "skeleton-user-profile": {
    component: SkeletonDemos.UserProfile,
    file: "en/skeleton/user-profile.tsx",
  },
  "skeleton-list": {
    component: SkeletonDemos.List,
    file: "en/skeleton/list.tsx",
  },
  "skeleton-animation-types": {
    component: SkeletonDemos.AnimationTypes,
    file: "en/skeleton/animation-types.tsx",
  },
  "skeleton-grid": {
    component: SkeletonDemos.Grid,
    file: "en/skeleton/grid.tsx",
  },
  "skeleton-single-shimmer": {
    component: SkeletonDemos.SingleShimmer,
    file: "en/skeleton/single-shimmer.tsx",
  },
  // Separator demos
  "separator-basic": {
    component: SeparatorDemos.Basic,
    file: "en/separator/basic.tsx",
  },
  "separator-vertical": {
    component: SeparatorDemos.Vertical,
    file: "en/separator/vertical.tsx",
  },
  "separator-with-content": {
    component: SeparatorDemos.WithContent,
    file: "en/separator/with-content.tsx",
  },
  "separator-variants": {
    component: SeparatorDemos.Variants,
    file: "en/separator/variants.tsx",
  },
  "separator-with-surface": {
    component: SeparatorDemos.WithSurface,
    file: "en/separator/with-surface.tsx",
  },
  "separator-manual-variant-override": {
    component: SeparatorDemos.ManualVariantOverride,
    file: "en/separator/manual-variant-override.tsx",
  },
  "separator-custom-render-function": {
    component: SeparatorDemos.CustomRenderFunction,
    file: "en/separator/custom-render-function.tsx",
  },
  // Spinner demos
  "spinner-basic": {
    component: SpinnerDemos.Basic,
    file: "en/spinner/basic.tsx",
  },
  "spinner-colors": {
    component: SpinnerDemos.Colors,
    file: "en/spinner/colors.tsx",
  },
  "spinner-sizes": {
    component: SpinnerDemos.Sizes,
    file: "en/spinner/sizes.tsx",
  },
  // Surface demos
  "surface-variants": {
    component: SurfaceDemos.Variants,
    file: "en/surface/variants.tsx",
  },
  // Switch demos
  "switch-basic": {
    component: SwitchDemos.Basic,
    file: "en/switch/basic.tsx",
  },
  "switch-disabled": {
    component: SwitchDemos.Disabled,
    file: "en/switch/disabled.tsx",
  },
  "switch-default-selected": {
    component: SwitchDemos.DefaultSelected,
    file: "en/switch/default-selected.tsx",
  },
  "switch-controlled": {
    component: SwitchDemos.Controlled,
    file: "en/switch/controlled.tsx",
  },
  "switch-without-label": {
    component: SwitchDemos.WithoutLabel,
    file: "en/switch/without-label.tsx",
  },
  "switch-sizes": {
    component: SwitchDemos.Sizes,
    file: "en/switch/sizes.tsx",
  },
  "switch-label-position": {
    component: SwitchDemos.LabelPosition,
    file: "en/switch/label-position.tsx",
  },
  "switch-with-icons": {
    component: SwitchDemos.WithIcons,
    file: "en/switch/with-icons.tsx",
  },
  "switch-with-description": {
    component: SwitchDemos.WithDescription,
    file: "en/switch/with-description.tsx",
  },
  "switch-group": {
    component: SwitchDemos.Group,
    file: "en/switch/group.tsx",
  },
  "switch-group-horizontal": {
    component: SwitchDemos.GroupHorizontal,
    file: "en/switch/group-horizontal.tsx",
  },
  "switch-render-props": {
    component: SwitchDemos.RenderProps,
    file: "en/switch/render-props.tsx",
  },
  "switch-form": {
    component: SwitchDemos.Form,
    file: "en/switch/form.tsx",
  },
  "switch-custom-styles": {
    component: SwitchDemos.CustomStyles,
    file: "en/switch/custom-styles.tsx",
  },
  "switch-custom-render-function": {
    component: SwitchDemos.CustomRenderFunction,
    file: "en/switch/custom-render-function.tsx",
  },
  // Tabs demos
  "tabs-basic": {
    component: TabsDemos.Basic,
    file: "en/tabs/basic.tsx",
  },
  "tabs-vertical": {
    component: TabsDemos.Vertical,
    file: "en/tabs/vertical.tsx",
  },
  "tabs-disabled": {
    component: TabsDemos.Disabled,
    file: "en/tabs/disabled.tsx",
  },
  "tabs-custom-styles": {
    component: TabsDemos.CustomStyles,
    file: "en/tabs/custom-styles.tsx",
  },
  "tabs-with-separator": {
    component: TabsDemos.WithSeparator,
    file: "en/tabs/with-separator.tsx",
  },
  "tabs-secondary": {
    component: TabsDemos.Secondary,
    file: "en/tabs/secondary.tsx",
  },
  "tabs-secondary-vertical": {
    component: TabsDemos.SecondaryVertical,
    file: "en/tabs/secondary-vertical.tsx",
  },
  "tabs-custom-render-function": {
    component: TabsDemos.CustomRenderFunction,
    file: "en/tabs/custom-render-function.tsx",
  },
  // TagGroup demos
  "tag-group-basic": {
    component: TagGroupDemos.Basic,
    file: "en/tag-group/basic.tsx",
  },
  "tag-group-sizes": {
    component: TagGroupDemos.Sizes,
    file: "en/tag-group/sizes.tsx",
  },
  "tag-group-variants": {
    component: TagGroupDemos.Variants,
    file: "en/tag-group/variants.tsx",
  },
  "tag-group-disabled": {
    component: TagGroupDemos.Disabled,
    file: "en/tag-group/disabled.tsx",
  },
  "tag-group-selection-modes": {
    component: TagGroupDemos.SelectionModes,
    file: "en/tag-group/selection-modes.tsx",
  },
  "tag-group-controlled": {
    component: TagGroupDemos.Controlled,
    file: "en/tag-group/controlled.tsx",
  },
  "tag-group-with-error-message": {
    component: TagGroupDemos.WithErrorMessage,
    file: "en/tag-group/with-error-message.tsx",
  },
  "tag-group-with-prefix": {
    component: TagGroupDemos.WithPrefix,
    file: "en/tag-group/with-prefix.tsx",
  },
  "tag-group-with-remove-button": {
    component: TagGroupDemos.WithRemoveButton,
    file: "en/tag-group/with-remove-button.tsx",
  },
  "tag-group-with-list-data": {
    component: TagGroupDemos.WithListData,
    file: "en/tag-group/with-list-data.tsx",
  },
  "tag-group-custom-render-function": {
    component: TagGroupDemos.CustomRenderFunction,
    file: "en/tag-group/custom-render-function.tsx",
  },
  // Table demos
  "table-basic": {
    component: TableDemos.Basic,
    file: "en/table/basic.tsx",
  },
  "table-secondary-variant": {
    component: TableDemos.SecondaryVariant,
    file: "en/table/secondary-variant.tsx",
  },
  "table-sorting": {
    component: TableDemos.Sorting,
    file: "en/table/sorting.tsx",
  },
  "table-selection": {
    component: TableDemos.SelectionDemo,
    file: "en/table/selection.tsx",
  },
  "table-custom-cells": {
    component: TableDemos.CustomCells,
    file: "en/table/custom-cells.tsx",
  },
  "table-expandable-rows": {
    component: TableDemos.ExpandableRows,
    file: "en/table/expandable-rows.tsx",
  },
  "table-pagination": {
    component: TableDemos.PaginationDemo,
    file: "en/table/pagination.tsx",
  },
  "table-column-resizing": {
    component: TableDemos.ColumnResizing,
    file: "en/table/column-resizing.tsx",
  },
  "table-empty-state": {
    component: TableDemos.EmptyStateDemo,
    file: "en/table/empty-state.tsx",
  },
  "table-async-loading": {
    component: TableDemos.AsyncLoading,
    file: "en/table/async-loading.tsx",
  },
  "table-virtualization": {
    component: TableDemos.Virtualization,
    file: "en/table/virtualization.tsx",
  },
  "table-tanstack-table": {
    component: TableDemos.TanstackTable,
    file: "en/table/tanstack-table.tsx",
  },
  // TextArea demos
  "textarea-basic": {
    component: TextAreaDemos.Basic,
    file: "en/textarea/basic.tsx",
  },
  "textarea-full-width": {
    component: TextAreaDemos.FullWidth,
    file: "en/textarea/full-width.tsx",
  },
  "textarea-rows": {
    component: TextAreaDemos.Rows,
    file: "en/textarea/rows.tsx",
  },
  "textarea-controlled": {
    component: TextAreaDemos.Controlled,
    file: "en/textarea/controlled.tsx",
  },
  "textarea-on-surface": {
    component: TextAreaDemos.OnSurface,
    file: "en/textarea/on-surface.tsx",
  },
  "textarea-variants": {
    component: TextAreaDemos.Variants,
    file: "en/textarea/variants.tsx",
  },
  // Typography demos
  "typography-default": {
    component: TypographyDemos.Default,
    file: "en/typography/default.tsx",
  },
  "typography-primitives": {
    component: TypographyDemos.Primitives,
    file: "en/typography/primitives.tsx",
  },
  "typography-prose": {
    component: TypographyDemos.Prose,
    file: "en/typography/prose.tsx",
  },
  "typography-render-props": {
    component: TypographyDemos.RenderProps,
    file: "en/typography/render-props.tsx",
  },
  "typography-typography-scale": {
    component: TypographyDemos.TypographyScale,
    file: "en/typography/typography-scale.tsx",
  },
  // TextField demos
  "textfield-basic": {
    component: TextFieldDemos.Basic,
    file: "en/textfield/basic.tsx",
  },
  "textfield-with-description": {
    component: TextFieldDemos.WithDescription,
    file: "en/textfield/with-description.tsx",
  },
  "textfield-required": {
    component: TextFieldDemos.Required,
    file: "en/textfield/required.tsx",
  },
  "textfield-with-error": {
    component: TextFieldDemos.WithError,
    file: "en/textfield/with-error.tsx",
  },
  "textfield-disabled": {
    component: TextFieldDemos.Disabled,
    file: "en/textfield/disabled.tsx",
  },
  "textfield-textarea": {
    component: TextFieldDemos.TextArea,
    file: "en/textfield/textarea.tsx",
  },
  "textfield-input-types": {
    component: TextFieldDemos.InputTypes,
    file: "en/textfield/input-types.tsx",
  },
  "textfield-full-width": {
    component: TextFieldDemos.FullWidth,
    file: "en/textfield/full-width.tsx",
  },
  "textfield-controlled": {
    component: TextFieldDemos.Controlled,
    file: "en/textfield/controlled.tsx",
  },
  "textfield-validation": {
    component: TextFieldDemos.Validation,
    file: "en/textfield/validation.tsx",
  },
  "textfield-on-surface": {
    component: TextFieldDemos.OnSurface,
    file: "en/textfield/on-surface.tsx",
  },
  "textfield-custom-render-function": {
    component: TextFieldDemos.CustomRenderFunction,
    file: "en/textfield/custom-render-function.tsx",
  },
  // TimeField demos
  "time-field-basic": {
    component: TimeFieldDemos.Basic,
    file: "en/time-field/basic.tsx",
  },
  "time-field-controlled": {
    component: TimeFieldDemos.Controlled,
    file: "en/time-field/controlled.tsx",
  },
  "time-field-disabled": {
    component: TimeFieldDemos.Disabled,
    file: "en/time-field/disabled.tsx",
  },
  "time-field-form-example": {
    component: TimeFieldDemos.FormExample,
    file: "en/time-field/form-example.tsx",
  },
  "time-field-invalid": {
    component: TimeFieldDemos.Invalid,
    file: "en/time-field/invalid.tsx",
  },
  "time-field-on-surface": {
    component: TimeFieldDemos.OnSurface,
    file: "en/time-field/on-surface.tsx",
  },
  "time-field-required": {
    component: TimeFieldDemos.Required,
    file: "en/time-field/required.tsx",
  },
  "time-field-with-description": {
    component: TimeFieldDemos.WithDescription,
    file: "en/time-field/with-description.tsx",
  },
  "time-field-with-prefix-and-suffix": {
    component: TimeFieldDemos.WithPrefixAndSuffix,
    file: "en/time-field/with-prefix-and-suffix.tsx",
  },
  "time-field-with-prefix-icon": {
    component: TimeFieldDemos.WithPrefixIcon,
    file: "en/time-field/with-prefix-icon.tsx",
  },
  "time-field-with-suffix-icon": {
    component: TimeFieldDemos.WithSuffixIcon,
    file: "en/time-field/with-suffix-icon.tsx",
  },
  "time-field-full-width": {
    component: TimeFieldDemos.FullWidth,
    file: "en/time-field/full-width.tsx",
  },
  "time-field-with-validation": {
    component: TimeFieldDemos.WithValidation,
    file: "en/time-field/with-validation.tsx",
  },
  "time-field-custom-render-function": {
    component: TimeFieldDemos.CustomRenderFunction,
    file: "en/time-field/custom-render-function.tsx",
  },
  // Toast demos
  "toast-default": {
    component: ToastDemos.Default,
    file: "en/toast/default.tsx",
  },
  "toast-simple": {
    component: ToastDemos.Simple,
    file: "en/toast/simple.tsx",
  },
  "toast-variants": {
    component: ToastDemos.Variants,
    file: "en/toast/variants.tsx",
  },
  "toast-custom-indicator": {
    component: ToastDemos.CustomIndicator,
    file: "en/toast/custom-indicator.tsx",
  },
  "toast-promise": {
    component: ToastDemos.Promise,
    file: "en/toast/promise.tsx",
  },
  "toast-callbacks": {
    component: ToastDemos.Callbacks,
    file: "en/toast/callbacks.tsx",
  },
  "toast-placements": {
    component: ToastDemos.Placements,
    file: "en/toast/placements.tsx",
  },
  "toast-custom-toast": {
    component: ToastDemos.CustomToast,
    file: "en/toast/custom-toast.tsx",
  },
  "toast-custom-queue": {
    component: ToastDemos.CustomQueue,
    file: "en/toast/custom-queue.tsx",
  },
  // ToggleButton demos
  "toggle-button-basic": {
    component: ToggleButtonDemos.Basic,
    file: "en/toggle-button/basic.tsx",
  },
  "toggle-button-variants": {
    component: ToggleButtonDemos.Variants,
    file: "en/toggle-button/variants.tsx",
  },
  "toggle-button-sizes": {
    component: ToggleButtonDemos.Sizes,
    file: "en/toggle-button/sizes.tsx",
  },
  "toggle-button-icon-only": {
    component: ToggleButtonDemos.IconOnly,
    file: "en/toggle-button/icon-only.tsx",
  },
  "toggle-button-controlled": {
    component: ToggleButtonDemos.Controlled,
    file: "en/toggle-button/controlled.tsx",
  },
  "toggle-button-disabled": {
    component: ToggleButtonDemos.Disabled,
    file: "en/toggle-button/disabled.tsx",
  },
  // ToggleButtonGroup demos
  "toggle-button-group-basic": {
    component: ToggleButtonGroupDemos.Basic,
    file: "en/toggle-button-group/basic.tsx",
  },
  "toggle-button-group-sizes": {
    component: ToggleButtonGroupDemos.Sizes,
    file: "en/toggle-button-group/sizes.tsx",
  },
  "toggle-button-group-orientation": {
    component: ToggleButtonGroupDemos.Orientation,
    file: "en/toggle-button-group/orientation.tsx",
  },
  "toggle-button-group-attached": {
    component: ToggleButtonGroupDemos.Attached,
    file: "en/toggle-button-group/attached.tsx",
  },
  "toggle-button-group-full-width": {
    component: ToggleButtonGroupDemos.FullWidth,
    file: "en/toggle-button-group/full-width.tsx",
  },
  "toggle-button-group-selection-mode": {
    component: ToggleButtonGroupDemos.SelectionMode,
    file: "en/toggle-button-group/selection-mode.tsx",
  },
  "toggle-button-group-controlled": {
    component: ToggleButtonGroupDemos.Controlled,
    file: "en/toggle-button-group/controlled.tsx",
  },
  "toggle-button-group-disabled": {
    component: ToggleButtonGroupDemos.Disabled,
    file: "en/toggle-button-group/disabled.tsx",
  },
  "toggle-button-group-without-separator": {
    component: ToggleButtonGroupDemos.WithoutSeparator,
    file: "en/toggle-button-group/without-separator.tsx",
  },
  // Toolbar demos
  "toolbar-basic": {
    component: ToolbarDemos.Basic,
    file: "en/toolbar/basic.tsx",
  },
  "toolbar-vertical": {
    component: ToolbarDemos.Vertical,
    file: "en/toolbar/vertical.tsx",
  },
  "toolbar-with-button-group": {
    component: ToolbarDemos.WithButtonGroup,
    file: "en/toolbar/with-button-group.tsx",
  },
  "toolbar-attached": {
    component: ToolbarDemos.Attached,
    file: "en/toolbar/custom-styles.tsx",
  },
  // Tooltip demos
  "tooltip-basic": {
    component: TooltipDemos.Basic,
    file: "en/tooltip/basic.tsx",
  },
  "tooltip-with-arrow": {
    component: TooltipDemos.WithArrow,
    file: "en/tooltip/with-arrow.tsx",
  },
  "tooltip-placement": {
    component: TooltipDemos.Placement,
    file: "en/tooltip/placement.tsx",
  },
  "tooltip-custom-trigger": {
    component: TooltipDemos.CustomTrigger,
    file: "en/tooltip/custom-trigger.tsx",
  },
  "tooltip-custom-render-function": {
    component: TooltipDemos.CustomRenderFunction,
    file: "en/tooltip/custom-render-function.tsx",
  },
  // Popover demos
  "popover-basic": {
    component: PopoverDemos.Basic,
    file: "en/popover/basic.tsx",
  },
  "popover-with-arrow": {
    component: PopoverDemos.WithArrow,
    file: "en/popover/with-arrow.tsx",
  },
  "popover-placement": {
    component: PopoverDemos.Placement,
    file: "en/popover/placement.tsx",
  },
  "popover-interactive": {
    component: PopoverDemos.Interactive,
    file: "en/popover/interactive.tsx",
  },
  "popover-custom-render-function": {
    component: PopoverDemos.CustomRenderFunction,
    file: "en/popover/custom-render-function.tsx",
  },
  // Label demos
  "label-basic": {
    component: LabelDemos.Basic,
    file: "en/label/basic.tsx",
  },
  // ListBox demos
  "list-box-controlled": {
    component: ListBoxDemos.Controlled,
    file: "en/list-box/controlled.tsx",
  },
  "list-box-custom-check-icon": {
    component: ListBoxDemos.CustomCheckIcon,
    file: "en/list-box/custom-check-icon.tsx",
  },
  "list-box-default": {
    component: ListBoxDemos.Default,
    file: "en/list-box/default.tsx",
  },
  "list-box-multi-select": {
    component: ListBoxDemos.MultiSelect,
    file: "en/list-box/multi-select.tsx",
  },
  "list-box-scrollbar-modes": {
    component: ListBoxDemos.ScrollbarModes,
    file: "en/list-box/scrollbar-modes.tsx",
  },
  "list-box-with-disabled-items": {
    component: ListBoxDemos.WithDisabledItems,
    file: "en/list-box/with-disabled-items.tsx",
  },
  "list-box-with-sections": {
    component: ListBoxDemos.WithSections,
    file: "en/list-box/with-sections.tsx",
  },
  "list-box-custom-render-function": {
    component: ListBoxDemos.CustomRenderFunction,
    file: "en/list-box/custom-render-function.tsx",
  },
  "list-box-virtualization": {
    component: ListBoxDemos.Virtualization,
    file: "en/list-box/virtualization.tsx",
  },
  // Meter demos
  "meter-basic": {
    component: MeterDemos.Basic,
    file: "en/meter/basic.tsx",
  },
  "meter-sizes": {
    component: MeterDemos.Sizes,
    file: "en/meter/sizes.tsx",
  },
  "meter-colors": {
    component: MeterDemos.Colors,
    file: "en/meter/colors.tsx",
  },
  "meter-custom-value": {
    component: MeterDemos.CustomValue,
    file: "en/meter/custom-value.tsx",
  },
  "meter-without-label": {
    component: MeterDemos.WithoutLabel,
    file: "en/meter/without-label.tsx",
  },
  // ProgressBar demos
  "progress-bar-basic": {
    component: ProgressBarDemos.Basic,
    file: "en/progress-bar/basic.tsx",
  },
  "progress-bar-sizes": {
    component: ProgressBarDemos.Sizes,
    file: "en/progress-bar/sizes.tsx",
  },
  "progress-bar-colors": {
    component: ProgressBarDemos.Colors,
    file: "en/progress-bar/colors.tsx",
  },
  "progress-bar-indeterminate": {
    component: ProgressBarDemos.Indeterminate,
    file: "en/progress-bar/indeterminate.tsx",
  },
  "progress-bar-custom-value": {
    component: ProgressBarDemos.CustomValue,
    file: "en/progress-bar/custom-value.tsx",
  },
  "progress-bar-without-label": {
    component: ProgressBarDemos.WithoutLabel,
    file: "en/progress-bar/without-label.tsx",
  },
  // ProgressCircle demos
  "progress-circle-basic": {
    component: ProgressCircleDemos.Basic,
    file: "en/progress-circle/basic.tsx",
  },
  "progress-circle-sizes": {
    component: ProgressCircleDemos.Sizes,
    file: "en/progress-circle/sizes.tsx",
  },
  "progress-circle-colors": {
    component: ProgressCircleDemos.Colors,
    file: "en/progress-circle/colors.tsx",
  },
  "progress-circle-indeterminate": {
    component: ProgressCircleDemos.Indeterminate,
    file: "en/progress-circle/indeterminate.tsx",
  },
  "progress-circle-with-label": {
    component: ProgressCircleDemos.WithLabel,
    file: "en/progress-circle/with-label.tsx",
  },
  "progress-circle-custom-svg": {
    component: ProgressCircleDemos.CustomSvg,
    file: "en/progress-circle/custom-svg.tsx",
  },
  // Modal demos
  "modal-default": {
    component: ModalDemos.Default,
    file: "en/modal/default.tsx",
  },
  "modal-placements": {
    component: ModalDemos.Placements,
    file: "en/modal/placements.tsx",
  },
  "modal-backdrop-variants": {
    component: ModalDemos.BackdropVariants,
    file: "en/modal/backdrop-variants.tsx",
  },
  "modal-scroll-comparison": {
    component: ModalDemos.ScrollComparison,
    file: "en/modal/scroll-comparison.tsx",
  },
  "modal-dismiss-behavior": {
    component: ModalDemos.DismissBehavior,
    file: "en/modal/dismiss-behavior.tsx",
  },
  "modal-with-form": {
    component: ModalDemos.WithForm,
    file: "en/modal/with-form.tsx",
  },
  "modal-controlled": {
    component: ModalDemos.Controlled,
    file: "en/modal/controlled.tsx",
  },
  "modal-custom-trigger": {
    component: ModalDemos.CustomTrigger,
    file: "en/modal/custom-trigger.tsx",
  },
  "modal-custom-backdrop": {
    component: ModalDemos.CustomBackdrop,
    file: "en/modal/custom-backdrop.tsx",
  },
  "modal-custom-animations": {
    component: ModalDemos.CustomAnimations,
    file: "en/modal/custom-animations.tsx",
  },
  "modal-sizes": {
    component: ModalDemos.Sizes,
    file: "en/modal/sizes.tsx",
  },
  "modal-close-methods": {
    component: ModalDemos.CloseMethods,
    file: "en/modal/close-methods.tsx",
  },
  "modal-custom-portal": {
    component: ModalDemos.CustomPortal,
    file: "en/modal/custom-portal.tsx",
  },
  // NumberField demos
  "number-field-basic": {
    component: NumberFieldDemos.Basic,
    file: "en/number-field/basic.tsx",
  },
  "number-field-with-description": {
    component: NumberFieldDemos.WithDescription,
    file: "en/number-field/with-description.tsx",
  },
  "number-field-required": {
    component: NumberFieldDemos.Required,
    file: "en/number-field/required.tsx",
  },
  "number-field-validation": {
    component: NumberFieldDemos.Validation,
    file: "en/number-field/validation.tsx",
  },
  "number-field-disabled": {
    component: NumberFieldDemos.Disabled,
    file: "en/number-field/disabled.tsx",
  },
  "number-field-full-width": {
    component: NumberFieldDemos.FullWidth,
    file: "en/number-field/full-width.tsx",
  },
  "number-field-controlled": {
    component: NumberFieldDemos.Controlled,
    file: "en/number-field/controlled.tsx",
  },
  "number-field-with-validation": {
    component: NumberFieldDemos.WithValidation,
    file: "en/number-field/with-validation.tsx",
  },
  "number-field-with-step": {
    component: NumberFieldDemos.WithStep,
    file: "en/number-field/with-step.tsx",
  },
  "number-field-with-format-options": {
    component: NumberFieldDemos.WithFormatOptions,
    file: "en/number-field/with-format-options.tsx",
  },
  "number-field-custom-icons": {
    component: NumberFieldDemos.CustomIcons,
    file: "en/number-field/custom-icons.tsx",
  },
  "number-field-on-surface": {
    component: NumberFieldDemos.OnSurface,
    file: "en/number-field/on-surface.tsx",
  },
  "number-field-with-chevrons": {
    component: NumberFieldDemos.WithChevrons,
    file: "en/number-field/with-chevrons.tsx",
  },
  "number-field-form-example": {
    component: NumberFieldDemos.FormExample,
    file: "en/number-field/form-example.tsx",
  },
  "number-field-variants": {
    component: NumberFieldDemos.Variants,
    file: "en/number-field/variants.tsx",
  },
  "number-field-custom-render-function": {
    component: NumberFieldDemos.CustomRenderFunction,
    file: "en/number-field/custom-render-function.tsx",
  },
  // Pagination demos
  "pagination-basic": {
    component: PaginationDemos.Basic,
    file: "en/pagination/basic.tsx",
  },
  "pagination-sizes": {
    component: PaginationDemos.Sizes,
    file: "en/pagination/sizes.tsx",
  },
  "pagination-with-ellipsis": {
    component: PaginationDemos.WithEllipsis,
    file: "en/pagination/with-ellipsis.tsx",
  },
  "pagination-simple-prev-next": {
    component: PaginationDemos.SimplePrevNext,
    file: "en/pagination/simple-prev-next.tsx",
  },
  "pagination-with-summary": {
    component: PaginationDemos.WithSummary,
    file: "en/pagination/with-summary.tsx",
  },
  "pagination-custom-icons": {
    component: PaginationDemos.CustomIcons,
    file: "en/pagination/custom-icons.tsx",
  },
  "pagination-controlled": {
    component: PaginationDemos.Controlled,
    file: "en/pagination/controlled.tsx",
  },
  "pagination-disabled": {
    component: PaginationDemos.Disabled,
    file: "en/pagination/disabled.tsx",
  },
  // Select demos
  "select-default": {
    component: SelectDemos.Default,
    file: "en/select/default.tsx",
  },
  "select-with-description": {
    component: SelectDemos.WithDescription,
    file: "en/select/with-description.tsx",
  },
  "select-multiple-select": {
    component: SelectDemos.MultipleSelect,
    file: "en/select/multiple-select.tsx",
  },
  "select-with-sections": {
    component: SelectDemos.WithSections,
    file: "en/select/with-sections.tsx",
  },
  "select-with-disabled-options": {
    component: SelectDemos.WithDisabledOptions,
    file: "en/select/with-disabled-options.tsx",
  },
  "select-custom-indicator": {
    component: SelectDemos.CustomIndicator,
    file: "en/select/custom-indicator.tsx",
  },
  "select-required": {
    component: SelectDemos.Required,
    file: "en/select/required.tsx",
  },
  "select-full-width": {
    component: SelectDemos.FullWidth,
    file: "en/select/full-width.tsx",
  },
  "select-on-surface": {
    component: SelectDemos.OnSurface,
    file: "en/select/on-surface.tsx",
  },
  "select-custom-value": {
    component: SelectDemos.CustomValue,
    file: "en/select/custom-value.tsx",
  },
  "select-custom-value-multiple": {
    component: SelectDemos.CustomValueMultiple,
    file: "en/select/custom-value-multiple.tsx",
  },
  "select-controlled": {
    component: SelectDemos.Controlled,
    file: "en/select/controlled.tsx",
  },
  "select-controlled-multiple": {
    component: SelectDemos.ControlledMultiple,
    file: "en/select/controlled-multiple.tsx",
  },
  "select-controlled-open-state": {
    component: SelectDemos.ControlledOpenState,
    file: "en/select/controlled-open-state.tsx",
  },
  "select-asynchronous-loading": {
    component: SelectDemos.AsynchronousLoading,
    file: "en/select/asynchronous-loading.tsx",
  },
  "select-disabled": {
    component: SelectDemos.Disabled,
    file: "en/select/disabled.tsx",
  },
  "select-variants": {
    component: SelectDemos.Variants,
    file: "en/select/variants.tsx",
  },
  "select-custom-render-function": {
    component: SelectDemos.CustomRenderFunction,
    file: "en/select/custom-render-function.tsx",
  },
  // SearchField demos
  "search-field-basic": {
    component: SearchFieldDemos.Basic,
    file: "en/search-field/basic.tsx",
  },
  "search-field-with-description": {
    component: SearchFieldDemos.WithDescription,
    file: "en/search-field/with-description.tsx",
  },
  "search-field-required": {
    component: SearchFieldDemos.Required,
    file: "en/search-field/required.tsx",
  },
  "search-field-validation": {
    component: SearchFieldDemos.Validation,
    file: "en/search-field/validation.tsx",
  },
  "search-field-disabled": {
    component: SearchFieldDemos.Disabled,
    file: "en/search-field/disabled.tsx",
  },
  "search-field-full-width": {
    component: SearchFieldDemos.FullWidth,
    file: "en/search-field/full-width.tsx",
  },
  "search-field-controlled": {
    component: SearchFieldDemos.Controlled,
    file: "en/search-field/controlled.tsx",
  },
  "search-field-with-validation": {
    component: SearchFieldDemos.WithValidation,
    file: "en/search-field/with-validation.tsx",
  },
  "search-field-custom-icons": {
    component: SearchFieldDemos.CustomIcons,
    file: "en/search-field/custom-icons.tsx",
  },
  "search-field-on-surface": {
    component: SearchFieldDemos.OnSurface,
    file: "en/search-field/on-surface.tsx",
  },
  "search-field-form-example": {
    component: SearchFieldDemos.FormExample,
    file: "en/search-field/form-example.tsx",
  },
  "search-field-with-keyboard-shortcut": {
    component: SearchFieldDemos.WithKeyboardShortcut,
    file: "en/search-field/with-keyboard-shortcut.tsx",
  },
  "search-field-variants": {
    component: SearchFieldDemos.Variants,
    file: "en/search-field/variants.tsx",
  },
  "search-field-custom-render-function": {
    component: SearchFieldDemos.CustomRenderFunction,
    file: "en/search-field/custom-render-function.tsx",
  },
  // ScrollShadow demos
  "scroll-shadow-default": {
    component: ScrollShadowDemos.Default,
    file: "en/scroll-shadow/default.tsx",
  },
  "scroll-shadow-orientation": {
    component: ScrollShadowDemos.Orientation,
    file: "en/scroll-shadow/orientation.tsx",
  },
  "scroll-shadow-hide-scroll-bar": {
    component: ScrollShadowDemos.HideScrollBar,
    file: "en/scroll-shadow/hide-scroll-bar.tsx",
  },
  "scroll-shadow-custom-size": {
    component: ScrollShadowDemos.CustomSize,
    file: "en/scroll-shadow/custom-size.tsx",
  },
  "scroll-shadow-visibility-change": {
    component: ScrollShadowDemos.VisibilityChange,
    file: "en/scroll-shadow/visibility-change.tsx",
  },
  "scroll-shadow-with-card": {
    component: ScrollShadowDemos.WithCard,
    file: "en/scroll-shadow/with-card.tsx",
  },
  // Slider demos
  "slider-default": {
    component: SliderDemos.Default,
    file: "en/slider/default.tsx",
  },
  "slider-vertical": {
    component: SliderDemos.Vertical,
    file: "en/slider/vertical.tsx",
  },
  "slider-range": {
    component: SliderDemos.Range,
    file: "en/slider/range.tsx",
  },
  "slider-disabled": {
    component: SliderDemos.Disabled,
    file: "en/slider/disabled.tsx",
  },
  "slider-custom-render-function": {
    component: SliderDemos.CustomRenderFunction,
    file: "en/slider/custom-render-function.tsx",
  },
  // Description demos
  "description-basic": {
    component: DescriptionDemos.Basic,
    file: "en/description/basic.tsx",
  },
  // FieldError demos
  "field-error-basic": {
    component: FieldErrorDemos.Basic,
    file: "en/field-error/basic.tsx",
  },
};
