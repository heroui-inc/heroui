import {Checkbox, CheckboxGroup, Description, Label} from "@heroui/react";

export function Disabled() {
  return (
    <CheckboxGroup isDisabled name="disabled-features">
      <Label>Features</Label>
      <Description>Feature selection is temporarily disabled</Description>
      <Checkbox value="feature1">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          Feature 1
        </Checkbox.Content>
        <Description>This feature is coming soon</Description>
      </Checkbox>
      <Checkbox value="feature2">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          Feature 2
        </Checkbox.Content>
        <Description>This feature is coming soon</Description>
      </Checkbox>
    </CheckboxGroup>
  );
}
