import {Description, Label, Radio, RadioGroup, Surface} from "@heroui/react";

export function OnSurface() {
  return (
    <Surface className="w-full rounded-3xl p-6">
      <RadioGroup defaultValue="premium" name="plan" variant="secondary">
        <Label>选择套餐</Label>
        <Description>选择最适合你的套餐</Description>
        <Radio value="basic">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>基础版</Label>
            <Description>每月包含 100 条消息</Description>
          </Radio.Content>
        </Radio>
        <Radio value="premium">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>高级版</Label>
            <Description>每月包含 200 条消息</Description>
          </Radio.Content>
        </Radio>
        <Radio value="business">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>商业版</Label>
            <Description>无限消息</Description>
          </Radio.Content>
        </Radio>
      </RadioGroup>
    </Surface>
  );
}
