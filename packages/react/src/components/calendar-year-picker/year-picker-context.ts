"use client";

import type {DateValue} from "react-aria-components";

import {createContext, useContext} from "react";

/* -------------------------------------------------------------------------------------------------
 * YearPickerContext
 *
 * Context provided by Calendar (and RangeCalendar) to control year-picker visibility.
 * Internal child components consume this to toggle the year-picker open/close state,
 * keeping the public API clean and wrapper-free.
 * -----------------------------------------------------------------------------------------------*/
interface YearPickerContextValue {
  isYearPickerOpen: boolean;
  setIsYearPickerOpen: (open: boolean) => void;
  calendarRef: React.RefObject<HTMLDivElement | null>;
  calendarGridSlot: "calendar-grid" | "range-calendar-grid";
}

interface YearPickerStateContextValue {
  focusedDate: DateValue;
  setFocusedDate: (value: DateValue) => void;
  timeZone: string;
  minValue?: DateValue | null;
  maxValue?: DateValue | null;
}

const YearPickerContext = createContext<YearPickerContextValue | null>(null);
const YearPickerStateContext = createContext<YearPickerStateContextValue | null>(null);

/**
 * Hook to consume YearPickerContext.
 * Must be used inside Calendar or RangeCalendar.
 */
function useYearPicker(): YearPickerContextValue {
  const context = useContext(YearPickerContext);

  if (!context) {
    throw new Error("useYearPicker must be used within a <Calendar> or <RangeCalendar> component.");
  }

  return context;
}

/**
 * Hook to consume normalized calendar state used by YearPicker.
 * Must be provided by Calendar or RangeCalendar root via adapter bridge.
 */
function useYearPickerState(): YearPickerStateContextValue {
  const context = useContext(YearPickerStateContext);

  if (!context) {
    throw new Error(
      "useYearPickerState must be used within a <Calendar> or <RangeCalendar> component.",
    );
  }

  return context;
}

export {YearPickerContext, YearPickerStateContext, useYearPicker, useYearPickerState};
export type {YearPickerContextValue, YearPickerStateContextValue};
