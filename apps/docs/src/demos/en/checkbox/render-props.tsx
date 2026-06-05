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
            <Label>{isSelected ? "Terms accepted" : "Accept terms"}</Label>
          </Checkbox.Button>
          <Description>
            {isSelected ? "Thank you for accepting" : "Please read and accept the terms"}
          </Description>
        </>
      )}
    </Checkbox>
  );
}
