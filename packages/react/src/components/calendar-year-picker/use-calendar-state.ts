"use client";

import {useContext} from "react";
import {CalendarStateContext} from "react-aria-components/Calendar";
import {RangeCalendarStateContext} from "react-aria-components/RangeCalendar";

/**
 * Returns the active Calendar or RangeCalendar state from RAC context.
 * Must be used inside <Calendar> or <RangeCalendar>.
 */
function useCalendarOrRangeState() {
  const calendarState = useContext(CalendarStateContext);
  const rangeCalendarState = useContext(RangeCalendarStateContext);
  const state = calendarState ?? rangeCalendarState;

  if (!state) {
    throw new Error(
      "useCalendarOrRangeState must be used within a <Calendar> or <RangeCalendar> component.",
    );
  }

  return state;
}

export {useCalendarOrRangeState};
