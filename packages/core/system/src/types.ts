/**
 * Spinner Variants
 */
export type SpinnerVariants = "default" | "simple" | "gradient" | "wave" | "dots" | "spinner";

/**
 * Interationalized Date
 * Retrieved from `@internationalized/date` to avoid importing the entire package.
 */
export interface CalendarDate {
  /** The calendar system associated with this date, e.g. Gregorian. */
  readonly calendar: Calendar;
  /** The calendar era for this date, e.g. "BC" or "AD". */
  readonly era: string;
  /** The year of this date within the era. */
  readonly year: number;
  /**
   * The month number within the year. Note that some calendar systems such as Hebrew
   * may have a variable number of months per year. Therefore, month numbers may not
   * always correspond to the same month names in different years.
   */
  readonly month: number;
  /** The day number within the month. */
  readonly day: number;
  constructor(year: number, month: number, day: number);
  constructor(era: string, year: number, month: number, day: number);
  constructor(calendar: Calendar, year: number, month: number, day: number);
  constructor(calendar: Calendar, era: string, year: number, month: number, day: number);
  /** Returns a copy of this date. */
  copy(): CalendarDate;
  /** Returns a new `CalendarDate` with the given duration added to it. */
  add(duration: DateDuration): CalendarDate;
  /** Returns a new `CalendarDate` with the given duration subtracted from it. */
  subtract(duration: DateDuration): CalendarDate;
  /** Returns a new `CalendarDate` with the given fields set to the provided values. Other fields will be constrained accordingly. */
  set(fields: DateFields): CalendarDate;
  /**
   * Returns a new `CalendarDate` with the given field adjusted by a specified amount.
   * When the resulting value reaches the limits of the field, it wraps around.
   */
  cycle(field: DateField, amount: number, options?: CycleOptions): CalendarDate;
  /** Converts the date to a native JavaScript Date object, with the time set to midnight in the given time zone. */
  toDate(timeZone: string): Date;
  /** Converts the date to an ISO 8601 formatted string. */
  toString(): string;
  /** Compares this date with another. A negative result indicates that this date is before the given one, and a positive date indicates that it is after. */
  compare(b: AnyCalendarDate): number;
}

export interface CalendarDateTime {
  /** The calendar system associated with this date, e.g. Gregorian. */
  readonly calendar: Calendar;
  /** The calendar era for this date, e.g. "BC" or "AD". */
  readonly era: string;
  /** The year of this date within the era. */
  readonly year: number;
  /**
   * The month number within the year. Note that some calendar systems such as Hebrew
   * may have a variable number of months per year. Therefore, month numbers may not
   * always correspond to the same month names in different years.
   */
  readonly month: number;
  /** The day number within the month. */
  readonly day: number;
  /** The hour in the day, numbered from 0 to 23. */
  readonly hour: number;
  /** The minute in the hour. */
  readonly minute: number;
  /** The second in the minute. */
  readonly second: number;
  /** The millisecond in the second. */
  readonly millisecond: number;
  constructor(
    year: number,
    month: number,
    day: number,
    hour?: number,
    minute?: number,
    second?: number,
    millisecond?: number,
  );
  constructor(
    era: string,
    year: number,
    month: number,
    day: number,
    hour?: number,
    minute?: number,
    second?: number,
    millisecond?: number,
  );
  constructor(
    calendar: Calendar,
    year: number,
    month: number,
    day: number,
    hour?: number,
    minute?: number,
    second?: number,
    millisecond?: number,
  );
  constructor(
    calendar: Calendar,
    era: string,
    year: number,
    month: number,
    day: number,
    hour?: number,
    minute?: number,
    second?: number,
    millisecond?: number,
  );
  /** Returns a copy of this date. */
  copy(): CalendarDateTime;
  /** Returns a new `CalendarDateTime` with the given duration added to it. */
  add(duration: DateTimeDuration): CalendarDateTime;
  /** Returns a new `CalendarDateTime` with the given duration subtracted from it. */
  subtract(duration: DateTimeDuration): CalendarDateTime;
  /** Returns a new `CalendarDateTime` with the given fields set to the provided values. Other fields will be constrained accordingly. */
  set(fields: DateFields & TimeFields): CalendarDateTime;
  /**
   * Returns a new `CalendarDateTime` with the given field adjusted by a specified amount.
   * When the resulting value reaches the limits of the field, it wraps around.
   */
  cycle(field: DateField | TimeField, amount: number, options?: CycleTimeOptions): CalendarDateTime;
  /** Converts the date to a native JavaScript Date object in the given time zone. */
  toDate(timeZone: string, disambiguation?: Disambiguation): Date;
  /** Converts the date to an ISO 8601 formatted string. */
  toString(): string;
  /** Compares this date with another. A negative result indicates that this date is before the given one, and a positive date indicates that it is after. */
  compare(b: CalendarDate | CalendarDateTime | ZonedDateTime): number;
}

export interface ZonedDateTime {
  /** The calendar system associated with this date, e.g. Gregorian. */
  readonly calendar: Calendar;
  /** The calendar era for this date, e.g. "BC" or "AD". */
  readonly era: string;
  /** The year of this date within the era. */
  readonly year: number;
  /**
   * The month number within the year. Note that some calendar systems such as Hebrew
   * may have a variable number of months per year. Therefore, month numbers may not
   * always correspond to the same month names in different years.
   */
  readonly month: number;
  /** The day number within the month. */
  readonly day: number;
  /** The hour in the day, numbered from 0 to 23. */
  readonly hour: number;
  /** The minute in the hour. */
  readonly minute: number;
  /** The second in the minute. */
  readonly second: number;
  /** The millisecond in the second. */
  readonly millisecond: number;
  /** The IANA time zone identifier that this date and time is represented in. */
  readonly timeZone: string;
  /** The UTC offset for this time, in milliseconds. */
  readonly offset: number;
  constructor(
    year: number,
    month: number,
    day: number,
    timeZone: string,
    offset: number,
    hour?: number,
    minute?: number,
    second?: number,
    millisecond?: number,
  );
  constructor(
    era: string,
    year: number,
    month: number,
    day: number,
    timeZone: string,
    offset: number,
    hour?: number,
    minute?: number,
    second?: number,
    millisecond?: number,
  );
  constructor(
    calendar: Calendar,
    year: number,
    month: number,
    day: number,
    timeZone: string,
    offset: number,
    hour?: number,
    minute?: number,
    second?: number,
    millisecond?: number,
  );
  constructor(
    calendar: Calendar,
    era: string,
    year: number,
    month: number,
    day: number,
    timeZone: string,
    offset: number,
    hour?: number,
    minute?: number,
    second?: number,
    millisecond?: number,
  );
  /** Returns a copy of this date. */
  copy(): ZonedDateTime;
  /** Returns a new `ZonedDateTime` with the given duration added to it. */
  add(duration: DateTimeDuration): ZonedDateTime;
  /** Returns a new `ZonedDateTime` with the given duration subtracted from it. */
  subtract(duration: DateTimeDuration): ZonedDateTime;
  /** Returns a new `ZonedDateTime` with the given fields set to the provided values. Other fields will be constrained accordingly. */
  set(fields: DateFields & TimeFields, disambiguation?: Disambiguation): ZonedDateTime;
  /**
   * Returns a new `ZonedDateTime` with the given field adjusted by a specified amount.
   * When the resulting value reaches the limits of the field, it wraps around.
   */
  cycle(field: DateField | TimeField, amount: number, options?: CycleTimeOptions): ZonedDateTime;
  /** Converts the date to a native JavaScript Date object. */
  toDate(): Date;
  /** Converts the date to an ISO 8601 formatted string, including the UTC offset and time zone identifier. */
  toString(): string;
  /** Converts the date to an ISO 8601 formatted string in UTC. */
  toAbsoluteString(): string;
  /** Compares this date with another. A negative result indicates that this date is before the given one, and a positive date indicates that it is after. */
  compare(b: CalendarDate | CalendarDateTime | ZonedDateTime): number;
}

/** An interface that is compatible with any object with date fields. */
export interface AnyCalendarDate {
  readonly calendar: Calendar;
  readonly era: string;
  readonly year: number;
  readonly month: number;
  readonly day: number;
  copy(): this;
}

export type CalendarIdentifier =
  | "gregory"
  | "buddhist"
  | "chinese"
  | "coptic"
  | "dangi"
  | "ethioaa"
  | "ethiopic"
  | "hebrew"
  | "indian"
  | "islamic"
  | "islamic-umalqura"
  | "islamic-tbla"
  | "islamic-civil"
  | "islamic-rgsa"
  | "iso8601"
  | "japanese"
  | "persian"
  | "roc";

/**
 * The Calendar interface represents a calendar system, including information
 * about how days, months, years, and eras are organized, and methods to perform
 * arithmetic on dates.
 */
export interface Calendar {
  /**
   * A string identifier for the calendar, as defined by Unicode CLDR.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf#supported_calendar_types).
   */
  identifier: CalendarIdentifier;

  /** Creates a CalendarDate in this calendar from the given Julian day number. */
  fromJulianDay(jd: number): CalendarDate;
  /** Converts a date in this calendar to a Julian day number. */
  toJulianDay(date: AnyCalendarDate): number;

  /** Returns the number of days in the month of the given date. */
  getDaysInMonth(date: AnyCalendarDate): number;
  /** Returns the number of months in the year of the given date. */
  getMonthsInYear(date: AnyCalendarDate): number;
  /** Returns the number of years in the era of the given date. */
  getYearsInEra(date: AnyCalendarDate): number;
  /** Returns a list of era identifiers for the calendar. */
  getEras(): string[];

  /**
   * Returns the minimum month number of the given date's year.
   * Normally, this is 1, but in some calendars such as the Japanese,
   * eras may begin in the middle of a year.
   */
  getMinimumMonthInYear?(date: AnyCalendarDate): number;
  /**
   * Returns the minimum day number of the given date's month.
   * Normally, this is 1, but in some calendars such as the Japanese,
   * eras may begin in the middle of a month.
   */
  getMinimumDayInMonth?(date: AnyCalendarDate): number;
  /**
   * Returns a date that is the first day of the month for the given date.
   * This is used to determine the month that the given date falls in, if
   * the calendar has months that do not align with the standard calendar months
   * (e.g. fiscal calendars).
   */
  getFormattableMonth?(date: AnyCalendarDate): CalendarDate;

  /** Returns whether the given calendar is the same as this calendar. */
  isEqual?(calendar: Calendar): boolean;

  /** @private */
  balanceDate?(date: AnyCalendarDate): void;
  /** @private */
  balanceYearMonth?(date: AnyCalendarDate, previousDate: AnyCalendarDate): void;
  /** @private */
  constrainDate?(date: AnyCalendarDate): void;
  /** @private */
  isInverseEra?(date: AnyCalendarDate): boolean;
}

/** Represents an amount of time in calendar-specific units, for use when performing arithmetic. */
export interface DateDuration {
  /** The number of years to add or subtract. */
  years?: number;
  /** The number of months to add or subtract. */
  months?: number;
  /** The number of weeks to add or subtract. */
  weeks?: number;
  /** The number of days to add or subtract. */
  days?: number;
}

/** Represents an amount of time, for use whe performing arithmetic. */
export interface TimeDuration {
  /** The number of hours to add or subtract. */
  hours?: number;
  /** The number of minutes to add or subtract. */
  minutes?: number;
  /** The number of seconds to add or subtract. */
  seconds?: number;
  /** The number of milliseconds to add or subtract. */
  milliseconds?: number;
}

/** Represents an amount of time with both date and time components, for use when performing arithmetic. */
export interface DateTimeDuration extends DateDuration, TimeDuration {}

export interface DateFields {
  era?: string;
  year?: number;
  month?: number;
  day?: number;
}

export interface TimeFields {
  hour?: number;
  minute?: number;
  second?: number;
  millisecond?: number;
}

export type DateField = keyof DateFields;
export type TimeField = keyof TimeFields;

export type Disambiguation = "compatible" | "earlier" | "later" | "reject";

export interface CycleOptions {
  /** Whether to round the field value to the nearest interval of the amount. */
  round?: boolean;
}

export interface CycleTimeOptions extends CycleOptions {
  /**
   * Whether to use 12 or 24 hour time. If 12 hour time is chosen, the resulting value
   * will remain in the same day period as the original value (e.g. if the value is AM,
   * the resulting value also be AM).
   * @default 24
   */
  hourCycle?: 12 | 24;
}

export type DateValue = CalendarDate | CalendarDateTime | ZonedDateTime;
