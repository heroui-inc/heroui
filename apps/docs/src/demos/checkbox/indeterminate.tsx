import {Checkbox, Description, Label} from "@heroui/react";
import {useState} from "react";

export function Indeterminate() {
  const [isIndeterminate, setIsIndeterminate] = useState(true);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="flex gap-3">
      <Checkbox
        className="mt-0.5"
        id="select-all"
        isIndeterminate={isIndeterminate}
        isSelected={isSelected}
        onChange={(selected: boolean) => {
          setIsSelected(selected);
          setIsIndeterminate(false);
        }}
      >
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
      </Checkbox>
      <div className="flex flex-col gap-1">
        <Label htmlFor="select-all">Select all</Label>
        <Description>Shows indeterminate state (dash icon)</Description>
      </div>
    </div>
  );
}
