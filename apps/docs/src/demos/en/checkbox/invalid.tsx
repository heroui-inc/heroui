import {Checkbox, FieldError, Label} from "@heroui/react";

export function Invalid() {
  return (
    <Checkbox isInvalid isRequired name="agreement">
      <Checkbox.Button>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Label>I agree to the terms</Label>
      </Checkbox.Button>
      <FieldError>You must accept the terms to continue</FieldError>
    </Checkbox>
  );
}
