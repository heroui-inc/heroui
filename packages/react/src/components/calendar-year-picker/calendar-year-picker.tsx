"use client";

import type {CalendarYearPickerVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {calendarYearPickerVariants} from "@heroui/styles";
import {getLocalTimeZone} from "@internationalized/date";
import React from "react";
import {CalendarStateContext, useLocale} from "react-aria-components";

import {IconChevronDown} from "../icons";

import {useYearPicker} from "./year-picker-context";

/* -------------------------------------------------------------------------------------------------
 * CalendarYearPickerTrigger
 *
 * Replaces Calendar.Heading. Shows "Month Year" with a chevron that rotates
 * when the year picker is open.  Toggles isYearPickerOpen from CalendarBaseContext.
 * -----------------------------------------------------------------------------------------------*/
interface CalendarYearPickerTriggerProps
  extends Omit<ComponentPropsWithRef<"button">, "children">, CalendarYearPickerVariants {}

const CalendarYearPickerTrigger = ({className, ...props}: CalendarYearPickerTriggerProps) => {
  const {isYearPickerOpen, setIsYearPickerOpen} = useYearPicker();
  const state = React.useContext(CalendarStateContext)!;
  const {locale} = useLocale();

  const slots = React.useMemo(() => calendarYearPickerVariants(), []);

  // Format "Month Year" (e.g. "December 2025")
  const dateObj = state.focusedDate.toDate(getLocalTimeZone());
  const monthYear = new Intl.DateTimeFormat(locale, {month: "long", year: "numeric"}).format(
    dateObj,
  );

  const handleClick = () => {
    setIsYearPickerOpen(!isYearPickerOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Escape" && isYearPickerOpen) {
      e.preventDefault();
      setIsYearPickerOpen(false);
    }
  };

  return (
    <button
      aria-expanded={isYearPickerOpen}
      aria-label={`${monthYear}, year selector`}
      className={slots.trigger({className})}
      data-open={isYearPickerOpen || undefined}
      data-slot="calendar-year-picker-trigger"
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <span className={slots.triggerText()} data-slot="calendar-year-picker-trigger-text">
        {monthYear}
      </span>
      <IconChevronDown
        className={slots.triggerIcon()}
        data-slot="calendar-year-picker-trigger-icon"
      />
    </button>
  );
};

CalendarYearPickerTrigger.displayName = "HeroUI.CalendarYearPicker.Trigger";

/* -------------------------------------------------------------------------------------------------
 * CalendarYearPickerGrid
 *
 * Renders a 3-column grid of year buttons. Hidden via CSS opacity when closed,
 * visible when data-open="true".  tabIndex is toggled so only the active view
 * receives keyboard focus.
 * -----------------------------------------------------------------------------------------------*/
interface CalendarYearPickerGridProps
  extends Omit<ComponentPropsWithRef<"div">, "children">, CalendarYearPickerVariants {}

/** Full scrollable range: 1900 – 2099 (200 years). */
const MIN_YEAR = 1900;
const MAX_YEAR = 2099;
const ALL_YEARS = Array.from({length: MAX_YEAR - MIN_YEAR + 1}, (_, i) => MIN_YEAR + i);

const CalendarYearPickerGrid = ({className, ...props}: CalendarYearPickerGridProps) => {
  const {isYearPickerOpen, setIsYearPickerOpen} = useYearPicker();
  const state = React.useContext(CalendarStateContext)!;
  const {locale} = useLocale();
  const gridRef = React.useRef<HTMLDivElement>(null);

  const slots = React.useMemo(() => calendarYearPickerVariants(), []);

  const yearFormatter = React.useMemo(
    () => new Intl.DateTimeFormat(locale, {year: "numeric"}),
    [locale],
  );

  const focusedYear = state.focusedDate.year;

  // Measure the sibling day grid and position this grid to overlay it exactly.
  // Also scroll the focused year into view when the picker opens.
  React.useEffect(() => {
    const grid = gridRef.current;

    if (!grid) return;

    const calendar = grid.closest("[data-slot='calendar']");
    const dayGrid = calendar?.querySelector("[data-slot='calendar-grid']") as HTMLElement | null;

    if (dayGrid) {
      grid.style.top = `${dayGrid.offsetTop}px`;
      grid.style.height = `${dayGrid.offsetHeight}px`;
    }

    if (!isYearPickerOpen) return;

    const selectedBtn = grid.querySelector<HTMLElement>("[data-selected]");

    if (selectedBtn) {
      selectedBtn.scrollIntoView({block: "center"});
    }
  }, [isYearPickerOpen, focusedYear]);

  const handleYearSelect = (year: number) => {
    const newDate = state.focusedDate.set({year});

    // Brief delay so the user sees the pressed feedback, then update date + close together.
    // Both fire in the same tick so the year grid never re-renders with the new selection visible.
    setTimeout(() => {
      state.setFocusedDate(newDate);
      setIsYearPickerOpen(false);
    }, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape" && isYearPickerOpen) {
      e.preventDefault();
      setIsYearPickerOpen(false);
    }
  };

  return (
    <div
      ref={gridRef}
      aria-hidden={!isYearPickerOpen}
      aria-label="Year selector"
      className={slots.yearGrid({className})}
      data-open={isYearPickerOpen || undefined}
      data-slot="calendar-year-picker-grid"
      role="listbox"
      tabIndex={isYearPickerOpen ? 0 : -1}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {ALL_YEARS.map((year) => {
        const isSelected = year === focusedYear;
        const formattedYear = yearFormatter.format(new Date(year, 0, 1));

        return (
          <button
            key={year}
            aria-label={formattedYear}
            aria-selected={isSelected}
            className={slots.yearCell()}
            data-selected={isSelected || undefined}
            data-slot="calendar-year-picker-year-cell"
            role="option"
            tabIndex={isYearPickerOpen ? 0 : -1}
            type="button"
            onClick={() => handleYearSelect(year)}
          >
            {formattedYear}
          </button>
        );
      })}
    </div>
  );
};

CalendarYearPickerGrid.displayName = "HeroUI.CalendarYearPicker.Grid";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {CalendarYearPickerTrigger, CalendarYearPickerGrid};
export type {CalendarYearPickerTriggerProps, CalendarYearPickerGridProps};
