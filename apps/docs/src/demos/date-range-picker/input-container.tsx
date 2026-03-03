"use client";

import type {TimeValue} from "@heroui/react";

import {DateField, DateRangePicker, Label, RangeCalendar, TimeField} from "@heroui/react";
import {getLocalTimeZone, parseZonedDateTime} from "@internationalized/date";

export function InputContainer() {
  const localTimeZone = getLocalTimeZone();

  const defaultValue = {
    end: parseZonedDateTime(`2026-02-10T18:45:00[${localTimeZone}]`),
    start: parseZonedDateTime(`2026-02-03T08:45:00[${localTimeZone}]`),
  };

  return (
    <DateRangePicker
      shouldForceLeadingZeros
      className="w-full max-w-2xs min-w-72"
      defaultValue={defaultValue}
      granularity="second"
      hourCycle={12}
    >
      {({state}) => (
        <>
          <Label>Date range</Label>
          <DateField.Group>
            <DateField.InputContainer>
              <DateField.Input slot="start">
                {(segment) => <DateField.Segment segment={segment} />}
              </DateField.Input>
              <DateRangePicker.RangeSeparator />
              <DateField.Input slot="end">
                {(segment) => <DateField.Segment segment={segment} />}
              </DateField.Input>
            </DateField.InputContainer>
            <DateField.Suffix>
              <DateRangePicker.Trigger>
                <DateRangePicker.TriggerIndicator />
              </DateRangePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>
          <DateRangePicker.Popover className="flex w-full flex-col gap-3">
            <RangeCalendar aria-label="Trip dates">
              <RangeCalendar.Header>
                <RangeCalendar.YearPickerTrigger>
                  <RangeCalendar.YearPickerTriggerHeading />
                  <RangeCalendar.YearPickerTriggerIndicator />
                </RangeCalendar.YearPickerTrigger>
                <RangeCalendar.NavButton slot="previous" />
                <RangeCalendar.NavButton slot="next" />
              </RangeCalendar.Header>
              <RangeCalendar.Grid>
                <RangeCalendar.GridHeader>
                  {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
                </RangeCalendar.GridHeader>
                <RangeCalendar.GridBody>
                  {(date) => <RangeCalendar.Cell date={date} />}
                </RangeCalendar.GridBody>
              </RangeCalendar.Grid>
              <RangeCalendar.YearPickerGrid>
                <RangeCalendar.YearPickerGridBody>
                  {({year}) => <RangeCalendar.YearPickerCell year={year} />}
                </RangeCalendar.YearPickerGridBody>
              </RangeCalendar.YearPickerGrid>
            </RangeCalendar>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Label>Start Time</Label>
                <TimeField
                  shouldForceLeadingZeros
                  aria-label="Start Time"
                  granularity="second"
                  hourCycle={12}
                  value={state.timeRange?.start ?? null}
                  onChange={(v) =>
                    state.setTimeRange({
                      end: state.timeRange?.end as TimeValue,
                      start: v as TimeValue,
                    })
                  }
                >
                  <TimeField.Group variant="secondary">
                    <TimeField.Input>
                      {(segment) => <TimeField.Segment segment={segment} />}
                    </TimeField.Input>
                  </TimeField.Group>
                </TimeField>
              </div>
              <div className="flex items-center justify-between">
                <Label>End Time</Label>
                <TimeField
                  shouldForceLeadingZeros
                  aria-label="End Time"
                  granularity="second"
                  hourCycle={12}
                  value={state.timeRange?.end ?? null}
                  onChange={(v) =>
                    state.setTimeRange({
                      end: v as TimeValue,
                      start: state.timeRange?.start as TimeValue,
                    })
                  }
                >
                  <TimeField.Group variant="secondary">
                    <TimeField.Input>
                      {(segment) => <TimeField.Segment segment={segment} />}
                    </TimeField.Input>
                  </TimeField.Group>
                </TimeField>
              </div>
            </div>
          </DateRangePicker.Popover>
        </>
      )}
    </DateRangePicker>
  );
}
