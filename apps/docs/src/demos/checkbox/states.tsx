"use client";

import {Checkbox, Label} from "@heroui/react";

export function States() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="flex items-center gap-3">
        <Checkbox id="default">
          <Checkbox.Indicator />
        </Checkbox>
        <Label htmlFor="default">Default</Label>
      </div>

      <div className="flex items-center gap-3">
        <Checkbox id="checked" defaultSelected>
          <Checkbox.Indicator />
        </Checkbox>
        <Label htmlFor="checked">Checked</Label>
      </div>

      <div className="flex items-center gap-3">
        <Checkbox id="disabled" isDisabled>
          <Checkbox.Indicator />
        </Checkbox>
        <Label htmlFor="disabled" className="opacity-50">Disabled</Label>
      </div>

      <div className="flex items-center gap-3">
        <Checkbox id="disabled-checked" isDisabled defaultSelected>
          <Checkbox.Indicator />
        </Checkbox>
        <Label htmlFor="disabled-checked" className="opacity-50">
          Disabled & Checked
        </Label>
      </div>

      <div className="flex items-center gap-3">
        <Checkbox id="invalid" isInvalid>
          <Checkbox.Indicator />
        </Checkbox>
        <Label htmlFor="invalid" className="text-red-600">Invalid</Label>
      </div>

      <div className="flex items-center gap-3">
        <Checkbox id="required" isRequired>
          <Checkbox.Indicator />
        </Checkbox>
        <Label htmlFor="required">
          Required <span className="text-red-500">*</span>
        </Label>
      </div>
    </div>
  );
}