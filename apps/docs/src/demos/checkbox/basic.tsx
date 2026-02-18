import {Checkbox, Label} from "@heroui/react";

export function Basic() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox id="basic-terms">
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
      </Checkbox>
      <Checkbox.Content>
        <Label htmlFor="basic-terms">Accept terms and conditions</Label>
      </Checkbox.Content>
    </div>
  );
}
