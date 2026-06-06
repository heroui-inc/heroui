import {Checkbox, Description} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Primary variant</p>
        <Checkbox id="primary" name="primary" variant="primary">
          <Checkbox.Content>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            Primary checkbox
          </Checkbox.Content>
          <Description>Standard styling with default background</Description>
        </Checkbox>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Secondary variant</p>
        <Checkbox id="secondary" name="secondary" variant="secondary">
          <Checkbox.Content>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            Secondary checkbox
          </Checkbox.Content>
          <Description>Lower emphasis variant for use in surfaces</Description>
        </Checkbox>
      </div>
    </div>
  );
}
