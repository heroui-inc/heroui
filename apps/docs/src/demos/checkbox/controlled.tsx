import {Checkbox, Label} from "@heroui/react";
import {useState} from "react";

export function Controlled() {
  const [isSelected, setIsSelected] = useState(true);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Checkbox id="email-notifications" isSelected={isSelected} onChange={setIsSelected}>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
        </Checkbox>
        <Label htmlFor="email-notifications">Email notifications</Label>
      </div>
      <p className="text-muted text-sm">
        Status: <span className="font-medium">{isSelected ? "Enabled" : "Disabled"}</span>
      </p>
    </div>
  );
}
