"use client";

import {Checkbox, CheckboxGroup, Description, Label} from "@heroui/react";

export function CustomRenderFunction() {
  return (
    <CheckboxGroup name="interests" render={(props) => <div {...props} data-custom="foo" />}>
      <Label>选择你的兴趣</Label>
      <Description>可多选</Description>
      <Checkbox value="coding">
        <Checkbox.Button>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Label>编程</Label>
        </Checkbox.Button>
        <Description>热爱构建软件</Description>
      </Checkbox>
      <Checkbox value="design">
        <Checkbox.Button>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Label>设计</Label>
        </Checkbox.Button>
        <Description>喜欢打造精美界面</Description>
      </Checkbox>
      <Checkbox value="writing">
        <Checkbox.Button>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Label>写作</Label>
        </Checkbox.Button>
        <Description>热衷于内容创作</Description>
      </Checkbox>
    </CheckboxGroup>
  );
}
