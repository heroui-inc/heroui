import {Checkbox, FieldError} from "@heroui/react";

export function Invalid() {
  return (
    <Checkbox isInvalid isRequired name="agreement">
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        我同意条款
      </Checkbox.Content>
      <FieldError>您必须接受条款才能继续</FieldError>
    </Checkbox>
  );
}
