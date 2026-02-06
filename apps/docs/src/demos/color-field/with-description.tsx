import {ColorField, ColorInputGroup, Description, Label} from "@heroui/react";

export function WithDescription() {
  return (
    <div className="flex flex-col gap-4">
      <ColorField className="w-[280px]" defaultValue="#3B82F6" name="color">
        <Label>Primary Color</Label>
        <ColorInputGroup>
          <ColorInputGroup.Input />
        </ColorInputGroup>
        <Description>Enter your brand's primary color</Description>
      </ColorField>
      <ColorField className="w-[280px]" defaultValue="#F59E0B" name="accent-color">
        <Label>Accent Color</Label>
        <ColorInputGroup>
          <ColorInputGroup.Input />
        </ColorInputGroup>
        <Description>Used for highlights and CTAs</Description>
      </ColorField>
    </div>
  );
}
