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
        <Checkbox defaultSelected id="checked">
          <Checkbox.Indicator />
        </Checkbox>
        <Label htmlFor="checked">Checked</Label>
      </div>

      <div className="flex items-center gap-3">
        <Checkbox isDisabled id="disabled">
          <Checkbox.Indicator />
        </Checkbox>
        <Label className="opacity-50" htmlFor="disabled">
          Disabled
        </Label>
      </div>

      <div className="flex items-center gap-3">
        <Checkbox defaultSelected isDisabled id="disabled-checked">
          <Checkbox.Indicator />
        </Checkbox>
        <Label className="opacity-50" htmlFor="disabled-checked">
          Disabled & Checked
        </Label>
      </div>

      <div className="flex items-center gap-3">
        <Checkbox isInvalid id="invalid">
          <Checkbox.Indicator />
        </Checkbox>
        <Label className="text-red-600" htmlFor="invalid">
          Invalid
        </Label>
      </div>

      <div className="flex items-center gap-3">
        <Checkbox isRequired id="required">
          <Checkbox.Indicator />
        </Checkbox>
        <Label htmlFor="required">
          Required <span className="text-red-500">*</span>
        </Label>
      </div>
    </div>
  );
}
