import {ColorField, Description, Label, Surface} from "@heroui/react";

export function OnSurface() {
  return (
    <Surface className="w-[320px] p-4">
      <ColorField defaultValue="#3B82F6" name="color">
        <Label>主题色</Label>
        <ColorField.Group variant="secondary">
          <ColorField.Input />
        </ColorField.Group>
        <Description>选择你的主题色</Description>
      </ColorField>
    </Surface>
  );
}
