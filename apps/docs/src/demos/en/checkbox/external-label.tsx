import {Checkbox, Label} from "@heroui/react";

export function ExternalLabel() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox id="label-marketing">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
        </Checkbox.Content>
      </Checkbox>
      <Label htmlFor="label-marketing">Send me marketing emails</Label>
    </div>
  );
}
