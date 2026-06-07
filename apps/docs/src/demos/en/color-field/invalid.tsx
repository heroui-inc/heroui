import {ColorField, FieldError, Label} from "@heroui/react";

export function Invalid() {
  return (
    <div className="flex flex-col gap-4">
      <ColorField isInvalid isRequired className="w-[280px]" name="color">
        <Label>Color</Label>
        <ColorField.Group>
          <ColorField.Input placeholder="#000000" />
        </ColorField.Group>
        <FieldError>Please enter a valid hex color</FieldError>
      </ColorField>
      <ColorField isInvalid className="w-[280px]" name="invalid-color">
        <Label>Background Color</Label>
        <ColorField.Group>
          <ColorField.Input defaultValue="not-a-color" />
        </ColorField.Group>
        <FieldError>Invalid color format. Use hex (e.g., #FF5733)</FieldError>
      </ColorField>
    </div>
  );
}
