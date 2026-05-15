import {ColorField, FieldError, Label} from "@heroui/react";

export function Invalid() {
  return (
    <div className="flex flex-col gap-4">
      <ColorField isInvalid isRequired className="w-[280px]" name="color">
        <Label>颜色</Label>
        <ColorField.Group>
          <ColorField.Input placeholder="#000000" />
        </ColorField.Group>
        <FieldError>请输入有效的十六进制颜色</FieldError>
      </ColorField>
      <ColorField isInvalid className="w-[280px]" name="invalid-color">
        <Label>背景色</Label>
        <ColorField.Group>
          <ColorField.Input defaultValue="not-a-color" />
        </ColorField.Group>
        <FieldError>颜色格式无效，请使用十六进制（例如 #FF5733）</FieldError>
      </ColorField>
    </div>
  );
}
