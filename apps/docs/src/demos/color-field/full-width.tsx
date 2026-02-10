import {ColorField, ColorInputGroup, Label} from "@heroui/react";

export function FullWidth() {
  return (
    <div className="w-[400px] space-y-4">
      <ColorField fullWidth defaultValue="#10B981" name="color">
        <Label>Brand Color</Label>
        <ColorInputGroup>
          <ColorInputGroup.Input />
        </ColorInputGroup>
      </ColorField>
      <ColorField fullWidth defaultValue="#8B5CF6" name="color-with-suffix">
        <Label>Theme Color</Label>
        <ColorInputGroup>
          <ColorInputGroup.Input />
        </ColorInputGroup>
      </ColorField>
    </div>
  );
}
