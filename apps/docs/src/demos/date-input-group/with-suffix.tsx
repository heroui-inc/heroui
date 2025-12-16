"use client";

import {Calendar} from "@gravity-ui/icons";
import {DateInputGroup} from "@heroui/react";

export function WithSuffix() {
  return (
    <DateInputGroup aria-label="Date" className="w-[256px]">
      <DateInputGroup.Input>
        {(segment) => <DateInputGroup.Segment segment={segment} />}
      </DateInputGroup.Input>
      <DateInputGroup.Suffix>
        <Calendar className="size-4 text-muted" />
      </DateInputGroup.Suffix>
    </DateInputGroup>
  );
}
