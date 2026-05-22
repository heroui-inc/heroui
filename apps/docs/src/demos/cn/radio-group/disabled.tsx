import {Description, Label, Radio, RadioGroup} from "@heroui/react";

export function Disabled() {
  return (
    <RadioGroup isDisabled defaultValue="pro" name="plan-disabled">
      <Label>订阅套餐</Label>
      <Description>我们正在发布更新，暂时无法更改套餐。</Description>
      <Radio value="starter">
        <Radio.Control>
          <Radio.Indicator />
        </Radio.Control>
        <Radio.Content>
          <Label>入门版</Label>
          <Description>适合副项目和小型团队</Description>
        </Radio.Content>
      </Radio>
      <Radio value="pro">
        <Radio.Control>
          <Radio.Indicator />
        </Radio.Control>
        <Radio.Content>
          <Label>专业版</Label>
          <Description>高级报表与分析</Description>
        </Radio.Content>
      </Radio>
      <Radio value="teams">
        <Radio.Control>
          <Radio.Indicator />
        </Radio.Control>
        <Radio.Content>
          <Label>团队版</Label>
          <Description>最多可与 10 名队友共享访问权限</Description>
        </Radio.Content>
      </Radio>
    </RadioGroup>
  );
}
