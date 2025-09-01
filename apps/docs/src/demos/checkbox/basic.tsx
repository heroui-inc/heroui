"use client";

import {Checkbox, Label} from "@heroui/react";

export function Basic() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox id="terms">
        <Checkbox.Indicator />
      </Checkbox>
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  );
}
