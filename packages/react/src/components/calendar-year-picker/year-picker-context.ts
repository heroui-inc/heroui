"use client";

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
}

const YearPickerContext = createContext<YearPickerContextValue | null>(null);

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

export {YearPickerContext, useYearPicker};
export type {YearPickerContextValue};
