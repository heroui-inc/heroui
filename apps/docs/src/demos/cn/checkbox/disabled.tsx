import {Checkbox, Description, Label} from "@heroui/react";

export function Disabled() {
  return (
    <Checkbox isDisabled id="feature">
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Content>
        <Label htmlFor="feature">高级功能</Label>
        <Description>该功能即将推出</Description>
      </Checkbox.Content>
    </Checkbox>
  );
}
