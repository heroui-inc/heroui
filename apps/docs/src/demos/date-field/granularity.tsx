"use client";

import type {DateValue} from "@internationalized/date";

import {CircleQuestion} from "@gravity-ui/icons";
import {DateField, DateInputGroup, Label, ListBox, Select, Tooltip} from "@heroui/react";
import {parseDate, parseZonedDateTime} from "@internationalized/date";
import {useState} from "react";

export function Granularity() {
  const granularityOptions = [
    {id: "day", label: "Day"},
    {id: "hour", label: "Hour"},
    {id: "minute", label: "Minute"},
    {id: "second", label: "Second"},
  ] as const;

  const [granularity, setGranularity] = useState<"day" | "hour" | "minute" | "second">("day");

  // Determine appropriate default value based on granularity
  let defaultValue: DateValue;

  if (granularity === "day") {
    defaultValue = parseDate("2025-02-03");
  } else {
    // hour, minute, second
    defaultValue = parseZonedDateTime("2025-02-03T08:45:00[America/Los_Angeles]");
  }

  return (
    <div className="flex gap-4">
      <DateField
        className="w-[256px]"
        defaultValue={defaultValue}
        granularity={granularity}
        name="granularity-date"
      >
        <Label>Appointment Date</Label>
        <DateInputGroup>
          <DateInputGroup.Input>
            {(segment) => <DateInputGroup.Segment segment={segment} />}
          </DateInputGroup.Input>
        </DateInputGroup>
      </DateField>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Label>Granularity</Label>
          <Tooltip delay={0}>
            <Tooltip.Trigger aria-label="Granularity information">
              <CircleQuestion className="size-4 text-muted" />
            </Tooltip.Trigger>
            <Tooltip.Content placement="bottom start">
              <p>
                Determines the smallest unit displayed in the date picker. By default, this is "day"
                for dates, and "minute" for times.
              </p>
            </Tooltip.Content>
          </Tooltip>
        </div>
        <Select
          className="w-[110px]"
          placeholder="Select granularity"
          value={granularity}
          variant="secondary"
          onChange={(value) => setGranularity(value as typeof granularity)}
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {granularityOptions.map((option) => (
                <ListBox.Item key={option.id} id={option.id} textValue={option.label}>
                  {option.label}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>
    </div>
  );
}
