import {Checkbox, Description, Label} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Primary variant</p>
        <Checkbox id="primary" name="primary" variant="primary">
          <Checkbox.Button>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Label>Primary checkbox</Label>
          </Checkbox.Button>
          <Description>Standard styling with default background</Description>
        </Checkbox>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Secondary variant</p>
        <Checkbox id="secondary" name="secondary" variant="secondary">
          <Checkbox.Button>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Label>Secondary checkbox</Label>
          </Checkbox.Button>
          <Description>Lower emphasis variant for use in surfaces</Description>
        </Checkbox>
      </div>
    </div>
  );
}
