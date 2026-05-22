import {Checkbox, CheckboxGroup, Description, Label, Surface} from "@heroui/react";

export function OnSurface() {
  return (
    <Surface className="w-full rounded-3xl p-6">
      <CheckboxGroup name="interests" variant="secondary">
        <Label>选择你的兴趣</Label>
        <Description>可多选</Description>
        <Checkbox value="coding">
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label>编程</Label>
            <Description>热爱构建软件</Description>
          </Checkbox.Content>
        </Checkbox>
        <Checkbox value="design">
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label>设计</Label>
            <Description>喜欢打造精美界面</Description>
          </Checkbox.Content>
        </Checkbox>
        <Checkbox value="writing">
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label>写作</Label>
            <Description>热衷于内容创作</Description>
          </Checkbox.Content>
        </Checkbox>
      </CheckboxGroup>
    </Surface>
  );
}
