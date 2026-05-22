import {ColorField, Description, Label} from "@heroui/react";

export function WithDescription() {
  return (
    <div className="flex flex-col gap-4">
      <ColorField className="w-[280px]" defaultValue="#3B82F6" name="color">
        <Label>主色</Label>
        <ColorField.Group>
          <ColorField.Input />
        </ColorField.Group>
        <Description>输入品牌主色</Description>
      </ColorField>
      <ColorField className="w-[280px]" defaultValue="#F59E0B" name="accent-color">
        <Label>强调色</Label>
        <ColorField.Group>
          <ColorField.Input />
        </ColorField.Group>
        <Description>用于高亮与行动按钮</Description>
      </ColorField>
    </div>
  );
}
