"use client";

import type {DateValue} from "@internationalized/date";

import {Button, RangeCalendar} from "@heroui/react";
import {getLocalTimeZone, isWeekend, today} from "@internationalized/date";
import {useState} from "react";
import {useLocale} from "react-aria-components";

type DateRange = {
  start: DateValue;
  end: DateValue;
};

export function BookingCalendar() {
  const [selectedRange, setSelectedRange] = useState<DateRange | null>(null);
  const {locale} = useLocale();
  const blockedDates = [5, 6, 12, 13, 14, 20];

  const isDateUnavailable = (date: DateValue) => {
    return isWeekend(date, locale) || blockedDates.includes(date.day);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <RangeCalendar
        aria-label="Booking range"
        isDateUnavailable={isDateUnavailable}
        minValue={today(getLocalTimeZone())}
        value={selectedRange}
        onChange={setSelectedRange}
      >
        <RangeCalendar.Header>
          <RangeCalendar.Heading />
          <RangeCalendar.NavButton slot="previous" />
          <RangeCalendar.NavButton slot="next" />
        </RangeCalendar.Header>
        <RangeCalendar.Grid>
          <RangeCalendar.GridHeader>
            {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
          </RangeCalendar.GridHeader>
          <RangeCalendar.GridBody>
            {(date) => (
              <RangeCalendar.Cell date={date}>
                {({formattedDate, isUnavailable}) => (
                  <>
                    {formattedDate}
                    {!isUnavailable &&
                      !isWeekend(date, locale) &&
                      blockedDates.includes(date.day) && <RangeCalendar.CellIndicator />}
                  </>
                )}
              </RangeCalendar.Cell>
            )}
          </RangeCalendar.GridBody>
        </RangeCalendar.Grid>
      </RangeCalendar>
      <div className="flex flex-col gap-2 text-center">
        <div className="flex items-center justify-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-muted" /> Blocked dates
          </span>
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-default" /> Weekend/Unavailable
          </span>
        </div>
        {selectedRange ? (
          <Button size="sm" variant="primary">
            Book {selectedRange.start.toString()} -&gt; {selectedRange.end.toString()}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
