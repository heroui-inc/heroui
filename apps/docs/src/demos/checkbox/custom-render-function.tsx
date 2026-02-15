import {Checkbox, Label} from "@heroui/react";

export function CustomRenderFunction() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox id="basic-terms" render={(props) => <label {...props} data-custom="bar" />}>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
      </Checkbox>
      <Label htmlFor="basic-terms">Accept terms and conditions</Label>
    </div>
  );
}
