import {Checkbox, Label} from "@heroui/react";

export function WithLabel() {
  return (
    <Checkbox id="label-marketing">
      <Checkbox.Button>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Label>Send me marketing emails</Label>
      </Checkbox.Button>
    </Checkbox>
  );
}
