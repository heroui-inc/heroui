"use client";

import {ColorField, ColorInputGroup, Description, Label} from "@heroui/react";

export function Disabled() {
  return (
    <div className="flex flex-col gap-4">
      <ColorField isDisabled className="w-[280px]" defaultValue="#0485F7" name="color">
        <Label>Color</Label>
        <ColorInputGroup>
          <ColorInputGroup.Input />
        </ColorInputGroup>
        <Description>This color field is disabled</Description>
      </ColorField>
      <ColorField isDisabled className="w-[280px]" name="color-empty">
        <Label>Color</Label>
        <ColorInputGroup>
          <ColorInputGroup.Input placeholder="#000000" />
        </ColorInputGroup>
        <Description>This color field is disabled</Description>
      </ColorField>
    </div>
  );
}
