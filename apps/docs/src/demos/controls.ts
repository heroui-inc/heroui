/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix -- key order is the panel order */
import type {
  ButtonProps,
  CalendarProps,
  CheckboxProps,
  ColorAreaProps,
  ColorChannel,
  ColorFieldProps,
  ColorSliderProps,
  ColorSpace,
  ColorSwatchPickerProps,
  ColorSwatchProps,
  DateFieldProps,
  DatePickerProps,
  DateRangePickerProps,
  DateValue,
  InputProps,
  MeterProps,
  NumberFieldProps,
  ProgressBarProps,
  ProgressCircleProps,
  RadioGroupProps,
  RangeCalendarProps,
  SearchFieldProps,
  SpinnerProps,
  SwitchProps,
  TextAreaProps,
  TextFieldProps,
  TimeFieldProps,
  TimeValue,
  ToggleButtonGroupProps,
  ToggleButtonProps,
} from "@heroui/react";

import {defineControls} from "@/lib/demo-controls";

/**
 * Prop controls shown beside a demo. Shared by every locale; register them on a
 * demo with `controls` in `en/index.ts` / `cn/index.ts`. The demo must accept
 * `props` and spread them (see `@/lib/demo-controls`).
 */

export const buttonControls = defineControls<ButtonProps>()({
  variant: {
    type: "enum",
    options: ["primary", "secondary", "tertiary", "outline", "ghost", "danger", "danger-soft"],
    default: "primary",
  },
  size: {type: "enum", options: ["sm", "md", "lg"], default: "md"},
  isDisabled: {type: "boolean"},
  isPending: {type: "boolean"},
  fullWidth: {type: "boolean"},
});

const fieldVariant = {type: "enum", options: ["primary", "secondary"], default: "primary"} as const;
const sizes = {type: "enum", options: ["sm", "md", "lg"], default: "md"} as const;
const statusColor = {
  type: "enum",
  options: ["accent", "default", "success", "warning", "danger"],
  default: "accent",
} as const;
const percent = {type: "number", initial: 60, min: 0, max: 100, step: 1} as const;

export const switchControls = defineControls<SwitchProps>()({
  size: sizes,
  isDisabled: {type: "boolean"},
  isReadOnly: {type: "boolean"},
});

export const checkboxControls = defineControls<CheckboxProps>()({
  variant: fieldVariant,
  isDisabled: {type: "boolean"},
  isIndeterminate: {type: "boolean"},
  isInvalid: {type: "boolean"},
});

export const toggleButtonControls = defineControls<ToggleButtonProps>()({
  variant: {type: "enum", options: ["default", "ghost"], default: "default"},
  size: sizes,
  isDisabled: {type: "boolean"},
});

export const inputControls = defineControls<InputProps>()({
  variant: fieldVariant,
  disabled: {type: "boolean"},
});

export const textAreaControls = defineControls<TextAreaProps>()({
  variant: fieldVariant,
  disabled: {type: "boolean"},
});

export const textFieldControls = defineControls<TextFieldProps>()({
  variant: fieldVariant,
  isDisabled: {type: "boolean"},
  isInvalid: {type: "boolean"},
  isReadOnly: {type: "boolean"},
  isRequired: {type: "boolean"},
});

export const progressBarControls = defineControls<ProgressBarProps>()({
  value: percent,
  color: statusColor,
  size: sizes,
  isIndeterminate: {type: "boolean"},
});

export const progressCircleControls = defineControls<ProgressCircleProps>()({
  value: percent,
  color: statusColor,
  size: sizes,
  isIndeterminate: {type: "boolean"},
});

export const meterControls = defineControls<MeterProps>()({
  value: percent,
  color: statusColor,
  size: sizes,
});

export const numberFieldControls = defineControls<NumberFieldProps>()({
  variant: fieldVariant,
  isDisabled: {type: "boolean"},
  isInvalid: {type: "boolean"},
  isReadOnly: {type: "boolean"},
});

export const searchFieldControls = defineControls<SearchFieldProps>()({
  variant: fieldVariant,
  isDisabled: {type: "boolean"},
  isInvalid: {type: "boolean"},
});

export const toggleButtonGroupControls = defineControls<ToggleButtonGroupProps>()({
  size: sizes,
  orientation: {type: "enum", options: ["horizontal", "vertical"], default: "horizontal"},
  isDetached: {type: "boolean"},
  isDisabled: {type: "boolean"},
});

export const radioGroupControls = defineControls<RadioGroupProps>()({
  variant: fieldVariant,
  orientation: {type: "enum", options: ["vertical", "horizontal"], default: "vertical"},
  isDisabled: {type: "boolean"},
  isInvalid: {type: "boolean"},
});

export const spinnerControls = defineControls<SpinnerProps>()({
  color: {
    type: "enum",
    options: ["accent", "current", "success", "warning", "danger"],
    default: "accent",
  },
  size: {type: "enum", options: ["sm", "md", "lg", "xl"], default: "md"},
});

/* -------------------------------------------------------------------------------------------------
 * Dates and times
 * -----------------------------------------------------------------------------------------------*/

/** No default: unset, the first day follows the locale. */
const firstDayOfWeek = {
  type: "enum",
  options: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
} as const;
const dateGranularity = {
  type: "enum",
  options: ["day", "hour", "minute", "second"],
  default: "day",
} as const;

export const calendarControls = defineControls<CalendarProps>()({
  firstDayOfWeek,
  isDisabled: {type: "boolean"},
  isReadOnly: {type: "boolean"},
});

export const rangeCalendarControls = defineControls<RangeCalendarProps>()({
  firstDayOfWeek: {...firstDayOfWeek, initial: "mon"},
  isDisabled: {type: "boolean"},
  isReadOnly: {type: "boolean"},
});

export const dateFieldControls = defineControls<DateFieldProps<DateValue>>()({
  granularity: dateGranularity,
  isDisabled: {type: "boolean"},
  isInvalid: {type: "boolean"},
  isReadOnly: {type: "boolean"},
  isRequired: {type: "boolean"},
});

export const timeFieldControls = defineControls<TimeFieldProps<TimeValue>>()({
  granularity: {type: "enum", options: ["hour", "minute", "second"], default: "minute"},
  isDisabled: {type: "boolean"},
  isInvalid: {type: "boolean"},
  isReadOnly: {type: "boolean"},
  isRequired: {type: "boolean"},
});

export const datePickerControls = defineControls<DatePickerProps<DateValue>>()({
  granularity: dateGranularity,
  isDisabled: {type: "boolean"},
  isInvalid: {type: "boolean"},
  isReadOnly: {type: "boolean"},
  isRequired: {type: "boolean"},
});

// No granularity: two date-times overflow the demo's field.
export const dateRangePickerControls = defineControls<DateRangePickerProps<DateValue>>()({
  isDisabled: {type: "boolean"},
  isInvalid: {type: "boolean"},
  isReadOnly: {type: "boolean"},
  isRequired: {type: "boolean"},
});

/* -------------------------------------------------------------------------------------------------
 * Colors
 * -----------------------------------------------------------------------------------------------*/

/** The channels of each color space, for controls whose options follow `colorSpace`. */
const channels = {
  by: "colorSpace",
  options: {
    rgb: ["red", "green", "blue"],
    hsl: ["hue", "saturation", "lightness"],
    hsb: ["hue", "saturation", "brightness"],
  },
} as const satisfies {by: string; options: Record<ColorSpace, readonly ColorChannel[]>};

/** Channels plus alpha, which every color space has. */
const channelsWithAlpha = {
  by: "colorSpace",
  options: {
    rgb: [...channels.options.rgb, "alpha"],
    hsl: [...channels.options.hsl, "alpha"],
    hsb: [...channels.options.hsb, "alpha"],
  },
} as const satisfies {by: string; options: Record<ColorSpace, readonly ColorChannel[]>};

/**
 * Leaving `colorSpace` unset uses the space of the demo's value, so its default is
 * that space: rgb for `rgb(…)` and hex values, hsl for `hsl(…)`.
 */
const colorSpace = (space: ColorSpace) =>
  ({type: "enum", options: ["rgb", "hsl", "hsb"], default: space}) as const;

export const colorAreaControls = defineControls<ColorAreaProps>()({
  colorSpace: colorSpace("rgb"),
  // The two axes can't show the same channel.
  xChannel: {type: "enum", options: channels, distinctFrom: "yChannel"},
  yChannel: {type: "enum", options: channels, distinctFrom: "xChannel"},
  isDisabled: {type: "boolean"},
  showDots: {type: "boolean"},
});

export const colorFieldControls = defineControls<ColorFieldProps>()({
  colorSpace: colorSpace("rgb"),
  channel: {type: "enum", options: channelsWithAlpha},
  isDisabled: {type: "boolean"},
  isInvalid: {type: "boolean"},
  isReadOnly: {type: "boolean"},
  isRequired: {type: "boolean"},
});

/** `ColorSliderProps` pairs each channel with its spaces; the panel keeps them in sync instead. */
type LooseColorSliderProps = Omit<ColorSliderProps, "channel" | "colorSpace"> & {
  channel: ColorChannel;
  colorSpace?: ColorSpace;
};

export const colorSliderControls = defineControls<LooseColorSliderProps>()({
  colorSpace: colorSpace("hsl"),
  channel: {type: "enum", options: channelsWithAlpha, initial: "hue", required: true},
  isDisabled: {type: "boolean"},
});

const swatchSizes = {type: "enum", options: ["xs", "sm", "md", "lg", "xl"], default: "md"} as const;

export const colorSwatchControls = defineControls<ColorSwatchProps>()({
  size: swatchSizes,
  shape: {type: "enum", options: ["circle", "square"], default: "circle"},
});

export const colorSwatchPickerControls = defineControls<ColorSwatchPickerProps>()({
  size: swatchSizes,
  variant: {type: "enum", options: ["circle", "square"], default: "circle"},
  layout: {type: "enum", options: ["grid", "stack"], default: "grid"},
});
