"use client";

import {Calendar, Label, ListBox, Select} from "@heroui/react";
import {useState} from "react";

const weekOptions = [
  {id: "1", name: "1 week"},
  {id: "2", name: "2 weeks"},
  {id: "3", name: "3 weeks"},
  {id: "4", name: "4 weeks"},
  {id: "5", name: "5 weeks"},
  {id: "6", name: "6 weeks"},
  {id: "8", name: "8 weeks"},
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
        <Label>Visible weeks</Label>
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

      <Calendar aria-label="Week view" visibleDuration={{weeks}}>
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
