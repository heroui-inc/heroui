import {Checkbox, Description, Label} from "@heroui/react";

export function Disabled() {
  return (
    <Checkbox isDisabled id="feature">
      <Checkbox.Button>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Label>Premium Feature</Label>
      </Checkbox.Button>
      <Description>This feature is coming soon</Description>
    </Checkbox>
  );
}
