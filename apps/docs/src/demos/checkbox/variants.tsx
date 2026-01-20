import {Checkbox, Description, Label} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Primary variant</p>
        <Checkbox name="primary" variant="primary">
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label>Primary checkbox</Label>
            <Description>Standard styling with default background</Description>
          </Checkbox.Content>
        </Checkbox>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Secondary variant</p>
        <Checkbox name="secondary" variant="secondary">
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label>Secondary checkbox</Label>
            <Description>Lower emphasis variant for use in surfaces</Description>
          </Checkbox.Content>
        </Checkbox>
      </div>
    </div>
  );
}
