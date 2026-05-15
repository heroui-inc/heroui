import {Checkbox, Label} from "@heroui/react";

export function WithLabel() {
  return (
    <Checkbox id="label-marketing">
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Content>
        <Label htmlFor="label-marketing">接收营销邮件</Label>
      </Checkbox.Content>
    </Checkbox>
  );
}
