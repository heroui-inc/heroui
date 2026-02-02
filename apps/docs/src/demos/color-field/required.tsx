import {ColorField, ColorInputGroup, Description, Label} from "@heroui/react";

export function Required() {
  return (
    <div className="flex flex-col gap-4">
      <ColorField isRequired className="w-[280px]" name="color">
        <Label>Brand Color</Label>
        <ColorInputGroup>
          <ColorInputGroup.Input placeholder="#000000" />
        </ColorInputGroup>
      </ColorField>
      <ColorField isRequired className="w-[280px]" name="theme-color">
        <Label>Theme Color</Label>
        <ColorInputGroup>
          <ColorInputGroup.Input placeholder="#000000" />
        </ColorInputGroup>
        <Description>Required field</Description>
      </ColorField>
    </div>
  );
}
