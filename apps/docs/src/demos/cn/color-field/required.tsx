import {ColorField, Description, Label} from "@heroui/react";

export function Required() {
  return (
    <div className="flex flex-col gap-4">
      <ColorField isRequired className="w-[280px]" name="color">
        <Label>品牌色</Label>
        <ColorField.Group>
          <ColorField.Input placeholder="#000000" />
        </ColorField.Group>
      </ColorField>
      <ColorField isRequired className="w-[280px]" name="theme-color">
        <Label>主题色</Label>
        <ColorField.Group>
          <ColorField.Input placeholder="#000000" />
        </ColorField.Group>
        <Description>必填项</Description>
      </ColorField>
    </div>
  );
}
