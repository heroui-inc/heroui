import {Description, Label, Radio, RadioGroup, Surface} from "@heroui/react";

export function OnSurface() {
  return (
    <Surface className="w-full rounded-3xl p-6">
      <RadioGroup defaultValue="premium" name="plan-on-surface" variant="secondary">
        <Label>选择套餐</Label>
        <Description>选择最适合你的套餐</Description>
        <Radio value="basic">
          <Radio.Button>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Label>基础版</Label>
          </Radio.Button>
          <Description>每月包含 100 条消息</Description>
        </Radio>
        <Radio value="premium">
          <Radio.Button>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Label>高级版</Label>
          </Radio.Button>
          <Description>每月包含 200 条消息</Description>
        </Radio>
        <Radio value="business">
          <Radio.Button>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Label>商业版</Label>
          </Radio.Button>
          <Description>无限消息</Description>
        </Radio>
      </RadioGroup>
    </Surface>
  );
}
