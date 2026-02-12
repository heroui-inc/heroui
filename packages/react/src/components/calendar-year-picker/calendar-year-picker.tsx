"use client";

import type {CalendarYearPickerVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {calendarYearPickerVariants} from "@heroui/styles";
import {getLocalTimeZone} from "@internationalized/date";
import React from "react";
import {Button as ButtonPrimitive, CalendarStateContext, useLocale} from "react-aria-components";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {IconChevronDown} from "../icons";

import {useYearPicker} from "./year-picker-context";

/* -------------------------------------------------------------------------------------------------
 * CalendarYearPickerTrigger
 *
 * Replaces Calendar.Heading. Shows "Month Year" with a chevron that rotates
 * when the year picker is open.  Toggles isYearPickerOpen from CalendarBaseContext.
 * -----------------------------------------------------------------------------------------------*/
interface CalendarYearPickerTriggerProps
  extends
    Omit<ComponentPropsWithRef<typeof ButtonPrimitive>, "children">,
    CalendarYearPickerVariants {
  children: React.ReactNode | ((values: CalendarYearPickerTriggerRenderProps) => React.ReactNode);
}

interface CalendarYearPickerTriggerRenderProps {
  isOpen: boolean;
  monthYear: string;
  toggle: () => void;
}

interface CalendarYearPickerTriggerHeadingProps
  extends Omit<ComponentPropsWithRef<"span">, "children">, CalendarYearPickerVariants {
  children?: React.ReactNode | ((values: CalendarYearPickerTriggerRenderProps) => React.ReactNode);
}

interface CalendarYearPickerTriggerIndicatorProps
  extends Omit<ComponentPropsWithRef<"span">, "children">, CalendarYearPickerVariants {
  children?: React.ReactNode | ((values: CalendarYearPickerTriggerRenderProps) => React.ReactNode);
}

interface CalendarYearPickerTriggerContextValue extends CalendarYearPickerTriggerRenderProps {
  slots: ReturnType<typeof calendarYearPickerVariants>;
}

const CalendarYearPickerTriggerContext =
  React.createContext<CalendarYearPickerTriggerContextValue | null>(null);

function useCalendarYearPickerTriggerContext(): CalendarYearPickerTriggerContextValue {
  const context = React.useContext(CalendarYearPickerTriggerContext);

  if (!context) {
    throw new Error(
      "CalendarYearPicker trigger components must be used within <CalendarYearPicker.Trigger>.",
    );
  }

  return context;
}

const CalendarYearPickerTrigger = ({
  children,
  className,
  onKeyDown,
  onPress,
  ...props
}: CalendarYearPickerTriggerProps) => {
  const {isYearPickerOpen, setIsYearPickerOpen} = useYearPicker();
  const state = React.useContext(CalendarStateContext)!;
  const {locale} = useLocale();

  const slots = React.useMemo(() => calendarYearPickerVariants(), []);

  // Format "Month Year" (e.g. "December 2025")
  const dateObj = state.focusedDate.toDate(getLocalTimeZone());
  const monthYear = new Intl.DateTimeFormat(locale, {month: "long", year: "numeric"}).format(
    dateObj,
  );

  const handleToggle = React.useCallback(() => {
    setIsYearPickerOpen(!isYearPickerOpen);
  }, [isYearPickerOpen, setIsYearPickerOpen]);

  const handleKeyDown = (
    e: Parameters<NonNullable<CalendarYearPickerTriggerProps["onKeyDown"]>>[0],
  ) => {
    onKeyDown?.(e);

    if (e.defaultPrevented) {
      return;
    }

    if (e.key === "Escape" && isYearPickerOpen) {
      e.preventDefault();
      setIsYearPickerOpen(false);
    }
  };

  const values: CalendarYearPickerTriggerRenderProps = React.useMemo(
    () => ({
      isOpen: isYearPickerOpen,
      monthYear,
      toggle: handleToggle,
    }),
    [handleToggle, isYearPickerOpen, monthYear],
  );

  const contextValue = React.useMemo(
    () => ({
      ...values,
      slots,
    }),
    [slots, values],
  );

  return (
    <CalendarYearPickerTriggerContext value={contextValue}>
      <ButtonPrimitive
        aria-expanded={isYearPickerOpen}
        aria-label={`${monthYear}, year selector`}
        className={composeTwRenderProps(className, slots.trigger())}
        data-open={isYearPickerOpen || undefined}
        data-slot="calendar-year-picker-trigger"
        slot={null}
        onKeyDown={handleKeyDown}
        onPress={(event) => {
          onPress?.(event);
          handleToggle();
        }}
        {...props}
      >
        {typeof children === "function" ? children(values) : children}
      </ButtonPrimitive>
    </CalendarYearPickerTriggerContext>
  );
};

CalendarYearPickerTrigger.displayName = "HeroUI.CalendarYearPicker.Trigger";

/* -------------------------------------------------------------------------------------------------
 * CalendarYearPickerTriggerHeading
 * -----------------------------------------------------------------------------------------------*/
const CalendarYearPickerTriggerHeading = ({
  children,
  className,
  ...props
}: CalendarYearPickerTriggerHeadingProps) => {
  const {monthYear, slots, ...values} = useCalendarYearPickerTriggerContext();

  return (
    <span
      className={composeSlotClassName(slots.triggerText, className)}
      data-slot="calendar-year-picker-trigger-text"
      {...props}
    >
      {typeof children === "function" ? children({monthYear, ...values}) : children || monthYear}
    </span>
  );
};

CalendarYearPickerTriggerHeading.displayName = "HeroUI.CalendarYearPicker.TriggerHeading";

/* -------------------------------------------------------------------------------------------------
 * CalendarYearPickerTriggerIndicator
 * -----------------------------------------------------------------------------------------------*/
const CalendarYearPickerTriggerIndicator = ({
  children,
  className,
  ...props
}: CalendarYearPickerTriggerIndicatorProps) => {
  const {monthYear, slots, ...values} = useCalendarYearPickerTriggerContext();

  return (
    <span
      aria-hidden="true"
      className={composeSlotClassName(slots.triggerIcon, className)}
      data-slot="calendar-year-picker-trigger-icon"
      {...props}
    >
      {typeof children === "function"
        ? children({monthYear, ...values})
        : children || <IconChevronDown />}
    </span>
  );
};

CalendarYearPickerTriggerIndicator.displayName = "HeroUI.CalendarYearPicker.TriggerIndicator";

/* -------------------------------------------------------------------------------------------------
 * CalendarYearPickerGrid
 *
 * Renders a 3-column grid of year buttons. Hidden via CSS opacity when closed,
 * visible when data-open="true".  tabIndex is toggled so only the active view
 * receives keyboard focus.
 * -----------------------------------------------------------------------------------------------*/
interface CalendarYearPickerGridProps
  extends ComponentPropsWithRef<"div">, CalendarYearPickerVariants {}

interface CalendarYearPickerCellRenderProps {
  year: number;
  formattedYear: string;
  isSelected: boolean;
  isCurrentYear: boolean;
  isOpen: boolean;
  selectYear: () => void;
}

interface CalendarYearPickerGridBodyProps {
  children?: (values: CalendarYearPickerCellRenderProps) => React.ReactNode;
}

interface CalendarYearPickerCellProps
  extends
    Omit<ComponentPropsWithRef<typeof ButtonPrimitive>, "children">,
    CalendarYearPickerVariants {
  year: number;
  children?: React.ReactNode | ((values: CalendarYearPickerCellRenderProps) => React.ReactNode);
}

interface CalendarYearPickerGridContextValue {
  slots: ReturnType<typeof calendarYearPickerVariants>;
  isYearPickerOpen: boolean;
  activeYear: number;
  focusedYear: number;
  years: number[];
  yearFormatter: Intl.DateTimeFormat;
  selectYear: (year: number) => void;
  setActiveYear: (year: number) => void;
}

const CalendarYearPickerGridContext =
  React.createContext<CalendarYearPickerGridContextValue | null>(null);

function useCalendarYearPickerGridContext(): CalendarYearPickerGridContextValue {
  const context = React.useContext(CalendarYearPickerGridContext);

  if (!context) {
    throw new Error("CalendarYearPicker components must be used within <CalendarYearPicker.Grid>.");
  }

  return context;
}

const CalendarYearPickerGrid = ({
  children,
  className,
  onKeyDown,
  ...props
}: CalendarYearPickerGridProps) => {
  const {calendarRef, isYearPickerOpen, setIsYearPickerOpen} = useYearPicker();
  const state = React.useContext(CalendarStateContext)!;
  const {locale} = useLocale();
  const gridRef = React.useRef<HTMLDivElement>(null);

  const slots = React.useMemo(() => calendarYearPickerVariants(), []);

  const yearFormatter = React.useMemo(
    () => new Intl.DateTimeFormat(locale, {year: "numeric"}),
    [locale],
  );

  const focusedYear = state.focusedDate.year;
  const minYear = state.minValue?.year ?? focusedYear;
  const maxYear = state.maxValue?.year ?? focusedYear;
  const years = React.useMemo(
    () => Array.from({length: Math.max(maxYear - minYear + 1, 0)}, (_, i) => minYear + i),
    [maxYear, minYear],
  );
  const [activeYear, setActiveYear] = React.useState(focusedYear);

  // Position the year grid to overlay the day grid
  React.useEffect(() => {
    const yearGrid = gridRef.current;

    if (!yearGrid) return;

    const calendar = calendarRef.current;
    const calendarGrid = calendar?.querySelector(
      "[data-slot='calendar-grid']",
    ) as HTMLElement | null;

    if (calendarGrid) {
      yearGrid.style.top = `${calendarGrid.offsetTop}px`;
      yearGrid.style.height = `${calendarGrid.offsetHeight}px`;
    }
  }, [state.focusedDate]);

  const focusYearCell = React.useCallback((year: number) => {
    const yearGrid = gridRef.current;

    if (!yearGrid) return;

    const yearCell = yearGrid.querySelector<HTMLElement>(`[data-year='${year}']`);

    if (yearCell) {
      yearCell.focus();
      yearCell.scrollIntoView({block: "center"});
    }
  }, []);

  // Keep keyboard navigation anchored to the currently selected year when opening.
  React.useEffect(() => {
    if (!isYearPickerOpen || years.length === 0) return;

    const [firstYear] = years;

    if (firstYear == null) return;

    const nextActiveYear = years.includes(focusedYear) ? focusedYear : firstYear;

    setActiveYear(nextActiveYear);

    // Focus after DOM updates so tab navigation lands directly on a year cell.
    const rafId = requestAnimationFrame(() => {
      focusYearCell(nextActiveYear);
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isYearPickerOpen, focusedYear, years, focusYearCell]);

  React.useEffect(() => {
    if (!isYearPickerOpen || years.length === 0) return;

    const [firstYear] = years;

    if (firstYear == null) return;

    if (!years.includes(activeYear)) {
      setActiveYear(firstYear);
    }
  }, [activeYear, isYearPickerOpen, years]);

  const handleYearSelect = React.useCallback(
    (year: number) => {
      const newDate = state.focusedDate.set({year});

      // Brief delay so the user sees the pressed feedback, then update date + close together.
      // Both fire in the same tick so the year grid never re-renders with the new selection visible.
      setTimeout(() => {
        state.setFocusedDate(newDate);
        setIsYearPickerOpen(false);
      }, 150);
    },
    [setIsYearPickerOpen, state],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);

    if (e.defaultPrevented) {
      return;
    }

    if (e.key === "Escape" && isYearPickerOpen) {
      e.preventDefault();
      setIsYearPickerOpen(false);

      return;
    }

    if (!isYearPickerOpen || years.length === 0) {
      return;
    }

    const currentIndex = years.indexOf(activeYear);

    if (currentIndex === -1) {
      return;
    }

    let nextIndex = currentIndex;

    switch (e.key) {
      case "ArrowRight":
        nextIndex = Math.min(currentIndex + 1, years.length - 1);
        break;
      case "ArrowLeft":
        nextIndex = Math.max(currentIndex - 1, 0);
        break;
      case "ArrowDown":
        nextIndex = Math.min(currentIndex + 3, years.length - 1);
        break;
      case "ArrowUp":
        nextIndex = Math.max(currentIndex - 3, 0);
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = years.length - 1;
        break;
      default:
        return;
    }

    if (nextIndex !== currentIndex) {
      const nextYear = years[nextIndex];

      if (nextYear == null) return;

      e.preventDefault();
      setActiveYear(nextYear);
      focusYearCell(nextYear);
    }
  };

  const contextValue = React.useMemo(
    () => ({
      focusedYear,
      isYearPickerOpen,
      activeYear,
      selectYear: handleYearSelect,
      setActiveYear,
      slots,
      years,
      yearFormatter,
    }),
    [activeYear, focusedYear, handleYearSelect, isYearPickerOpen, slots, yearFormatter, years],
  );

  return (
    <CalendarYearPickerGridContext value={contextValue}>
      <div
        ref={gridRef}
        aria-hidden={!isYearPickerOpen}
        aria-label="Year selector"
        className={composeSlotClassName(slots.yearGrid, className)}
        data-open={isYearPickerOpen || undefined}
        data-slot="calendar-year-picker-grid"
        role="listbox"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    </CalendarYearPickerGridContext>
  );
};

CalendarYearPickerGrid.displayName = "HeroUI.CalendarYearPicker.Grid";

/* -------------------------------------------------------------------------------------------------
 * CalendarYearPickerGridBody
 * -----------------------------------------------------------------------------------------------*/
const CalendarYearPickerGridBody = ({children}: CalendarYearPickerGridBodyProps) => {
  const {focusedYear, isYearPickerOpen, selectYear, yearFormatter, years} =
    useCalendarYearPickerGridContext();
  const currentYear = new Date().getFullYear();

  return (
    <>
      {years.map((year) => {
        const isSelected = year === focusedYear;
        const formattedYear = yearFormatter.format(new Date(year, 0, 1));
        const values: CalendarYearPickerCellRenderProps = {
          formattedYear,
          isCurrentYear: year === currentYear,
          isOpen: isYearPickerOpen,
          isSelected,
          selectYear: () => selectYear(year),
          year,
        };

        return (
          <React.Fragment key={year}>
            {typeof children === "function" ? (
              children(values)
            ) : (
              <CalendarYearPickerCell year={year} />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

CalendarYearPickerGridBody.displayName = "HeroUI.CalendarYearPicker.GridBody";

/* -------------------------------------------------------------------------------------------------
 * CalendarYearPickerCell
 * -----------------------------------------------------------------------------------------------*/
const CalendarYearPickerCell = ({
  children,
  className,
  excludeFromTabOrder,
  onFocus,
  onPress,
  year,
  ...props
}: CalendarYearPickerCellProps) => {
  const {
    activeYear,
    focusedYear,
    isYearPickerOpen,
    selectYear,
    setActiveYear,
    slots,
    yearFormatter,
  } = useCalendarYearPickerGridContext();
  const isSelected = year === focusedYear;
  const isActive = year === activeYear;
  const formattedYear = yearFormatter.format(new Date(year, 0, 1));
  const values: CalendarYearPickerCellRenderProps = {
    formattedYear,
    isCurrentYear: year === new Date().getFullYear(),
    isOpen: isYearPickerOpen,
    isSelected,
    selectYear: () => selectYear(year),
    year,
  };

  return (
    <ButtonPrimitive
      aria-label={formattedYear}
      aria-selected={isSelected}
      className={composeTwRenderProps(className, slots.yearCell())}
      data-selected={isSelected || undefined}
      data-slot="calendar-year-picker-year-cell"
      data-year={year}
      excludeFromTabOrder={excludeFromTabOrder ?? !(isYearPickerOpen && isActive)}
      slot={null}
      onFocus={(event) => {
        onFocus?.(event);
        setActiveYear(year);
      }}
      onPress={(event) => {
        onPress?.(event);
        selectYear(year);
      }}
      {...props}
    >
      {typeof children === "function" ? children(values) : children || formattedYear}
    </ButtonPrimitive>
  );
};

CalendarYearPickerCell.displayName = "HeroUI.CalendarYearPicker.Cell";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  CalendarYearPickerTrigger,
  CalendarYearPickerTriggerHeading,
  CalendarYearPickerTriggerIndicator,
  CalendarYearPickerGrid,
  CalendarYearPickerGridBody,
  CalendarYearPickerCell,
};
export type {
  CalendarYearPickerTriggerProps,
  CalendarYearPickerTriggerHeadingProps,
  CalendarYearPickerTriggerIndicatorProps,
  CalendarYearPickerTriggerRenderProps,
  CalendarYearPickerGridProps,
  CalendarYearPickerGridBodyProps,
  CalendarYearPickerCellProps,
  CalendarYearPickerCellRenderProps,
};
