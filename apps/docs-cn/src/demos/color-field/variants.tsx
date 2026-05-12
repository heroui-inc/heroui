import {ColorField, Label} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-4">
      <ColorField className="w-[280px]" defaultValue="#0485F7" name="primary-color">
        <Label>Primary variant</Label>
        <ColorField.Group variant="primary">
          <ColorField.Input />
        </ColorField.Group>
      </ColorField>
      <ColorField className="w-[280px]" defaultValue="#F43F5E" name="secondary-color">
        <Label>Secondary variant</Label>
        <ColorField.Group variant="secondary">
          <ColorField.Input />
        </ColorField.Group>
      </ColorField>
    </div>
  );
}
