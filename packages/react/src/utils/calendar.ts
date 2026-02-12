import type {DateValue} from "@internationalized/date";

import {startOfYear} from "@internationalized/date";

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
