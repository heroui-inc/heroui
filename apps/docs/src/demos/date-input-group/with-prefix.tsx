"use client";

import {Calendar} from "@gravity-ui/icons";
import {DateInputGroup} from "@heroui/react";

export function WithPrefix() {
  return (
    <DateInputGroup aria-label="Date" className="w-[256px]">
      <DateInputGroup.Prefix>
        <Calendar className="size-4 text-muted" />
      </DateInputGroup.Prefix>
      <DateInputGroup.Input>
        {(segment) => <DateInputGroup.Segment segment={segment} />}
      </DateInputGroup.Input>
    </DateInputGroup>
  );
}
