"use client";

import {DateField, DateInputGroup, Surface} from "@heroui/react";

export function OnSurface() {
  return (
    <div className="flex h-[180px] w-[280px] items-center justify-center rounded-3xl bg-surface p-4">
      <Surface className="w-full">
        <DateField name="date">
          <DateInputGroup isOnSurface aria-label="Date" className="w-full">
            <DateInputGroup.Input>
              {(segment) => <DateInputGroup.Segment segment={segment} />}
            </DateInputGroup.Input>
          </DateInputGroup>
        </DateField>
      </Surface>
    </div>
  );
}
