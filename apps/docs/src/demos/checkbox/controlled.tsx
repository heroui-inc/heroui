"use client";

import {useState} from "react";
import {Checkbox, Label} from "@heroui/react";

export function Controlled() {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Checkbox 
          id="controlled"
          isSelected={isSelected}
          onChange={setIsSelected}
        >
          <Checkbox.Indicator />
        </Checkbox>
        <Label htmlFor="controlled">
          Controlled checkbox
        </Label>
      </div>
      <p className="text-sm text-gray-600">
        Checkbox is: <strong>{isSelected ? "checked" : "unchecked"}</strong>
      </p>
    </div>
  );
}