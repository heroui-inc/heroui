"use client";

import {DateInputGroup} from "@heroui/react";

export function Basic() {
  return (
    <DateInputGroup aria-label="Date" className="w-[256px]">
      <DateInputGroup.Input>
        {(segment) => <DateInputGroup.Segment segment={segment} />}
      </DateInputGroup.Input>
    </DateInputGroup>
  );
}
