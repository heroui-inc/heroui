"use client";

import type {TimeValue} from "@heroui/react";
import type {DateValue} from "@internationalized/date";

import {
  Calendar,
  DateField,
  DatePicker,
  Label,
  ListBox,
  Select,
  Switch,
  TimeField,
} from "@heroui/react";
import {getLocalTimeZone, parseDate, parseZonedDateTime} from "@internationalized/date";
import {useMemo, useState} from "react";

type Granularity = "day" | "hour" | "minute" | "second";
type HourCycle = 12 | 24;
const granularityOptions: {label: string; value: Granularity}[] = [
  {label: "日", value: "day"},
  {label: "时", value: "hour"},
  {label: "分", value: "minute"},
  {label: "秒", value: "second"},
];
const hourCycleOptions: {label: string; value: HourCycle}[] = [
  {label: "12 小时制", value: 12},
  {label: "24 小时制", value: 24},
];

export function FormatOptions() {
  const [granularity, setGranularity] = useState<Granularity>("minute");
  const [hourCycle, setHourCycle] = useState<HourCycle>(12);
  const [hideTimeZone, setHideTimeZone] = useState(false);
  const [shouldForceLeadingZeros, setShouldForceLeadingZeros] = useState(false);
  const timeGranularity = granularity !== "day" ? granularity : undefined;
  const showTimeField = !!timeGranularity;
  const defaultValue = useMemo<DateValue>(() => {
    const localTimeZone = getLocalTimeZone();

    if (granularity === "day") {
      return parseDate("2026-02-03");
    }

    return parseZonedDateTime(`2026-02-03T08:45:00[${localTimeZone}]`);
  }, [granularity]);

  return (
    <div className="flex flex-col gap-4">
      <DatePicker
        key={granularity}
        className="w-fit min-w-72"
        defaultValue={defaultValue}
        granularity={granularity}
        hideTimeZone={hideTimeZone}
        hourCycle={hourCycle}
        name="date"
        shouldForceLeadingZeros={shouldForceLeadingZeros}
      >
        {({state}) => (
          <>
            <Label>日期和时间</Label>
            <DateField.Group fullWidth>
              <DateField.Input>
                {(segment) => <DateField.Segment segment={segment} />}
              </DateField.Input>
              <DateField.Suffix>
                <DatePicker.Trigger>
                  <DatePicker.TriggerIndicator />
                </DatePicker.Trigger>
              </DateField.Suffix>
            </DateField.Group>
            <DatePicker.Popover className="flex flex-col gap-3">
              <Calendar aria-label="活动日期">
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
              {!!showTimeField && (
                <div className="flex items-center justify-between">
                  <Label>时间</Label>
                  <TimeField
                    aria-label="时间"
                    granularity={timeGranularity}
                    hideTimeZone={hideTimeZone}
                    hourCycle={hourCycle}
                    name="time"
                    shouldForceLeadingZeros={shouldForceLeadingZeros}
                    value={state.timeValue}
                    onChange={(v) => state.setTimeValue(v as TimeValue)}
                  >
                    <TimeField.Group variant="secondary">
                      <TimeField.Input>
                        {(segment) => <TimeField.Segment segment={segment} />}
                      </TimeField.Input>
                    </TimeField.Group>
                  </TimeField>
                </div>
              )}
            </DatePicker.Popover>
          </>
        )}
      </DatePicker>

      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-1">
          <Select
            className="w-[120px]"
            value={granularity}
            variant="secondary"
            onChange={(value) => setGranularity(value as Granularity)}
          >
            <Label>粒度</Label>
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
            <Label>小时制</Label>
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

      <div className="flex min-w-80 flex-col gap-2">
        <Switch isSelected={hideTimeZone} onChange={setHideTimeZone}>
          <Switch.Content>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            隐藏时区
          </Switch.Content>
        </Switch>
        <Switch isSelected={shouldForceLeadingZeros} onChange={setShouldForceLeadingZeros}>
          <Switch.Content>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            强制前导零
          </Switch.Content>
        </Switch>
      </div>
    </div>
  );
}
