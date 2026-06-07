import type {DateValue} from "@internationalized/date";

import {isSameDay, startOfWeek, startOfYear} from "@internationalized/date";

/**
 * Returns the year offset between the Gregorian calendar and the given
 * calendar system.  Used to compute sensible default min/max year bounds.
 */
export function getGregorianYearOffset(identifier: string): number {
  switch (identifier) {
    case "buddhist":
      return 543;
    case "ethiopic":
    case "ethioaa":
      return -8;
    case "coptic":
      return -284;
    case "hebrew":
      return 3760;
    case "indian":
      return -78;
    case "islamic-civil":
    case "islamic-tbla":
    case "islamic-umalqura":
      return -579;
    case "persian":
      return -600;
    case "roc":
    case "japanese":
    case "gregory":
    default:
      return 0;
  }
}

/**
 * Iterates from `start` to `end` using calendar-aware arithmetic so that
 * non-Gregorian calendars (e.g. Japanese, Hebrew) produce correct year
 * boundaries.  Ported from HeroUI v2.
 */
export function getYearRange(start?: DateValue | null, end?: DateValue | null): DateValue[] {
  const years: DateValue[] = [];

  if (!start || !end) return years;

  let current = startOfYear(start);

  while (current.compare(end) <= 0) {
    years.push(current);
    current = startOfYear(current.add({years: 1}));
  }

  return years;
}

type DayOfWeek = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

type WeekdayStyle = "narrow" | "short" | "long";

export function getDayViewWeekDayLabels(
  start: DateValue,
  locale: string,
  firstDayOfWeek: DayOfWeek | undefined,
  weekdayStyle: WeekdayStyle = "short",
  timeZone = "UTC",
): string[] {
  const formatter = new Intl.DateTimeFormat(locale, {weekday: weekdayStyle, timeZone});
  const weekStart = startOfWeek(start, locale, firstDayOfWeek);
  const labels: string[] = [];
  let date = weekStart;

  for (let index = 0; index < 7; index++) {
    labels.push(formatter.format(date.toDate(timeZone)));
    const next = date.add({days: 1});

    if (isSameDay(date, next)) {
      break;
    }

    date = next;
  }

  while (labels.length < 7) {
    labels.push("");
  }

  return labels;
}

function buildDayViewWeekRow(rowStart: DateValue, end: DateValue): (DateValue | null)[] {
  const row: (DateValue | null)[] = [];
  let date = rowStart;

  for (let index = 0; index < 7; index++) {
    row.push(date.compare(end) > 0 ? null : date);

    const next = date.add({days: 1});

    if (isSameDay(date, next)) {
      while (row.length < 7) {
        row.push(null);
      }

      return row;
    }

    date = next;
  }

  return row;
}

/**
 * Builds week-aligned rows for day view. The first row starts at `startOfWeek(start)`
 * (leading dates before `start` are shown but disabled by RAC). Each subsequent row
 * starts on the next week boundary.
 */
export function getDayViewGridRows(
  start: DateValue,
  end: DateValue,
  locale: string,
  firstDayOfWeek?: DayOfWeek,
): (DateValue | null)[][] {
  const rows: (DateValue | null)[][] = [];
  let rowStart = startOfWeek(start, locale, firstDayOfWeek);

  rows.push(buildDayViewWeekRow(rowStart, end));

  rowStart = rowStart.add({weeks: 1});

  while (rowStart.compare(end) <= 0) {
    rows.push(buildDayViewWeekRow(rowStart, end));
    const nextWeek = rowStart.add({weeks: 1});

    if (isSameDay(rowStart, nextWeek)) {
      break;
    }

    rowStart = nextWeek;
  }

  return rows;
}
