import type {useLocale} from "react-aria/I18nProvider";
import type {PressEvent} from "react-aria-components";

export type {
  Key,
  PressEvent,
  KeyboardEvent,
  HoverEvent,
  Selection,
  RangeValue,
  ValidationResult,
  RouterConfig,
  TimeValue,
  DateValue,
  DateRange,
  SortDescriptor,
  Color,
  ColorFormat,
  ColorSpace,
  ColorChannel,
  ColorChannelRange,
  ColorAxes,
} from "react-aria-components";
export type {Orientation} from "react-aria";

// React Aria does not export these two by name, so they are derived from the
// public types that carry them and stay in sync with upstream.
export type Direction = ReturnType<typeof useLocale>["direction"];
export type PointerType = PressEvent["pointerType"];
