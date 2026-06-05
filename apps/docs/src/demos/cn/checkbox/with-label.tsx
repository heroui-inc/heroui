import {Checkbox, Label} from "@heroui/react";

export function WithLabel() {
  return (
    <Checkbox id="label-marketing">
      <Checkbox.Button>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Label>接收营销邮件</Label>
      </Checkbox.Button>
    </Checkbox>
  );
}
