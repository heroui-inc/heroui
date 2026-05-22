import {ColorField, Label} from "@heroui/react";

export function FullWidth() {
  return (
    <div className="w-[400px] space-y-4">
      <ColorField fullWidth defaultValue="#10B981" name="color">
        <Label>品牌色</Label>
        <ColorField.Group>
          <ColorField.Input />
        </ColorField.Group>
      </ColorField>
      <ColorField fullWidth defaultValue="#8B5CF6" name="color-with-suffix">
        <Label>主题色</Label>
        <ColorField.Group>
          <ColorField.Input />
        </ColorField.Group>
      </ColorField>
    </div>
  );
}
