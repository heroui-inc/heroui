"use client";

import type {DateValue} from "@internationalized/date";

import {Calendar, DateField, DatePicker, Label, ListBox, Select, Switch} from "@heroui/react";
import {parseDate, parseZonedDateTime} from "@internationalized/date";
import {useMemo, useState} from "react";

type Granularity = "day" | "hour" | "minute" | "second";
type HourCycle = 12 | 24;
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
  const [granularity, setGranularity] = useState<Granularity>("day");
  const [hourCycle, setHourCycle] = useState<HourCycle>(12);
  const [hideTimeZone, setHideTimeZone] = useState(false);
  const [shouldForceLeadingZeros, setShouldForceLeadingZeros] = useState(false);

  const defaultValue = useMemo<DateValue>(() => {
    if (granularity === "day") {
      return parseDate("2025-02-03");
    }

    return parseZonedDateTime("2025-02-03T08:45:00[America/Los_Angeles]");
  }, [granularity]);

  return (
    <div className="flex flex-col gap-4">
      <DatePicker
        key={granularity}
        className="min-w-64"
        defaultValue={defaultValue}
        granularity={granularity}
        hideTimeZone={hideTimeZone}
        hourCycle={hourCycle}
        name="date"
        shouldForceLeadingZeros={shouldForceLeadingZeros}
      >
        <Label>Date and time</Label>
        <DateField.Group fullWidth>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
          <DateField.Suffix>
            <DatePicker.Trigger>
              <DatePicker.TriggerIndicator />
            </DatePicker.Trigger>
          </DateField.Suffix>
        </DateField.Group>
        <DatePicker.Popover>
          <Calendar aria-label="Event date">
            <Calendar.Header>
              <Calendar.YearPickerTrigger>
                <Calendar.YearPickerTriggerHeading />
                <Calendar.YearPickerTriggerIndicator />
              </Calendar.YearPickerTrigger>
              <Calendar.NavButton slot="previous" />
              <Calendar.NavButton slot="next" />
            </Calendar.Header>
            <Calendar.Grid>
              <Calendar.GridHeader>
                {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
              </Calendar.GridHeader>
              <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
            </Calendar.Grid>
            <Calendar.YearPickerGrid>
              <Calendar.YearPickerGridBody>
                {({year}) => <Calendar.YearPickerCell year={year} />}
              </Calendar.YearPickerGridBody>
            </Calendar.YearPickerGrid>
          </Calendar>
        </DatePicker.Popover>
      </DatePicker>

      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-1">
          <Label>Granularity</Label>
          <Select
            className="w-[120px]"
            value={granularity}
            variant="secondary"
            onChange={(value) => setGranularity(value as Granularity)}
          >
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
          <Label>Hour cycle</Label>
          <Select
            className="w-[120px]"
            value={hourCycle}
            variant="secondary"
            onChange={(value) => setHourCycle(Number(value) as HourCycle)}
          >
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

      <div className="flex flex-col gap-2">
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
