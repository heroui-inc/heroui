"use client";

import {Label, ListBox, RangeCalendar, Select} from "@heroui/react";
import {useState} from "react";

const weekOptions = [
  {id: "1", name: "1 周"},
  {id: "2", name: "2 周"},
  {id: "3", name: "3 周"},
  {id: "4", name: "4 周"},
  {id: "5", name: "5 周"},
  {id: "6", name: "6 周"},
  {id: "8", name: "8 周"},
] as const;

export function WeekView() {
  const [weeks, setWeeks] = useState(1);

  return (
    <div className="flex flex-col items-center gap-6">
      <Select
        className="w-40"
        value={String(weeks)}
        onChange={(value) => value && setWeeks(Number(value))}
      >
        <Label>可见周数</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {weekOptions.map((option) => (
              <ListBox.Item key={option.id} id={option.id} textValue={option.name}>
                {option.name}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>

      <RangeCalendar key={weeks} aria-label="行程日期" visibleDuration={{weeks}}>
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
