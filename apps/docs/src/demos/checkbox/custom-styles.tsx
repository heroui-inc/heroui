import {Checkbox, Label} from "@heroui/react";

export function CustomStyles() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox id="custom">
        <Checkbox.Control className="border-2 border-purple-500 data-[selected=true]:border-purple-500 data-[selected=true]:bg-purple-500">
          <Checkbox.Indicator className="text-white" />
        </Checkbox.Control>
      </Checkbox>
      <Label htmlFor="custom">Custom styled checkbox</Label>
    </div>
  );
}
