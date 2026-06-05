"use client";

import {Checkbox, Description, Label} from "@heroui/react";

export function RenderProps() {
  return (
    <Checkbox id="render-props-terms">
      {({isSelected}) => (
        <>
          <Checkbox.Button>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Label>{isSelected ? "已同意条款" : "接受条款"}</Label>
          </Checkbox.Button>
          <Description>{isSelected ? "感谢您的确认" : "请先阅读并接受条款"}</Description>
        </>
      )}
    </Checkbox>
  );
}
