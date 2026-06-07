"use client";

import type {DateValue} from "@internationalized/date";

import {CircleQuestion} from "@gravity-ui/icons";
import {DateField, Label, ListBox, Select, Tooltip} from "@heroui/react";
import {parseDate, parseZonedDateTime} from "@internationalized/date";
import {useState} from "react";

export function Granularity() {
  const granularityOptions = [
    {id: "day", label: "日"},
    {id: "hour", label: "时"},
    {id: "minute", label: "分"},
    {id: "second", label: "秒"},
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
        <Label>预约日期</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
      </DateField>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Label>粒度</Label>
          <Tooltip delay={0}>
            <Tooltip.Trigger aria-label="粒度说明">
              <CircleQuestion className="size-4 text-muted" />
            </Tooltip.Trigger>
            <Tooltip.Content placement="bottom start">
              <p>决定日期选择器显示的最小单位。默认情况下，日期为「日」，时间为「分」。</p>
            </Tooltip.Content>
          </Tooltip>
        </div>
        <Select
          className="w-[110px]"
          placeholder="选择粒度"
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
