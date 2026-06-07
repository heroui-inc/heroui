"use client";

import {Checkbox} from "@heroui/react";
import {useState} from "react";

export function Controlled() {
  const [isSelected, setIsSelected] = useState(true);

  return (
    <div className="flex flex-col gap-3">
      <Checkbox id="email-notifications" isSelected={isSelected} onChange={setIsSelected}>
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          Email notifications
        </Checkbox.Content>
      </Checkbox>
      <p className="text-sm text-muted">
        Status: <span className="font-medium">{isSelected ? "Enabled" : "Disabled"}</span>
      </p>
    </div>
  );
}
