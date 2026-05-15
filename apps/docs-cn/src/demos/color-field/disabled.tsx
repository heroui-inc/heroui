"use client";

import {ColorField, Description, Label} from "@heroui/react";

export function Disabled() {
  return (
    <div className="flex flex-col gap-4">
      <ColorField isDisabled className="w-[280px]" defaultValue="#0485F7" name="color">
        <Label>颜色</Label>
        <ColorField.Group>
          <ColorField.Input />
        </ColorField.Group>
        <Description>该颜色字段已禁用</Description>
      </ColorField>
      <ColorField isDisabled className="w-[280px]" name="color-empty">
        <Label>颜色</Label>
        <ColorField.Group>
          <ColorField.Input placeholder="#000000" />
        </ColorField.Group>
        <Description>该颜色字段已禁用</Description>
      </ColorField>
    </div>
  );
}
