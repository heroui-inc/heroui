"use client";

import {ColorField, ColorInputGroup, FieldError, Label} from "@heroui/react";

export function Invalid() {
  return (
    <div className="flex flex-col gap-4">
      <ColorField isInvalid isRequired className="w-[280px]" name="color">
        <Label>Color</Label>
        <ColorInputGroup>
          <ColorInputGroup.Input placeholder="#000000" />
        </ColorInputGroup>
        <FieldError>Please enter a valid hex color</FieldError>
      </ColorField>
      <ColorField isInvalid className="w-[280px]" name="invalid-color">
        <Label>Background Color</Label>
        <ColorInputGroup>
          <ColorInputGroup.Input defaultValue="not-a-color" />
        </ColorInputGroup>
        <FieldError>Invalid color format. Use hex (e.g., #FF5733)</FieldError>
      </ColorField>
    </div>
  );
}
