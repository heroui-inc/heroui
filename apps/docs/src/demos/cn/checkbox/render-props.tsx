"use client";

import {Checkbox, Description} from "@heroui/react";

export function RenderProps() {
  return (
    <Checkbox id="render-props-terms">
      {({isSelected}) => (
        <>
          <Checkbox.Content>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            {isSelected ? "已同意条款" : "接受条款"}
          </Checkbox.Content>
          <Description>{isSelected ? "感谢您的确认" : "请先阅读并接受条款"}</Description>
        </>
      )}
    </Checkbox>
  );
}
