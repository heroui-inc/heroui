"use client";

import {Checkbox, Description} from "@heroui/react";
import {useState} from "react";

export function Indeterminate() {
  const [isIndeterminate, setIsIndeterminate] = useState(true);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Checkbox
      id="select-all"
      isIndeterminate={isIndeterminate}
      isSelected={isSelected}
      onChange={(selected: boolean) => {
        setIsSelected(selected);
        setIsIndeterminate(false);
      }}
    >
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        全选
      </Checkbox.Content>
      <Description>展示部分选中状态（短横线图标）</Description>
    </Checkbox>
  );
}
