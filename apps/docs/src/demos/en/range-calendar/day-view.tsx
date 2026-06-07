"use client";

import {Label, ListBox, RangeCalendar, Select} from "@heroui/react";
import {useState} from "react";

const dayOptions = [
  {id: "1", name: "1 day"},
  {id: "5", name: "5 days"},
  {id: "7", name: "7 days"},
  {id: "8", name: "8 days"},
  {id: "10", name: "10 days"},
  {id: "14", name: "14 days"},
  {id: "21", name: "21 days"},
] as const;

export function DayView() {
  const [days, setDays] = useState(5);

  return (
    <div className="flex flex-col items-center gap-6">
      <Select
        className="w-40"
        value={String(days)}
        onChange={(value) => value && setDays(Number(value))}
      >
        <Label>Visible days</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {dayOptions.map((option) => (
              <ListBox.Item key={option.id} id={option.id} textValue={option.name}>
                {option.name}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>

      <RangeCalendar key={days} aria-label="Trip dates" visibleDuration={{days}}>
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
            {(date) => <RangeCalendar.Cell date={date} />}
          </RangeCalendar.GridBody>
        </RangeCalendar.Grid>
      </RangeCalendar>
    </div>
  );
}
