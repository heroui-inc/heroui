import {Checkbox, Description, Label} from "@heroui/react";

export function Disabled() {
  return (
    <Checkbox isDisabled className="mt-0.5" id="feature">
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Content>
        <Label htmlFor="feature">Premium Feature</Label>
        <Description>This feature is coming soon</Description>
      </Checkbox.Content>
    </Checkbox>
  );
}
