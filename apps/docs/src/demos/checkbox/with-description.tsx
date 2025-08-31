"use client";

import {Checkbox, Label, Description} from "@heroui/react";

export function WithDescription() {
  return (
    <div className="flex gap-3">
      <Checkbox className="mt-0.5" id="notifications">
        <Checkbox.Indicator />
      </Checkbox>
      <div className="flex flex-col gap-1">
        <Label htmlFor="notifications">Email notifications</Label>
        <Description>Get notified when someone mentions you</Description>
      </div>
    </div>
  );
}