/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix */
import type {DemoItem} from "@/demos";

// Registry mapping demo names to their components
export const demos: Record<string, DemoItem> = {
  // Accordion demos
  "accordion-basic": {
    loader: () => import("./accordion/basic").then((m) => m.Basic),
    file: "cn/accordion/basic.tsx",
  },
  "accordion-surface": {
    loader: () => import("./accordion/surface").then((m) => m.Surface),
    file: "cn/accordion/surface.tsx",
  },
  "accordion-multiple": {
    loader: () => import("./accordion/multiple").then((m) => m.Multiple),
    file: "cn/accordion/multiple.tsx",
  },
  "accordion-disabled": {
    loader: () => import("./accordion/disabled").then((m) => m.Disabled),
    file: "cn/accordion/disabled.tsx",
  },
  "accordion-custom-indicator": {
    loader: () => import("./accordion/custom-indicator").then((m) => m.CustomIndicator),
    file: "cn/accordion/custom-indicator.tsx",
  },
  "accordion-faq": {
    loader: () => import("./accordion/faq").then((m) => m.FAQ),
    file: "cn/accordion/faq.tsx",
  },
  "accordion-custom-styles": {
    loader: () => import("./accordion/custom-styles").then((m) => m.CustomStyles),
    file: "cn/accordion/custom-styles.tsx",
  },
  "accordion-without-separator": {
    loader: () => import("./accordion/without-separator").then((m) => m.WithoutSeparator),
    file: "cn/accordion/without-separator.tsx",
  },
  "accordion-custom-render-function": {
    loader: () => import("./accordion/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/accordion/custom-render-function.tsx",
  },
  "accordion-controlled": {
    loader: () => import("./accordion/controlled").then((m) => m.Controlled),
    file: "cn/accordion/controlled.tsx",
  },
  // Alert demos
  "alert-basic": {
    loader: () => import("./alert/basic").then((m) => m.Basic),
    file: "cn/alert/basic.tsx",
  },
  // AlertDialog demos
  "alert-dialog-default": {
    loader: () => import("./alert-dialog/default").then((m) => m.Default),
    file: "cn/alert-dialog/default.tsx",
  },
  "alert-dialog-statuses": {
    loader: () => import("./alert-dialog/statuses").then((m) => m.Statuses),
    file: "cn/alert-dialog/statuses.tsx",
  },
  "alert-dialog-placements": {
    loader: () => import("./alert-dialog/placements").then((m) => m.Placements),
    file: "cn/alert-dialog/placements.tsx",
  },
  "alert-dialog-backdrop-variants": {
    loader: () => import("./alert-dialog/backdrop-variants").then((m) => m.BackdropVariants),
    file: "cn/alert-dialog/backdrop-variants.tsx",
  },
  "alert-dialog-sizes": {
    loader: () => import("./alert-dialog/sizes").then((m) => m.Sizes),
    file: "cn/alert-dialog/sizes.tsx",
  },
  "alert-dialog-controlled": {
    loader: () => import("./alert-dialog/controlled").then((m) => m.Controlled),
    file: "cn/alert-dialog/controlled.tsx",
  },
  "alert-dialog-dismiss-behavior": {
    loader: () => import("./alert-dialog/dismiss-behavior").then((m) => m.DismissBehavior),
    file: "cn/alert-dialog/dismiss-behavior.tsx",
  },
  "alert-dialog-custom-icon": {
    loader: () => import("./alert-dialog/custom-icon").then((m) => m.CustomIcon),
    file: "cn/alert-dialog/custom-icon.tsx",
  },
  "alert-dialog-custom-backdrop": {
    loader: () => import("./alert-dialog/custom-backdrop").then((m) => m.CustomBackdrop),
    file: "cn/alert-dialog/custom-backdrop.tsx",
  },
  "alert-dialog-custom-trigger": {
    loader: () => import("./alert-dialog/custom-trigger").then((m) => m.CustomTrigger),
    file: "cn/alert-dialog/custom-trigger.tsx",
  },
  "alert-dialog-with-close-button": {
    loader: () => import("./alert-dialog/with-close-button").then((m) => m.WithCloseButton),
    file: "cn/alert-dialog/with-close-button.tsx",
  },
  "alert-dialog-custom-animations": {
    loader: () => import("./alert-dialog/custom-animations").then((m) => m.CustomAnimations),
    file: "cn/alert-dialog/custom-animations.tsx",
  },
  "alert-dialog-close-methods": {
    loader: () => import("./alert-dialog/close-methods").then((m) => m.CloseMethods),
    file: "cn/alert-dialog/close-methods.tsx",
  },
  "alert-dialog-custom-portal": {
    loader: () => import("./alert-dialog/custom-portal").then((m) => m.CustomPortal),
    file: "cn/alert-dialog/custom-portal.tsx",
  },
  // Avatar demos
  "avatar-basic": {
    loader: () => import("./avatar/basic").then((m) => m.Basic),
    file: "cn/avatar/basic.tsx",
  },
  "avatar-sizes": {
    loader: () => import("./avatar/sizes").then((m) => m.Sizes),
    file: "cn/avatar/sizes.tsx",
  },
  "avatar-colors": {
    loader: () => import("./avatar/colors").then((m) => m.Colors),
    file: "cn/avatar/colors.tsx",
  },
  "avatar-variants": {
    loader: () => import("./avatar/variants").then((m) => m.Variants),
    file: "cn/avatar/variants.tsx",
  },
  "avatar-fallback": {
    loader: () => import("./avatar/fallback").then((m) => m.Fallback),
    file: "cn/avatar/fallback.tsx",
  },
  "avatar-group": {
    loader: () => import("./avatar/group").then((m) => m.Group),
    file: "cn/avatar/group.tsx",
  },
  "avatar-custom-styles": {
    loader: () => import("./avatar/custom-styles").then((m) => m.CustomStyles),
    file: "cn/avatar/custom-styles.tsx",
  },
  // Badge demos
  "badge-basic": {
    loader: () => import("./badge/basic").then((m) => m.BadgeBasic),
    file: "cn/badge/basic.tsx",
  },
  "badge-colors": {
    loader: () => import("./badge/colors").then((m) => m.BadgeColors),
    file: "cn/badge/colors.tsx",
  },
  "badge-sizes": {
    loader: () => import("./badge/sizes").then((m) => m.BadgeSizes),
    file: "cn/badge/sizes.tsx",
  },
  "badge-variants": {
    loader: () => import("./badge/variants").then((m) => m.BadgeVariants),
    file: "cn/badge/variants.tsx",
  },
  "badge-placements": {
    loader: () => import("./badge/placements").then((m) => m.BadgePlacements),
    file: "cn/badge/placements.tsx",
  },
  "badge-with-content": {
    loader: () => import("./badge/with-content").then((m) => m.BadgeWithContent),
    file: "cn/badge/with-content.tsx",
  },
  "badge-dot": {
    loader: () => import("./badge/dot").then((m) => m.BadgeDot),
    file: "cn/badge/dot.tsx",
  },
  // Breadcrumbs demos
  "breadcrumbs-basic": {
    loader: () => import("./breadcrumbs/basic").then((m) => m.default),
    file: "cn/breadcrumbs/basic.tsx",
  },
  "breadcrumbs-level-2": {
    loader: () => import("./breadcrumbs/level-2").then((m) => m.default),
    file: "cn/breadcrumbs/level-2.tsx",
  },
  "breadcrumbs-level-3": {
    loader: () => import("./breadcrumbs/level-3").then((m) => m.default),
    file: "cn/breadcrumbs/level-3.tsx",
  },
  "breadcrumbs-custom-separator": {
    loader: () => import("./breadcrumbs/custom-separator").then((m) => m.default),
    file: "cn/breadcrumbs/custom-separator.tsx",
  },
  "breadcrumbs-disabled": {
    loader: () => import("./breadcrumbs/disabled").then((m) => m.default),
    file: "cn/breadcrumbs/disabled.tsx",
  },
  "breadcrumbs-custom-render-function": {
    loader: () =>
      import("./breadcrumbs/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/breadcrumbs/custom-render-function.tsx",
  },
  // Button demos
  "button-basic": {
    loader: () => import("./button/basic").then((m) => m.Basic),
    file: "cn/button/basic.tsx",
  },
  "button-custom-variants": {
    loader: () => import("./button/custom-variants").then((m) => m.CustomVariants),
    file: "cn/button/custom-variants.tsx",
  },
  "button-disabled": {
    loader: () => import("./button/disabled").then((m) => m.Disabled),
    file: "cn/button/disabled.tsx",
  },
  "button-icon-only": {
    loader: () => import("./button/icon-only").then((m) => m.IconOnly),
    file: "cn/button/icon-only.tsx",
  },
  "button-loading": {
    loader: () => import("./button/loading").then((m) => m.Loading),
    file: "cn/button/loading.tsx",
  },
  "button-loading-state": {
    loader: () => import("./button/loading-state").then((m) => m.LoadingState),
    file: "cn/button/loading-state.tsx",
  },
  "button-sizes": {
    loader: () => import("./button/sizes").then((m) => m.Sizes),
    file: "cn/button/sizes.tsx",
  },
  "button-full-width": {
    loader: () => import("./button/full-width").then((m) => m.FullWidth),
    file: "cn/button/full-width.tsx",
  },
  "button-social": {
    loader: () => import("./button/social").then((m) => m.Social),
    file: "cn/button/social.tsx",
  },
  "button-ripple-effect": {
    loader: () => import("./button/ripple-effect").then((m) => m.RippleEffect),
    file: "cn/button/ripple-effect.tsx",
  },
  "button-variants": {
    loader: () => import("./button/variants").then((m) => m.Variants),
    file: "cn/button/variants.tsx",
  },
  "button-outline-variant": {
    loader: () => import("./button/outline-variant").then((m) => m.OutlineVariant),
    file: "cn/button/outline-variant.tsx",
  },
  "button-with-icons": {
    loader: () => import("./button/with-icons").then((m) => m.WithIcons),
    file: "cn/button/with-icons.tsx",
  },
  "button-custom-render-function": {
    loader: () => import("./button/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/button/custom-render-function.tsx",
  },
  // ButtonGroup demos
  "button-group-basic": {
    loader: () => import("./button-group/basic").then((m) => m.Basic),
    file: "cn/button-group/basic.tsx",
  },
  "button-group-disabled": {
    loader: () => import("./button-group/disabled").then((m) => m.Disabled),
    file: "cn/button-group/disabled.tsx",
  },
  "button-group-sizes": {
    loader: () => import("./button-group/sizes").then((m) => m.Sizes),
    file: "cn/button-group/sizes.tsx",
  },
  "button-group-full-width": {
    loader: () => import("./button-group/full-width").then((m) => m.FullWidth),
    file: "cn/button-group/full-width.tsx",
  },
  "button-group-variants": {
    loader: () => import("./button-group/variants").then((m) => m.Variants),
    file: "cn/button-group/variants.tsx",
  },
  "button-group-with-icons": {
    loader: () => import("./button-group/with-icons").then((m) => m.WithIcons),
    file: "cn/button-group/with-icons.tsx",
  },
  "button-group-orientation": {
    loader: () => import("./button-group/orientation").then((m) => m.Orientation),
    file: "cn/button-group/orientation.tsx",
  },
  "button-group-without-separator": {
    loader: () => import("./button-group/without-separator").then((m) => m.WithoutSeparator),
    file: "cn/button-group/without-separator.tsx",
  },
  // Card demos
  "card-default": {
    loader: () => import("./card/default").then((m) => m.Default),
    file: "cn/card/default.tsx",
  },
  "card-horizontal": {
    loader: () => import("./card/horizontal").then((m) => m.Horizontal),
    file: "cn/card/horizontal.tsx",
  },
  "card-variants": {
    loader: () => import("./card/variants").then((m) => m.Variants),
    file: "cn/card/variants.tsx",
  },
  "card-with-avatar": {
    loader: () => import("./card/with-avatar").then((m) => m.WithAvatar),
    file: "cn/card/with-avatar.tsx",
  },
  "card-with-form": {
    loader: () => import("./card/with-form").then((m) => m.WithForm),
    file: "cn/card/with-form.tsx",
  },
  "card-with-images": {
    loader: () => import("./card/with-images").then((m) => m.WithImages),
    file: "cn/card/with-images.tsx",
  },
  // Calendar demos
  "calendar-basic": {
    loader: () => import("./calendar/basic").then((m) => m.Basic),
    file: "cn/calendar/basic.tsx",
  },
  "calendar-custom-styles": {
    loader: () => import("./calendar/custom-styles").then((m) => m.CustomStyles),
    file: "cn/calendar/custom-styles.tsx",
  },
  "calendar-default-value": {
    loader: () => import("./calendar/default-value").then((m) => m.DefaultValue),
    file: "cn/calendar/default-value.tsx",
  },
  "calendar-controlled": {
    loader: () => import("./calendar/controlled").then((m) => m.Controlled),
    file: "cn/calendar/controlled.tsx",
  },
  "calendar-min-max-dates": {
    loader: () => import("./calendar/min-max-dates").then((m) => m.MinMaxDates),
    file: "cn/calendar/min-max-dates.tsx",
  },
  "calendar-unavailable-dates": {
    loader: () => import("./calendar/unavailable-dates").then((m) => m.UnavailableDates),
    file: "cn/calendar/unavailable-dates.tsx",
  },
  "calendar-weeks-in-month": {
    loader: () => import("./calendar/weeks-in-month").then((m) => m.WeeksInMonth),
    file: "cn/calendar/weeks-in-month.tsx",
  },
  "calendar-week-view": {
    loader: () => import("./calendar/week-view").then((m) => m.WeekView),
    file: "cn/calendar/week-view.tsx",
  },
  "calendar-day-view": {
    loader: () => import("./calendar/day-view").then((m) => m.DayView),
    file: "cn/calendar/day-view.tsx",
  },
  "calendar-multiple-selection": {
    loader: () => import("./calendar/multiple-selection").then((m) => m.MultipleSelection),
    file: "cn/calendar/multiple-selection.tsx",
  },
  "calendar-disabled": {
    loader: () => import("./calendar/disabled").then((m) => m.Disabled),
    file: "cn/calendar/disabled.tsx",
  },
  "calendar-read-only": {
    loader: () => import("./calendar/read-only").then((m) => m.ReadOnly),
    file: "cn/calendar/read-only.tsx",
  },
  "calendar-focused-value": {
    loader: () => import("./calendar/focused-value").then((m) => m.FocusedValue),
    file: "cn/calendar/focused-value.tsx",
  },
  "calendar-with-indicators": {
    loader: () => import("./calendar/with-indicators").then((m) => m.WithIndicators),
    file: "cn/calendar/with-indicators.tsx",
  },
  "calendar-multiple-months": {
    loader: () => import("./calendar/multiple-months").then((m) => m.MultipleMonths),
    file: "cn/calendar/multiple-months.tsx",
  },
  "calendar-year-picker": {
    loader: () => import("./calendar/year-picker").then((m) => m.YearPicker),
    file: "cn/calendar/year-picker.tsx",
  },
  "calendar-international-calendar": {
    loader: () => import("./calendar/international-calendar").then((m) => m.InternationalCalendar),
    file: "cn/calendar/international-calendar.tsx",
  },
  "calendar-booking-calendar": {
    loader: () => import("./calendar/booking-calendar").then((m) => m.BookingCalendar),
    file: "cn/calendar/booking-calendar.tsx",
  },
  "calendar-custom-icons": {
    loader: () => import("./calendar/custom-icons").then((m) => m.CustomIcons),
    file: "cn/calendar/custom-icons.tsx",
  },
  // RangeCalendar demos
  "range-calendar-basic": {
    loader: () => import("./range-calendar/basic").then((m) => m.Basic),
    file: "cn/range-calendar/basic.tsx",
  },
  "range-calendar-year-picker": {
    loader: () => import("./range-calendar/year-picker").then((m) => m.YearPicker),
    file: "cn/range-calendar/year-picker.tsx",
  },
  "range-calendar-default-value": {
    loader: () => import("./range-calendar/default-value").then((m) => m.DefaultValue),
    file: "cn/range-calendar/default-value.tsx",
  },
  "range-calendar-controlled": {
    loader: () => import("./range-calendar/controlled").then((m) => m.Controlled),
    file: "cn/range-calendar/controlled.tsx",
  },
  "range-calendar-min-max-dates": {
    loader: () => import("./range-calendar/min-max-dates").then((m) => m.MinMaxDates),
    file: "cn/range-calendar/min-max-dates.tsx",
  },
  "range-calendar-unavailable-dates": {
    loader: () => import("./range-calendar/unavailable-dates").then((m) => m.UnavailableDates),
    file: "cn/range-calendar/unavailable-dates.tsx",
  },
  "range-calendar-anchor-unavailable-dates": {
    loader: () =>
      import("./range-calendar/anchor-unavailable-dates").then((m) => m.AnchorUnavailableDates),
    file: "cn/range-calendar/anchor-unavailable-dates.tsx",
  },
  "range-calendar-weeks-in-month": {
    loader: () => import("./range-calendar/weeks-in-month").then((m) => m.WeeksInMonth),
    file: "cn/range-calendar/weeks-in-month.tsx",
  },
  "range-calendar-week-view": {
    loader: () => import("./range-calendar/week-view").then((m) => m.WeekView),
    file: "cn/range-calendar/week-view.tsx",
  },
  "range-calendar-day-view": {
    loader: () => import("./range-calendar/day-view").then((m) => m.DayView),
    file: "cn/range-calendar/day-view.tsx",
  },
  "range-calendar-allows-non-contiguous-ranges": {
    loader: () =>
      import("./range-calendar/allows-non-contiguous-ranges").then(
        (m) => m.AllowsNonContiguousRanges,
      ),
    file: "cn/range-calendar/allows-non-contiguous-ranges.tsx",
  },
  "range-calendar-disabled": {
    loader: () => import("./range-calendar/disabled").then((m) => m.Disabled),
    file: "cn/range-calendar/disabled.tsx",
  },
  "range-calendar-read-only": {
    loader: () => import("./range-calendar/read-only").then((m) => m.ReadOnly),
    file: "cn/range-calendar/read-only.tsx",
  },
  "range-calendar-invalid": {
    loader: () => import("./range-calendar/invalid").then((m) => m.Invalid),
    file: "cn/range-calendar/invalid.tsx",
  },
  "range-calendar-focused-value": {
    loader: () => import("./range-calendar/focused-value").then((m) => m.FocusedValue),
    file: "cn/range-calendar/focused-value.tsx",
  },
  "range-calendar-with-indicators": {
    loader: () => import("./range-calendar/with-indicators").then((m) => m.WithIndicators),
    file: "cn/range-calendar/with-indicators.tsx",
  },
  "range-calendar-multiple-months": {
    loader: () => import("./range-calendar/multiple-months").then((m) => m.MultipleMonths),
    file: "cn/range-calendar/multiple-months.tsx",
  },
  "range-calendar-three-months": {
    loader: () => import("./range-calendar/three-months").then((m) => m.ThreeMonths),
    file: "cn/range-calendar/three-months.tsx",
  },
  "range-calendar-international-calendar": {
    loader: () =>
      import("./range-calendar/international-calendar").then((m) => m.InternationalCalendar),
    file: "cn/range-calendar/international-calendar.tsx",
  },
  "range-calendar-booking-calendar": {
    loader: () => import("./range-calendar/booking-calendar").then((m) => m.BookingCalendar),
    file: "cn/range-calendar/booking-calendar.tsx",
  },
  // Checkbox demos
  "checkbox-basic": {
    loader: () => import("./checkbox/basic").then((m) => m.Basic),
    file: "cn/checkbox/basic.tsx",
  },
  "checkbox-disabled": {
    loader: () => import("./checkbox/disabled").then((m) => m.Disabled),
    file: "cn/checkbox/disabled.tsx",
  },
  "checkbox-default-selected": {
    loader: () => import("./checkbox/default-selected").then((m) => m.DefaultSelected),
    file: "cn/checkbox/default-selected.tsx",
  },
  "checkbox-controlled": {
    loader: () => import("./checkbox/controlled").then((m) => m.Controlled),
    file: "cn/checkbox/controlled.tsx",
  },
  "checkbox-indeterminate": {
    loader: () => import("./checkbox/indeterminate").then((m) => m.Indeterminate),
    file: "cn/checkbox/indeterminate.tsx",
  },
  "checkbox-external-label": {
    loader: () => import("./checkbox/external-label").then((m) => m.ExternalLabel),
    file: "cn/checkbox/external-label.tsx",
  },
  "checkbox-with-description": {
    loader: () => import("./checkbox/with-description").then((m) => m.WithDescription),
    file: "cn/checkbox/with-description.tsx",
  },
  "checkbox-render-props": {
    loader: () => import("./checkbox/render-props").then((m) => m.RenderProps),
    file: "cn/checkbox/render-props.tsx",
  },
  "checkbox-form": {
    loader: () => import("./checkbox/form").then((m) => m.Form),
    file: "cn/checkbox/form.tsx",
  },
  "checkbox-custom-styles": {
    loader: () => import("./checkbox/custom-styles").then((m) => m.CustomStyles),
    file: "cn/checkbox/custom-styles.tsx",
  },
  "checkbox-invalid": {
    loader: () => import("./checkbox/invalid").then((m) => m.Invalid),
    file: "cn/checkbox/invalid.tsx",
  },
  "checkbox-custom-indicator": {
    loader: () => import("./checkbox/custom-indicator").then((m) => m.CustomIndicator),
    file: "cn/checkbox/custom-indicator.tsx",
  },
  "checkbox-full-rounded": {
    loader: () => import("./checkbox/full-rounded").then((m) => m.FullRounded),
    file: "cn/checkbox/full-rounded.tsx",
  },
  "checkbox-variants": {
    loader: () => import("./checkbox/variants").then((m) => m.Variants),
    file: "cn/checkbox/variants.tsx",
  },
  "checkbox-custom-render-function": {
    loader: () => import("./checkbox/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/checkbox/custom-render-function.tsx",
  },
  // CheckboxGroup demos
  "checkbox-group-basic": {
    loader: () => import("./checkbox-group/basic").then((m) => m.Basic),
    file: "cn/checkbox-group/basic.tsx",
  },
  "checkbox-group-on-surface": {
    loader: () => import("./checkbox-group/on-surface").then((m) => m.OnSurface),
    file: "cn/checkbox-group/on-surface.tsx",
  },
  "checkbox-group-with-custom-indicator": {
    loader: () =>
      import("./checkbox-group/with-custom-indicator").then((m) => m.WithCustomIndicator),
    file: "cn/checkbox-group/with-custom-indicator.tsx",
  },
  "checkbox-group-indeterminate": {
    loader: () => import("./checkbox-group/indeterminate").then((m) => m.Indeterminate),
    file: "cn/checkbox-group/indeterminate.tsx",
  },
  "checkbox-group-validation": {
    loader: () => import("./checkbox-group/validation").then((m) => m.Validation),
    file: "cn/checkbox-group/validation.tsx",
  },
  "checkbox-group-controlled": {
    loader: () => import("./checkbox-group/controlled").then((m) => m.Controlled),
    file: "cn/checkbox-group/controlled.tsx",
  },
  "checkbox-group-disabled": {
    loader: () => import("./checkbox-group/disabled").then((m) => m.Disabled),
    file: "cn/checkbox-group/disabled.tsx",
  },
  "checkbox-group-features-and-addons": {
    loader: () => import("./checkbox-group/features-and-addons").then((m) => m.FeaturesAndAddOns),
    file: "cn/checkbox-group/features-and-addons.tsx",
  },
  "checkbox-group-custom-render-function": {
    loader: () =>
      import("./checkbox-group/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/checkbox-group/custom-render-function.tsx",
  },
  // Chip demos
  "chip-basic": {
    loader: () => import("./chip/basic").then((m) => m.ChipBasic),
    file: "cn/chip/basic.tsx",
  },
  "chip-variants": {
    loader: () => import("./chip/variants").then((m) => m.ChipVariants),
    file: "cn/chip/variants.tsx",
  },
  "chip-with-icon": {
    loader: () => import("./chip/with-icon").then((m) => m.ChipWithIcon),
    file: "cn/chip/with-icon.tsx",
  },
  "chip-statuses": {
    loader: () => import("./chip/statuses").then((m) => m.ChipStatuses),
    file: "cn/chip/statuses.tsx",
  },
  "chip-vibrant-palette": {
    loader: () => import("./chip/vibrant-palette").then((m) => m.ChipVibrantPalette),
    file: "cn/chip/vibrant-palette.tsx",
  },
  // ColorField demos
  "color-field-basic": {
    loader: () => import("./color-field/basic").then((m) => m.Basic),
    file: "cn/color-field/basic.tsx",
  },
  "color-field-channel-editing": {
    loader: () => import("./color-field/channel-editing").then((m) => m.ChannelEditing),
    file: "cn/color-field/channel-editing.tsx",
  },
  "color-field-controlled": {
    loader: () => import("./color-field/controlled").then((m) => m.Controlled),
    file: "cn/color-field/controlled.tsx",
  },
  "color-field-disabled": {
    loader: () => import("./color-field/disabled").then((m) => m.Disabled),
    file: "cn/color-field/disabled.tsx",
  },
  "color-field-form-example": {
    loader: () => import("./color-field/form-example").then((m) => m.FormExample),
    file: "cn/color-field/form-example.tsx",
  },
  "color-field-full-width": {
    loader: () => import("./color-field/full-width").then((m) => m.FullWidth),
    file: "cn/color-field/full-width.tsx",
  },
  "color-field-invalid": {
    loader: () => import("./color-field/invalid").then((m) => m.Invalid),
    file: "cn/color-field/invalid.tsx",
  },
  "color-field-on-surface": {
    loader: () => import("./color-field/on-surface").then((m) => m.OnSurface),
    file: "cn/color-field/on-surface.tsx",
  },
  "color-field-required": {
    loader: () => import("./color-field/required").then((m) => m.Required),
    file: "cn/color-field/required.tsx",
  },
  "color-field-variants": {
    loader: () => import("./color-field/variants").then((m) => m.Variants),
    file: "cn/color-field/variants.tsx",
  },
  "color-field-with-description": {
    loader: () => import("./color-field/with-description").then((m) => m.WithDescription),
    file: "cn/color-field/with-description.tsx",
  },
  "color-field-custom-render-function": {
    loader: () =>
      import("./color-field/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/color-field/custom-render-function.tsx",
  },
  // ColorPicker demos
  "color-picker-basic": {
    loader: () => import("./color-picker/basic").then((m) => m.Basic),
    file: "cn/color-picker/basic.tsx",
  },
  "color-picker-controlled": {
    loader: () => import("./color-picker/controlled").then((m) => m.Controlled),
    file: "cn/color-picker/controlled.tsx",
  },
  "color-picker-with-swatches": {
    loader: () => import("./color-picker/with-swatches").then((m) => m.WithSwatches),
    file: "cn/color-picker/with-swatches.tsx",
  },
  "color-picker-with-fields": {
    loader: () => import("./color-picker/with-fields").then((m) => m.WithFields),
    file: "cn/color-picker/with-fields.tsx",
  },
  "color-picker-with-sliders": {
    loader: () => import("./color-picker/with-sliders").then((m) => m.WithSliders),
    file: "cn/color-picker/with-sliders.tsx",
  },
  // ColorArea demos
  "color-area-basic": {
    loader: () => import("./color-area/basic").then((m) => m.ColorAreaBasic),
    file: "cn/color-area/basic.tsx",
  },
  "color-area-with-dots": {
    loader: () => import("./color-area/with-dots").then((m) => m.ColorAreaWithDots),
    file: "cn/color-area/with-dots.tsx",
  },
  "color-area-space-and-channels": {
    loader: () =>
      import("./color-area/space-and-channels").then((m) => m.ColorAreaSpaceAndChannels),
    file: "cn/color-area/space-and-channels.tsx",
  },
  "color-area-controlled": {
    loader: () => import("./color-area/controlled").then((m) => m.ColorAreaControlled),
    file: "cn/color-area/controlled.tsx",
  },
  "color-area-disabled": {
    loader: () => import("./color-area/disabled").then((m) => m.ColorAreaDisabled),
    file: "cn/color-area/disabled.tsx",
  },
  "color-area-custom-render-function": {
    loader: () => import("./color-area/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/color-area/custom-render-function.tsx",
  },
  // ColorSwatch demos
  "color-swatch-basic": {
    loader: () => import("./color-swatch/basic").then((m) => m.ColorSwatchBasic),
    file: "cn/color-swatch/basic.tsx",
  },
  "color-swatch-sizes": {
    loader: () => import("./color-swatch/sizes").then((m) => m.ColorSwatchSizes),
    file: "cn/color-swatch/sizes.tsx",
  },
  "color-swatch-shapes": {
    loader: () => import("./color-swatch/shapes").then((m) => m.ColorSwatchShapes),
    file: "cn/color-swatch/shapes.tsx",
  },
  "color-swatch-transparency": {
    loader: () => import("./color-swatch/transparency").then((m) => m.ColorSwatchTransparency),
    file: "cn/color-swatch/transparency.tsx",
  },
  "color-swatch-custom-styles": {
    loader: () => import("./color-swatch/custom-styles").then((m) => m.ColorSwatchCustomStyles),
    file: "cn/color-swatch/custom-styles.tsx",
  },
  "color-swatch-accessibility": {
    loader: () => import("./color-swatch/accessibility").then((m) => m.ColorSwatchAccessibility),
    file: "cn/color-swatch/accessibility.tsx",
  },
  "color-swatch-custom-render-function": {
    loader: () =>
      import("./color-swatch/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/color-swatch/custom-render-function.tsx",
  },
  // ColorSlider demos
  "color-slider-basic": {
    loader: () => import("./color-slider/basic").then((m) => m.Basic),
    file: "cn/color-slider/basic.tsx",
  },
  "color-slider-channels": {
    loader: () => import("./color-slider/channels").then((m) => m.Channels),
    file: "cn/color-slider/channels.tsx",
  },
  "color-slider-alpha-channel": {
    loader: () => import("./color-slider/alpha-channel").then((m) => m.AlphaChannel),
    file: "cn/color-slider/alpha-channel.tsx",
  },
  "color-slider-rgb-channels": {
    loader: () => import("./color-slider/rgb-channels").then((m) => m.RGBChannels),
    file: "cn/color-slider/rgb-channels.tsx",
  },
  "color-slider-vertical": {
    loader: () => import("./color-slider/vertical").then((m) => m.Vertical),
    file: "cn/color-slider/vertical.tsx",
  },
  "color-slider-disabled": {
    loader: () => import("./color-slider/disabled").then((m) => m.Disabled),
    file: "cn/color-slider/disabled.tsx",
  },
  "color-slider-controlled": {
    loader: () => import("./color-slider/controlled").then((m) => m.Controlled),
    file: "cn/color-slider/controlled.tsx",
  },
  "color-slider-custom-render-function": {
    loader: () =>
      import("./color-slider/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/color-slider/custom-render-function.tsx",
  },
  // CloseButton demos
  "close-button-default": {
    loader: () => import("./close-button/default").then((m) => m.Default),
    file: "cn/close-button/default.tsx",
  },
  "close-button-with-custom-icon": {
    loader: () => import("./close-button/with-custom-icon").then((m) => m.WithCustomIcon),
    file: "cn/close-button/with-custom-icon.tsx",
  },
  "close-button-interactive": {
    loader: () => import("./close-button/interactive").then((m) => m.Interactive),
    file: "cn/close-button/interactive.tsx",
  },
  // ColorSwatchPicker demos
  "color-swatch-picker-basic": {
    loader: () => import("./color-swatch-picker/basic").then((m) => m.Basic),
    file: "cn/color-swatch-picker/basic.tsx",
  },
  "color-swatch-picker-sizes": {
    loader: () => import("./color-swatch-picker/sizes").then((m) => m.Sizes),
    file: "cn/color-swatch-picker/sizes.tsx",
  },
  "color-swatch-picker-variants": {
    loader: () => import("./color-swatch-picker/variants").then((m) => m.Variants),
    file: "cn/color-swatch-picker/variants.tsx",
  },
  "color-swatch-picker-stack-layout": {
    loader: () => import("./color-swatch-picker/stack-layout").then((m) => m.StackLayout),
    file: "cn/color-swatch-picker/stack-layout.tsx",
  },
  "color-swatch-picker-controlled": {
    loader: () => import("./color-swatch-picker/controlled").then((m) => m.Controlled),
    file: "cn/color-swatch-picker/controlled.tsx",
  },
  "color-swatch-picker-disabled": {
    loader: () => import("./color-swatch-picker/disabled").then((m) => m.Disabled),
    file: "cn/color-swatch-picker/disabled.tsx",
  },
  "color-swatch-picker-default-value": {
    loader: () => import("./color-swatch-picker/default-value").then((m) => m.DefaultValue),
    file: "cn/color-swatch-picker/default-value.tsx",
  },
  "color-swatch-picker-custom-indicator": {
    loader: () => import("./color-swatch-picker/custom-indicator").then((m) => m.CustomIndicator),
    file: "cn/color-swatch-picker/custom-indicator.tsx",
  },
  "color-swatch-picker-custom-render-function": {
    loader: () =>
      import("./color-swatch-picker/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/color-swatch-picker/custom-render-function.tsx",
  },
  // Autocomplete demos
  "autocomplete-default": {
    loader: () => import("./autocomplete/default").then((m) => m.default),
    file: "cn/autocomplete/default.tsx",
  },
  "autocomplete-single-select": {
    loader: () => import("./autocomplete/single-select").then((m) => m.default),
    file: "cn/autocomplete/single-select.tsx",
  },
  "autocomplete-variants": {
    loader: () => import("./autocomplete/variants").then((m) => m.Variants),
    file: "cn/autocomplete/variants.tsx",
  },
  "autocomplete-multiple-select": {
    loader: () => import("./autocomplete/multiple-select").then((m) => m.MultipleSelect),
    file: "cn/autocomplete/multiple-select.tsx",
  },
  "autocomplete-full-width": {
    loader: () => import("./autocomplete/full-width").then((m) => m.FullWidth),
    file: "cn/autocomplete/full-width.tsx",
  },
  "autocomplete-with-description": {
    loader: () => import("./autocomplete/with-description").then((m) => m.WithDescription),
    file: "cn/autocomplete/with-description.tsx",
  },
  "autocomplete-with-sections": {
    loader: () => import("./autocomplete/with-sections").then((m) => m.WithSections),
    file: "cn/autocomplete/with-sections.tsx",
  },
  "autocomplete-with-disabled-options": {
    loader: () => import("./autocomplete/with-disabled-options").then((m) => m.WithDisabledOptions),
    file: "cn/autocomplete/with-disabled-options.tsx",
  },
  "autocomplete-allows-empty-collection": {
    loader: () =>
      import("./autocomplete/allows-empty-collection").then((m) => m.AllowsEmptyCollection),
    file: "cn/autocomplete/allows-empty-collection.tsx",
  },
  "autocomplete-custom-indicator": {
    loader: () => import("./autocomplete/custom-indicator").then((m) => m.CustomIndicator),
    file: "cn/autocomplete/custom-indicator.tsx",
  },
  "autocomplete-required": {
    loader: () => import("./autocomplete/required").then((m) => m.Required),
    file: "cn/autocomplete/required.tsx",
  },
  "autocomplete-controlled": {
    loader: () => import("./autocomplete/controlled").then((m) => m.Controlled),
    file: "cn/autocomplete/controlled.tsx",
  },
  "autocomplete-controlled-open-state": {
    loader: () => import("./autocomplete/controlled-open-state").then((m) => m.ControlledOpenState),
    file: "cn/autocomplete/controlled-open-state.tsx",
  },
  "autocomplete-asynchronous-filtering": {
    loader: () =>
      import("./autocomplete/asynchronous-filtering").then((m) => m.AsynchronousFiltering),
    file: "cn/autocomplete/asynchronous-filtering.tsx",
  },
  "autocomplete-virtualization": {
    loader: () => import("./autocomplete/virtualization").then((m) => m.Virtualization),
    file: "cn/autocomplete/virtualization.tsx",
  },
  "autocomplete-disabled": {
    loader: () => import("./autocomplete/disabled").then((m) => m.Disabled),
    file: "cn/autocomplete/disabled.tsx",
  },
  "autocomplete-user-selection": {
    loader: () => import("./autocomplete/user-selection").then((m) => m.UserSelection),
    file: "cn/autocomplete/user-selection.tsx",
  },
  "autocomplete-user-selection-multiple": {
    loader: () =>
      import("./autocomplete/user-selection-multiple").then((m) => m.UserSelectionMultiple),
    file: "cn/autocomplete/user-selection-multiple.tsx",
  },
  "autocomplete-location-search": {
    loader: () => import("./autocomplete/location-search").then((m) => m.LocationSearch),
    file: "cn/autocomplete/location-search.tsx",
  },
  "autocomplete-tag-group-selection": {
    loader: () => import("./autocomplete/tag-group-selection").then((m) => m.TagGroupSelection),
    file: "cn/autocomplete/tag-group-selection.tsx",
  },
  "autocomplete-email-recipients": {
    loader: () => import("./autocomplete/email-recipients").then((m) => m.EmailRecipients),
    file: "cn/autocomplete/email-recipients.tsx",
  },
  // ComboBox demos
  "combo-box-default": {
    loader: () => import("./combo-box/default").then((m) => m.Default),
    file: "cn/combo-box/default.tsx",
  },
  "combo-box-default-selected-key": {
    loader: () => import("./combo-box/default-selected-key").then((m) => m.DefaultSelectedKey),
    file: "cn/combo-box/default-selected-key.tsx",
  },
  "combo-box-with-description": {
    loader: () => import("./combo-box/with-description").then((m) => m.WithDescription),
    file: "cn/combo-box/with-description.tsx",
  },
  "combo-box-with-sections": {
    loader: () => import("./combo-box/with-sections").then((m) => m.WithSections),
    file: "cn/combo-box/with-sections.tsx",
  },
  "combo-box-with-disabled-options": {
    loader: () => import("./combo-box/with-disabled-options").then((m) => m.WithDisabledOptions),
    file: "cn/combo-box/with-disabled-options.tsx",
  },
  "combo-box-custom-indicator": {
    loader: () => import("./combo-box/custom-indicator").then((m) => m.CustomIndicator),
    file: "cn/combo-box/custom-indicator.tsx",
  },
  "combo-box-required": {
    loader: () => import("./combo-box/required").then((m) => m.Required),
    file: "cn/combo-box/required.tsx",
  },
  "combo-box-full-width": {
    loader: () => import("./combo-box/full-width").then((m) => m.FullWidth),
    file: "cn/combo-box/full-width.tsx",
  },
  "combo-box-custom-value": {
    loader: () => import("./combo-box/custom-value").then((m) => m.CustomValue),
    file: "cn/combo-box/custom-value.tsx",
  },
  "combo-box-controlled": {
    loader: () => import("./combo-box/controlled").then((m) => m.Controlled),
    file: "cn/combo-box/controlled.tsx",
  },
  "combo-box-controlled-input-value": {
    loader: () => import("./combo-box/controlled-input-value").then((m) => m.ControlledInputValue),
    file: "cn/combo-box/controlled-input-value.tsx",
  },
  "combo-box-asynchronous-loading": {
    loader: () => import("./combo-box/asynchronous-loading").then((m) => m.AsynchronousLoading),
    file: "cn/combo-box/asynchronous-loading.tsx",
  },
  "combo-box-custom-filtering": {
    loader: () => import("./combo-box/custom-filtering").then((m) => m.CustomFiltering),
    file: "cn/combo-box/custom-filtering.tsx",
  },
  "combo-box-allows-custom-value": {
    loader: () => import("./combo-box/allows-custom-value").then((m) => m.AllowsCustomValue),
    file: "cn/combo-box/allows-custom-value.tsx",
  },
  "combo-box-disabled": {
    loader: () => import("./combo-box/disabled").then((m) => m.Disabled),
    file: "cn/combo-box/disabled.tsx",
  },
  "combo-box-on-surface": {
    loader: () => import("./combo-box/on-surface").then((m) => m.OnSurface),
    file: "cn/combo-box/on-surface.tsx",
  },
  "combo-box-menu-trigger": {
    loader: () => import("./combo-box/menu-trigger").then((m) => m.MenuTrigger),
    file: "cn/combo-box/menu-trigger.tsx",
  },
  "combo-box-custom-render-function": {
    loader: () => import("./combo-box/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/combo-box/custom-render-function.tsx",
  },
  // Drawer demos
  "drawer-basic": {
    loader: () => import("./drawer/basic").then((m) => m.Basic),
    file: "cn/drawer/basic.tsx",
  },
  "drawer-placements": {
    loader: () => import("./drawer/placements").then((m) => m.Placements),
    file: "cn/drawer/placements.tsx",
  },
  "drawer-backdrop-variants": {
    loader: () => import("./drawer/backdrop-variants").then((m) => m.BackdropVariants),
    file: "cn/drawer/backdrop-variants.tsx",
  },
  "drawer-with-form": {
    loader: () => import("./drawer/with-form").then((m) => m.WithForm),
    file: "cn/drawer/with-form.tsx",
  },
  "drawer-scrollable-content": {
    loader: () => import("./drawer/scrollable-content").then((m) => m.ScrollableContent),
    file: "cn/drawer/scrollable-content.tsx",
  },
  "drawer-navigation": {
    loader: () => import("./drawer/navigation").then((m) => m.Navigation),
    file: "cn/drawer/navigation.tsx",
  },
  "drawer-non-dismissable": {
    loader: () => import("./drawer/non-dismissable").then((m) => m.NonDismissable),
    file: "cn/drawer/non-dismissable.tsx",
  },
  "drawer-controlled": {
    loader: () => import("./drawer/controlled").then((m) => m.Controlled),
    file: "cn/drawer/controlled.tsx",
  },
  // Disclosure demos
  "disclosure-basic": {
    loader: () => import("./disclosure/basic").then((m) => m.Basic),
    file: "cn/disclosure/basic.tsx",
  },
  "disclosure-custom-render-function": {
    loader: () => import("./disclosure/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/disclosure/custom-render-function.tsx",
  },
  // DisclosureGroup demos
  "disclosure-group-basic": {
    loader: () => import("./disclosure-group/basic").then((m) => m.Basic),
    file: "cn/disclosure-group/basic.tsx",
  },
  "disclosure-group-controlled": {
    loader: () => import("./disclosure-group/controlled").then((m) => m.Controlled),
    file: "cn/disclosure-group/controlled.tsx",
  },
  // Dropdown demos
  "dropdown-default": {
    loader: () => import("./dropdown/default").then((m) => m.Default),
    file: "cn/dropdown/default.tsx",
  },
  "dropdown-with-single-selection": {
    loader: () => import("./dropdown/with-single-selection").then((m) => m.WithSingleSelection),
    file: "cn/dropdown/with-single-selection.tsx",
  },
  "dropdown-single-with-custom-indicator": {
    loader: () =>
      import("./dropdown/single-with-custom-indicator").then((m) => m.SingleWithCustomIndicator),
    file: "cn/dropdown/single-with-custom-indicator.tsx",
  },
  "dropdown-with-multiple-selection": {
    loader: () => import("./dropdown/with-multiple-selection").then((m) => m.WithMultipleSelection),
    file: "cn/dropdown/with-multiple-selection.tsx",
  },
  "dropdown-with-section-level-selection": {
    loader: () =>
      import("./dropdown/with-section-level-selection").then((m) => m.WithSectionLevelSelection),
    file: "cn/dropdown/with-section-level-selection.tsx",
  },
  "dropdown-with-keyboard-shortcuts": {
    loader: () => import("./dropdown/with-keyboard-shortcuts").then((m) => m.WithKeyboardShortcuts),
    file: "cn/dropdown/with-keyboard-shortcuts.tsx",
  },
  "dropdown-with-icons": {
    loader: () => import("./dropdown/with-icons").then((m) => m.WithIcons),
    file: "cn/dropdown/with-icons.tsx",
  },
  "dropdown-long-press-trigger": {
    loader: () => import("./dropdown/long-press-trigger").then((m) => m.LongPressTrigger),
    file: "cn/dropdown/long-press-trigger.tsx",
  },
  "dropdown-with-descriptions": {
    loader: () => import("./dropdown/with-descriptions").then((m) => m.WithDescriptions),
    file: "cn/dropdown/with-descriptions.tsx",
  },
  "dropdown-with-sections": {
    loader: () => import("./dropdown/with-sections").then((m) => m.WithSections),
    file: "cn/dropdown/with-sections.tsx",
  },
  "dropdown-with-disabled-items": {
    loader: () => import("./dropdown/with-disabled-items").then((m) => m.WithDisabledItems),
    file: "cn/dropdown/with-disabled-items.tsx",
  },
  "dropdown-with-submenus": {
    loader: () => import("./dropdown/with-submenus").then((m) => m.WithSubmenus),
    file: "cn/dropdown/with-submenus.tsx",
  },
  "dropdown-with-custom-submenu-indicator": {
    loader: () =>
      import("./dropdown/with-custom-submenu-indicator").then((m) => m.WithCustomSubmenuIndicator),
    file: "cn/dropdown/with-custom-submenu-indicator.tsx",
  },
  "dropdown-controlled": {
    loader: () => import("./dropdown/controlled").then((m) => m.Controlled),
    file: "cn/dropdown/controlled.tsx",
  },
  "dropdown-controlled-open-state": {
    loader: () => import("./dropdown/controlled-open-state").then((m) => m.ControlledOpenState),
    file: "cn/dropdown/controlled-open-state.tsx",
  },
  "dropdown-custom-trigger": {
    loader: () => import("./dropdown/custom-trigger").then((m) => m.CustomTrigger),
    file: "cn/dropdown/custom-trigger.tsx",
  },
  // ErrorMessage demos
  "error-message-basic": {
    loader: () => import("./error-message/basic").then((m) => m.ErrorMessageBasic),
    file: "cn/error-message/basic.tsx",
  },
  "error-message-with-tag-group": {
    loader: () => import("./error-message/with-tag-group").then((m) => m.ErrorMessageWithTagGroup),
    file: "cn/error-message/with-tag-group.tsx",
  },
  // Form demos
  "form-basic": {
    loader: () => import("./form/basic").then((m) => m.Basic),
    file: "cn/form/basic.tsx",
  },
  "form-custom-render-function": {
    loader: () => import("./form/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/form/custom-render-function.tsx",
  },
  // Fieldset demos
  "fieldset-basic": {
    loader: () => import("./fieldset/basic").then((m) => m.Basic),
    file: "cn/fieldset/basic.tsx",
  },
  "fieldset-on-surface": {
    loader: () => import("./fieldset/on-surface").then((m) => m.OnSurface),
    file: "cn/fieldset/on-surface.tsx",
  },
  // Input demos
  "input-basic": {
    loader: () => import("./input/basic").then((m) => m.Basic),
    file: "cn/input/basic.tsx",
  },
  "input-full-width": {
    loader: () => import("./input/full-width").then((m) => m.FullWidth),
    file: "cn/input/full-width.tsx",
  },
  "input-types": {
    loader: () => import("./input/types").then((m) => m.Types),
    file: "cn/input/types.tsx",
  },
  "input-controlled": {
    loader: () => import("./input/controlled").then((m) => m.Controlled),
    file: "cn/input/controlled.tsx",
  },
  "input-on-surface": {
    loader: () => import("./input/on-surface").then((m) => m.OnSurface),
    file: "cn/input/on-surface.tsx",
  },
  "input-variants": {
    loader: () => import("./input/variants").then((m) => m.Variants),
    file: "cn/input/variants.tsx",
  },
  // DateField demos
  "date-field-basic": {
    loader: () => import("./date-field/basic").then((m) => m.Basic),
    file: "cn/date-field/basic.tsx",
  },
  "date-field-controlled": {
    loader: () => import("./date-field/controlled").then((m) => m.Controlled),
    file: "cn/date-field/controlled.tsx",
  },
  "date-field-disabled": {
    loader: () => import("./date-field/disabled").then((m) => m.Disabled),
    file: "cn/date-field/disabled.tsx",
  },
  "date-field-form-example": {
    loader: () => import("./date-field/form-example").then((m) => m.FormExample),
    file: "cn/date-field/form-example.tsx",
  },
  "date-field-invalid": {
    loader: () => import("./date-field/invalid").then((m) => m.Invalid),
    file: "cn/date-field/invalid.tsx",
  },
  "date-field-on-surface": {
    loader: () => import("./date-field/on-surface").then((m) => m.OnSurface),
    file: "cn/date-field/on-surface.tsx",
  },
  "date-field-required": {
    loader: () => import("./date-field/required").then((m) => m.Required),
    file: "cn/date-field/required.tsx",
  },
  "date-field-with-description": {
    loader: () => import("./date-field/with-description").then((m) => m.WithDescription),
    file: "cn/date-field/with-description.tsx",
  },
  "date-field-with-prefix-and-suffix": {
    loader: () => import("./date-field/with-prefix-and-suffix").then((m) => m.WithPrefixAndSuffix),
    file: "cn/date-field/with-prefix-and-suffix.tsx",
  },
  "date-field-with-prefix-icon": {
    loader: () => import("./date-field/with-prefix-icon").then((m) => m.WithPrefixIcon),
    file: "cn/date-field/with-prefix-icon.tsx",
  },
  "date-field-with-suffix-icon": {
    loader: () => import("./date-field/with-suffix-icon").then((m) => m.WithSuffixIcon),
    file: "cn/date-field/with-suffix-icon.tsx",
  },
  "date-field-full-width": {
    loader: () => import("./date-field/full-width").then((m) => m.FullWidth),
    file: "cn/date-field/full-width.tsx",
  },
  "date-field-granularity": {
    loader: () => import("./date-field/granularity").then((m) => m.Granularity),
    file: "cn/date-field/granularity.tsx",
  },
  "date-field-with-validation": {
    loader: () => import("./date-field/with-validation").then((m) => m.WithValidation),
    file: "cn/date-field/with-validation.tsx",
  },
  "date-field-variants": {
    loader: () => import("./date-field/variants").then((m) => m.Variants),
    file: "cn/date-field/variants.tsx",
  },
  "date-field-custom-render-function": {
    loader: () => import("./date-field/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/date-field/custom-render-function.tsx",
  },
  // DatePicker demos
  "date-picker-basic": {
    loader: () => import("./date-picker/basic").then((m) => m.Basic),
    file: "cn/date-picker/basic.tsx",
  },
  "date-picker-controlled": {
    loader: () => import("./date-picker/controlled").then((m) => m.Controlled),
    file: "cn/date-picker/controlled.tsx",
  },
  "date-picker-disabled": {
    loader: () => import("./date-picker/disabled").then((m) => m.Disabled),
    file: "cn/date-picker/disabled.tsx",
  },
  "date-picker-format-options": {
    loader: () => import("./date-picker/format-options-no-ssr").then((m) => m.FormatOptions),
    file: "cn/date-picker/format-options.tsx",
  },
  "date-picker-form-example": {
    loader: () => import("./date-picker/form-example").then((m) => m.FormExample),
    file: "cn/date-picker/form-example.tsx",
  },
  "date-picker-with-custom-indicator": {
    loader: () => import("./date-picker/with-custom-indicator").then((m) => m.WithCustomIndicator),
    file: "cn/date-picker/with-custom-indicator.tsx",
  },
  "date-picker-with-validation": {
    loader: () => import("./date-picker/with-validation").then((m) => m.WithValidation),
    file: "cn/date-picker/with-validation.tsx",
  },
  "date-picker-international-calendar": {
    loader: () =>
      import("./date-picker/international-calendar").then((m) => m.InternationalCalendar),
    file: "cn/date-picker/international-calendar.tsx",
  },
  "date-picker-custom-render-function": {
    loader: () =>
      import("./date-picker/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/date-picker/custom-render-function.tsx",
  },
  // DateRangePicker demos
  "date-range-picker-basic": {
    loader: () => import("./date-range-picker/basic").then((m) => m.Basic),
    file: "cn/date-range-picker/basic.tsx",
  },
  "date-range-picker-controlled": {
    loader: () => import("./date-range-picker/controlled").then((m) => m.Controlled),
    file: "cn/date-range-picker/controlled.tsx",
  },
  "date-range-picker-disabled": {
    loader: () => import("./date-range-picker/disabled").then((m) => m.Disabled),
    file: "cn/date-range-picker/disabled.tsx",
  },
  "date-range-picker-format-options": {
    loader: () => import("./date-range-picker/format-options-no-ssr").then((m) => m.FormatOptions),
    file: "cn/date-range-picker/format-options.tsx",
  },
  "date-range-picker-form-example": {
    loader: () => import("./date-range-picker/form-example").then((m) => m.FormExample),
    file: "cn/date-range-picker/form-example.tsx",
  },
  "date-range-picker-with-custom-indicator": {
    loader: () =>
      import("./date-range-picker/with-custom-indicator").then((m) => m.WithCustomIndicator),
    file: "cn/date-range-picker/with-custom-indicator.tsx",
  },
  "date-range-picker-with-validation": {
    loader: () => import("./date-range-picker/with-validation").then((m) => m.WithValidation),
    file: "cn/date-range-picker/with-validation.tsx",
  },
  "date-range-picker-international-calendar": {
    loader: () =>
      import("./date-range-picker/international-calendar").then((m) => m.InternationalCalendar),
    file: "cn/date-range-picker/international-calendar.tsx",
  },
  "date-range-picker-custom-render-function": {
    loader: () =>
      import("./date-range-picker/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/date-range-picker/custom-render-function.tsx",
  },
  "date-range-picker-input-container": {
    loader: () => import("./date-range-picker/input-container").then((m) => m.InputContainer),
    file: "cn/date-range-picker/input-container.tsx",
  },
  // InputOTP demos
  "input-otp-basic": {
    loader: () => import("./input-otp/basic").then((m) => m.Basic),
    file: "cn/input-otp/basic.tsx",
  },
  "input-otp-four-digits": {
    loader: () => import("./input-otp/four-digits").then((m) => m.FourDigits),
    file: "cn/input-otp/four-digits.tsx",
  },
  "input-otp-disabled": {
    loader: () => import("./input-otp/disabled").then((m) => m.Disabled),
    file: "cn/input-otp/disabled.tsx",
  },
  "input-otp-with-pattern": {
    loader: () => import("./input-otp/with-pattern").then((m) => m.WithPattern),
    file: "cn/input-otp/with-pattern.tsx",
  },
  "input-otp-controlled": {
    loader: () => import("./input-otp/controlled").then((m) => m.Controlled),
    file: "cn/input-otp/controlled.tsx",
  },
  "input-otp-with-validation": {
    loader: () => import("./input-otp/with-validation").then((m) => m.WithValidation),
    file: "cn/input-otp/with-validation.tsx",
  },
  "input-otp-on-complete": {
    loader: () => import("./input-otp/on-complete").then((m) => m.OnComplete),
    file: "cn/input-otp/on-complete.tsx",
  },
  "input-otp-form-example": {
    loader: () => import("./input-otp/form-example").then((m) => m.FormExample),
    file: "cn/input-otp/form-example.tsx",
  },
  "input-otp-on-surface": {
    loader: () => import("./input-otp/on-surface").then((m) => m.OnSurface),
    file: "cn/input-otp/on-surface.tsx",
  },
  "input-otp-variants": {
    loader: () => import("./input-otp/variants").then((m) => m.Variants),
    file: "cn/input-otp/variants.tsx",
  },
  // InputGroup demos
  "input-group-default": {
    loader: () => import("./input-group/default").then((m) => m.Default),
    file: "cn/input-group/default.tsx",
  },
  "input-group-full-width": {
    loader: () => import("./input-group/full-width").then((m) => m.FullWidth),
    file: "cn/input-group/full-width.tsx",
  },
  "input-group-with-prefix-icon": {
    loader: () => import("./input-group/with-prefix-icon").then((m) => m.WithPrefixIcon),
    file: "cn/input-group/with-prefix-icon.tsx",
  },
  "input-group-with-suffix-icon": {
    loader: () => import("./input-group/with-suffix-icon").then((m) => m.WithSuffixIcon),
    file: "cn/input-group/with-suffix-icon.tsx",
  },
  "input-group-with-prefix-and-suffix": {
    loader: () => import("./input-group/with-prefix-and-suffix").then((m) => m.WithPrefixAndSuffix),
    file: "cn/input-group/with-prefix-and-suffix.tsx",
  },
  "input-group-with-text-prefix": {
    loader: () => import("./input-group/with-text-prefix").then((m) => m.WithTextPrefix),
    file: "cn/input-group/with-text-prefix.tsx",
  },
  "input-group-with-text-suffix": {
    loader: () => import("./input-group/with-text-suffix").then((m) => m.WithTextSuffix),
    file: "cn/input-group/with-text-suffix.tsx",
  },
  "input-group-with-icon-prefix-and-text-suffix": {
    loader: () =>
      import("./input-group/with-icon-prefix-and-text-suffix").then(
        (m) => m.WithIconPrefixAndTextSuffix,
      ),
    file: "cn/input-group/with-icon-prefix-and-text-suffix.tsx",
  },
  "input-group-with-copy-suffix": {
    loader: () => import("./input-group/with-copy-suffix").then((m) => m.WithCopySuffix),
    file: "cn/input-group/with-copy-suffix.tsx",
  },
  "input-group-with-icon-prefix-and-copy-suffix": {
    loader: () =>
      import("./input-group/with-icon-prefix-and-copy-suffix").then(
        (m) => m.WithIconPrefixAndCopySuffix,
      ),
    file: "cn/input-group/with-icon-prefix-and-copy-suffix.tsx",
  },
  "input-group-password-with-toggle": {
    loader: () => import("./input-group/password-with-toggle").then((m) => m.PasswordWithToggle),
    file: "cn/input-group/password-with-toggle.tsx",
  },
  "input-group-with-loading-suffix": {
    loader: () => import("./input-group/with-loading-suffix").then((m) => m.WithLoadingSuffix),
    file: "cn/input-group/with-loading-suffix.tsx",
  },
  "input-group-with-keyboard-shortcut": {
    loader: () =>
      import("./input-group/with-keyboard-shortcut").then((m) => m.WithKeyboardShortcut),
    file: "cn/input-group/with-keyboard-shortcut.tsx",
  },
  "input-group-with-badge-suffix": {
    loader: () => import("./input-group/with-badge-suffix").then((m) => m.WithBadgeSuffix),
    file: "cn/input-group/with-badge-suffix.tsx",
  },
  "input-group-required": {
    loader: () => import("./input-group/required").then((m) => m.Required),
    file: "cn/input-group/required.tsx",
  },
  "input-group-invalid": {
    loader: () => import("./input-group/invalid").then((m) => m.Invalid),
    file: "cn/input-group/invalid.tsx",
  },
  "input-group-disabled": {
    loader: () => import("./input-group/disabled").then((m) => m.Disabled),
    file: "cn/input-group/disabled.tsx",
  },
  "input-group-on-surface": {
    loader: () => import("./input-group/on-surface").then((m) => m.OnSurface),
    file: "cn/input-group/on-surface.tsx",
  },
  "input-group-with-textarea": {
    loader: () => import("./input-group/with-textarea").then((m) => m.WithTextArea),
    file: "cn/input-group/with-textarea.tsx",
  },
  "input-group-variants": {
    loader: () => import("./input-group/variants").then((m) => m.Variants),
    file: "cn/input-group/variants.tsx",
  },
  // Kbd demos
  "kbd-basic": {
    loader: () => import("./kbd/basic").then((m) => m.Basic),
    file: "cn/kbd/basic.tsx",
  },
  "kbd-navigation-keys": {
    loader: () => import("./kbd/navigation").then((m) => m.NavigationKeys),
    file: "cn/kbd/navigation.tsx",
  },
  "kbd-inline-usage": {
    loader: () => import("./kbd/inline").then((m) => m.InlineUsage),
    file: "cn/kbd/inline.tsx",
  },
  "kbd-instructional-text": {
    loader: () => import("./kbd/instructional").then((m) => m.InstructionalText),
    file: "cn/kbd/instructional.tsx",
  },
  "kbd-special-keys": {
    loader: () => import("./kbd/special").then((m) => m.SpecialKeys),
    file: "cn/kbd/special.tsx",
  },
  "kbd-variants": {
    loader: () => import("./kbd/variants").then((m) => m.Variants),
    file: "cn/kbd/variants.tsx",
  },
  // Link demos
  "link-basic": {
    loader: () => import("./link/basic").then((m) => m.LinkBasic),
    file: "cn/link/basic.tsx",
  },
  "link-custom-icon": {
    loader: () => import("./link/custom-icon").then((m) => m.LinkCustomIcon),
    file: "cn/link/custom-icon.tsx",
  },
  "link-icon-placement": {
    loader: () => import("./link/icon-placement").then((m) => m.LinkIconPlacement),
    file: "cn/link/icon-placement.tsx",
  },
  "link-underline-and-offset": {
    loader: () => import("./link/underline-and-offset").then((m) => m.LinkUnderlineAndOffset),
    file: "cn/link/underline-and-offset.tsx",
  },
  "link-custom-render-function": {
    loader: () => import("./link/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/link/custom-render-function.tsx",
  },
  // RadioGroup demos
  "radio-group-basic": {
    loader: () => import("./radio-group/basic").then((m) => m.Basic),
    file: "cn/radio-group/basic.tsx",
  },
  "radio-group-controlled": {
    loader: () => import("./radio-group/controlled").then((m) => m.Controlled),
    file: "cn/radio-group/controlled.tsx",
  },
  "radio-group-custom-indicator": {
    loader: () => import("./radio-group/custom-indicator").then((m) => m.CustomIndicator),
    file: "cn/radio-group/custom-indicator.tsx",
  },
  "radio-group-delivery-and-payment": {
    loader: () => import("./radio-group/delivery-and-payment").then((m) => m.DeliveryAndPayment),
    file: "cn/radio-group/delivery-and-payment.tsx",
  },
  "radio-group-disabled": {
    loader: () => import("./radio-group/disabled").then((m) => m.Disabled),
    file: "cn/radio-group/disabled.tsx",
  },
  "radio-group-horizontal": {
    loader: () => import("./radio-group/horizontal").then((m) => m.Horizontal),
    file: "cn/radio-group/horizontal.tsx",
  },
  "radio-group-uncontrolled": {
    loader: () => import("./radio-group/uncontrolled").then((m) => m.Uncontrolled),
    file: "cn/radio-group/uncontrolled.tsx",
  },
  "radio-group-validation": {
    loader: () => import("./radio-group/validation").then((m) => m.Validation),
    file: "cn/radio-group/validation.tsx",
  },
  "radio-group-on-surface": {
    loader: () => import("./radio-group/on-surface").then((m) => m.OnSurface),
    file: "cn/radio-group/on-surface.tsx",
  },
  "radio-group-variants": {
    loader: () => import("./radio-group/variants").then((m) => m.Variants),
    file: "cn/radio-group/variants.tsx",
  },
  "radio-group-custom-render-function": {
    loader: () =>
      import("./radio-group/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/radio-group/custom-render-function.tsx",
  },
  // Skeleton demos
  "skeleton-basic": {
    loader: () => import("./skeleton/basic").then((m) => m.Basic),
    file: "cn/skeleton/basic.tsx",
  },
  "skeleton-text-content": {
    loader: () => import("./skeleton/text-content").then((m) => m.TextContent),
    file: "cn/skeleton/text-content.tsx",
  },
  "skeleton-user-profile": {
    loader: () => import("./skeleton/user-profile").then((m) => m.UserProfile),
    file: "cn/skeleton/user-profile.tsx",
  },
  "skeleton-list": {
    loader: () => import("./skeleton/list").then((m) => m.List),
    file: "cn/skeleton/list.tsx",
  },
  "skeleton-animation-types": {
    loader: () => import("./skeleton/animation-types").then((m) => m.AnimationTypes),
    file: "cn/skeleton/animation-types.tsx",
  },
  "skeleton-grid": {
    loader: () => import("./skeleton/grid").then((m) => m.Grid),
    file: "cn/skeleton/grid.tsx",
  },
  "skeleton-single-shimmer": {
    loader: () => import("./skeleton/single-shimmer").then((m) => m.SingleShimmer),
    file: "cn/skeleton/single-shimmer.tsx",
  },
  // Separator demos
  "separator-basic": {
    loader: () => import("./separator/basic").then((m) => m.Basic),
    file: "cn/separator/basic.tsx",
  },
  "separator-vertical": {
    loader: () => import("./separator/vertical").then((m) => m.Vertical),
    file: "cn/separator/vertical.tsx",
  },
  "separator-with-content": {
    loader: () => import("./separator/with-content").then((m) => m.WithContent),
    file: "cn/separator/with-content.tsx",
  },
  "separator-variants": {
    loader: () => import("./separator/variants").then((m) => m.Variants),
    file: "cn/separator/variants.tsx",
  },
  "separator-with-surface": {
    loader: () => import("./separator/with-surface").then((m) => m.WithSurface),
    file: "cn/separator/with-surface.tsx",
  },
  "separator-manual-variant-override": {
    loader: () =>
      import("./separator/manual-variant-override").then((m) => m.ManualVariantOverride),
    file: "cn/separator/manual-variant-override.tsx",
  },
  "separator-custom-render-function": {
    loader: () => import("./separator/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/separator/custom-render-function.tsx",
  },
  // Spinner demos
  "spinner-basic": {
    loader: () => import("./spinner/basic").then((m) => m.SpinnerBasic),
    file: "cn/spinner/basic.tsx",
  },
  "spinner-colors": {
    loader: () => import("./spinner/colors").then((m) => m.SpinnerColors),
    file: "cn/spinner/colors.tsx",
  },
  "spinner-sizes": {
    loader: () => import("./spinner/sizes").then((m) => m.SpinnerSizes),
    file: "cn/spinner/sizes.tsx",
  },
  // Surface demos
  "surface-variants": {
    loader: () => import("./surface/variants").then((m) => m.Variants),
    file: "cn/surface/variants.tsx",
  },
  // Switch demos
  "switch-basic": {
    loader: () => import("./switch/basic").then((m) => m.Basic),
    file: "cn/switch/basic.tsx",
  },
  "switch-disabled": {
    loader: () => import("./switch/disabled").then((m) => m.Disabled),
    file: "cn/switch/disabled.tsx",
  },
  "switch-default-selected": {
    loader: () => import("./switch/default-selected").then((m) => m.DefaultSelected),
    file: "cn/switch/default-selected.tsx",
  },
  "switch-controlled": {
    loader: () => import("./switch/controlled").then((m) => m.Controlled),
    file: "cn/switch/controlled.tsx",
  },
  "switch-without-label": {
    loader: () => import("./switch/without-label").then((m) => m.WithoutLabel),
    file: "cn/switch/without-label.tsx",
  },
  "switch-sizes": {
    loader: () => import("./switch/sizes").then((m) => m.Sizes),
    file: "cn/switch/sizes.tsx",
  },
  "switch-label-position": {
    loader: () => import("./switch/label-position").then((m) => m.LabelPosition),
    file: "cn/switch/label-position.tsx",
  },
  "switch-with-icons": {
    loader: () => import("./switch/with-icons").then((m) => m.WithIcons),
    file: "cn/switch/with-icons.tsx",
  },
  "switch-with-description": {
    loader: () => import("./switch/with-description").then((m) => m.WithDescription),
    file: "cn/switch/with-description.tsx",
  },
  "switch-group": {
    loader: () => import("./switch/group").then((m) => m.Group),
    file: "cn/switch/group.tsx",
  },
  "switch-group-horizontal": {
    loader: () => import("./switch/group-horizontal").then((m) => m.GroupHorizontal),
    file: "cn/switch/group-horizontal.tsx",
  },
  "switch-render-props": {
    loader: () => import("./switch/render-props").then((m) => m.RenderProps),
    file: "cn/switch/render-props.tsx",
  },
  "switch-form": {
    loader: () => import("./switch/form").then((m) => m.Form),
    file: "cn/switch/form.tsx",
  },
  "switch-custom-styles": {
    loader: () => import("./switch/custom-styles").then((m) => m.CustomStyles),
    file: "cn/switch/custom-styles.tsx",
  },
  "switch-custom-render-function": {
    loader: () => import("./switch/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/switch/custom-render-function.tsx",
  },
  // Tabs demos
  "tabs-basic": {
    loader: () => import("./tabs/basic").then((m) => m.Basic),
    file: "cn/tabs/basic.tsx",
  },
  "tabs-vertical": {
    loader: () => import("./tabs/vertical").then((m) => m.Vertical),
    file: "cn/tabs/vertical.tsx",
  },
  "tabs-overflow": {
    loader: () => import("./tabs/overflow").then((m) => m.Overflow),
    file: "cn/tabs/overflow.tsx",
  },
  "tabs-disabled": {
    loader: () => import("./tabs/disabled").then((m) => m.Disabled),
    file: "cn/tabs/disabled.tsx",
  },
  "tabs-custom-styles": {
    loader: () => import("./tabs/custom-styles").then((m) => m.CustomStyles),
    file: "cn/tabs/custom-styles.tsx",
  },
  "tabs-with-separator": {
    loader: () => import("./tabs/with-separator").then((m) => m.WithSeparator),
    file: "cn/tabs/with-separator.tsx",
  },
  "tabs-secondary": {
    loader: () => import("./tabs/secondary").then((m) => m.Secondary),
    file: "cn/tabs/secondary.tsx",
  },
  "tabs-secondary-vertical": {
    loader: () => import("./tabs/secondary-vertical").then((m) => m.SecondaryVertical),
    file: "cn/tabs/secondary-vertical.tsx",
  },
  "tabs-custom-render-function": {
    loader: () => import("./tabs/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/tabs/custom-render-function.tsx",
  },
  // TagGroup demos
  "tag-group-basic": {
    loader: () => import("./tag-group/basic").then((m) => m.TagGroupBasic),
    file: "cn/tag-group/basic.tsx",
  },
  "tag-group-sizes": {
    loader: () => import("./tag-group/sizes").then((m) => m.TagGroupSizes),
    file: "cn/tag-group/sizes.tsx",
  },
  "tag-group-variants": {
    loader: () => import("./tag-group/variants").then((m) => m.TagGroupVariants),
    file: "cn/tag-group/variants.tsx",
  },
  "tag-group-disabled": {
    loader: () => import("./tag-group/disabled").then((m) => m.TagGroupDisabled),
    file: "cn/tag-group/disabled.tsx",
  },
  "tag-group-selection-modes": {
    loader: () => import("./tag-group/selection-modes").then((m) => m.TagGroupSelectionModes),
    file: "cn/tag-group/selection-modes.tsx",
  },
  "tag-group-controlled": {
    loader: () => import("./tag-group/controlled").then((m) => m.TagGroupControlled),
    file: "cn/tag-group/controlled.tsx",
  },
  "tag-group-with-error-message": {
    loader: () => import("./tag-group/with-error-message").then((m) => m.TagGroupWithErrorMessage),
    file: "cn/tag-group/with-error-message.tsx",
  },
  "tag-group-with-prefix": {
    loader: () => import("./tag-group/with-prefix").then((m) => m.TagGroupWithPrefix),
    file: "cn/tag-group/with-prefix.tsx",
  },
  "tag-group-with-remove-button": {
    loader: () => import("./tag-group/with-remove-button").then((m) => m.TagGroupWithRemoveButton),
    file: "cn/tag-group/with-remove-button.tsx",
  },
  "tag-group-with-list-data": {
    loader: () => import("./tag-group/with-list-data").then((m) => m.TagGroupWithListData),
    file: "cn/tag-group/with-list-data.tsx",
  },
  "tag-group-custom-render-function": {
    loader: () => import("./tag-group/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/tag-group/custom-render-function.tsx",
  },
  // Table demos
  "table-basic": {
    loader: () => import("./table/basic").then((m) => m.Basic),
    file: "cn/table/basic.tsx",
  },
  "table-secondary-variant": {
    loader: () => import("./table/secondary-variant").then((m) => m.SecondaryVariant),
    file: "cn/table/secondary-variant.tsx",
  },
  "table-sorting": {
    loader: () => import("./table/sorting").then((m) => m.Sorting),
    file: "cn/table/sorting.tsx",
  },
  "table-selection": {
    loader: () => import("./table/selection").then((m) => m.SelectionDemo),
    file: "cn/table/selection.tsx",
  },
  "table-custom-cells": {
    loader: () => import("./table/custom-cells").then((m) => m.CustomCells),
    file: "cn/table/custom-cells.tsx",
  },
  "table-expandable-rows": {
    loader: () => import("./table/expandable-rows").then((m) => m.ExpandableRows),
    file: "cn/table/expandable-rows.tsx",
  },
  "table-pagination": {
    loader: () => import("./table/pagination").then((m) => m.PaginationDemo),
    file: "cn/table/pagination.tsx",
  },
  "table-column-resizing": {
    loader: () => import("./table/column-resizing").then((m) => m.ColumnResizing),
    file: "cn/table/column-resizing.tsx",
  },
  "table-empty-state": {
    loader: () => import("./table/empty-state").then((m) => m.EmptyStateDemo),
    file: "cn/table/empty-state.tsx",
  },
  "table-async-loading": {
    loader: () => import("./table/async-loading").then((m) => m.AsyncLoading),
    file: "cn/table/async-loading.tsx",
  },
  "table-virtualization": {
    loader: () => import("./table/virtualization").then((m) => m.Virtualization),
    file: "cn/table/virtualization.tsx",
  },
  "table-tanstack-table": {
    loader: () => import("./table/tanstack-table").then((m) => m.TanstackTable),
    file: "cn/table/tanstack-table.tsx",
  },
  // TextArea demos
  "textarea-basic": {
    loader: () => import("./textarea/basic").then((m) => m.Basic),
    file: "cn/textarea/basic.tsx",
  },
  "textarea-full-width": {
    loader: () => import("./textarea/full-width").then((m) => m.FullWidth),
    file: "cn/textarea/full-width.tsx",
  },
  "textarea-rows": {
    loader: () => import("./textarea/rows").then((m) => m.Rows),
    file: "cn/textarea/rows.tsx",
  },
  "textarea-controlled": {
    loader: () => import("./textarea/controlled").then((m) => m.Controlled),
    file: "cn/textarea/controlled.tsx",
  },
  "textarea-on-surface": {
    loader: () => import("./textarea/on-surface").then((m) => m.OnSurface),
    file: "cn/textarea/on-surface.tsx",
  },
  "textarea-variants": {
    loader: () => import("./textarea/variants").then((m) => m.Variants),
    file: "cn/textarea/variants.tsx",
  },
  // Typography demos
  "typography-default": {
    loader: () => import("./typography/default").then((m) => m.Default),
    file: "cn/typography/default.tsx",
  },
  "typography-primitives": {
    loader: () => import("./typography/primitives").then((m) => m.Primitives),
    file: "cn/typography/primitives.tsx",
  },
  "typography-prose": {
    loader: () => import("./typography/prose").then((m) => m.Prose),
    file: "cn/typography/prose.tsx",
  },
  "typography-render-props": {
    loader: () => import("./typography/render-props").then((m) => m.RenderProps),
    file: "cn/typography/render-props.tsx",
  },
  "typography-typography-scale": {
    loader: () => import("./typography/typography-scale").then((m) => m.TypographyScale),
    file: "cn/typography/typography-scale.tsx",
  },
  // TextField demos
  "textfield-basic": {
    loader: () => import("./textfield/basic").then((m) => m.Basic),
    file: "cn/textfield/basic.tsx",
  },
  "textfield-with-description": {
    loader: () => import("./textfield/with-description").then((m) => m.WithDescription),
    file: "cn/textfield/with-description.tsx",
  },
  "textfield-required": {
    loader: () => import("./textfield/required").then((m) => m.Required),
    file: "cn/textfield/required.tsx",
  },
  "textfield-with-error": {
    loader: () => import("./textfield/with-error").then((m) => m.WithError),
    file: "cn/textfield/with-error.tsx",
  },
  "textfield-disabled": {
    loader: () => import("./textfield/disabled").then((m) => m.Disabled),
    file: "cn/textfield/disabled.tsx",
  },
  "textfield-textarea": {
    loader: () => import("./textfield/textarea").then((m) => m.TextAreaExample),
    file: "cn/textfield/textarea.tsx",
  },
  "textfield-input-types": {
    loader: () => import("./textfield/input-types").then((m) => m.InputTypes),
    file: "cn/textfield/input-types.tsx",
  },
  "textfield-full-width": {
    loader: () => import("./textfield/full-width").then((m) => m.FullWidth),
    file: "cn/textfield/full-width.tsx",
  },
  "textfield-controlled": {
    loader: () => import("./textfield/controlled").then((m) => m.Controlled),
    file: "cn/textfield/controlled.tsx",
  },
  "textfield-validation": {
    loader: () => import("./textfield/validation").then((m) => m.Validation),
    file: "cn/textfield/validation.tsx",
  },
  "textfield-on-surface": {
    loader: () => import("./textfield/on-surface").then((m) => m.OnSurface),
    file: "cn/textfield/on-surface.tsx",
  },
  "textfield-custom-render-function": {
    loader: () => import("./textfield/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/textfield/custom-render-function.tsx",
  },
  // TimeField demos
  "time-field-basic": {
    loader: () => import("./time-field/basic").then((m) => m.Basic),
    file: "cn/time-field/basic.tsx",
  },
  "time-field-controlled": {
    loader: () => import("./time-field/controlled").then((m) => m.Controlled),
    file: "cn/time-field/controlled.tsx",
  },
  "time-field-disabled": {
    loader: () => import("./time-field/disabled").then((m) => m.Disabled),
    file: "cn/time-field/disabled.tsx",
  },
  "time-field-form-example": {
    loader: () => import("./time-field/form-example").then((m) => m.FormExample),
    file: "cn/time-field/form-example.tsx",
  },
  "time-field-invalid": {
    loader: () => import("./time-field/invalid").then((m) => m.Invalid),
    file: "cn/time-field/invalid.tsx",
  },
  "time-field-on-surface": {
    loader: () => import("./time-field/on-surface").then((m) => m.OnSurface),
    file: "cn/time-field/on-surface.tsx",
  },
  "time-field-required": {
    loader: () => import("./time-field/required").then((m) => m.Required),
    file: "cn/time-field/required.tsx",
  },
  "time-field-with-description": {
    loader: () => import("./time-field/with-description").then((m) => m.WithDescription),
    file: "cn/time-field/with-description.tsx",
  },
  "time-field-with-prefix-and-suffix": {
    loader: () => import("./time-field/with-prefix-and-suffix").then((m) => m.WithPrefixAndSuffix),
    file: "cn/time-field/with-prefix-and-suffix.tsx",
  },
  "time-field-with-prefix-icon": {
    loader: () => import("./time-field/with-prefix-icon").then((m) => m.WithPrefixIcon),
    file: "cn/time-field/with-prefix-icon.tsx",
  },
  "time-field-with-suffix-icon": {
    loader: () => import("./time-field/with-suffix-icon").then((m) => m.WithSuffixIcon),
    file: "cn/time-field/with-suffix-icon.tsx",
  },
  "time-field-full-width": {
    loader: () => import("./time-field/full-width").then((m) => m.FullWidth),
    file: "cn/time-field/full-width.tsx",
  },
  "time-field-with-validation": {
    loader: () => import("./time-field/with-validation").then((m) => m.WithValidation),
    file: "cn/time-field/with-validation.tsx",
  },
  "time-field-custom-render-function": {
    loader: () => import("./time-field/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/time-field/custom-render-function.tsx",
  },
  // Toast demos
  "toast-default": {
    loader: () => import("./toast/default").then((m) => m.Default),
    file: "cn/toast/default.tsx",
  },
  "toast-simple": {
    loader: () => import("./toast/simple").then((m) => m.Simple),
    file: "cn/toast/simple.tsx",
  },
  "toast-variants": {
    loader: () => import("./toast/variants").then((m) => m.Variants),
    file: "cn/toast/variants.tsx",
  },
  "toast-custom-indicator": {
    loader: () => import("./toast/custom-indicator").then((m) => m.CustomIndicator),
    file: "cn/toast/custom-indicator.tsx",
  },
  "toast-promise": {
    loader: () => import("./toast/promise").then((m) => m.PromiseDemo),
    file: "cn/toast/promise.tsx",
  },
  "toast-callbacks": {
    loader: () => import("./toast/callbacks").then((m) => m.Callbacks),
    file: "cn/toast/callbacks.tsx",
  },
  "toast-placements": {
    loader: () => import("./toast/placements").then((m) => m.Placements),
    file: "cn/toast/placements.tsx",
  },
  "toast-custom-toast": {
    loader: () => import("./toast/custom-toast").then((m) => m.CustomToast),
    file: "cn/toast/custom-toast.tsx",
  },
  "toast-custom-queue": {
    loader: () => import("./toast/custom-queue").then((m) => m.CustomQueue),
    file: "cn/toast/custom-queue.tsx",
  },
  // ToggleButton demos
  "toggle-button-basic": {
    loader: () => import("./toggle-button/basic").then((m) => m.Basic),
    file: "cn/toggle-button/basic.tsx",
  },
  "toggle-button-variants": {
    loader: () => import("./toggle-button/variants").then((m) => m.Variants),
    file: "cn/toggle-button/variants.tsx",
  },
  "toggle-button-sizes": {
    loader: () => import("./toggle-button/sizes").then((m) => m.Sizes),
    file: "cn/toggle-button/sizes.tsx",
  },
  "toggle-button-icon-only": {
    loader: () => import("./toggle-button/icon-only").then((m) => m.IconOnly),
    file: "cn/toggle-button/icon-only.tsx",
  },
  "toggle-button-controlled": {
    loader: () => import("./toggle-button/controlled").then((m) => m.Controlled),
    file: "cn/toggle-button/controlled.tsx",
  },
  "toggle-button-disabled": {
    loader: () => import("./toggle-button/disabled").then((m) => m.Disabled),
    file: "cn/toggle-button/disabled.tsx",
  },
  // ToggleButtonGroup demos
  "toggle-button-group-basic": {
    loader: () => import("./toggle-button-group/basic").then((m) => m.Basic),
    file: "cn/toggle-button-group/basic.tsx",
  },
  "toggle-button-group-sizes": {
    loader: () => import("./toggle-button-group/sizes").then((m) => m.Sizes),
    file: "cn/toggle-button-group/sizes.tsx",
  },
  "toggle-button-group-orientation": {
    loader: () => import("./toggle-button-group/orientation").then((m) => m.Orientation),
    file: "cn/toggle-button-group/orientation.tsx",
  },
  "toggle-button-group-attached": {
    loader: () => import("./toggle-button-group/attached").then((m) => m.Attached),
    file: "cn/toggle-button-group/attached.tsx",
  },
  "toggle-button-group-full-width": {
    loader: () => import("./toggle-button-group/full-width").then((m) => m.FullWidth),
    file: "cn/toggle-button-group/full-width.tsx",
  },
  "toggle-button-group-selection-mode": {
    loader: () => import("./toggle-button-group/selection-mode").then((m) => m.SelectionMode),
    file: "cn/toggle-button-group/selection-mode.tsx",
  },
  "toggle-button-group-controlled": {
    loader: () => import("./toggle-button-group/controlled").then((m) => m.Controlled),
    file: "cn/toggle-button-group/controlled.tsx",
  },
  "toggle-button-group-disabled": {
    loader: () => import("./toggle-button-group/disabled").then((m) => m.Disabled),
    file: "cn/toggle-button-group/disabled.tsx",
  },
  "toggle-button-group-without-separator": {
    loader: () => import("./toggle-button-group/without-separator").then((m) => m.WithoutSeparator),
    file: "cn/toggle-button-group/without-separator.tsx",
  },
  // Toolbar demos
  "toolbar-basic": {
    loader: () => import("./toolbar/basic").then((m) => m.Basic),
    file: "cn/toolbar/basic.tsx",
  },
  "toolbar-vertical": {
    loader: () => import("./toolbar/vertical").then((m) => m.Vertical),
    file: "cn/toolbar/vertical.tsx",
  },
  "toolbar-with-button-group": {
    loader: () => import("./toolbar/with-button-group").then((m) => m.WithButtonGroup),
    file: "cn/toolbar/with-button-group.tsx",
  },
  "toolbar-attached": {
    loader: () => import("./toolbar/custom-styles").then((m) => m.Attached),
    file: "cn/toolbar/custom-styles.tsx",
  },
  // Tooltip demos
  "tooltip-basic": {
    loader: () => import("./tooltip/basic").then((m) => m.TooltipBasic),
    file: "cn/tooltip/basic.tsx",
  },
  "tooltip-with-arrow": {
    loader: () => import("./tooltip/with-arrow").then((m) => m.TooltipWithArrow),
    file: "cn/tooltip/with-arrow.tsx",
  },
  "tooltip-placement": {
    loader: () => import("./tooltip/placement").then((m) => m.TooltipPlacement),
    file: "cn/tooltip/placement.tsx",
  },
  "tooltip-custom-trigger": {
    loader: () => import("./tooltip/custom-trigger").then((m) => m.TooltipCustomTrigger),
    file: "cn/tooltip/custom-trigger.tsx",
  },
  "tooltip-custom-render-function": {
    loader: () => import("./tooltip/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/tooltip/custom-render-function.tsx",
  },
  // Popover demos
  "popover-basic": {
    loader: () => import("./popover/basic").then((m) => m.PopoverBasic),
    file: "cn/popover/basic.tsx",
  },
  "popover-with-arrow": {
    loader: () => import("./popover/with-arrow").then((m) => m.PopoverWithArrow),
    file: "cn/popover/with-arrow.tsx",
  },
  "popover-placement": {
    loader: () => import("./popover/placement").then((m) => m.PopoverPlacement),
    file: "cn/popover/placement.tsx",
  },
  "popover-interactive": {
    loader: () => import("./popover/interactive").then((m) => m.PopoverInteractive),
    file: "cn/popover/interactive.tsx",
  },
  "popover-custom-render-function": {
    loader: () => import("./popover/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/popover/custom-render-function.tsx",
  },
  // Label demos
  "label-basic": {
    loader: () => import("./label/basic").then((m) => m.Basic),
    file: "cn/label/basic.tsx",
  },
  // ListBox demos
  "list-box-controlled": {
    loader: () => import("./list-box/controlled").then((m) => m.Controlled),
    file: "cn/list-box/controlled.tsx",
  },
  "list-box-custom-check-icon": {
    loader: () => import("./list-box/custom-check-icon").then((m) => m.CustomCheckIcon),
    file: "cn/list-box/custom-check-icon.tsx",
  },
  "list-box-default": {
    loader: () => import("./list-box/default").then((m) => m.Default),
    file: "cn/list-box/default.tsx",
  },
  "list-box-multi-select": {
    loader: () => import("./list-box/multi-select").then((m) => m.MultiSelect),
    file: "cn/list-box/multi-select.tsx",
  },
  "list-box-scrollbar-modes": {
    loader: () => import("./list-box/scrollbar-modes").then((m) => m.ScrollbarModes),
    file: "cn/list-box/scrollbar-modes.tsx",
  },
  "list-box-with-disabled-items": {
    loader: () => import("./list-box/with-disabled-items").then((m) => m.WithDisabledItems),
    file: "cn/list-box/with-disabled-items.tsx",
  },
  "list-box-with-sections": {
    loader: () => import("./list-box/with-sections").then((m) => m.WithSections),
    file: "cn/list-box/with-sections.tsx",
  },
  "list-box-custom-render-function": {
    loader: () => import("./list-box/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/list-box/custom-render-function.tsx",
  },
  "list-box-virtualization": {
    loader: () => import("./list-box/virtualization").then((m) => m.Virtualization),
    file: "cn/list-box/virtualization.tsx",
  },
  // Meter demos
  "meter-basic": {
    loader: () => import("./meter/basic").then((m) => m.Basic),
    file: "cn/meter/basic.tsx",
  },
  "meter-sizes": {
    loader: () => import("./meter/sizes").then((m) => m.Sizes),
    file: "cn/meter/sizes.tsx",
  },
  "meter-colors": {
    loader: () => import("./meter/colors").then((m) => m.Colors),
    file: "cn/meter/colors.tsx",
  },
  "meter-custom-value": {
    loader: () => import("./meter/custom-value").then((m) => m.CustomValue),
    file: "cn/meter/custom-value.tsx",
  },
  "meter-without-label": {
    loader: () => import("./meter/without-label").then((m) => m.WithoutLabel),
    file: "cn/meter/without-label.tsx",
  },
  // ProgressBar demos
  "progress-bar-basic": {
    loader: () => import("./progress-bar/basic").then((m) => m.Basic),
    file: "cn/progress-bar/basic.tsx",
  },
  "progress-bar-sizes": {
    loader: () => import("./progress-bar/sizes").then((m) => m.Sizes),
    file: "cn/progress-bar/sizes.tsx",
  },
  "progress-bar-colors": {
    loader: () => import("./progress-bar/colors").then((m) => m.Colors),
    file: "cn/progress-bar/colors.tsx",
  },
  "progress-bar-indeterminate": {
    loader: () => import("./progress-bar/indeterminate").then((m) => m.Indeterminate),
    file: "cn/progress-bar/indeterminate.tsx",
  },
  "progress-bar-custom-value": {
    loader: () => import("./progress-bar/custom-value").then((m) => m.CustomValue),
    file: "cn/progress-bar/custom-value.tsx",
  },
  "progress-bar-without-label": {
    loader: () => import("./progress-bar/without-label").then((m) => m.WithoutLabel),
    file: "cn/progress-bar/without-label.tsx",
  },
  // ProgressCircle demos
  "progress-circle-basic": {
    loader: () => import("./progress-circle/basic").then((m) => m.Basic),
    file: "cn/progress-circle/basic.tsx",
  },
  "progress-circle-sizes": {
    loader: () => import("./progress-circle/sizes").then((m) => m.Sizes),
    file: "cn/progress-circle/sizes.tsx",
  },
  "progress-circle-colors": {
    loader: () => import("./progress-circle/colors").then((m) => m.Colors),
    file: "cn/progress-circle/colors.tsx",
  },
  "progress-circle-indeterminate": {
    loader: () => import("./progress-circle/indeterminate").then((m) => m.Indeterminate),
    file: "cn/progress-circle/indeterminate.tsx",
  },
  "progress-circle-with-label": {
    loader: () => import("./progress-circle/with-label").then((m) => m.WithLabel),
    file: "cn/progress-circle/with-label.tsx",
  },
  "progress-circle-custom-svg": {
    loader: () => import("./progress-circle/custom-svg").then((m) => m.CustomSvg),
    file: "cn/progress-circle/custom-svg.tsx",
  },
  // Modal demos
  "modal-default": {
    loader: () => import("./modal/default").then((m) => m.Default),
    file: "cn/modal/default.tsx",
  },
  "modal-placements": {
    loader: () => import("./modal/placements").then((m) => m.Placements),
    file: "cn/modal/placements.tsx",
  },
  "modal-backdrop-variants": {
    loader: () => import("./modal/backdrop-variants").then((m) => m.BackdropVariants),
    file: "cn/modal/backdrop-variants.tsx",
  },
  "modal-scroll-comparison": {
    loader: () => import("./modal/scroll-comparison").then((m) => m.ScrollComparison),
    file: "cn/modal/scroll-comparison.tsx",
  },
  "modal-dismiss-behavior": {
    loader: () => import("./modal/dismiss-behavior").then((m) => m.DismissBehavior),
    file: "cn/modal/dismiss-behavior.tsx",
  },
  "modal-with-form": {
    loader: () => import("./modal/with-form").then((m) => m.WithForm),
    file: "cn/modal/with-form.tsx",
  },
  "modal-controlled": {
    loader: () => import("./modal/controlled").then((m) => m.Controlled),
    file: "cn/modal/controlled.tsx",
  },
  "modal-custom-trigger": {
    loader: () => import("./modal/custom-trigger").then((m) => m.CustomTrigger),
    file: "cn/modal/custom-trigger.tsx",
  },
  "modal-custom-backdrop": {
    loader: () => import("./modal/custom-backdrop").then((m) => m.CustomBackdrop),
    file: "cn/modal/custom-backdrop.tsx",
  },
  "modal-custom-animations": {
    loader: () => import("./modal/custom-animations").then((m) => m.CustomAnimations),
    file: "cn/modal/custom-animations.tsx",
  },
  "modal-sizes": {
    loader: () => import("./modal/sizes").then((m) => m.Sizes),
    file: "cn/modal/sizes.tsx",
  },
  "modal-close-methods": {
    loader: () => import("./modal/close-methods").then((m) => m.CloseMethods),
    file: "cn/modal/close-methods.tsx",
  },
  "modal-custom-portal": {
    loader: () => import("./modal/custom-portal").then((m) => m.CustomPortal),
    file: "cn/modal/custom-portal.tsx",
  },
  // NumberField demos
  "number-field-basic": {
    loader: () => import("./number-field/basic").then((m) => m.Basic),
    file: "cn/number-field/basic.tsx",
  },
  "number-field-with-description": {
    loader: () => import("./number-field/with-description").then((m) => m.WithDescription),
    file: "cn/number-field/with-description.tsx",
  },
  "number-field-required": {
    loader: () => import("./number-field/required").then((m) => m.Required),
    file: "cn/number-field/required.tsx",
  },
  "number-field-validation": {
    loader: () => import("./number-field/validation").then((m) => m.Validation),
    file: "cn/number-field/validation.tsx",
  },
  "number-field-disabled": {
    loader: () => import("./number-field/disabled").then((m) => m.Disabled),
    file: "cn/number-field/disabled.tsx",
  },
  "number-field-full-width": {
    loader: () => import("./number-field/full-width").then((m) => m.FullWidth),
    file: "cn/number-field/full-width.tsx",
  },
  "number-field-controlled": {
    loader: () => import("./number-field/controlled").then((m) => m.Controlled),
    file: "cn/number-field/controlled.tsx",
  },
  "number-field-with-validation": {
    loader: () => import("./number-field/with-validation").then((m) => m.WithValidation),
    file: "cn/number-field/with-validation.tsx",
  },
  "number-field-with-step": {
    loader: () => import("./number-field/with-step").then((m) => m.WithStep),
    file: "cn/number-field/with-step.tsx",
  },
  "number-field-with-format-options": {
    loader: () => import("./number-field/with-format-options").then((m) => m.WithFormatOptions),
    file: "cn/number-field/with-format-options.tsx",
  },
  "number-field-custom-icons": {
    loader: () => import("./number-field/custom-icons").then((m) => m.CustomIcons),
    file: "cn/number-field/custom-icons.tsx",
  },
  "number-field-on-surface": {
    loader: () => import("./number-field/on-surface").then((m) => m.OnSurface),
    file: "cn/number-field/on-surface.tsx",
  },
  "number-field-with-chevrons": {
    loader: () => import("./number-field/with-chevrons").then((m) => m.WithChevrons),
    file: "cn/number-field/with-chevrons.tsx",
  },
  "number-field-form-example": {
    loader: () => import("./number-field/form-example").then((m) => m.FormExample),
    file: "cn/number-field/form-example.tsx",
  },
  "number-field-variants": {
    loader: () => import("./number-field/variants").then((m) => m.Variants),
    file: "cn/number-field/variants.tsx",
  },
  "number-field-custom-render-function": {
    loader: () =>
      import("./number-field/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/number-field/custom-render-function.tsx",
  },
  // Pagination demos
  "pagination-basic": {
    loader: () => import("./pagination/basic").then((m) => m.PaginationBasic),
    file: "cn/pagination/basic.tsx",
  },
  "pagination-sizes": {
    loader: () => import("./pagination/sizes").then((m) => m.PaginationSizes),
    file: "cn/pagination/sizes.tsx",
  },
  "pagination-with-ellipsis": {
    loader: () => import("./pagination/with-ellipsis").then((m) => m.PaginationWithEllipsis),
    file: "cn/pagination/with-ellipsis.tsx",
  },
  "pagination-simple-prev-next": {
    loader: () => import("./pagination/simple-prev-next").then((m) => m.PaginationSimplePrevNext),
    file: "cn/pagination/simple-prev-next.tsx",
  },
  "pagination-with-summary": {
    loader: () => import("./pagination/with-summary").then((m) => m.PaginationWithSummary),
    file: "cn/pagination/with-summary.tsx",
  },
  "pagination-custom-icons": {
    loader: () => import("./pagination/custom-icons").then((m) => m.PaginationCustomIcons),
    file: "cn/pagination/custom-icons.tsx",
  },
  "pagination-controlled": {
    loader: () => import("./pagination/controlled").then((m) => m.PaginationControlled),
    file: "cn/pagination/controlled.tsx",
  },
  "pagination-disabled": {
    loader: () => import("./pagination/disabled").then((m) => m.PaginationDisabled),
    file: "cn/pagination/disabled.tsx",
  },
  // Select demos
  "select-default": {
    loader: () => import("./select/default").then((m) => m.Default),
    file: "cn/select/default.tsx",
  },
  "select-with-description": {
    loader: () => import("./select/with-description").then((m) => m.WithDescription),
    file: "cn/select/with-description.tsx",
  },
  "select-multiple-select": {
    loader: () => import("./select/multiple-select").then((m) => m.MultipleSelect),
    file: "cn/select/multiple-select.tsx",
  },
  "select-with-sections": {
    loader: () => import("./select/with-sections").then((m) => m.WithSections),
    file: "cn/select/with-sections.tsx",
  },
  "select-with-disabled-options": {
    loader: () => import("./select/with-disabled-options").then((m) => m.WithDisabledOptions),
    file: "cn/select/with-disabled-options.tsx",
  },
  "select-custom-indicator": {
    loader: () => import("./select/custom-indicator").then((m) => m.CustomIndicator),
    file: "cn/select/custom-indicator.tsx",
  },
  "select-required": {
    loader: () => import("./select/required").then((m) => m.Required),
    file: "cn/select/required.tsx",
  },
  "select-full-width": {
    loader: () => import("./select/full-width").then((m) => m.FullWidth),
    file: "cn/select/full-width.tsx",
  },
  "select-on-surface": {
    loader: () => import("./select/on-surface").then((m) => m.OnSurface),
    file: "cn/select/on-surface.tsx",
  },
  "select-custom-value": {
    loader: () => import("./select/custom-value").then((m) => m.CustomValue),
    file: "cn/select/custom-value.tsx",
  },
  "select-custom-value-multiple": {
    loader: () => import("./select/custom-value-multiple").then((m) => m.CustomValueMultiple),
    file: "cn/select/custom-value-multiple.tsx",
  },
  "select-controlled": {
    loader: () => import("./select/controlled").then((m) => m.Controlled),
    file: "cn/select/controlled.tsx",
  },
  "select-controlled-multiple": {
    loader: () => import("./select/controlled-multiple").then((m) => m.ControlledMultiple),
    file: "cn/select/controlled-multiple.tsx",
  },
  "select-controlled-open-state": {
    loader: () => import("./select/controlled-open-state").then((m) => m.ControlledOpenState),
    file: "cn/select/controlled-open-state.tsx",
  },
  "select-asynchronous-loading": {
    loader: () => import("./select/asynchronous-loading").then((m) => m.AsynchronousLoading),
    file: "cn/select/asynchronous-loading.tsx",
  },
  "select-disabled": {
    loader: () => import("./select/disabled").then((m) => m.Disabled),
    file: "cn/select/disabled.tsx",
  },
  "select-variants": {
    loader: () => import("./select/variants").then((m) => m.Variants),
    file: "cn/select/variants.tsx",
  },
  "select-custom-render-function": {
    loader: () => import("./select/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/select/custom-render-function.tsx",
  },
  // SearchField demos
  "search-field-basic": {
    loader: () => import("./search-field/basic").then((m) => m.Basic),
    file: "cn/search-field/basic.tsx",
  },
  "search-field-with-description": {
    loader: () => import("./search-field/with-description").then((m) => m.WithDescription),
    file: "cn/search-field/with-description.tsx",
  },
  "search-field-required": {
    loader: () => import("./search-field/required").then((m) => m.Required),
    file: "cn/search-field/required.tsx",
  },
  "search-field-validation": {
    loader: () => import("./search-field/validation").then((m) => m.Validation),
    file: "cn/search-field/validation.tsx",
  },
  "search-field-disabled": {
    loader: () => import("./search-field/disabled").then((m) => m.Disabled),
    file: "cn/search-field/disabled.tsx",
  },
  "search-field-full-width": {
    loader: () => import("./search-field/full-width").then((m) => m.FullWidth),
    file: "cn/search-field/full-width.tsx",
  },
  "search-field-controlled": {
    loader: () => import("./search-field/controlled").then((m) => m.Controlled),
    file: "cn/search-field/controlled.tsx",
  },
  "search-field-with-validation": {
    loader: () => import("./search-field/with-validation").then((m) => m.WithValidation),
    file: "cn/search-field/with-validation.tsx",
  },
  "search-field-custom-icons": {
    loader: () => import("./search-field/custom-icons").then((m) => m.CustomIcons),
    file: "cn/search-field/custom-icons.tsx",
  },
  "search-field-on-surface": {
    loader: () => import("./search-field/on-surface").then((m) => m.OnSurface),
    file: "cn/search-field/on-surface.tsx",
  },
  "search-field-form-example": {
    loader: () => import("./search-field/form-example").then((m) => m.FormExample),
    file: "cn/search-field/form-example.tsx",
  },
  "search-field-with-keyboard-shortcut": {
    loader: () =>
      import("./search-field/with-keyboard-shortcut").then((m) => m.WithKeyboardShortcut),
    file: "cn/search-field/with-keyboard-shortcut.tsx",
  },
  "search-field-variants": {
    loader: () => import("./search-field/variants").then((m) => m.Variants),
    file: "cn/search-field/variants.tsx",
  },
  "search-field-custom-render-function": {
    loader: () =>
      import("./search-field/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/search-field/custom-render-function.tsx",
  },
  // ScrollShadow demos
  "scroll-shadow-default": {
    loader: () => import("./scroll-shadow/default").then((m) => m.default),
    file: "cn/scroll-shadow/default.tsx",
  },
  "scroll-shadow-orientation": {
    loader: () => import("./scroll-shadow/orientation").then((m) => m.default),
    file: "cn/scroll-shadow/orientation.tsx",
  },
  "scroll-shadow-hide-scroll-bar": {
    loader: () => import("./scroll-shadow/hide-scroll-bar").then((m) => m.default),
    file: "cn/scroll-shadow/hide-scroll-bar.tsx",
  },
  "scroll-shadow-custom-size": {
    loader: () => import("./scroll-shadow/custom-size").then((m) => m.default),
    file: "cn/scroll-shadow/custom-size.tsx",
  },
  "scroll-shadow-visibility-change": {
    loader: () => import("./scroll-shadow/visibility-change").then((m) => m.default),
    file: "cn/scroll-shadow/visibility-change.tsx",
  },
  "scroll-shadow-with-card": {
    loader: () => import("./scroll-shadow/with-card").then((m) => m.default),
    file: "cn/scroll-shadow/with-card.tsx",
  },
  // Slider demos
  "slider-default": {
    loader: () => import("./slider/default").then((m) => m.Default),
    file: "cn/slider/default.tsx",
  },
  "slider-vertical": {
    loader: () => import("./slider/vertical").then((m) => m.Vertical),
    file: "cn/slider/vertical.tsx",
  },
  "slider-range": {
    loader: () => import("./slider/range").then((m) => m.Range),
    file: "cn/slider/range.tsx",
  },
  "slider-disabled": {
    loader: () => import("./slider/disabled").then((m) => m.Disabled),
    file: "cn/slider/disabled.tsx",
  },
  "slider-custom-render-function": {
    loader: () => import("./slider/custom-render-function").then((m) => m.CustomRenderFunction),
    file: "cn/slider/custom-render-function.tsx",
  },
  // Description demos
  "description-basic": {
    loader: () => import("./description/basic").then((m) => m.Basic),
    file: "cn/description/basic.tsx",
  },
  // FieldError demos
  "field-error-basic": {
    loader: () => import("./field-error/basic").then((m) => m.Basic),
    file: "cn/field-error/basic.tsx",
  },
};

export function getDemo(name: string): DemoItem | undefined {
  return demos[name];
}
