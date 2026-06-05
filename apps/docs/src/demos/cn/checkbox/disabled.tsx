import {Checkbox, Description, Label} from "@heroui/react";

export function Disabled() {
  return (
    <Checkbox isDisabled id="feature">
      <Checkbox.Button>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Label>高级功能</Label>
      </Checkbox.Button>
      <Description>该功能即将推出</Description>
    </Checkbox>
  );
}
