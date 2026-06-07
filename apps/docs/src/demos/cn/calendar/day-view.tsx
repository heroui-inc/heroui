"use client";

import {Calendar, Label, ListBox, Select} from "@heroui/react";
import {useState} from "react";

const dayOptions = [
  {id: "1", name: "1 天"},
  {id: "5", name: "5 天"},
  {id: "7", name: "7 天"},
  {id: "8", name: "8 天"},
  {id: "10", name: "10 天"},
  {id: "14", name: "14 天"},
  {id: "21", name: "21 天"},
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
        <Label>可见天数</Label>
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

      <Calendar aria-label="日视图" visibleDuration={{days}}>
        <Calendar.Header>
          <Calendar.Heading />
          <Calendar.NavButton slot="previous" />
          <Calendar.NavButton slot="next" />
        </Calendar.Header>
        <Calendar.Grid>
          <Calendar.GridHeader>
            {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
          </Calendar.GridHeader>
          <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
        </Calendar.Grid>
      </Calendar>
    </div>
  );
}
