import {Checkbox, FieldError} from "@heroui/react";

export function Invalid() {
  return (
    <Checkbox isInvalid isRequired name="agreement">
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        I agree to the terms
      </Checkbox.Content>
      <FieldError>You must accept the terms to continue</FieldError>
    </Checkbox>
  );
}
