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
            {isSelected ? "Terms accepted" : "Accept terms"}
          </Checkbox.Content>
          <Description>
            {isSelected ? "Thank you for accepting" : "Please read and accept the terms"}
          </Description>
        </>
      )}
    </Checkbox>
  );
}
