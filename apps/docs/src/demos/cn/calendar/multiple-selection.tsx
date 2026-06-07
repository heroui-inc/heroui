"use client";

import type {DateValue} from "@internationalized/date";

import {Calendar, Description} from "@heroui/react";
import {useState} from "react";

export function MultipleSelection() {
  const [value, setValue] = useState<readonly DateValue[]>([]);

  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar aria-label="活动日期" selectionMode="multiple" value={value} onChange={setValue}>
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
      <Description className="text-center">
        {value?.length ? `已选择 ${value.length} 个日期` : "可选择多个日期"}
      </Description>
    </div>
  );
}
