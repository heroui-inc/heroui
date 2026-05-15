import {Checkbox, Description, Label} from "@heroui/react";

export function Invalid() {
  return (
    <Checkbox isInvalid id="agreement" name="agreement">
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Content>
        <Label htmlFor="agreement">我同意条款</Label>
        <Description>请勾选同意条款后继续</Description>
      </Checkbox.Content>
    </Checkbox>
  );
}
