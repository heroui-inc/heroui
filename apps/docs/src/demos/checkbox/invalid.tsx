import {Checkbox, Description, Label} from "@heroui/react";

export function Invalid() {
  return (
    <Checkbox.Root isInvalid name="agreement">
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Content>
        <Label>I agree to the terms</Label>
        <Description>You must accept the terms to continue</Description>
      </Checkbox.Content>
    </Checkbox.Root>
  );
}
