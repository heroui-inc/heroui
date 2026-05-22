"use client";

import {Checkbox, Description, Label} from "@heroui/react";

export function RenderProps() {
  return (
    <Checkbox id="render-props-terms">
      {({isSelected}) => (
        <>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label htmlFor="render-props-terms">{isSelected ? "已同意条款" : "接受条款"}</Label>
            <Description>{isSelected ? "感谢您的确认" : "请先阅读并接受条款"}</Description>
          </Checkbox.Content>
        </>
      )}
    </Checkbox>
  );
}
