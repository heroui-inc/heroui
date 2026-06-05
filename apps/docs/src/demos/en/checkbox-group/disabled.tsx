import {Checkbox, CheckboxGroup, Description, Label} from "@heroui/react";

export function Disabled() {
  return (
    <CheckboxGroup isDisabled name="disabled-features">
      <Label>Features</Label>
      <Description>Feature selection is temporarily disabled</Description>
      <Checkbox value="feature1">
        <Checkbox.Button>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Label>Feature 1</Label>
        </Checkbox.Button>
        <Description>This feature is coming soon</Description>
      </Checkbox>
      <Checkbox value="feature2">
        <Checkbox.Button>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Label>Feature 2</Label>
        </Checkbox.Button>
        <Description>This feature is coming soon</Description>
      </Checkbox>
    </CheckboxGroup>
  );
}
