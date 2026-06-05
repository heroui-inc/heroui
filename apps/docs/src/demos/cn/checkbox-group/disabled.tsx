import {Checkbox, CheckboxGroup, Description, Label} from "@heroui/react";

export function Disabled() {
  return (
    <CheckboxGroup isDisabled name="disabled-features">
      <Label>功能</Label>
      <Description>功能选择暂时不可用</Description>
      <Checkbox value="feature1">
        <Checkbox.Button>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Label>功能一</Label>
        </Checkbox.Button>
        <Description>该功能即将推出</Description>
      </Checkbox>
      <Checkbox value="feature2">
        <Checkbox.Button>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Label>功能二</Label>
        </Checkbox.Button>
        <Description>该功能即将推出</Description>
      </Checkbox>
    </CheckboxGroup>
  );
}
