"use client";

import {useState} from "react";
import {Checkbox, Label} from "@heroui/react";

export function Indeterminate() {
  const [selected, setSelected] = useState<string[]>(["option1"]);
  const options = ["option1", "option2", "option3"];
  
  const isIndeterminate = selected.length > 0 && selected.length < options.length;
  const isSelected = selected.length === options.length;

  const handleSelectAll = () => {
    if (isSelected) {
      setSelected([]);
    } else {
      setSelected(options);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Checkbox 
          id="select-all"
          isSelected={isSelected}
          isIndeterminate={isIndeterminate}
          onChange={handleSelectAll}
        >
          <Checkbox.Indicator>
            {isIndeterminate && <Checkbox.IndeterminateIcon />}
          </Checkbox.Indicator>
        </Checkbox>
        <Label htmlFor="select-all" className="font-semibold">
          Select all
        </Label>
      </div>
      
      <div className="ml-6 space-y-2">
        {options.map((option) => (
          <div key={option} className="flex items-center gap-3">
            <Checkbox
              id={option}
              isSelected={selected.includes(option)}
              onChange={(isSelected) => {
                if (isSelected) {
                  setSelected([...selected, option]);
                } else {
                  setSelected(selected.filter((s) => s !== option));
                }
              }}
            >
              <Checkbox.Indicator />
            </Checkbox>
            <Label htmlFor={option}>Option {option.slice(-1)}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}