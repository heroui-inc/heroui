import {Checkbox, Description} from "@heroui/react";

export function Disabled() {
  return (
    <Checkbox isDisabled id="feature">
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        高级功能
      </Checkbox.Content>
      <Description>该功能即将推出</Description>
    </Checkbox>
  );
}
