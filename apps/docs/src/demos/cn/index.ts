/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix */
import type {ComponentType} from "react";

import dynamic from "next/dynamic";

export interface DemoItem {
  component: ComponentType;
  file: string;
}

// Registry mapping demo names to their components
export const demos: Record<string, DemoItem> = {
  // Accordion demos
  "accordion-basic": {
    component: dynamic(() => import("./accordion/basic").then((m) => m.Basic)),
    file: "cn/accordion/basic.tsx",
  },
  "accordion-surface": {
    component: dynamic(() => import("./accordion/surface").then((m) => m.Surface)),
    file: "cn/accordion/surface.tsx",
  },
  "accordion-multiple": {
    component: dynamic(() => import("./accordion/multiple").then((m) => m.Multiple)),
    file: "cn/accordion/multiple.tsx",
  },
  "accordion-disabled": {
    component: dynamic(() => import("./accordion/disabled").then((m) => m.Disabled)),
    file: "cn/accordion/disabled.tsx",
  },
  "accordion-custom-indicator": {
    component: dynamic(() => import("./accordion/custom-indicator").then((m) => m.CustomIndicator)),
    file: "cn/accordion/custom-indicator.tsx",
  },
  "accordion-faq": {
    component: dynamic(() => import("./accordion/faq").then((m) => m.FAQ)),
    file: "cn/accordion/faq.tsx",
  },
  "accordion-custom-styles": {
    component: dynamic(() => import("./accordion/custom-styles").then((m) => m.CustomStyles)),
    file: "cn/accordion/custom-styles.tsx",
  },
  "accordion-without-separator": {
    component: dynamic(() =>
      import("./accordion/without-separator").then((m) => m.WithoutSeparator),
    ),
    file: "cn/accordion/without-separator.tsx",
  },
  "accordion-custom-render-function": {
    component: dynamic(() =>
      import("./accordion/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/accordion/custom-render-function.tsx",
  },
  "accordion-controlled": {
    component: dynamic(() => import("./accordion/controlled").then((m) => m.Controlled)),
    file: "cn/accordion/controlled.tsx",
  },
  // Alert demos
  "alert-basic": {
    component: dynamic(() => import("./alert/basic").then((m) => m.Basic)),
    file: "cn/alert/basic.tsx",
  },
  // AlertDialog demos
  "alert-dialog-default": {
    component: dynamic(() => import("./alert-dialog/default").then((m) => m.Default)),
    file: "cn/alert-dialog/default.tsx",
  },
  "alert-dialog-statuses": {
    component: dynamic(() => import("./alert-dialog/statuses").then((m) => m.Statuses)),
    file: "cn/alert-dialog/statuses.tsx",
  },
  "alert-dialog-placements": {
    component: dynamic(() => import("./alert-dialog/placements").then((m) => m.Placements)),
    file: "cn/alert-dialog/placements.tsx",
  },
  "alert-dialog-backdrop-variants": {
    component: dynamic(() =>
      import("./alert-dialog/backdrop-variants").then((m) => m.BackdropVariants),
    ),
    file: "cn/alert-dialog/backdrop-variants.tsx",
  },
  "alert-dialog-sizes": {
    component: dynamic(() => import("./alert-dialog/sizes").then((m) => m.Sizes)),
    file: "cn/alert-dialog/sizes.tsx",
  },
  "alert-dialog-controlled": {
    component: dynamic(() => import("./alert-dialog/controlled").then((m) => m.Controlled)),
    file: "cn/alert-dialog/controlled.tsx",
  },
  "alert-dialog-dismiss-behavior": {
    component: dynamic(() =>
      import("./alert-dialog/dismiss-behavior").then((m) => m.DismissBehavior),
    ),
    file: "cn/alert-dialog/dismiss-behavior.tsx",
  },
  "alert-dialog-custom-icon": {
    component: dynamic(() => import("./alert-dialog/custom-icon").then((m) => m.CustomIcon)),
    file: "cn/alert-dialog/custom-icon.tsx",
  },
  "alert-dialog-custom-backdrop": {
    component: dynamic(() =>
      import("./alert-dialog/custom-backdrop").then((m) => m.CustomBackdrop),
    ),
    file: "cn/alert-dialog/custom-backdrop.tsx",
  },
  "alert-dialog-custom-trigger": {
    component: dynamic(() => import("./alert-dialog/custom-trigger").then((m) => m.CustomTrigger)),
    file: "cn/alert-dialog/custom-trigger.tsx",
  },
  "alert-dialog-with-close-button": {
    component: dynamic(() =>
      import("./alert-dialog/with-close-button").then((m) => m.WithCloseButton),
    ),
    file: "cn/alert-dialog/with-close-button.tsx",
  },
  "alert-dialog-custom-animations": {
    component: dynamic(() =>
      import("./alert-dialog/custom-animations").then((m) => m.CustomAnimations),
    ),
    file: "cn/alert-dialog/custom-animations.tsx",
  },
  "alert-dialog-close-methods": {
    component: dynamic(() => import("./alert-dialog/close-methods").then((m) => m.CloseMethods)),
    file: "cn/alert-dialog/close-methods.tsx",
  },
  "alert-dialog-custom-portal": {
    component: dynamic(() => import("./alert-dialog/custom-portal").then((m) => m.CustomPortal)),
    file: "cn/alert-dialog/custom-portal.tsx",
  },
  // Avatar demos
  "avatar-basic": {
    component: dynamic(() => import("./avatar/basic").then((m) => m.Basic)),
    file: "cn/avatar/basic.tsx",
  },
  "avatar-sizes": {
    component: dynamic(() => import("./avatar/sizes").then((m) => m.Sizes)),
    file: "cn/avatar/sizes.tsx",
  },
  "avatar-colors": {
    component: dynamic(() => import("./avatar/colors").then((m) => m.Colors)),
    file: "cn/avatar/colors.tsx",
  },
  "avatar-variants": {
    component: dynamic(() => import("./avatar/variants").then((m) => m.Variants)),
    file: "cn/avatar/variants.tsx",
  },
  "avatar-fallback": {
    component: dynamic(() => import("./avatar/fallback").then((m) => m.Fallback)),
    file: "cn/avatar/fallback.tsx",
  },
  "avatar-group": {
    component: dynamic(() => import("./avatar/group").then((m) => m.Group)),
    file: "cn/avatar/group.tsx",
  },
  "avatar-custom-styles": {
    component: dynamic(() => import("./avatar/custom-styles").then((m) => m.CustomStyles)),
    file: "cn/avatar/custom-styles.tsx",
  },
  // Badge demos
  "badge-basic": {
    component: dynamic(() => import("./badge/basic").then((m) => m.BadgeBasic)),
    file: "cn/badge/basic.tsx",
  },
  "badge-colors": {
    component: dynamic(() => import("./badge/colors").then((m) => m.BadgeColors)),
    file: "cn/badge/colors.tsx",
  },
  "badge-sizes": {
    component: dynamic(() => import("./badge/sizes").then((m) => m.BadgeSizes)),
    file: "cn/badge/sizes.tsx",
  },
  "badge-variants": {
    component: dynamic(() => import("./badge/variants").then((m) => m.BadgeVariants)),
    file: "cn/badge/variants.tsx",
  },
  "badge-placements": {
    component: dynamic(() => import("./badge/placements").then((m) => m.BadgePlacements)),
    file: "cn/badge/placements.tsx",
  },
  "badge-with-content": {
    component: dynamic(() => import("./badge/with-content").then((m) => m.BadgeWithContent)),
    file: "cn/badge/with-content.tsx",
  },
  "badge-dot": {
    component: dynamic(() => import("./badge/dot").then((m) => m.BadgeDot)),
    file: "cn/badge/dot.tsx",
  },
  // Breadcrumbs demos
  "breadcrumbs-basic": {
    component: dynamic(() => import("./breadcrumbs/basic")),
    file: "cn/breadcrumbs/basic.tsx",
  },
  "breadcrumbs-level-2": {
    component: dynamic(() => import("./breadcrumbs/level-2")),
    file: "cn/breadcrumbs/level-2.tsx",
  },
  "breadcrumbs-level-3": {
    component: dynamic(() => import("./breadcrumbs/level-3")),
    file: "cn/breadcrumbs/level-3.tsx",
  },
  "breadcrumbs-custom-separator": {
    component: dynamic(() => import("./breadcrumbs/custom-separator")),
    file: "cn/breadcrumbs/custom-separator.tsx",
  },
  "breadcrumbs-disabled": {
    component: dynamic(() => import("./breadcrumbs/disabled")),
    file: "cn/breadcrumbs/disabled.tsx",
  },
  "breadcrumbs-custom-render-function": {
    component: dynamic(() =>
      import("./breadcrumbs/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/breadcrumbs/custom-render-function.tsx",
  },
  // Button demos
  "button-basic": {
    component: dynamic(() => import("./button/basic").then((m) => m.Basic)),
    file: "cn/button/basic.tsx",
  },
  "button-custom-variants": {
    component: dynamic(() => import("./button/custom-variants").then((m) => m.CustomVariants)),
    file: "cn/button/custom-variants.tsx",
  },
  "button-disabled": {
    component: dynamic(() => import("./button/disabled").then((m) => m.Disabled)),
    file: "cn/button/disabled.tsx",
  },
  "button-icon-only": {
    component: dynamic(() => import("./button/icon-only").then((m) => m.IconOnly)),
    file: "cn/button/icon-only.tsx",
  },
  "button-loading": {
    component: dynamic(() => import("./button/loading").then((m) => m.Loading)),
    file: "cn/button/loading.tsx",
  },
  "button-loading-state": {
    component: dynamic(() => import("./button/loading-state").then((m) => m.LoadingState)),
    file: "cn/button/loading-state.tsx",
  },
  "button-sizes": {
    component: dynamic(() => import("./button/sizes").then((m) => m.Sizes)),
    file: "cn/button/sizes.tsx",
  },
  "button-full-width": {
    component: dynamic(() => import("./button/full-width").then((m) => m.FullWidth)),
    file: "cn/button/full-width.tsx",
  },
  "button-social": {
    component: dynamic(() => import("./button/social").then((m) => m.Social)),
    file: "cn/button/social.tsx",
  },
  "button-ripple-effect": {
    component: dynamic(() => import("./button/ripple-effect").then((m) => m.RippleEffect)),
    file: "cn/button/ripple-effect.tsx",
  },
  "button-variants": {
    component: dynamic(() => import("./button/variants").then((m) => m.Variants)),
    file: "cn/button/variants.tsx",
  },
  "button-outline-variant": {
    component: dynamic(() => import("./button/outline-variant").then((m) => m.OutlineVariant)),
    file: "cn/button/outline-variant.tsx",
  },
  "button-with-icons": {
    component: dynamic(() => import("./button/with-icons").then((m) => m.WithIcons)),
    file: "cn/button/with-icons.tsx",
  },
  "button-custom-render-function": {
    component: dynamic(() =>
      import("./button/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/button/custom-render-function.tsx",
  },
  // ButtonGroup demos
  "button-group-basic": {
    component: dynamic(() => import("./button-group/basic").then((m) => m.Basic)),
    file: "cn/button-group/basic.tsx",
  },
  "button-group-disabled": {
    component: dynamic(() => import("./button-group/disabled").then((m) => m.Disabled)),
    file: "cn/button-group/disabled.tsx",
  },
  "button-group-sizes": {
    component: dynamic(() => import("./button-group/sizes").then((m) => m.Sizes)),
    file: "cn/button-group/sizes.tsx",
  },
  "button-group-full-width": {
    component: dynamic(() => import("./button-group/full-width").then((m) => m.FullWidth)),
    file: "cn/button-group/full-width.tsx",
  },
  "button-group-variants": {
    component: dynamic(() => import("./button-group/variants").then((m) => m.Variants)),
    file: "cn/button-group/variants.tsx",
  },
  "button-group-with-icons": {
    component: dynamic(() => import("./button-group/with-icons").then((m) => m.WithIcons)),
    file: "cn/button-group/with-icons.tsx",
  },
  "button-group-orientation": {
    component: dynamic(() => import("./button-group/orientation").then((m) => m.Orientation)),
    file: "cn/button-group/orientation.tsx",
  },
  "button-group-without-separator": {
    component: dynamic(() =>
      import("./button-group/without-separator").then((m) => m.WithoutSeparator),
    ),
    file: "cn/button-group/without-separator.tsx",
  },
  // Card demos
  "card-default": {
    component: dynamic(() => import("./card/default").then((m) => m.Default)),
    file: "cn/card/default.tsx",
  },
  "card-horizontal": {
    component: dynamic(() => import("./card/horizontal").then((m) => m.Horizontal)),
    file: "cn/card/horizontal.tsx",
  },
  "card-variants": {
    component: dynamic(() => import("./card/variants").then((m) => m.Variants)),
    file: "cn/card/variants.tsx",
  },
  "card-with-avatar": {
    component: dynamic(() => import("./card/with-avatar").then((m) => m.WithAvatar)),
    file: "cn/card/with-avatar.tsx",
  },
  "card-with-form": {
    component: dynamic(() => import("./card/with-form").then((m) => m.WithForm)),
    file: "cn/card/with-form.tsx",
  },
  "card-with-images": {
    component: dynamic(() => import("./card/with-images").then((m) => m.WithImages)),
    file: "cn/card/with-images.tsx",
  },
  // Calendar demos
  "calendar-basic": {
    component: dynamic(() => import("./calendar/basic").then((m) => m.Basic)),
    file: "cn/calendar/basic.tsx",
  },
  "calendar-custom-styles": {
    component: dynamic(() => import("./calendar/custom-styles").then((m) => m.CustomStyles)),
    file: "cn/calendar/custom-styles.tsx",
  },
  "calendar-default-value": {
    component: dynamic(() => import("./calendar/default-value").then((m) => m.DefaultValue)),
    file: "cn/calendar/default-value.tsx",
  },
  "calendar-controlled": {
    component: dynamic(() => import("./calendar/controlled").then((m) => m.Controlled)),
    file: "cn/calendar/controlled.tsx",
  },
  "calendar-min-max-dates": {
    component: dynamic(() => import("./calendar/min-max-dates").then((m) => m.MinMaxDates)),
    file: "cn/calendar/min-max-dates.tsx",
  },
  "calendar-unavailable-dates": {
    component: dynamic(() =>
      import("./calendar/unavailable-dates").then((m) => m.UnavailableDates),
    ),
    file: "cn/calendar/unavailable-dates.tsx",
  },
  "calendar-weeks-in-month": {
    component: dynamic(() => import("./calendar/weeks-in-month").then((m) => m.WeeksInMonth)),
    file: "cn/calendar/weeks-in-month.tsx",
  },
  "calendar-week-view": {
    component: dynamic(() => import("./calendar/week-view").then((m) => m.WeekView)),
    file: "cn/calendar/week-view.tsx",
  },
  "calendar-day-view": {
    component: dynamic(() => import("./calendar/day-view").then((m) => m.DayView)),
    file: "cn/calendar/day-view.tsx",
  },
  "calendar-multiple-selection": {
    component: dynamic(() =>
      import("./calendar/multiple-selection").then((m) => m.MultipleSelection),
    ),
    file: "cn/calendar/multiple-selection.tsx",
  },
  "calendar-disabled": {
    component: dynamic(() => import("./calendar/disabled").then((m) => m.Disabled)),
    file: "cn/calendar/disabled.tsx",
  },
  "calendar-read-only": {
    component: dynamic(() => import("./calendar/read-only").then((m) => m.ReadOnly)),
    file: "cn/calendar/read-only.tsx",
  },
  "calendar-focused-value": {
    component: dynamic(() => import("./calendar/focused-value").then((m) => m.FocusedValue)),
    file: "cn/calendar/focused-value.tsx",
  },
  "calendar-with-indicators": {
    component: dynamic(() => import("./calendar/with-indicators").then((m) => m.WithIndicators)),
    file: "cn/calendar/with-indicators.tsx",
  },
  "calendar-multiple-months": {
    component: dynamic(() => import("./calendar/multiple-months").then((m) => m.MultipleMonths)),
    file: "cn/calendar/multiple-months.tsx",
  },
  "calendar-year-picker": {
    component: dynamic(() => import("./calendar/year-picker").then((m) => m.YearPicker)),
    file: "cn/calendar/year-picker.tsx",
  },
  "calendar-international-calendar": {
    component: dynamic(() =>
      import("./calendar/international-calendar").then((m) => m.InternationalCalendar),
    ),
    file: "cn/calendar/international-calendar.tsx",
  },
  "calendar-booking-calendar": {
    component: dynamic(() => import("./calendar/booking-calendar").then((m) => m.BookingCalendar)),
    file: "cn/calendar/booking-calendar.tsx",
  },
  "calendar-custom-icons": {
    component: dynamic(() => import("./calendar/custom-icons").then((m) => m.CustomIcons)),
    file: "cn/calendar/custom-icons.tsx",
  },
  // RangeCalendar demos
  "range-calendar-basic": {
    component: dynamic(() => import("./range-calendar/basic").then((m) => m.Basic)),
    file: "cn/range-calendar/basic.tsx",
  },
  "range-calendar-year-picker": {
    component: dynamic(() => import("./range-calendar/year-picker").then((m) => m.YearPicker)),
    file: "cn/range-calendar/year-picker.tsx",
  },
  "range-calendar-default-value": {
    component: dynamic(() => import("./range-calendar/default-value").then((m) => m.DefaultValue)),
    file: "cn/range-calendar/default-value.tsx",
  },
  "range-calendar-controlled": {
    component: dynamic(() => import("./range-calendar/controlled").then((m) => m.Controlled)),
    file: "cn/range-calendar/controlled.tsx",
  },
  "range-calendar-min-max-dates": {
    component: dynamic(() => import("./range-calendar/min-max-dates").then((m) => m.MinMaxDates)),
    file: "cn/range-calendar/min-max-dates.tsx",
  },
  "range-calendar-unavailable-dates": {
    component: dynamic(() =>
      import("./range-calendar/unavailable-dates").then((m) => m.UnavailableDates),
    ),
    file: "cn/range-calendar/unavailable-dates.tsx",
  },
  "range-calendar-anchor-unavailable-dates": {
    component: dynamic(() =>
      import("./range-calendar/anchor-unavailable-dates").then((m) => m.AnchorUnavailableDates),
    ),
    file: "cn/range-calendar/anchor-unavailable-dates.tsx",
  },
  "range-calendar-weeks-in-month": {
    component: dynamic(() => import("./range-calendar/weeks-in-month").then((m) => m.WeeksInMonth)),
    file: "cn/range-calendar/weeks-in-month.tsx",
  },
  "range-calendar-week-view": {
    component: dynamic(() => import("./range-calendar/week-view").then((m) => m.WeekView)),
    file: "cn/range-calendar/week-view.tsx",
  },
  "range-calendar-day-view": {
    component: dynamic(() => import("./range-calendar/day-view").then((m) => m.DayView)),
    file: "cn/range-calendar/day-view.tsx",
  },
  "range-calendar-allows-non-contiguous-ranges": {
    component: dynamic(() =>
      import("./range-calendar/allows-non-contiguous-ranges").then(
        (m) => m.AllowsNonContiguousRanges,
      ),
    ),
    file: "cn/range-calendar/allows-non-contiguous-ranges.tsx",
  },
  "range-calendar-disabled": {
    component: dynamic(() => import("./range-calendar/disabled").then((m) => m.Disabled)),
    file: "cn/range-calendar/disabled.tsx",
  },
  "range-calendar-read-only": {
    component: dynamic(() => import("./range-calendar/read-only").then((m) => m.ReadOnly)),
    file: "cn/range-calendar/read-only.tsx",
  },
  "range-calendar-invalid": {
    component: dynamic(() => import("./range-calendar/invalid").then((m) => m.Invalid)),
    file: "cn/range-calendar/invalid.tsx",
  },
  "range-calendar-focused-value": {
    component: dynamic(() => import("./range-calendar/focused-value").then((m) => m.FocusedValue)),
    file: "cn/range-calendar/focused-value.tsx",
  },
  "range-calendar-with-indicators": {
    component: dynamic(() =>
      import("./range-calendar/with-indicators").then((m) => m.WithIndicators),
    ),
    file: "cn/range-calendar/with-indicators.tsx",
  },
  "range-calendar-multiple-months": {
    component: dynamic(() =>
      import("./range-calendar/multiple-months").then((m) => m.MultipleMonths),
    ),
    file: "cn/range-calendar/multiple-months.tsx",
  },
  "range-calendar-three-months": {
    component: dynamic(() => import("./range-calendar/three-months").then((m) => m.ThreeMonths)),
    file: "cn/range-calendar/three-months.tsx",
  },
  "range-calendar-international-calendar": {
    component: dynamic(() =>
      import("./range-calendar/international-calendar").then((m) => m.InternationalCalendar),
    ),
    file: "cn/range-calendar/international-calendar.tsx",
  },
  "range-calendar-booking-calendar": {
    component: dynamic(() =>
      import("./range-calendar/booking-calendar").then((m) => m.BookingCalendar),
    ),
    file: "cn/range-calendar/booking-calendar.tsx",
  },
  // Checkbox demos
  "checkbox-basic": {
    component: dynamic(() => import("./checkbox/basic").then((m) => m.Basic)),
    file: "cn/checkbox/basic.tsx",
  },
  "checkbox-disabled": {
    component: dynamic(() => import("./checkbox/disabled").then((m) => m.Disabled)),
    file: "cn/checkbox/disabled.tsx",
  },
  "checkbox-default-selected": {
    component: dynamic(() => import("./checkbox/default-selected").then((m) => m.DefaultSelected)),
    file: "cn/checkbox/default-selected.tsx",
  },
  "checkbox-controlled": {
    component: dynamic(() => import("./checkbox/controlled").then((m) => m.Controlled)),
    file: "cn/checkbox/controlled.tsx",
  },
  "checkbox-indeterminate": {
    component: dynamic(() => import("./checkbox/indeterminate").then((m) => m.Indeterminate)),
    file: "cn/checkbox/indeterminate.tsx",
  },
  "checkbox-external-label": {
    component: dynamic(() => import("./checkbox/external-label").then((m) => m.ExternalLabel)),
    file: "cn/checkbox/external-label.tsx",
  },
  "checkbox-with-description": {
    component: dynamic(() => import("./checkbox/with-description").then((m) => m.WithDescription)),
    file: "cn/checkbox/with-description.tsx",
  },
  "checkbox-render-props": {
    component: dynamic(() => import("./checkbox/render-props").then((m) => m.RenderProps)),
    file: "cn/checkbox/render-props.tsx",
  },
  "checkbox-form": {
    component: dynamic(() => import("./checkbox/form").then((m) => m.Form)),
    file: "cn/checkbox/form.tsx",
  },
  "checkbox-custom-styles": {
    component: dynamic(() => import("./checkbox/custom-styles").then((m) => m.CustomStyles)),
    file: "cn/checkbox/custom-styles.tsx",
  },
  "checkbox-invalid": {
    component: dynamic(() => import("./checkbox/invalid").then((m) => m.Invalid)),
    file: "cn/checkbox/invalid.tsx",
  },
  "checkbox-custom-indicator": {
    component: dynamic(() => import("./checkbox/custom-indicator").then((m) => m.CustomIndicator)),
    file: "cn/checkbox/custom-indicator.tsx",
  },
  "checkbox-full-rounded": {
    component: dynamic(() => import("./checkbox/full-rounded").then((m) => m.FullRounded)),
    file: "cn/checkbox/full-rounded.tsx",
  },
  "checkbox-variants": {
    component: dynamic(() => import("./checkbox/variants").then((m) => m.Variants)),
    file: "cn/checkbox/variants.tsx",
  },
  "checkbox-custom-render-function": {
    component: dynamic(() =>
      import("./checkbox/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/checkbox/custom-render-function.tsx",
  },
  // CheckboxGroup demos
  "checkbox-group-basic": {
    component: dynamic(() => import("./checkbox-group/basic").then((m) => m.Basic)),
    file: "cn/checkbox-group/basic.tsx",
  },
  "checkbox-group-on-surface": {
    component: dynamic(() => import("./checkbox-group/on-surface").then((m) => m.OnSurface)),
    file: "cn/checkbox-group/on-surface.tsx",
  },
  "checkbox-group-with-custom-indicator": {
    component: dynamic(() =>
      import("./checkbox-group/with-custom-indicator").then((m) => m.WithCustomIndicator),
    ),
    file: "cn/checkbox-group/with-custom-indicator.tsx",
  },
  "checkbox-group-indeterminate": {
    component: dynamic(() => import("./checkbox-group/indeterminate").then((m) => m.Indeterminate)),
    file: "cn/checkbox-group/indeterminate.tsx",
  },
  "checkbox-group-validation": {
    component: dynamic(() => import("./checkbox-group/validation").then((m) => m.Validation)),
    file: "cn/checkbox-group/validation.tsx",
  },
  "checkbox-group-controlled": {
    component: dynamic(() => import("./checkbox-group/controlled").then((m) => m.Controlled)),
    file: "cn/checkbox-group/controlled.tsx",
  },
  "checkbox-group-disabled": {
    component: dynamic(() => import("./checkbox-group/disabled").then((m) => m.Disabled)),
    file: "cn/checkbox-group/disabled.tsx",
  },
  "checkbox-group-features-and-addons": {
    component: dynamic(() =>
      import("./checkbox-group/features-and-addons").then((m) => m.FeaturesAndAddOns),
    ),
    file: "cn/checkbox-group/features-and-addons.tsx",
  },
  "checkbox-group-custom-render-function": {
    component: dynamic(() =>
      import("./checkbox-group/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/checkbox-group/custom-render-function.tsx",
  },
  // Chip demos
  "chip-basic": {
    component: dynamic(() => import("./chip/basic").then((m) => m.ChipBasic)),
    file: "cn/chip/basic.tsx",
  },
  "chip-variants": {
    component: dynamic(() => import("./chip/variants").then((m) => m.ChipVariants)),
    file: "cn/chip/variants.tsx",
  },
  "chip-with-icon": {
    component: dynamic(() => import("./chip/with-icon").then((m) => m.ChipWithIcon)),
    file: "cn/chip/with-icon.tsx",
  },
  "chip-statuses": {
    component: dynamic(() => import("./chip/statuses").then((m) => m.ChipStatuses)),
    file: "cn/chip/statuses.tsx",
  },
  "chip-vibrant-palette": {
    component: dynamic(() => import("./chip/vibrant-palette").then((m) => m.ChipVibrantPalette)),
    file: "cn/chip/vibrant-palette.tsx",
  },
  // ColorField demos
  "color-field-basic": {
    component: dynamic(() => import("./color-field/basic").then((m) => m.Basic)),
    file: "cn/color-field/basic.tsx",
  },
  "color-field-channel-editing": {
    component: dynamic(() => import("./color-field/channel-editing").then((m) => m.ChannelEditing)),
    file: "cn/color-field/channel-editing.tsx",
  },
  "color-field-controlled": {
    component: dynamic(() => import("./color-field/controlled").then((m) => m.Controlled)),
    file: "cn/color-field/controlled.tsx",
  },
  "color-field-disabled": {
    component: dynamic(() => import("./color-field/disabled").then((m) => m.Disabled)),
    file: "cn/color-field/disabled.tsx",
  },
  "color-field-form-example": {
    component: dynamic(() => import("./color-field/form-example").then((m) => m.FormExample)),
    file: "cn/color-field/form-example.tsx",
  },
  "color-field-full-width": {
    component: dynamic(() => import("./color-field/full-width").then((m) => m.FullWidth)),
    file: "cn/color-field/full-width.tsx",
  },
  "color-field-invalid": {
    component: dynamic(() => import("./color-field/invalid").then((m) => m.Invalid)),
    file: "cn/color-field/invalid.tsx",
  },
  "color-field-on-surface": {
    component: dynamic(() => import("./color-field/on-surface").then((m) => m.OnSurface)),
    file: "cn/color-field/on-surface.tsx",
  },
  "color-field-required": {
    component: dynamic(() => import("./color-field/required").then((m) => m.Required)),
    file: "cn/color-field/required.tsx",
  },
  "color-field-variants": {
    component: dynamic(() => import("./color-field/variants").then((m) => m.Variants)),
    file: "cn/color-field/variants.tsx",
  },
  "color-field-with-description": {
    component: dynamic(() =>
      import("./color-field/with-description").then((m) => m.WithDescription),
    ),
    file: "cn/color-field/with-description.tsx",
  },
  "color-field-custom-render-function": {
    component: dynamic(() =>
      import("./color-field/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/color-field/custom-render-function.tsx",
  },
  // ColorPicker demos
  "color-picker-basic": {
    component: dynamic(() => import("./color-picker/basic").then((m) => m.Basic)),
    file: "cn/color-picker/basic.tsx",
  },
  "color-picker-controlled": {
    component: dynamic(() => import("./color-picker/controlled").then((m) => m.Controlled)),
    file: "cn/color-picker/controlled.tsx",
  },
  "color-picker-with-swatches": {
    component: dynamic(() => import("./color-picker/with-swatches").then((m) => m.WithSwatches)),
    file: "cn/color-picker/with-swatches.tsx",
  },
  "color-picker-with-fields": {
    component: dynamic(() => import("./color-picker/with-fields").then((m) => m.WithFields)),
    file: "cn/color-picker/with-fields.tsx",
  },
  "color-picker-with-sliders": {
    component: dynamic(() => import("./color-picker/with-sliders").then((m) => m.WithSliders)),
    file: "cn/color-picker/with-sliders.tsx",
  },
  // ColorArea demos
  "color-area-basic": {
    component: dynamic(() => import("./color-area/basic").then((m) => m.ColorAreaBasic)),
    file: "cn/color-area/basic.tsx",
  },
  "color-area-with-dots": {
    component: dynamic(() => import("./color-area/with-dots").then((m) => m.ColorAreaWithDots)),
    file: "cn/color-area/with-dots.tsx",
  },
  "color-area-space-and-channels": {
    component: dynamic(() =>
      import("./color-area/space-and-channels").then((m) => m.ColorAreaSpaceAndChannels),
    ),
    file: "cn/color-area/space-and-channels.tsx",
  },
  "color-area-controlled": {
    component: dynamic(() => import("./color-area/controlled").then((m) => m.ColorAreaControlled)),
    file: "cn/color-area/controlled.tsx",
  },
  "color-area-disabled": {
    component: dynamic(() => import("./color-area/disabled").then((m) => m.ColorAreaDisabled)),
    file: "cn/color-area/disabled.tsx",
  },
  "color-area-custom-render-function": {
    component: dynamic(() =>
      import("./color-area/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/color-area/custom-render-function.tsx",
  },
  // ColorSwatch demos
  "color-swatch-basic": {
    component: dynamic(() => import("./color-swatch/basic").then((m) => m.ColorSwatchBasic)),
    file: "cn/color-swatch/basic.tsx",
  },
  "color-swatch-sizes": {
    component: dynamic(() => import("./color-swatch/sizes").then((m) => m.ColorSwatchSizes)),
    file: "cn/color-swatch/sizes.tsx",
  },
  "color-swatch-shapes": {
    component: dynamic(() => import("./color-swatch/shapes").then((m) => m.ColorSwatchShapes)),
    file: "cn/color-swatch/shapes.tsx",
  },
  "color-swatch-transparency": {
    component: dynamic(() =>
      import("./color-swatch/transparency").then((m) => m.ColorSwatchTransparency),
    ),
    file: "cn/color-swatch/transparency.tsx",
  },
  "color-swatch-custom-styles": {
    component: dynamic(() =>
      import("./color-swatch/custom-styles").then((m) => m.ColorSwatchCustomStyles),
    ),
    file: "cn/color-swatch/custom-styles.tsx",
  },
  "color-swatch-accessibility": {
    component: dynamic(() =>
      import("./color-swatch/accessibility").then((m) => m.ColorSwatchAccessibility),
    ),
    file: "cn/color-swatch/accessibility.tsx",
  },
  "color-swatch-custom-render-function": {
    component: dynamic(() =>
      import("./color-swatch/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/color-swatch/custom-render-function.tsx",
  },
  // ColorSlider demos
  "color-slider-basic": {
    component: dynamic(() => import("./color-slider/basic").then((m) => m.Basic)),
    file: "cn/color-slider/basic.tsx",
  },
  "color-slider-channels": {
    component: dynamic(() => import("./color-slider/channels").then((m) => m.Channels)),
    file: "cn/color-slider/channels.tsx",
  },
  "color-slider-alpha-channel": {
    component: dynamic(() => import("./color-slider/alpha-channel").then((m) => m.AlphaChannel)),
    file: "cn/color-slider/alpha-channel.tsx",
  },
  "color-slider-rgb-channels": {
    component: dynamic(() => import("./color-slider/rgb-channels").then((m) => m.RGBChannels)),
    file: "cn/color-slider/rgb-channels.tsx",
  },
  "color-slider-vertical": {
    component: dynamic(() => import("./color-slider/vertical").then((m) => m.Vertical)),
    file: "cn/color-slider/vertical.tsx",
  },
  "color-slider-disabled": {
    component: dynamic(() => import("./color-slider/disabled").then((m) => m.Disabled)),
    file: "cn/color-slider/disabled.tsx",
  },
  "color-slider-controlled": {
    component: dynamic(() => import("./color-slider/controlled").then((m) => m.Controlled)),
    file: "cn/color-slider/controlled.tsx",
  },
  "color-slider-custom-render-function": {
    component: dynamic(() =>
      import("./color-slider/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/color-slider/custom-render-function.tsx",
  },
  // CloseButton demos
  "close-button-default": {
    component: dynamic(() => import("./close-button/default").then((m) => m.Default)),
    file: "cn/close-button/default.tsx",
  },
  "close-button-with-custom-icon": {
    component: dynamic(() =>
      import("./close-button/with-custom-icon").then((m) => m.WithCustomIcon),
    ),
    file: "cn/close-button/with-custom-icon.tsx",
  },
  "close-button-interactive": {
    component: dynamic(() => import("./close-button/interactive").then((m) => m.Interactive)),
    file: "cn/close-button/interactive.tsx",
  },
  // ColorSwatchPicker demos
  "color-swatch-picker-basic": {
    component: dynamic(() => import("./color-swatch-picker/basic").then((m) => m.Basic)),
    file: "cn/color-swatch-picker/basic.tsx",
  },
  "color-swatch-picker-sizes": {
    component: dynamic(() => import("./color-swatch-picker/sizes").then((m) => m.Sizes)),
    file: "cn/color-swatch-picker/sizes.tsx",
  },
  "color-swatch-picker-variants": {
    component: dynamic(() => import("./color-swatch-picker/variants").then((m) => m.Variants)),
    file: "cn/color-swatch-picker/variants.tsx",
  },
  "color-swatch-picker-stack-layout": {
    component: dynamic(() =>
      import("./color-swatch-picker/stack-layout").then((m) => m.StackLayout),
    ),
    file: "cn/color-swatch-picker/stack-layout.tsx",
  },
  "color-swatch-picker-controlled": {
    component: dynamic(() => import("./color-swatch-picker/controlled").then((m) => m.Controlled)),
    file: "cn/color-swatch-picker/controlled.tsx",
  },
  "color-swatch-picker-disabled": {
    component: dynamic(() => import("./color-swatch-picker/disabled").then((m) => m.Disabled)),
    file: "cn/color-swatch-picker/disabled.tsx",
  },
  "color-swatch-picker-default-value": {
    component: dynamic(() =>
      import("./color-swatch-picker/default-value").then((m) => m.DefaultValue),
    ),
    file: "cn/color-swatch-picker/default-value.tsx",
  },
  "color-swatch-picker-custom-indicator": {
    component: dynamic(() =>
      import("./color-swatch-picker/custom-indicator").then((m) => m.CustomIndicator),
    ),
    file: "cn/color-swatch-picker/custom-indicator.tsx",
  },
  "color-swatch-picker-custom-render-function": {
    component: dynamic(() =>
      import("./color-swatch-picker/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/color-swatch-picker/custom-render-function.tsx",
  },
  // Autocomplete demos
  "autocomplete-default": {
    component: dynamic(() => import("./autocomplete/default")),
    file: "cn/autocomplete/default.tsx",
  },
  "autocomplete-single-select": {
    component: dynamic(() => import("./autocomplete/single-select")),
    file: "cn/autocomplete/single-select.tsx",
  },
  "autocomplete-variants": {
    component: dynamic(() => import("./autocomplete/variants").then((m) => m.Variants)),
    file: "cn/autocomplete/variants.tsx",
  },
  "autocomplete-multiple-select": {
    component: dynamic(() =>
      import("./autocomplete/multiple-select").then((m) => m.MultipleSelect),
    ),
    file: "cn/autocomplete/multiple-select.tsx",
  },
  "autocomplete-full-width": {
    component: dynamic(() => import("./autocomplete/full-width").then((m) => m.FullWidth)),
    file: "cn/autocomplete/full-width.tsx",
  },
  "autocomplete-with-description": {
    component: dynamic(() =>
      import("./autocomplete/with-description").then((m) => m.WithDescription),
    ),
    file: "cn/autocomplete/with-description.tsx",
  },
  "autocomplete-with-sections": {
    component: dynamic(() => import("./autocomplete/with-sections").then((m) => m.WithSections)),
    file: "cn/autocomplete/with-sections.tsx",
  },
  "autocomplete-with-disabled-options": {
    component: dynamic(() =>
      import("./autocomplete/with-disabled-options").then((m) => m.WithDisabledOptions),
    ),
    file: "cn/autocomplete/with-disabled-options.tsx",
  },
  "autocomplete-allows-empty-collection": {
    component: dynamic(() =>
      import("./autocomplete/allows-empty-collection").then((m) => m.AllowsEmptyCollection),
    ),
    file: "cn/autocomplete/allows-empty-collection.tsx",
  },
  "autocomplete-custom-indicator": {
    component: dynamic(() =>
      import("./autocomplete/custom-indicator").then((m) => m.CustomIndicator),
    ),
    file: "cn/autocomplete/custom-indicator.tsx",
  },
  "autocomplete-required": {
    component: dynamic(() => import("./autocomplete/required").then((m) => m.Required)),
    file: "cn/autocomplete/required.tsx",
  },
  "autocomplete-controlled": {
    component: dynamic(() => import("./autocomplete/controlled").then((m) => m.Controlled)),
    file: "cn/autocomplete/controlled.tsx",
  },
  "autocomplete-controlled-open-state": {
    component: dynamic(() =>
      import("./autocomplete/controlled-open-state").then((m) => m.ControlledOpenState),
    ),
    file: "cn/autocomplete/controlled-open-state.tsx",
  },
  "autocomplete-asynchronous-filtering": {
    component: dynamic(() =>
      import("./autocomplete/asynchronous-filtering").then((m) => m.AsynchronousFiltering),
    ),
    file: "cn/autocomplete/asynchronous-filtering.tsx",
  },
  "autocomplete-disabled": {
    component: dynamic(() => import("./autocomplete/disabled").then((m) => m.Disabled)),
    file: "cn/autocomplete/disabled.tsx",
  },
  "autocomplete-user-selection": {
    component: dynamic(() => import("./autocomplete/user-selection").then((m) => m.UserSelection)),
    file: "cn/autocomplete/user-selection.tsx",
  },
  "autocomplete-user-selection-multiple": {
    component: dynamic(() =>
      import("./autocomplete/user-selection-multiple").then((m) => m.UserSelectionMultiple),
    ),
    file: "cn/autocomplete/user-selection-multiple.tsx",
  },
  "autocomplete-location-search": {
    component: dynamic(() =>
      import("./autocomplete/location-search").then((m) => m.LocationSearch),
    ),
    file: "cn/autocomplete/location-search.tsx",
  },
  "autocomplete-tag-group-selection": {
    component: dynamic(() =>
      import("./autocomplete/tag-group-selection").then((m) => m.TagGroupSelection),
    ),
    file: "cn/autocomplete/tag-group-selection.tsx",
  },
  "autocomplete-email-recipients": {
    component: dynamic(() =>
      import("./autocomplete/email-recipients").then((m) => m.EmailRecipients),
    ),
    file: "cn/autocomplete/email-recipients.tsx",
  },
  // ComboBox demos
  "combo-box-default": {
    component: dynamic(() => import("./combo-box/default").then((m) => m.Default)),
    file: "cn/combo-box/default.tsx",
  },
  "combo-box-default-selected-key": {
    component: dynamic(() =>
      import("./combo-box/default-selected-key").then((m) => m.DefaultSelectedKey),
    ),
    file: "cn/combo-box/default-selected-key.tsx",
  },
  "combo-box-with-description": {
    component: dynamic(() => import("./combo-box/with-description").then((m) => m.WithDescription)),
    file: "cn/combo-box/with-description.tsx",
  },
  "combo-box-with-sections": {
    component: dynamic(() => import("./combo-box/with-sections").then((m) => m.WithSections)),
    file: "cn/combo-box/with-sections.tsx",
  },
  "combo-box-with-disabled-options": {
    component: dynamic(() =>
      import("./combo-box/with-disabled-options").then((m) => m.WithDisabledOptions),
    ),
    file: "cn/combo-box/with-disabled-options.tsx",
  },
  "combo-box-custom-indicator": {
    component: dynamic(() => import("./combo-box/custom-indicator").then((m) => m.CustomIndicator)),
    file: "cn/combo-box/custom-indicator.tsx",
  },
  "combo-box-required": {
    component: dynamic(() => import("./combo-box/required").then((m) => m.Required)),
    file: "cn/combo-box/required.tsx",
  },
  "combo-box-full-width": {
    component: dynamic(() => import("./combo-box/full-width").then((m) => m.FullWidth)),
    file: "cn/combo-box/full-width.tsx",
  },
  "combo-box-custom-value": {
    component: dynamic(() => import("./combo-box/custom-value").then((m) => m.CustomValue)),
    file: "cn/combo-box/custom-value.tsx",
  },
  "combo-box-controlled": {
    component: dynamic(() => import("./combo-box/controlled").then((m) => m.Controlled)),
    file: "cn/combo-box/controlled.tsx",
  },
  "combo-box-controlled-input-value": {
    component: dynamic(() =>
      import("./combo-box/controlled-input-value").then((m) => m.ControlledInputValue),
    ),
    file: "cn/combo-box/controlled-input-value.tsx",
  },
  "combo-box-asynchronous-loading": {
    component: dynamic(() =>
      import("./combo-box/asynchronous-loading").then((m) => m.AsynchronousLoading),
    ),
    file: "cn/combo-box/asynchronous-loading.tsx",
  },
  "combo-box-custom-filtering": {
    component: dynamic(() => import("./combo-box/custom-filtering").then((m) => m.CustomFiltering)),
    file: "cn/combo-box/custom-filtering.tsx",
  },
  "combo-box-allows-custom-value": {
    component: dynamic(() =>
      import("./combo-box/allows-custom-value").then((m) => m.AllowsCustomValue),
    ),
    file: "cn/combo-box/allows-custom-value.tsx",
  },
  "combo-box-disabled": {
    component: dynamic(() => import("./combo-box/disabled").then((m) => m.Disabled)),
    file: "cn/combo-box/disabled.tsx",
  },
  "combo-box-on-surface": {
    component: dynamic(() => import("./combo-box/on-surface").then((m) => m.OnSurface)),
    file: "cn/combo-box/on-surface.tsx",
  },
  "combo-box-menu-trigger": {
    component: dynamic(() => import("./combo-box/menu-trigger").then((m) => m.MenuTrigger)),
    file: "cn/combo-box/menu-trigger.tsx",
  },
  "combo-box-custom-render-function": {
    component: dynamic(() =>
      import("./combo-box/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/combo-box/custom-render-function.tsx",
  },
  // Drawer demos
  "drawer-basic": {
    component: dynamic(() => import("./drawer/basic").then((m) => m.Basic)),
    file: "cn/drawer/basic.tsx",
  },
  "drawer-placements": {
    component: dynamic(() => import("./drawer/placements").then((m) => m.Placements)),
    file: "cn/drawer/placements.tsx",
  },
  "drawer-backdrop-variants": {
    component: dynamic(() => import("./drawer/backdrop-variants").then((m) => m.BackdropVariants)),
    file: "cn/drawer/backdrop-variants.tsx",
  },
  "drawer-with-form": {
    component: dynamic(() => import("./drawer/with-form").then((m) => m.WithForm)),
    file: "cn/drawer/with-form.tsx",
  },
  "drawer-scrollable-content": {
    component: dynamic(() =>
      import("./drawer/scrollable-content").then((m) => m.ScrollableContent),
    ),
    file: "cn/drawer/scrollable-content.tsx",
  },
  "drawer-navigation": {
    component: dynamic(() => import("./drawer/navigation").then((m) => m.Navigation)),
    file: "cn/drawer/navigation.tsx",
  },
  "drawer-non-dismissable": {
    component: dynamic(() => import("./drawer/non-dismissable").then((m) => m.NonDismissable)),
    file: "cn/drawer/non-dismissable.tsx",
  },
  "drawer-controlled": {
    component: dynamic(() => import("./drawer/controlled").then((m) => m.Controlled)),
    file: "cn/drawer/controlled.tsx",
  },
  // Disclosure demos
  "disclosure-basic": {
    component: dynamic(() => import("./disclosure/basic").then((m) => m.Basic)),
    file: "cn/disclosure/basic.tsx",
  },
  "disclosure-custom-render-function": {
    component: dynamic(() =>
      import("./disclosure/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/disclosure/custom-render-function.tsx",
  },
  // DisclosureGroup demos
  "disclosure-group-basic": {
    component: dynamic(() => import("./disclosure-group/basic").then((m) => m.Basic)),
    file: "cn/disclosure-group/basic.tsx",
  },
  "disclosure-group-controlled": {
    component: dynamic(() => import("./disclosure-group/controlled").then((m) => m.Controlled)),
    file: "cn/disclosure-group/controlled.tsx",
  },
  // Dropdown demos
  "dropdown-default": {
    component: dynamic(() => import("./dropdown/default").then((m) => m.Default)),
    file: "cn/dropdown/default.tsx",
  },
  "dropdown-with-single-selection": {
    component: dynamic(() =>
      import("./dropdown/with-single-selection").then((m) => m.WithSingleSelection),
    ),
    file: "cn/dropdown/with-single-selection.tsx",
  },
  "dropdown-single-with-custom-indicator": {
    component: dynamic(() =>
      import("./dropdown/single-with-custom-indicator").then((m) => m.SingleWithCustomIndicator),
    ),
    file: "cn/dropdown/single-with-custom-indicator.tsx",
  },
  "dropdown-with-multiple-selection": {
    component: dynamic(() =>
      import("./dropdown/with-multiple-selection").then((m) => m.WithMultipleSelection),
    ),
    file: "cn/dropdown/with-multiple-selection.tsx",
  },
  "dropdown-with-section-level-selection": {
    component: dynamic(() =>
      import("./dropdown/with-section-level-selection").then((m) => m.WithSectionLevelSelection),
    ),
    file: "cn/dropdown/with-section-level-selection.tsx",
  },
  "dropdown-with-keyboard-shortcuts": {
    component: dynamic(() =>
      import("./dropdown/with-keyboard-shortcuts").then((m) => m.WithKeyboardShortcuts),
    ),
    file: "cn/dropdown/with-keyboard-shortcuts.tsx",
  },
  "dropdown-with-icons": {
    component: dynamic(() => import("./dropdown/with-icons").then((m) => m.WithIcons)),
    file: "cn/dropdown/with-icons.tsx",
  },
  "dropdown-long-press-trigger": {
    component: dynamic(() =>
      import("./dropdown/long-press-trigger").then((m) => m.LongPressTrigger),
    ),
    file: "cn/dropdown/long-press-trigger.tsx",
  },
  "dropdown-with-descriptions": {
    component: dynamic(() =>
      import("./dropdown/with-descriptions").then((m) => m.WithDescriptions),
    ),
    file: "cn/dropdown/with-descriptions.tsx",
  },
  "dropdown-with-sections": {
    component: dynamic(() => import("./dropdown/with-sections").then((m) => m.WithSections)),
    file: "cn/dropdown/with-sections.tsx",
  },
  "dropdown-with-disabled-items": {
    component: dynamic(() =>
      import("./dropdown/with-disabled-items").then((m) => m.WithDisabledItems),
    ),
    file: "cn/dropdown/with-disabled-items.tsx",
  },
  "dropdown-with-submenus": {
    component: dynamic(() => import("./dropdown/with-submenus").then((m) => m.WithSubmenus)),
    file: "cn/dropdown/with-submenus.tsx",
  },
  "dropdown-with-custom-submenu-indicator": {
    component: dynamic(() =>
      import("./dropdown/with-custom-submenu-indicator").then((m) => m.WithCustomSubmenuIndicator),
    ),
    file: "cn/dropdown/with-custom-submenu-indicator.tsx",
  },
  "dropdown-controlled": {
    component: dynamic(() => import("./dropdown/controlled").then((m) => m.Controlled)),
    file: "cn/dropdown/controlled.tsx",
  },
  "dropdown-controlled-open-state": {
    component: dynamic(() =>
      import("./dropdown/controlled-open-state").then((m) => m.ControlledOpenState),
    ),
    file: "cn/dropdown/controlled-open-state.tsx",
  },
  "dropdown-custom-trigger": {
    component: dynamic(() => import("./dropdown/custom-trigger").then((m) => m.CustomTrigger)),
    file: "cn/dropdown/custom-trigger.tsx",
  },
  // ErrorMessage demos
  "error-message-basic": {
    component: dynamic(() => import("./error-message/basic").then((m) => m.ErrorMessageBasic)),
    file: "cn/error-message/basic.tsx",
  },
  "error-message-with-tag-group": {
    component: dynamic(() =>
      import("./error-message/with-tag-group").then((m) => m.ErrorMessageWithTagGroup),
    ),
    file: "cn/error-message/with-tag-group.tsx",
  },
  // Form demos
  "form-basic": {
    component: dynamic(() => import("./form/basic").then((m) => m.Basic)),
    file: "cn/form/basic.tsx",
  },
  "form-custom-render-function": {
    component: dynamic(() =>
      import("./form/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/form/custom-render-function.tsx",
  },
  // Fieldset demos
  "fieldset-basic": {
    component: dynamic(() => import("./fieldset/basic").then((m) => m.Basic)),
    file: "cn/fieldset/basic.tsx",
  },
  "fieldset-on-surface": {
    component: dynamic(() => import("./fieldset/on-surface").then((m) => m.OnSurface)),
    file: "cn/fieldset/on-surface.tsx",
  },
  // Input demos
  "input-basic": {
    component: dynamic(() => import("./input/basic").then((m) => m.Basic)),
    file: "cn/input/basic.tsx",
  },
  "input-full-width": {
    component: dynamic(() => import("./input/full-width").then((m) => m.FullWidth)),
    file: "cn/input/full-width.tsx",
  },
  "input-types": {
    component: dynamic(() => import("./input/types").then((m) => m.Types)),
    file: "cn/input/types.tsx",
  },
  "input-controlled": {
    component: dynamic(() => import("./input/controlled").then((m) => m.Controlled)),
    file: "cn/input/controlled.tsx",
  },
  "input-on-surface": {
    component: dynamic(() => import("./input/on-surface").then((m) => m.OnSurface)),
    file: "cn/input/on-surface.tsx",
  },
  "input-variants": {
    component: dynamic(() => import("./input/variants").then((m) => m.Variants)),
    file: "cn/input/variants.tsx",
  },
  // DateField demos
  "date-field-basic": {
    component: dynamic(() => import("./date-field/basic").then((m) => m.Basic)),
    file: "cn/date-field/basic.tsx",
  },
  "date-field-controlled": {
    component: dynamic(() => import("./date-field/controlled").then((m) => m.Controlled)),
    file: "cn/date-field/controlled.tsx",
  },
  "date-field-disabled": {
    component: dynamic(() => import("./date-field/disabled").then((m) => m.Disabled)),
    file: "cn/date-field/disabled.tsx",
  },
  "date-field-form-example": {
    component: dynamic(() => import("./date-field/form-example").then((m) => m.FormExample)),
    file: "cn/date-field/form-example.tsx",
  },
  "date-field-invalid": {
    component: dynamic(() => import("./date-field/invalid").then((m) => m.Invalid)),
    file: "cn/date-field/invalid.tsx",
  },
  "date-field-on-surface": {
    component: dynamic(() => import("./date-field/on-surface").then((m) => m.OnSurface)),
    file: "cn/date-field/on-surface.tsx",
  },
  "date-field-required": {
    component: dynamic(() => import("./date-field/required").then((m) => m.Required)),
    file: "cn/date-field/required.tsx",
  },
  "date-field-with-description": {
    component: dynamic(() =>
      import("./date-field/with-description").then((m) => m.WithDescription),
    ),
    file: "cn/date-field/with-description.tsx",
  },
  "date-field-with-prefix-and-suffix": {
    component: dynamic(() =>
      import("./date-field/with-prefix-and-suffix").then((m) => m.WithPrefixAndSuffix),
    ),
    file: "cn/date-field/with-prefix-and-suffix.tsx",
  },
  "date-field-with-prefix-icon": {
    component: dynamic(() => import("./date-field/with-prefix-icon").then((m) => m.WithPrefixIcon)),
    file: "cn/date-field/with-prefix-icon.tsx",
  },
  "date-field-with-suffix-icon": {
    component: dynamic(() => import("./date-field/with-suffix-icon").then((m) => m.WithSuffixIcon)),
    file: "cn/date-field/with-suffix-icon.tsx",
  },
  "date-field-full-width": {
    component: dynamic(() => import("./date-field/full-width").then((m) => m.FullWidth)),
    file: "cn/date-field/full-width.tsx",
  },
  "date-field-granularity": {
    component: dynamic(() => import("./date-field/granularity").then((m) => m.Granularity)),
    file: "cn/date-field/granularity.tsx",
  },
  "date-field-with-validation": {
    component: dynamic(() => import("./date-field/with-validation").then((m) => m.WithValidation)),
    file: "cn/date-field/with-validation.tsx",
  },
  "date-field-variants": {
    component: dynamic(() => import("./date-field/variants").then((m) => m.Variants)),
    file: "cn/date-field/variants.tsx",
  },
  "date-field-custom-render-function": {
    component: dynamic(() =>
      import("./date-field/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/date-field/custom-render-function.tsx",
  },
  // DatePicker demos
  "date-picker-basic": {
    component: dynamic(() => import("./date-picker/basic").then((m) => m.Basic)),
    file: "cn/date-picker/basic.tsx",
  },
  "date-picker-controlled": {
    component: dynamic(() => import("./date-picker/controlled").then((m) => m.Controlled)),
    file: "cn/date-picker/controlled.tsx",
  },
  "date-picker-disabled": {
    component: dynamic(() => import("./date-picker/disabled").then((m) => m.Disabled)),
    file: "cn/date-picker/disabled.tsx",
  },
  "date-picker-format-options": {
    component: dynamic(() => import("./date-picker/format-options").then((m) => m.FormatOptions)),
    file: "cn/date-picker/format-options.tsx",
  },
  "date-picker-form-example": {
    component: dynamic(() => import("./date-picker/form-example").then((m) => m.FormExample)),
    file: "cn/date-picker/form-example.tsx",
  },
  "date-picker-with-custom-indicator": {
    component: dynamic(() =>
      import("./date-picker/with-custom-indicator").then((m) => m.WithCustomIndicator),
    ),
    file: "cn/date-picker/with-custom-indicator.tsx",
  },
  "date-picker-with-validation": {
    component: dynamic(() => import("./date-picker/with-validation").then((m) => m.WithValidation)),
    file: "cn/date-picker/with-validation.tsx",
  },
  "date-picker-international-calendar": {
    component: dynamic(() =>
      import("./date-picker/international-calendar").then((m) => m.InternationalCalendar),
    ),
    file: "cn/date-picker/international-calendar.tsx",
  },
  "date-picker-custom-render-function": {
    component: dynamic(() =>
      import("./date-picker/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/date-picker/custom-render-function.tsx",
  },
  // DateRangePicker demos
  "date-range-picker-basic": {
    component: dynamic(() => import("./date-range-picker/basic").then((m) => m.Basic)),
    file: "cn/date-range-picker/basic.tsx",
  },
  "date-range-picker-controlled": {
    component: dynamic(() => import("./date-range-picker/controlled").then((m) => m.Controlled)),
    file: "cn/date-range-picker/controlled.tsx",
  },
  "date-range-picker-disabled": {
    component: dynamic(() => import("./date-range-picker/disabled").then((m) => m.Disabled)),
    file: "cn/date-range-picker/disabled.tsx",
  },
  "date-range-picker-format-options": {
    component: dynamic(() =>
      import("./date-range-picker/format-options").then((m) => m.FormatOptions),
    ),
    file: "cn/date-range-picker/format-options.tsx",
  },
  "date-range-picker-form-example": {
    component: dynamic(() => import("./date-range-picker/form-example").then((m) => m.FormExample)),
    file: "cn/date-range-picker/form-example.tsx",
  },
  "date-range-picker-with-custom-indicator": {
    component: dynamic(() =>
      import("./date-range-picker/with-custom-indicator").then((m) => m.WithCustomIndicator),
    ),
    file: "cn/date-range-picker/with-custom-indicator.tsx",
  },
  "date-range-picker-with-validation": {
    component: dynamic(() =>
      import("./date-range-picker/with-validation").then((m) => m.WithValidation),
    ),
    file: "cn/date-range-picker/with-validation.tsx",
  },
  "date-range-picker-international-calendar": {
    component: dynamic(() =>
      import("./date-range-picker/international-calendar").then((m) => m.InternationalCalendar),
    ),
    file: "cn/date-range-picker/international-calendar.tsx",
  },
  "date-range-picker-custom-render-function": {
    component: dynamic(() =>
      import("./date-range-picker/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/date-range-picker/custom-render-function.tsx",
  },
  "date-range-picker-input-container": {
    component: dynamic(() =>
      import("./date-range-picker/input-container").then((m) => m.InputContainer),
    ),
    file: "cn/date-range-picker/input-container.tsx",
  },
  // InputOTP demos
  "input-otp-basic": {
    component: dynamic(() => import("./input-otp/basic").then((m) => m.Basic)),
    file: "cn/input-otp/basic.tsx",
  },
  "input-otp-four-digits": {
    component: dynamic(() => import("./input-otp/four-digits").then((m) => m.FourDigits)),
    file: "cn/input-otp/four-digits.tsx",
  },
  "input-otp-disabled": {
    component: dynamic(() => import("./input-otp/disabled").then((m) => m.Disabled)),
    file: "cn/input-otp/disabled.tsx",
  },
  "input-otp-with-pattern": {
    component: dynamic(() => import("./input-otp/with-pattern").then((m) => m.WithPattern)),
    file: "cn/input-otp/with-pattern.tsx",
  },
  "input-otp-controlled": {
    component: dynamic(() => import("./input-otp/controlled").then((m) => m.Controlled)),
    file: "cn/input-otp/controlled.tsx",
  },
  "input-otp-with-validation": {
    component: dynamic(() => import("./input-otp/with-validation").then((m) => m.WithValidation)),
    file: "cn/input-otp/with-validation.tsx",
  },
  "input-otp-on-complete": {
    component: dynamic(() => import("./input-otp/on-complete").then((m) => m.OnComplete)),
    file: "cn/input-otp/on-complete.tsx",
  },
  "input-otp-form-example": {
    component: dynamic(() => import("./input-otp/form-example").then((m) => m.FormExample)),
    file: "cn/input-otp/form-example.tsx",
  },
  "input-otp-on-surface": {
    component: dynamic(() => import("./input-otp/on-surface").then((m) => m.OnSurface)),
    file: "cn/input-otp/on-surface.tsx",
  },
  "input-otp-variants": {
    component: dynamic(() => import("./input-otp/variants").then((m) => m.Variants)),
    file: "cn/input-otp/variants.tsx",
  },
  // InputGroup demos
  "input-group-default": {
    component: dynamic(() => import("./input-group/default").then((m) => m.Default)),
    file: "cn/input-group/default.tsx",
  },
  "input-group-full-width": {
    component: dynamic(() => import("./input-group/full-width").then((m) => m.FullWidth)),
    file: "cn/input-group/full-width.tsx",
  },
  "input-group-with-prefix-icon": {
    component: dynamic(() =>
      import("./input-group/with-prefix-icon").then((m) => m.WithPrefixIcon),
    ),
    file: "cn/input-group/with-prefix-icon.tsx",
  },
  "input-group-with-suffix-icon": {
    component: dynamic(() =>
      import("./input-group/with-suffix-icon").then((m) => m.WithSuffixIcon),
    ),
    file: "cn/input-group/with-suffix-icon.tsx",
  },
  "input-group-with-prefix-and-suffix": {
    component: dynamic(() =>
      import("./input-group/with-prefix-and-suffix").then((m) => m.WithPrefixAndSuffix),
    ),
    file: "cn/input-group/with-prefix-and-suffix.tsx",
  },
  "input-group-with-text-prefix": {
    component: dynamic(() =>
      import("./input-group/with-text-prefix").then((m) => m.WithTextPrefix),
    ),
    file: "cn/input-group/with-text-prefix.tsx",
  },
  "input-group-with-text-suffix": {
    component: dynamic(() =>
      import("./input-group/with-text-suffix").then((m) => m.WithTextSuffix),
    ),
    file: "cn/input-group/with-text-suffix.tsx",
  },
  "input-group-with-icon-prefix-and-text-suffix": {
    component: dynamic(() =>
      import("./input-group/with-icon-prefix-and-text-suffix").then(
        (m) => m.WithIconPrefixAndTextSuffix,
      ),
    ),
    file: "cn/input-group/with-icon-prefix-and-text-suffix.tsx",
  },
  "input-group-with-copy-suffix": {
    component: dynamic(() =>
      import("./input-group/with-copy-suffix").then((m) => m.WithCopySuffix),
    ),
    file: "cn/input-group/with-copy-suffix.tsx",
  },
  "input-group-with-icon-prefix-and-copy-suffix": {
    component: dynamic(() =>
      import("./input-group/with-icon-prefix-and-copy-suffix").then(
        (m) => m.WithIconPrefixAndCopySuffix,
      ),
    ),
    file: "cn/input-group/with-icon-prefix-and-copy-suffix.tsx",
  },
  "input-group-password-with-toggle": {
    component: dynamic(() =>
      import("./input-group/password-with-toggle").then((m) => m.PasswordWithToggle),
    ),
    file: "cn/input-group/password-with-toggle.tsx",
  },
  "input-group-with-loading-suffix": {
    component: dynamic(() =>
      import("./input-group/with-loading-suffix").then((m) => m.WithLoadingSuffix),
    ),
    file: "cn/input-group/with-loading-suffix.tsx",
  },
  "input-group-with-keyboard-shortcut": {
    component: dynamic(() =>
      import("./input-group/with-keyboard-shortcut").then((m) => m.WithKeyboardShortcut),
    ),
    file: "cn/input-group/with-keyboard-shortcut.tsx",
  },
  "input-group-with-badge-suffix": {
    component: dynamic(() =>
      import("./input-group/with-badge-suffix").then((m) => m.WithBadgeSuffix),
    ),
    file: "cn/input-group/with-badge-suffix.tsx",
  },
  "input-group-required": {
    component: dynamic(() => import("./input-group/required").then((m) => m.Required)),
    file: "cn/input-group/required.tsx",
  },
  "input-group-invalid": {
    component: dynamic(() => import("./input-group/invalid").then((m) => m.Invalid)),
    file: "cn/input-group/invalid.tsx",
  },
  "input-group-disabled": {
    component: dynamic(() => import("./input-group/disabled").then((m) => m.Disabled)),
    file: "cn/input-group/disabled.tsx",
  },
  "input-group-on-surface": {
    component: dynamic(() => import("./input-group/on-surface").then((m) => m.OnSurface)),
    file: "cn/input-group/on-surface.tsx",
  },
  "input-group-with-textarea": {
    component: dynamic(() => import("./input-group/with-textarea").then((m) => m.WithTextArea)),
    file: "cn/input-group/with-textarea.tsx",
  },
  "input-group-variants": {
    component: dynamic(() => import("./input-group/variants").then((m) => m.Variants)),
    file: "cn/input-group/variants.tsx",
  },
  // Kbd demos
  "kbd-basic": {
    component: dynamic(() => import("./kbd/basic").then((m) => m.Basic)),
    file: "cn/kbd/basic.tsx",
  },
  "kbd-navigation-keys": {
    component: dynamic(() => import("./kbd/navigation").then((m) => m.NavigationKeys)),
    file: "cn/kbd/navigation.tsx",
  },
  "kbd-inline-usage": {
    component: dynamic(() => import("./kbd/inline").then((m) => m.InlineUsage)),
    file: "cn/kbd/inline.tsx",
  },
  "kbd-instructional-text": {
    component: dynamic(() => import("./kbd/instructional").then((m) => m.InstructionalText)),
    file: "cn/kbd/instructional.tsx",
  },
  "kbd-special-keys": {
    component: dynamic(() => import("./kbd/special").then((m) => m.SpecialKeys)),
    file: "cn/kbd/special.tsx",
  },
  "kbd-variants": {
    component: dynamic(() => import("./kbd/variants").then((m) => m.Variants)),
    file: "cn/kbd/variants.tsx",
  },
  // Link demos
  "link-basic": {
    component: dynamic(() => import("./link/basic").then((m) => m.LinkBasic)),
    file: "cn/link/basic.tsx",
  },
  "link-custom-icon": {
    component: dynamic(() => import("./link/custom-icon").then((m) => m.LinkCustomIcon)),
    file: "cn/link/custom-icon.tsx",
  },
  "link-icon-placement": {
    component: dynamic(() => import("./link/icon-placement").then((m) => m.LinkIconPlacement)),
    file: "cn/link/icon-placement.tsx",
  },
  "link-underline-and-offset": {
    component: dynamic(() =>
      import("./link/underline-and-offset").then((m) => m.LinkUnderlineAndOffset),
    ),
    file: "cn/link/underline-and-offset.tsx",
  },
  "link-custom-render-function": {
    component: dynamic(() =>
      import("./link/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/link/custom-render-function.tsx",
  },
  // RadioGroup demos
  "radio-group-basic": {
    component: dynamic(() => import("./radio-group/basic").then((m) => m.Basic)),
    file: "cn/radio-group/basic.tsx",
  },
  "radio-group-controlled": {
    component: dynamic(() => import("./radio-group/controlled").then((m) => m.Controlled)),
    file: "cn/radio-group/controlled.tsx",
  },
  "radio-group-custom-indicator": {
    component: dynamic(() =>
      import("./radio-group/custom-indicator").then((m) => m.CustomIndicator),
    ),
    file: "cn/radio-group/custom-indicator.tsx",
  },
  "radio-group-delivery-and-payment": {
    component: dynamic(() =>
      import("./radio-group/delivery-and-payment").then((m) => m.DeliveryAndPayment),
    ),
    file: "cn/radio-group/delivery-and-payment.tsx",
  },
  "radio-group-disabled": {
    component: dynamic(() => import("./radio-group/disabled").then((m) => m.Disabled)),
    file: "cn/radio-group/disabled.tsx",
  },
  "radio-group-horizontal": {
    component: dynamic(() => import("./radio-group/horizontal").then((m) => m.Horizontal)),
    file: "cn/radio-group/horizontal.tsx",
  },
  "radio-group-uncontrolled": {
    component: dynamic(() => import("./radio-group/uncontrolled").then((m) => m.Uncontrolled)),
    file: "cn/radio-group/uncontrolled.tsx",
  },
  "radio-group-validation": {
    component: dynamic(() => import("./radio-group/validation").then((m) => m.Validation)),
    file: "cn/radio-group/validation.tsx",
  },
  "radio-group-on-surface": {
    component: dynamic(() => import("./radio-group/on-surface").then((m) => m.OnSurface)),
    file: "cn/radio-group/on-surface.tsx",
  },
  "radio-group-variants": {
    component: dynamic(() => import("./radio-group/variants").then((m) => m.Variants)),
    file: "cn/radio-group/variants.tsx",
  },
  "radio-group-custom-render-function": {
    component: dynamic(() =>
      import("./radio-group/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/radio-group/custom-render-function.tsx",
  },
  // Skeleton demos
  "skeleton-basic": {
    component: dynamic(() => import("./skeleton/basic").then((m) => m.Basic)),
    file: "cn/skeleton/basic.tsx",
  },
  "skeleton-text-content": {
    component: dynamic(() => import("./skeleton/text-content").then((m) => m.TextContent)),
    file: "cn/skeleton/text-content.tsx",
  },
  "skeleton-user-profile": {
    component: dynamic(() => import("./skeleton/user-profile").then((m) => m.UserProfile)),
    file: "cn/skeleton/user-profile.tsx",
  },
  "skeleton-list": {
    component: dynamic(() => import("./skeleton/list").then((m) => m.List)),
    file: "cn/skeleton/list.tsx",
  },
  "skeleton-animation-types": {
    component: dynamic(() => import("./skeleton/animation-types").then((m) => m.AnimationTypes)),
    file: "cn/skeleton/animation-types.tsx",
  },
  "skeleton-grid": {
    component: dynamic(() => import("./skeleton/grid").then((m) => m.Grid)),
    file: "cn/skeleton/grid.tsx",
  },
  "skeleton-single-shimmer": {
    component: dynamic(() => import("./skeleton/single-shimmer").then((m) => m.SingleShimmer)),
    file: "cn/skeleton/single-shimmer.tsx",
  },
  // Separator demos
  "separator-basic": {
    component: dynamic(() => import("./separator/basic").then((m) => m.Basic)),
    file: "cn/separator/basic.tsx",
  },
  "separator-vertical": {
    component: dynamic(() => import("./separator/vertical").then((m) => m.Vertical)),
    file: "cn/separator/vertical.tsx",
  },
  "separator-with-content": {
    component: dynamic(() => import("./separator/with-content").then((m) => m.WithContent)),
    file: "cn/separator/with-content.tsx",
  },
  "separator-variants": {
    component: dynamic(() => import("./separator/variants").then((m) => m.Variants)),
    file: "cn/separator/variants.tsx",
  },
  "separator-with-surface": {
    component: dynamic(() => import("./separator/with-surface").then((m) => m.WithSurface)),
    file: "cn/separator/with-surface.tsx",
  },
  "separator-manual-variant-override": {
    component: dynamic(() =>
      import("./separator/manual-variant-override").then((m) => m.ManualVariantOverride),
    ),
    file: "cn/separator/manual-variant-override.tsx",
  },
  "separator-custom-render-function": {
    component: dynamic(() =>
      import("./separator/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/separator/custom-render-function.tsx",
  },
  // Spinner demos
  "spinner-basic": {
    component: dynamic(() => import("./spinner/basic").then((m) => m.SpinnerBasic)),
    file: "cn/spinner/basic.tsx",
  },
  "spinner-colors": {
    component: dynamic(() => import("./spinner/colors").then((m) => m.SpinnerColors)),
    file: "cn/spinner/colors.tsx",
  },
  "spinner-sizes": {
    component: dynamic(() => import("./spinner/sizes").then((m) => m.SpinnerSizes)),
    file: "cn/spinner/sizes.tsx",
  },
  // Surface demos
  "surface-variants": {
    component: dynamic(() => import("./surface/variants").then((m) => m.Variants)),
    file: "cn/surface/variants.tsx",
  },
  // Switch demos
  "switch-basic": {
    component: dynamic(() => import("./switch/basic").then((m) => m.Basic)),
    file: "cn/switch/basic.tsx",
  },
  "switch-disabled": {
    component: dynamic(() => import("./switch/disabled").then((m) => m.Disabled)),
    file: "cn/switch/disabled.tsx",
  },
  "switch-default-selected": {
    component: dynamic(() => import("./switch/default-selected").then((m) => m.DefaultSelected)),
    file: "cn/switch/default-selected.tsx",
  },
  "switch-controlled": {
    component: dynamic(() => import("./switch/controlled").then((m) => m.Controlled)),
    file: "cn/switch/controlled.tsx",
  },
  "switch-without-label": {
    component: dynamic(() => import("./switch/without-label").then((m) => m.WithoutLabel)),
    file: "cn/switch/without-label.tsx",
  },
  "switch-sizes": {
    component: dynamic(() => import("./switch/sizes").then((m) => m.Sizes)),
    file: "cn/switch/sizes.tsx",
  },
  "switch-label-position": {
    component: dynamic(() => import("./switch/label-position").then((m) => m.LabelPosition)),
    file: "cn/switch/label-position.tsx",
  },
  "switch-with-icons": {
    component: dynamic(() => import("./switch/with-icons").then((m) => m.WithIcons)),
    file: "cn/switch/with-icons.tsx",
  },
  "switch-with-description": {
    component: dynamic(() => import("./switch/with-description").then((m) => m.WithDescription)),
    file: "cn/switch/with-description.tsx",
  },
  "switch-group": {
    component: dynamic(() => import("./switch/group").then((m) => m.Group)),
    file: "cn/switch/group.tsx",
  },
  "switch-group-horizontal": {
    component: dynamic(() => import("./switch/group-horizontal").then((m) => m.GroupHorizontal)),
    file: "cn/switch/group-horizontal.tsx",
  },
  "switch-render-props": {
    component: dynamic(() => import("./switch/render-props").then((m) => m.RenderProps)),
    file: "cn/switch/render-props.tsx",
  },
  "switch-form": {
    component: dynamic(() => import("./switch/form").then((m) => m.Form)),
    file: "cn/switch/form.tsx",
  },
  "switch-custom-styles": {
    component: dynamic(() => import("./switch/custom-styles").then((m) => m.CustomStyles)),
    file: "cn/switch/custom-styles.tsx",
  },
  "switch-custom-render-function": {
    component: dynamic(() =>
      import("./switch/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/switch/custom-render-function.tsx",
  },
  // Tabs demos
  "tabs-basic": {
    component: dynamic(() => import("./tabs/basic").then((m) => m.Basic)),
    file: "cn/tabs/basic.tsx",
  },
  "tabs-vertical": {
    component: dynamic(() => import("./tabs/vertical").then((m) => m.Vertical)),
    file: "cn/tabs/vertical.tsx",
  },
  "tabs-disabled": {
    component: dynamic(() => import("./tabs/disabled").then((m) => m.Disabled)),
    file: "cn/tabs/disabled.tsx",
  },
  "tabs-custom-styles": {
    component: dynamic(() => import("./tabs/custom-styles").then((m) => m.CustomStyles)),
    file: "cn/tabs/custom-styles.tsx",
  },
  "tabs-with-separator": {
    component: dynamic(() => import("./tabs/with-separator").then((m) => m.WithSeparator)),
    file: "cn/tabs/with-separator.tsx",
  },
  "tabs-secondary": {
    component: dynamic(() => import("./tabs/secondary").then((m) => m.Secondary)),
    file: "cn/tabs/secondary.tsx",
  },
  "tabs-secondary-vertical": {
    component: dynamic(() => import("./tabs/secondary-vertical").then((m) => m.SecondaryVertical)),
    file: "cn/tabs/secondary-vertical.tsx",
  },
  "tabs-custom-render-function": {
    component: dynamic(() =>
      import("./tabs/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/tabs/custom-render-function.tsx",
  },
  // TagGroup demos
  "tag-group-basic": {
    component: dynamic(() => import("./tag-group/basic").then((m) => m.TagGroupBasic)),
    file: "cn/tag-group/basic.tsx",
  },
  "tag-group-sizes": {
    component: dynamic(() => import("./tag-group/sizes").then((m) => m.TagGroupSizes)),
    file: "cn/tag-group/sizes.tsx",
  },
  "tag-group-variants": {
    component: dynamic(() => import("./tag-group/variants").then((m) => m.TagGroupVariants)),
    file: "cn/tag-group/variants.tsx",
  },
  "tag-group-disabled": {
    component: dynamic(() => import("./tag-group/disabled").then((m) => m.TagGroupDisabled)),
    file: "cn/tag-group/disabled.tsx",
  },
  "tag-group-selection-modes": {
    component: dynamic(() =>
      import("./tag-group/selection-modes").then((m) => m.TagGroupSelectionModes),
    ),
    file: "cn/tag-group/selection-modes.tsx",
  },
  "tag-group-controlled": {
    component: dynamic(() => import("./tag-group/controlled").then((m) => m.TagGroupControlled)),
    file: "cn/tag-group/controlled.tsx",
  },
  "tag-group-with-error-message": {
    component: dynamic(() =>
      import("./tag-group/with-error-message").then((m) => m.TagGroupWithErrorMessage),
    ),
    file: "cn/tag-group/with-error-message.tsx",
  },
  "tag-group-with-prefix": {
    component: dynamic(() => import("./tag-group/with-prefix").then((m) => m.TagGroupWithPrefix)),
    file: "cn/tag-group/with-prefix.tsx",
  },
  "tag-group-with-remove-button": {
    component: dynamic(() =>
      import("./tag-group/with-remove-button").then((m) => m.TagGroupWithRemoveButton),
    ),
    file: "cn/tag-group/with-remove-button.tsx",
  },
  "tag-group-with-list-data": {
    component: dynamic(() =>
      import("./tag-group/with-list-data").then((m) => m.TagGroupWithListData),
    ),
    file: "cn/tag-group/with-list-data.tsx",
  },
  "tag-group-custom-render-function": {
    component: dynamic(() =>
      import("./tag-group/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/tag-group/custom-render-function.tsx",
  },
  // Table demos
  "table-basic": {
    component: dynamic(() => import("./table/basic").then((m) => m.Basic)),
    file: "cn/table/basic.tsx",
  },
  "table-secondary-variant": {
    component: dynamic(() => import("./table/secondary-variant").then((m) => m.SecondaryVariant)),
    file: "cn/table/secondary-variant.tsx",
  },
  "table-sorting": {
    component: dynamic(() => import("./table/sorting").then((m) => m.Sorting)),
    file: "cn/table/sorting.tsx",
  },
  "table-selection": {
    component: dynamic(() => import("./table/selection").then((m) => m.SelectionDemo)),
    file: "cn/table/selection.tsx",
  },
  "table-custom-cells": {
    component: dynamic(() => import("./table/custom-cells").then((m) => m.CustomCells)),
    file: "cn/table/custom-cells.tsx",
  },
  "table-expandable-rows": {
    component: dynamic(() => import("./table/expandable-rows").then((m) => m.ExpandableRows)),
    file: "cn/table/expandable-rows.tsx",
  },
  "table-pagination": {
    component: dynamic(() => import("./table/pagination").then((m) => m.PaginationDemo)),
    file: "cn/table/pagination.tsx",
  },
  "table-column-resizing": {
    component: dynamic(() => import("./table/column-resizing").then((m) => m.ColumnResizing)),
    file: "cn/table/column-resizing.tsx",
  },
  "table-empty-state": {
    component: dynamic(() => import("./table/empty-state").then((m) => m.EmptyStateDemo)),
    file: "cn/table/empty-state.tsx",
  },
  "table-async-loading": {
    component: dynamic(() => import("./table/async-loading").then((m) => m.AsyncLoading)),
    file: "cn/table/async-loading.tsx",
  },
  "table-virtualization": {
    component: dynamic(() => import("./table/virtualization").then((m) => m.Virtualization)),
    file: "cn/table/virtualization.tsx",
  },
  "table-tanstack-table": {
    component: dynamic(() => import("./table/tanstack-table").then((m) => m.TanstackTable)),
    file: "cn/table/tanstack-table.tsx",
  },
  // TextArea demos
  "textarea-basic": {
    component: dynamic(() => import("./textarea/basic").then((m) => m.Basic)),
    file: "cn/textarea/basic.tsx",
  },
  "textarea-full-width": {
    component: dynamic(() => import("./textarea/full-width").then((m) => m.FullWidth)),
    file: "cn/textarea/full-width.tsx",
  },
  "textarea-rows": {
    component: dynamic(() => import("./textarea/rows").then((m) => m.Rows)),
    file: "cn/textarea/rows.tsx",
  },
  "textarea-controlled": {
    component: dynamic(() => import("./textarea/controlled").then((m) => m.Controlled)),
    file: "cn/textarea/controlled.tsx",
  },
  "textarea-on-surface": {
    component: dynamic(() => import("./textarea/on-surface").then((m) => m.OnSurface)),
    file: "cn/textarea/on-surface.tsx",
  },
  "textarea-variants": {
    component: dynamic(() => import("./textarea/variants").then((m) => m.Variants)),
    file: "cn/textarea/variants.tsx",
  },
  // Typography demos
  "typography-default": {
    component: dynamic(() => import("./typography/default").then((m) => m.Default)),
    file: "cn/typography/default.tsx",
  },
  "typography-primitives": {
    component: dynamic(() => import("./typography/primitives").then((m) => m.Primitives)),
    file: "cn/typography/primitives.tsx",
  },
  "typography-prose": {
    component: dynamic(() => import("./typography/prose").then((m) => m.Prose)),
    file: "cn/typography/prose.tsx",
  },
  "typography-render-props": {
    component: dynamic(() => import("./typography/render-props").then((m) => m.RenderProps)),
    file: "cn/typography/render-props.tsx",
  },
  "typography-typography-scale": {
    component: dynamic(() =>
      import("./typography/typography-scale").then((m) => m.TypographyScale),
    ),
    file: "cn/typography/typography-scale.tsx",
  },
  // TextField demos
  "textfield-basic": {
    component: dynamic(() => import("./textfield/basic").then((m) => m.Basic)),
    file: "cn/textfield/basic.tsx",
  },
  "textfield-with-description": {
    component: dynamic(() => import("./textfield/with-description").then((m) => m.WithDescription)),
    file: "cn/textfield/with-description.tsx",
  },
  "textfield-required": {
    component: dynamic(() => import("./textfield/required").then((m) => m.Required)),
    file: "cn/textfield/required.tsx",
  },
  "textfield-with-error": {
    component: dynamic(() => import("./textfield/with-error").then((m) => m.WithError)),
    file: "cn/textfield/with-error.tsx",
  },
  "textfield-disabled": {
    component: dynamic(() => import("./textfield/disabled").then((m) => m.Disabled)),
    file: "cn/textfield/disabled.tsx",
  },
  "textfield-textarea": {
    component: dynamic(() => import("./textfield/textarea").then((m) => m.TextAreaExample)),
    file: "cn/textfield/textarea.tsx",
  },
  "textfield-input-types": {
    component: dynamic(() => import("./textfield/input-types").then((m) => m.InputTypes)),
    file: "cn/textfield/input-types.tsx",
  },
  "textfield-full-width": {
    component: dynamic(() => import("./textfield/full-width").then((m) => m.FullWidth)),
    file: "cn/textfield/full-width.tsx",
  },
  "textfield-controlled": {
    component: dynamic(() => import("./textfield/controlled").then((m) => m.Controlled)),
    file: "cn/textfield/controlled.tsx",
  },
  "textfield-validation": {
    component: dynamic(() => import("./textfield/validation").then((m) => m.Validation)),
    file: "cn/textfield/validation.tsx",
  },
  "textfield-on-surface": {
    component: dynamic(() => import("./textfield/on-surface").then((m) => m.OnSurface)),
    file: "cn/textfield/on-surface.tsx",
  },
  "textfield-custom-render-function": {
    component: dynamic(() =>
      import("./textfield/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/textfield/custom-render-function.tsx",
  },
  // TimeField demos
  "time-field-basic": {
    component: dynamic(() => import("./time-field/basic").then((m) => m.Basic)),
    file: "cn/time-field/basic.tsx",
  },
  "time-field-controlled": {
    component: dynamic(() => import("./time-field/controlled").then((m) => m.Controlled)),
    file: "cn/time-field/controlled.tsx",
  },
  "time-field-disabled": {
    component: dynamic(() => import("./time-field/disabled").then((m) => m.Disabled)),
    file: "cn/time-field/disabled.tsx",
  },
  "time-field-form-example": {
    component: dynamic(() => import("./time-field/form-example").then((m) => m.FormExample)),
    file: "cn/time-field/form-example.tsx",
  },
  "time-field-invalid": {
    component: dynamic(() => import("./time-field/invalid").then((m) => m.Invalid)),
    file: "cn/time-field/invalid.tsx",
  },
  "time-field-on-surface": {
    component: dynamic(() => import("./time-field/on-surface").then((m) => m.OnSurface)),
    file: "cn/time-field/on-surface.tsx",
  },
  "time-field-required": {
    component: dynamic(() => import("./time-field/required").then((m) => m.Required)),
    file: "cn/time-field/required.tsx",
  },
  "time-field-with-description": {
    component: dynamic(() =>
      import("./time-field/with-description").then((m) => m.WithDescription),
    ),
    file: "cn/time-field/with-description.tsx",
  },
  "time-field-with-prefix-and-suffix": {
    component: dynamic(() =>
      import("./time-field/with-prefix-and-suffix").then((m) => m.WithPrefixAndSuffix),
    ),
    file: "cn/time-field/with-prefix-and-suffix.tsx",
  },
  "time-field-with-prefix-icon": {
    component: dynamic(() => import("./time-field/with-prefix-icon").then((m) => m.WithPrefixIcon)),
    file: "cn/time-field/with-prefix-icon.tsx",
  },
  "time-field-with-suffix-icon": {
    component: dynamic(() => import("./time-field/with-suffix-icon").then((m) => m.WithSuffixIcon)),
    file: "cn/time-field/with-suffix-icon.tsx",
  },
  "time-field-full-width": {
    component: dynamic(() => import("./time-field/full-width").then((m) => m.FullWidth)),
    file: "cn/time-field/full-width.tsx",
  },
  "time-field-with-validation": {
    component: dynamic(() => import("./time-field/with-validation").then((m) => m.WithValidation)),
    file: "cn/time-field/with-validation.tsx",
  },
  "time-field-custom-render-function": {
    component: dynamic(() =>
      import("./time-field/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/time-field/custom-render-function.tsx",
  },
  // Toast demos
  "toast-default": {
    component: dynamic(() => import("./toast/default").then((m) => m.Default)),
    file: "cn/toast/default.tsx",
  },
  "toast-simple": {
    component: dynamic(() => import("./toast/simple").then((m) => m.Simple)),
    file: "cn/toast/simple.tsx",
  },
  "toast-variants": {
    component: dynamic(() => import("./toast/variants").then((m) => m.Variants)),
    file: "cn/toast/variants.tsx",
  },
  "toast-custom-indicator": {
    component: dynamic(() => import("./toast/custom-indicator").then((m) => m.CustomIndicator)),
    file: "cn/toast/custom-indicator.tsx",
  },
  "toast-promise": {
    component: dynamic(() => import("./toast/promise").then((m) => m.PromiseDemo)),
    file: "cn/toast/promise.tsx",
  },
  "toast-callbacks": {
    component: dynamic(() => import("./toast/callbacks").then((m) => m.Callbacks)),
    file: "cn/toast/callbacks.tsx",
  },
  "toast-placements": {
    component: dynamic(() => import("./toast/placements").then((m) => m.Placements)),
    file: "cn/toast/placements.tsx",
  },
  "toast-custom-toast": {
    component: dynamic(() => import("./toast/custom-toast").then((m) => m.CustomToast)),
    file: "cn/toast/custom-toast.tsx",
  },
  "toast-custom-queue": {
    component: dynamic(() => import("./toast/custom-queue").then((m) => m.CustomQueue)),
    file: "cn/toast/custom-queue.tsx",
  },
  // ToggleButton demos
  "toggle-button-basic": {
    component: dynamic(() => import("./toggle-button/basic").then((m) => m.Basic)),
    file: "cn/toggle-button/basic.tsx",
  },
  "toggle-button-variants": {
    component: dynamic(() => import("./toggle-button/variants").then((m) => m.Variants)),
    file: "cn/toggle-button/variants.tsx",
  },
  "toggle-button-sizes": {
    component: dynamic(() => import("./toggle-button/sizes").then((m) => m.Sizes)),
    file: "cn/toggle-button/sizes.tsx",
  },
  "toggle-button-icon-only": {
    component: dynamic(() => import("./toggle-button/icon-only").then((m) => m.IconOnly)),
    file: "cn/toggle-button/icon-only.tsx",
  },
  "toggle-button-controlled": {
    component: dynamic(() => import("./toggle-button/controlled").then((m) => m.Controlled)),
    file: "cn/toggle-button/controlled.tsx",
  },
  "toggle-button-disabled": {
    component: dynamic(() => import("./toggle-button/disabled").then((m) => m.Disabled)),
    file: "cn/toggle-button/disabled.tsx",
  },
  // ToggleButtonGroup demos
  "toggle-button-group-basic": {
    component: dynamic(() => import("./toggle-button-group/basic").then((m) => m.Basic)),
    file: "cn/toggle-button-group/basic.tsx",
  },
  "toggle-button-group-sizes": {
    component: dynamic(() => import("./toggle-button-group/sizes").then((m) => m.Sizes)),
    file: "cn/toggle-button-group/sizes.tsx",
  },
  "toggle-button-group-orientation": {
    component: dynamic(() =>
      import("./toggle-button-group/orientation").then((m) => m.Orientation),
    ),
    file: "cn/toggle-button-group/orientation.tsx",
  },
  "toggle-button-group-attached": {
    component: dynamic(() => import("./toggle-button-group/attached").then((m) => m.Attached)),
    file: "cn/toggle-button-group/attached.tsx",
  },
  "toggle-button-group-full-width": {
    component: dynamic(() => import("./toggle-button-group/full-width").then((m) => m.FullWidth)),
    file: "cn/toggle-button-group/full-width.tsx",
  },
  "toggle-button-group-selection-mode": {
    component: dynamic(() =>
      import("./toggle-button-group/selection-mode").then((m) => m.SelectionMode),
    ),
    file: "cn/toggle-button-group/selection-mode.tsx",
  },
  "toggle-button-group-controlled": {
    component: dynamic(() => import("./toggle-button-group/controlled").then((m) => m.Controlled)),
    file: "cn/toggle-button-group/controlled.tsx",
  },
  "toggle-button-group-disabled": {
    component: dynamic(() => import("./toggle-button-group/disabled").then((m) => m.Disabled)),
    file: "cn/toggle-button-group/disabled.tsx",
  },
  "toggle-button-group-without-separator": {
    component: dynamic(() =>
      import("./toggle-button-group/without-separator").then((m) => m.WithoutSeparator),
    ),
    file: "cn/toggle-button-group/without-separator.tsx",
  },
  // Toolbar demos
  "toolbar-basic": {
    component: dynamic(() => import("./toolbar/basic").then((m) => m.Basic)),
    file: "cn/toolbar/basic.tsx",
  },
  "toolbar-vertical": {
    component: dynamic(() => import("./toolbar/vertical").then((m) => m.Vertical)),
    file: "cn/toolbar/vertical.tsx",
  },
  "toolbar-with-button-group": {
    component: dynamic(() => import("./toolbar/with-button-group").then((m) => m.WithButtonGroup)),
    file: "cn/toolbar/with-button-group.tsx",
  },
  "toolbar-attached": {
    component: dynamic(() => import("./toolbar/custom-styles").then((m) => m.Attached)),
    file: "cn/toolbar/custom-styles.tsx",
  },
  // Tooltip demos
  "tooltip-basic": {
    component: dynamic(() => import("./tooltip/basic").then((m) => m.TooltipBasic)),
    file: "cn/tooltip/basic.tsx",
  },
  "tooltip-with-arrow": {
    component: dynamic(() => import("./tooltip/with-arrow").then((m) => m.TooltipWithArrow)),
    file: "cn/tooltip/with-arrow.tsx",
  },
  "tooltip-placement": {
    component: dynamic(() => import("./tooltip/placement").then((m) => m.TooltipPlacement)),
    file: "cn/tooltip/placement.tsx",
  },
  "tooltip-custom-trigger": {
    component: dynamic(() =>
      import("./tooltip/custom-trigger").then((m) => m.TooltipCustomTrigger),
    ),
    file: "cn/tooltip/custom-trigger.tsx",
  },
  "tooltip-custom-render-function": {
    component: dynamic(() =>
      import("./tooltip/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/tooltip/custom-render-function.tsx",
  },
  // Popover demos
  "popover-basic": {
    component: dynamic(() => import("./popover/basic").then((m) => m.PopoverBasic)),
    file: "cn/popover/basic.tsx",
  },
  "popover-with-arrow": {
    component: dynamic(() => import("./popover/with-arrow").then((m) => m.PopoverWithArrow)),
    file: "cn/popover/with-arrow.tsx",
  },
  "popover-placement": {
    component: dynamic(() => import("./popover/placement").then((m) => m.PopoverPlacement)),
    file: "cn/popover/placement.tsx",
  },
  "popover-interactive": {
    component: dynamic(() => import("./popover/interactive").then((m) => m.PopoverInteractive)),
    file: "cn/popover/interactive.tsx",
  },
  "popover-custom-render-function": {
    component: dynamic(() =>
      import("./popover/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/popover/custom-render-function.tsx",
  },
  // Label demos
  "label-basic": {
    component: dynamic(() => import("./label/basic").then((m) => m.Basic)),
    file: "cn/label/basic.tsx",
  },
  // ListBox demos
  "list-box-controlled": {
    component: dynamic(() => import("./list-box/controlled").then((m) => m.Controlled)),
    file: "cn/list-box/controlled.tsx",
  },
  "list-box-custom-check-icon": {
    component: dynamic(() => import("./list-box/custom-check-icon").then((m) => m.CustomCheckIcon)),
    file: "cn/list-box/custom-check-icon.tsx",
  },
  "list-box-default": {
    component: dynamic(() => import("./list-box/default").then((m) => m.Default)),
    file: "cn/list-box/default.tsx",
  },
  "list-box-multi-select": {
    component: dynamic(() => import("./list-box/multi-select").then((m) => m.MultiSelect)),
    file: "cn/list-box/multi-select.tsx",
  },
  "list-box-scrollbar-modes": {
    component: dynamic(() => import("./list-box/scrollbar-modes").then((m) => m.ScrollbarModes)),
    file: "cn/list-box/scrollbar-modes.tsx",
  },
  "list-box-with-disabled-items": {
    component: dynamic(() =>
      import("./list-box/with-disabled-items").then((m) => m.WithDisabledItems),
    ),
    file: "cn/list-box/with-disabled-items.tsx",
  },
  "list-box-with-sections": {
    component: dynamic(() => import("./list-box/with-sections").then((m) => m.WithSections)),
    file: "cn/list-box/with-sections.tsx",
  },
  "list-box-custom-render-function": {
    component: dynamic(() =>
      import("./list-box/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/list-box/custom-render-function.tsx",
  },
  "list-box-virtualization": {
    component: dynamic(() => import("./list-box/virtualization").then((m) => m.Virtualization)),
    file: "cn/list-box/virtualization.tsx",
  },
  // Meter demos
  "meter-basic": {
    component: dynamic(() => import("./meter/basic").then((m) => m.Basic)),
    file: "cn/meter/basic.tsx",
  },
  "meter-sizes": {
    component: dynamic(() => import("./meter/sizes").then((m) => m.Sizes)),
    file: "cn/meter/sizes.tsx",
  },
  "meter-colors": {
    component: dynamic(() => import("./meter/colors").then((m) => m.Colors)),
    file: "cn/meter/colors.tsx",
  },
  "meter-custom-value": {
    component: dynamic(() => import("./meter/custom-value").then((m) => m.CustomValue)),
    file: "cn/meter/custom-value.tsx",
  },
  "meter-without-label": {
    component: dynamic(() => import("./meter/without-label").then((m) => m.WithoutLabel)),
    file: "cn/meter/without-label.tsx",
  },
  // ProgressBar demos
  "progress-bar-basic": {
    component: dynamic(() => import("./progress-bar/basic").then((m) => m.Basic)),
    file: "cn/progress-bar/basic.tsx",
  },
  "progress-bar-sizes": {
    component: dynamic(() => import("./progress-bar/sizes").then((m) => m.Sizes)),
    file: "cn/progress-bar/sizes.tsx",
  },
  "progress-bar-colors": {
    component: dynamic(() => import("./progress-bar/colors").then((m) => m.Colors)),
    file: "cn/progress-bar/colors.tsx",
  },
  "progress-bar-indeterminate": {
    component: dynamic(() => import("./progress-bar/indeterminate").then((m) => m.Indeterminate)),
    file: "cn/progress-bar/indeterminate.tsx",
  },
  "progress-bar-custom-value": {
    component: dynamic(() => import("./progress-bar/custom-value").then((m) => m.CustomValue)),
    file: "cn/progress-bar/custom-value.tsx",
  },
  "progress-bar-without-label": {
    component: dynamic(() => import("./progress-bar/without-label").then((m) => m.WithoutLabel)),
    file: "cn/progress-bar/without-label.tsx",
  },
  // ProgressCircle demos
  "progress-circle-basic": {
    component: dynamic(() => import("./progress-circle/basic").then((m) => m.Basic)),
    file: "cn/progress-circle/basic.tsx",
  },
  "progress-circle-sizes": {
    component: dynamic(() => import("./progress-circle/sizes").then((m) => m.Sizes)),
    file: "cn/progress-circle/sizes.tsx",
  },
  "progress-circle-colors": {
    component: dynamic(() => import("./progress-circle/colors").then((m) => m.Colors)),
    file: "cn/progress-circle/colors.tsx",
  },
  "progress-circle-indeterminate": {
    component: dynamic(() =>
      import("./progress-circle/indeterminate").then((m) => m.Indeterminate),
    ),
    file: "cn/progress-circle/indeterminate.tsx",
  },
  "progress-circle-with-label": {
    component: dynamic(() => import("./progress-circle/with-label").then((m) => m.WithLabel)),
    file: "cn/progress-circle/with-label.tsx",
  },
  "progress-circle-custom-svg": {
    component: dynamic(() => import("./progress-circle/custom-svg").then((m) => m.CustomSvg)),
    file: "cn/progress-circle/custom-svg.tsx",
  },
  // Modal demos
  "modal-default": {
    component: dynamic(() => import("./modal/default").then((m) => m.Default)),
    file: "cn/modal/default.tsx",
  },
  "modal-placements": {
    component: dynamic(() => import("./modal/placements").then((m) => m.Placements)),
    file: "cn/modal/placements.tsx",
  },
  "modal-backdrop-variants": {
    component: dynamic(() => import("./modal/backdrop-variants").then((m) => m.BackdropVariants)),
    file: "cn/modal/backdrop-variants.tsx",
  },
  "modal-scroll-comparison": {
    component: dynamic(() => import("./modal/scroll-comparison").then((m) => m.ScrollComparison)),
    file: "cn/modal/scroll-comparison.tsx",
  },
  "modal-dismiss-behavior": {
    component: dynamic(() => import("./modal/dismiss-behavior").then((m) => m.DismissBehavior)),
    file: "cn/modal/dismiss-behavior.tsx",
  },
  "modal-with-form": {
    component: dynamic(() => import("./modal/with-form").then((m) => m.WithForm)),
    file: "cn/modal/with-form.tsx",
  },
  "modal-controlled": {
    component: dynamic(() => import("./modal/controlled").then((m) => m.Controlled)),
    file: "cn/modal/controlled.tsx",
  },
  "modal-custom-trigger": {
    component: dynamic(() => import("./modal/custom-trigger").then((m) => m.CustomTrigger)),
    file: "cn/modal/custom-trigger.tsx",
  },
  "modal-custom-backdrop": {
    component: dynamic(() => import("./modal/custom-backdrop").then((m) => m.CustomBackdrop)),
    file: "cn/modal/custom-backdrop.tsx",
  },
  "modal-custom-animations": {
    component: dynamic(() => import("./modal/custom-animations").then((m) => m.CustomAnimations)),
    file: "cn/modal/custom-animations.tsx",
  },
  "modal-sizes": {
    component: dynamic(() => import("./modal/sizes").then((m) => m.Sizes)),
    file: "cn/modal/sizes.tsx",
  },
  "modal-close-methods": {
    component: dynamic(() => import("./modal/close-methods").then((m) => m.CloseMethods)),
    file: "cn/modal/close-methods.tsx",
  },
  "modal-custom-portal": {
    component: dynamic(() => import("./modal/custom-portal").then((m) => m.CustomPortal)),
    file: "cn/modal/custom-portal.tsx",
  },
  // NumberField demos
  "number-field-basic": {
    component: dynamic(() => import("./number-field/basic").then((m) => m.Basic)),
    file: "cn/number-field/basic.tsx",
  },
  "number-field-with-description": {
    component: dynamic(() =>
      import("./number-field/with-description").then((m) => m.WithDescription),
    ),
    file: "cn/number-field/with-description.tsx",
  },
  "number-field-required": {
    component: dynamic(() => import("./number-field/required").then((m) => m.Required)),
    file: "cn/number-field/required.tsx",
  },
  "number-field-validation": {
    component: dynamic(() => import("./number-field/validation").then((m) => m.Validation)),
    file: "cn/number-field/validation.tsx",
  },
  "number-field-disabled": {
    component: dynamic(() => import("./number-field/disabled").then((m) => m.Disabled)),
    file: "cn/number-field/disabled.tsx",
  },
  "number-field-full-width": {
    component: dynamic(() => import("./number-field/full-width").then((m) => m.FullWidth)),
    file: "cn/number-field/full-width.tsx",
  },
  "number-field-controlled": {
    component: dynamic(() => import("./number-field/controlled").then((m) => m.Controlled)),
    file: "cn/number-field/controlled.tsx",
  },
  "number-field-with-validation": {
    component: dynamic(() =>
      import("./number-field/with-validation").then((m) => m.WithValidation),
    ),
    file: "cn/number-field/with-validation.tsx",
  },
  "number-field-with-step": {
    component: dynamic(() => import("./number-field/with-step").then((m) => m.WithStep)),
    file: "cn/number-field/with-step.tsx",
  },
  "number-field-with-format-options": {
    component: dynamic(() =>
      import("./number-field/with-format-options").then((m) => m.WithFormatOptions),
    ),
    file: "cn/number-field/with-format-options.tsx",
  },
  "number-field-custom-icons": {
    component: dynamic(() => import("./number-field/custom-icons").then((m) => m.CustomIcons)),
    file: "cn/number-field/custom-icons.tsx",
  },
  "number-field-on-surface": {
    component: dynamic(() => import("./number-field/on-surface").then((m) => m.OnSurface)),
    file: "cn/number-field/on-surface.tsx",
  },
  "number-field-with-chevrons": {
    component: dynamic(() => import("./number-field/with-chevrons").then((m) => m.WithChevrons)),
    file: "cn/number-field/with-chevrons.tsx",
  },
  "number-field-form-example": {
    component: dynamic(() => import("./number-field/form-example").then((m) => m.FormExample)),
    file: "cn/number-field/form-example.tsx",
  },
  "number-field-variants": {
    component: dynamic(() => import("./number-field/variants").then((m) => m.Variants)),
    file: "cn/number-field/variants.tsx",
  },
  "number-field-custom-render-function": {
    component: dynamic(() =>
      import("./number-field/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/number-field/custom-render-function.tsx",
  },
  // Pagination demos
  "pagination-basic": {
    component: dynamic(() => import("./pagination/basic").then((m) => m.PaginationBasic)),
    file: "cn/pagination/basic.tsx",
  },
  "pagination-sizes": {
    component: dynamic(() => import("./pagination/sizes").then((m) => m.PaginationSizes)),
    file: "cn/pagination/sizes.tsx",
  },
  "pagination-with-ellipsis": {
    component: dynamic(() =>
      import("./pagination/with-ellipsis").then((m) => m.PaginationWithEllipsis),
    ),
    file: "cn/pagination/with-ellipsis.tsx",
  },
  "pagination-simple-prev-next": {
    component: dynamic(() =>
      import("./pagination/simple-prev-next").then((m) => m.PaginationSimplePrevNext),
    ),
    file: "cn/pagination/simple-prev-next.tsx",
  },
  "pagination-with-summary": {
    component: dynamic(() =>
      import("./pagination/with-summary").then((m) => m.PaginationWithSummary),
    ),
    file: "cn/pagination/with-summary.tsx",
  },
  "pagination-custom-icons": {
    component: dynamic(() =>
      import("./pagination/custom-icons").then((m) => m.PaginationCustomIcons),
    ),
    file: "cn/pagination/custom-icons.tsx",
  },
  "pagination-controlled": {
    component: dynamic(() => import("./pagination/controlled").then((m) => m.PaginationControlled)),
    file: "cn/pagination/controlled.tsx",
  },
  "pagination-disabled": {
    component: dynamic(() => import("./pagination/disabled").then((m) => m.PaginationDisabled)),
    file: "cn/pagination/disabled.tsx",
  },
  // Select demos
  "select-default": {
    component: dynamic(() => import("./select/default").then((m) => m.Default)),
    file: "cn/select/default.tsx",
  },
  "select-with-description": {
    component: dynamic(() => import("./select/with-description").then((m) => m.WithDescription)),
    file: "cn/select/with-description.tsx",
  },
  "select-multiple-select": {
    component: dynamic(() => import("./select/multiple-select").then((m) => m.MultipleSelect)),
    file: "cn/select/multiple-select.tsx",
  },
  "select-with-sections": {
    component: dynamic(() => import("./select/with-sections").then((m) => m.WithSections)),
    file: "cn/select/with-sections.tsx",
  },
  "select-with-disabled-options": {
    component: dynamic(() =>
      import("./select/with-disabled-options").then((m) => m.WithDisabledOptions),
    ),
    file: "cn/select/with-disabled-options.tsx",
  },
  "select-custom-indicator": {
    component: dynamic(() => import("./select/custom-indicator").then((m) => m.CustomIndicator)),
    file: "cn/select/custom-indicator.tsx",
  },
  "select-required": {
    component: dynamic(() => import("./select/required").then((m) => m.Required)),
    file: "cn/select/required.tsx",
  },
  "select-full-width": {
    component: dynamic(() => import("./select/full-width").then((m) => m.FullWidth)),
    file: "cn/select/full-width.tsx",
  },
  "select-on-surface": {
    component: dynamic(() => import("./select/on-surface").then((m) => m.OnSurface)),
    file: "cn/select/on-surface.tsx",
  },
  "select-custom-value": {
    component: dynamic(() => import("./select/custom-value").then((m) => m.CustomValue)),
    file: "cn/select/custom-value.tsx",
  },
  "select-custom-value-multiple": {
    component: dynamic(() =>
      import("./select/custom-value-multiple").then((m) => m.CustomValueMultiple),
    ),
    file: "cn/select/custom-value-multiple.tsx",
  },
  "select-controlled": {
    component: dynamic(() => import("./select/controlled").then((m) => m.Controlled)),
    file: "cn/select/controlled.tsx",
  },
  "select-controlled-multiple": {
    component: dynamic(() =>
      import("./select/controlled-multiple").then((m) => m.ControlledMultiple),
    ),
    file: "cn/select/controlled-multiple.tsx",
  },
  "select-controlled-open-state": {
    component: dynamic(() =>
      import("./select/controlled-open-state").then((m) => m.ControlledOpenState),
    ),
    file: "cn/select/controlled-open-state.tsx",
  },
  "select-asynchronous-loading": {
    component: dynamic(() =>
      import("./select/asynchronous-loading").then((m) => m.AsynchronousLoading),
    ),
    file: "cn/select/asynchronous-loading.tsx",
  },
  "select-disabled": {
    component: dynamic(() => import("./select/disabled").then((m) => m.Disabled)),
    file: "cn/select/disabled.tsx",
  },
  "select-variants": {
    component: dynamic(() => import("./select/variants").then((m) => m.Variants)),
    file: "cn/select/variants.tsx",
  },
  "select-custom-render-function": {
    component: dynamic(() =>
      import("./select/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/select/custom-render-function.tsx",
  },
  // SearchField demos
  "search-field-basic": {
    component: dynamic(() => import("./search-field/basic").then((m) => m.Basic)),
    file: "cn/search-field/basic.tsx",
  },
  "search-field-with-description": {
    component: dynamic(() =>
      import("./search-field/with-description").then((m) => m.WithDescription),
    ),
    file: "cn/search-field/with-description.tsx",
  },
  "search-field-required": {
    component: dynamic(() => import("./search-field/required").then((m) => m.Required)),
    file: "cn/search-field/required.tsx",
  },
  "search-field-validation": {
    component: dynamic(() => import("./search-field/validation").then((m) => m.Validation)),
    file: "cn/search-field/validation.tsx",
  },
  "search-field-disabled": {
    component: dynamic(() => import("./search-field/disabled").then((m) => m.Disabled)),
    file: "cn/search-field/disabled.tsx",
  },
  "search-field-full-width": {
    component: dynamic(() => import("./search-field/full-width").then((m) => m.FullWidth)),
    file: "cn/search-field/full-width.tsx",
  },
  "search-field-controlled": {
    component: dynamic(() => import("./search-field/controlled").then((m) => m.Controlled)),
    file: "cn/search-field/controlled.tsx",
  },
  "search-field-with-validation": {
    component: dynamic(() =>
      import("./search-field/with-validation").then((m) => m.WithValidation),
    ),
    file: "cn/search-field/with-validation.tsx",
  },
  "search-field-custom-icons": {
    component: dynamic(() => import("./search-field/custom-icons").then((m) => m.CustomIcons)),
    file: "cn/search-field/custom-icons.tsx",
  },
  "search-field-on-surface": {
    component: dynamic(() => import("./search-field/on-surface").then((m) => m.OnSurface)),
    file: "cn/search-field/on-surface.tsx",
  },
  "search-field-form-example": {
    component: dynamic(() => import("./search-field/form-example").then((m) => m.FormExample)),
    file: "cn/search-field/form-example.tsx",
  },
  "search-field-with-keyboard-shortcut": {
    component: dynamic(() =>
      import("./search-field/with-keyboard-shortcut").then((m) => m.WithKeyboardShortcut),
    ),
    file: "cn/search-field/with-keyboard-shortcut.tsx",
  },
  "search-field-variants": {
    component: dynamic(() => import("./search-field/variants").then((m) => m.Variants)),
    file: "cn/search-field/variants.tsx",
  },
  "search-field-custom-render-function": {
    component: dynamic(() =>
      import("./search-field/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/search-field/custom-render-function.tsx",
  },
  // ScrollShadow demos
  "scroll-shadow-default": {
    component: dynamic(() => import("./scroll-shadow/default")),
    file: "cn/scroll-shadow/default.tsx",
  },
  "scroll-shadow-orientation": {
    component: dynamic(() => import("./scroll-shadow/orientation")),
    file: "cn/scroll-shadow/orientation.tsx",
  },
  "scroll-shadow-hide-scroll-bar": {
    component: dynamic(() => import("./scroll-shadow/hide-scroll-bar")),
    file: "cn/scroll-shadow/hide-scroll-bar.tsx",
  },
  "scroll-shadow-custom-size": {
    component: dynamic(() => import("./scroll-shadow/custom-size")),
    file: "cn/scroll-shadow/custom-size.tsx",
  },
  "scroll-shadow-visibility-change": {
    component: dynamic(() => import("./scroll-shadow/visibility-change")),
    file: "cn/scroll-shadow/visibility-change.tsx",
  },
  "scroll-shadow-with-card": {
    component: dynamic(() => import("./scroll-shadow/with-card")),
    file: "cn/scroll-shadow/with-card.tsx",
  },
  // Slider demos
  "slider-default": {
    component: dynamic(() => import("./slider/default").then((m) => m.Default)),
    file: "cn/slider/default.tsx",
  },
  "slider-vertical": {
    component: dynamic(() => import("./slider/vertical").then((m) => m.Vertical)),
    file: "cn/slider/vertical.tsx",
  },
  "slider-range": {
    component: dynamic(() => import("./slider/range").then((m) => m.Range)),
    file: "cn/slider/range.tsx",
  },
  "slider-disabled": {
    component: dynamic(() => import("./slider/disabled").then((m) => m.Disabled)),
    file: "cn/slider/disabled.tsx",
  },
  "slider-custom-render-function": {
    component: dynamic(() =>
      import("./slider/custom-render-function").then((m) => m.CustomRenderFunction),
    ),
    file: "cn/slider/custom-render-function.tsx",
  },
  // Description demos
  "description-basic": {
    component: dynamic(() => import("./description/basic").then((m) => m.Basic)),
    file: "cn/description/basic.tsx",
  },
  // FieldError demos
  "field-error-basic": {
    component: dynamic(() => import("./field-error/basic").then((m) => m.Basic)),
    file: "cn/field-error/basic.tsx",
  },
};

export function getDemo(name: string): DemoItem | undefined {
  return demos[name];
}
