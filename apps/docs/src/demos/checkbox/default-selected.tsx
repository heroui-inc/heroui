import {Checkbox, Label} from "@heroui/react";

export function DefaultSelected() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox defaultSelected id="notifications">
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
      </Checkbox>
      <Label htmlFor="notifications">Enable email notifications</Label>
    </div>
  );
}
