"use client";

import type {TimeValue} from "@heroui/react";
import type {DateValue} from "@internationalized/date";

import {
  DateField,
  DateRangePicker,
  Label,
  ListBox,
  RangeCalendar,
  Select,
  Switch,
  TimeField,
  useLocale,
} from "@heroui/react";
import {
  DateFormatter,
  getLocalTimeZone,
  parseDate,
  parseZonedDateTime,
} from "@internationalized/date";
import {useMemo, useState} from "react";

type Granularity = "day" | "hour" | "minute" | "second";
type HourCycle = 12 | 24;
type DateRange = {
  start: DateValue;
  end: DateValue;
};

const granularityOptions: {label: string; value: Granularity}[] = [
  {label: "Day", value: "day"},
  {label: "Hour", value: "hour"},
  {label: "Minute", value: "minute"},
  {label: "Second", value: "second"},
];

const hourCycleOptions: {label: string; value: HourCycle}[] = [
  {label: "12-hour", value: 12},
  {label: "24-hour", value: 24},
];

export function FormatOptions() {
  const [granularity, setGranularity] = useState<Granularity>("minute");
  const [hourCycle, setHourCycle] = useState<HourCycle>(12);
  const [hideTimeZone, setHideTimeZone] = useState(false);
  const [shouldForceLeadingZeros, setShouldForceLeadingZeros] = useState(false);
  const {locale} = useLocale();
  const dateFormatter = new DateFormatter(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formatDate = (date: DateRange) => {
    const localTimeZone = getLocalTimeZone();
    const start = date.start.toDate(localTimeZone);
    const end = date.end.toDate(localTimeZone);

    return dateFormatter.formatRange(start, end);
  };

  const defaultValue = useMemo<DateRange>(() => {
    const localTimeZone = getLocalTimeZone();

    if (granularity === "day") {
      return {
        end: parseDate("2025-02-10"),
        start: parseDate("2025-02-03"),
      };
    }

    return {
      end: parseZonedDateTime(`2026-02-10T18:45:00[${localTimeZone}]`),
      start: parseZonedDateTime(`2026-02-03T08:45:00[${localTimeZone}]`),
    };
  }, [granularity]);

  const timeGranularity = granularity !== "day" ? granularity : undefined;
  const showTimeField = !!timeGranularity;

  return (
    <div className="flex w-full flex-col gap-4">
      <DateRangePicker
        key={granularity}
        className="w-full min-w-72"
        defaultValue={defaultValue}
        endName="endDate"
        granularity={granularity}
        hideTimeZone={hideTimeZone}
        hourCycle={hourCycle}
        shouldForceLeadingZeros={shouldForceLeadingZeros}
        startName="startDate"
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
              {!!showTimeField && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Label>Start Time</Label>
                    <TimeField
                      aria-label="Start Time"
                      granularity={timeGranularity}
                      hideTimeZone={hideTimeZone}
                      hourCycle={hourCycle}
                      name="startTime"
                      shouldForceLeadingZeros={shouldForceLeadingZeros}
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
                      aria-label="End Time"
                      granularity={timeGranularity}
                      hideTimeZone={hideTimeZone}
                      hourCycle={hourCycle}
                      name="endTime"
                      shouldForceLeadingZeros={shouldForceLeadingZeros}
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
              )}
              <span className="mt-1 text-xs text-muted">
                Selected:{" "}
                {state.value && state.value.start && state.value.end
                  ? formatDate({end: state.value.end, start: state.value.start})
                  : "No date selected"}
              </span>
            </DateRangePicker.Popover>
          </>
        )}
      </DateRangePicker>

      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-1">
          <Select
            className="w-[120px]"
            name="granularity"
            value={granularity}
            variant="secondary"
            onChange={(value) => setGranularity(value as Granularity)}
          >
            <Label>Granularity</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {granularityOptions.map((option) => (
                  <ListBox.Item key={option.value} id={option.value} textValue={option.label}>
                    {option.label}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <Select
            className="w-[120px]"
            value={hourCycle}
            variant="secondary"
            onChange={(value) => setHourCycle(Number(value) as HourCycle)}
          >
            <Label>Hour cycle</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {hourCycleOptions.map((option) => (
                  <ListBox.Item key={option.value} id={option.value} textValue={option.label}>
                    {option.label}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </div>

      <div className="flex min-w-[529px] flex-col gap-2">
        <Switch isSelected={hideTimeZone} onChange={setHideTimeZone}>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">Hide timezone</Label>
        </Switch>
        <Switch isSelected={shouldForceLeadingZeros} onChange={setShouldForceLeadingZeros}>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label className="text-sm">Force leading zeros</Label>
        </Switch>
      </div>
    </div>
  );
}
