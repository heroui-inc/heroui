import {Checkbox, Description, Label} from "@heroui/react";

export function WithDescription() {
  return (
    <div className="flex gap-3">
      <Checkbox className="mt-0.5" id="notifications">
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
      </Checkbox>
      <div className="flex flex-col gap-1">
        <Label htmlFor="notifications">Email notifications</Label>
        <Description>Get notified when someone mentions you in a comment</Description>
      </div>
    </div>
  );
}
