import {Description, Label, Radio, RadioGroup} from "@heroui/react";

export function Disabled() {
  return (
    <RadioGroup isDisabled defaultValue="pro" name="plan-disabled">
      <Label>订阅套餐</Label>
      <Description>我们正在发布更新，暂时无法更改套餐。</Description>
      <Radio value="starter">
        <Radio.Content>
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          入门版
        </Radio.Content>
        <Description>适合副项目和小型团队</Description>
      </Radio>
      <Radio value="pro">
        <Radio.Content>
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          专业版
        </Radio.Content>
        <Description>高级报表与分析</Description>
      </Radio>
      <Radio value="teams">
        <Radio.Content>
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          团队版
        </Radio.Content>
        <Description>最多可与 10 名队友共享访问权限</Description>
      </Radio>
    </RadioGroup>
  );
}
