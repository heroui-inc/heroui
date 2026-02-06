import {ColorField, ColorInputGroup, Description, Label, Surface} from "@heroui/react";

export function OnSurface() {
  return (
    <Surface className="w-[320px] p-4">
      <ColorField defaultValue="#3B82F6" name="color">
        <Label>Theme Color</Label>
        <ColorInputGroup variant="secondary">
          <ColorInputGroup.Input />
        </ColorInputGroup>
        <Description>Select your theme color</Description>
      </ColorField>
    </Surface>
  );
}
