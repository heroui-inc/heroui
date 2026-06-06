import {Description, Label, Radio, RadioGroup, Surface} from "@heroui/react";

export function OnSurface() {
  return (
    <Surface className="w-full rounded-3xl p-6">
      <RadioGroup defaultValue="premium" name="plan-on-surface" variant="secondary">
        <Label>选择套餐</Label>
        <Description>选择最适合你的套餐</Description>
        <Radio value="basic">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            基础版
          </Radio.Content>
          <Description>每月包含 100 条消息</Description>
        </Radio>
        <Radio value="premium">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            高级版
          </Radio.Content>
          <Description>每月包含 200 条消息</Description>
        </Radio>
        <Radio value="business">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            商业版
          </Radio.Content>
          <Description>无限消息</Description>
        </Radio>
      </RadioGroup>
    </Surface>
  );
}
