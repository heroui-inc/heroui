import {Checkbox, CheckboxGroup, Description, Label} from "@heroui/react";

export function Disabled() {
  return (
    <CheckboxGroup isDisabled name="disabled-features">
      <Label>Features</Label>
      <Description>Feature selection is temporarily disabled</Description>
      <Checkbox value="feature1">
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Content>
          <Label>Feature 1</Label>
          <Description>This feature is coming soon</Description>
        </Checkbox.Content>
      </Checkbox>
      <Checkbox value="feature2">
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Content>
          <Label>Feature 2</Label>
          <Description>This feature is coming soon</Description>
        </Checkbox.Content>
      </Checkbox>
    </CheckboxGroup>
  );
}
