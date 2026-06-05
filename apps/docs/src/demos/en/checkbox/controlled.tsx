"use client";

import {Checkbox, Label} from "@heroui/react";
import {useState} from "react";

export function Controlled() {
  const [isSelected, setIsSelected] = useState(true);

  return (
    <div className="flex flex-col gap-3">
      <Checkbox id="email-notifications" isSelected={isSelected} onChange={setIsSelected}>
        <Checkbox.Button>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Label>Email notifications</Label>
        </Checkbox.Button>
      </Checkbox>
      <p className="text-sm text-muted">
        Status: <span className="font-medium">{isSelected ? "Enabled" : "Disabled"}</span>
      </p>
    </div>
  );
}
