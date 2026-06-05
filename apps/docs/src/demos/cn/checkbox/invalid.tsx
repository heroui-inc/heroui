import {Checkbox, FieldError, Label} from "@heroui/react";

export function Invalid() {
  return (
    <Checkbox isInvalid isRequired name="agreement">
      <Checkbox.Button>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Label>我同意条款</Label>
      </Checkbox.Button>
      <FieldError>您必须接受条款才能继续</FieldError>
    </Checkbox>
  );
}
