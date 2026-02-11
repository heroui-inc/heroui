"use client";

import type {DateValue} from "@internationalized/date";

import {Button, Calendar} from "@heroui/react";
import {getLocalTimeZone, isWeekend, today} from "@internationalized/date";
import {useState} from "react";
import {useLocale} from "react-aria-components";

export function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(null);
  const {locale} = useLocale();

  const bookedDates = [5, 6, 12, 13, 14, 20];

  const isDateUnavailable = (date: DateValue) => {
    return isWeekend(date, locale) || bookedDates.includes(date.day);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar
        aria-label="Booking date"
        isDateUnavailable={isDateUnavailable}
        minValue={today(getLocalTimeZone())}
        value={selectedDate}
        onChange={setSelectedDate}
      >
        <Calendar.Header>
          <Calendar.NavButton slot="previous" />
          <Calendar.Heading />
          <Calendar.NavButton slot="next" />
        </Calendar.Header>
        <Calendar.Grid>
          <Calendar.GridHeader>
            {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
          </Calendar.GridHeader>
          <Calendar.GridBody>
            {(date) => (
              <Calendar.Cell date={date}>
                {({formattedDate, isUnavailable}) => (
                  <>
                    {formattedDate}
                    {!isUnavailable &&
                      !isWeekend(date, locale) &&
                      bookedDates.includes(date.day) && <Calendar.CellIndicator />}
                  </>
                )}
              </Calendar.Cell>
            )}
          </Calendar.GridBody>
        </Calendar.Grid>
      </Calendar>

      <div className="flex flex-col gap-2 text-center">
        <div className="flex items-center justify-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-muted" /> Has bookings
          </span>
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-default" /> Weekend/Unavailable
          </span>
        </div>
        {selectedDate ? (
          <Button size="sm" variant="primary">
            Book {selectedDate.toString()}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
