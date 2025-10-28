import {Checkbox, Label} from "@heroui/react";

export function Basic() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox id="terms">
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
      </Checkbox>
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  );
}
