import {Checkbox, CheckboxGroup, Description, Label, Surface} from "@heroui/react";

export function OnSurface() {
  return (
    <Surface className="w-full rounded-3xl p-6">
      <CheckboxGroup name="interests" variant="secondary">
        <Label>选择你的兴趣</Label>
        <Description>可多选</Description>
        <Checkbox value="coding">
          <Checkbox.Content>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            编程
          </Checkbox.Content>
          <Description>热爱构建软件</Description>
        </Checkbox>
        <Checkbox value="design">
          <Checkbox.Content>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            设计
          </Checkbox.Content>
          <Description>喜欢打造精美界面</Description>
        </Checkbox>
        <Checkbox value="writing">
          <Checkbox.Content>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            写作
          </Checkbox.Content>
          <Description>热衷于内容创作</Description>
        </Checkbox>
      </CheckboxGroup>
    </Surface>
  );
}
