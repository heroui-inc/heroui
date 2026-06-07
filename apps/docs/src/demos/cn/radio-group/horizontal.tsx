import {Description, Label, Radio, RadioGroup} from "@heroui/react";

export function Horizontal() {
  return (
    <div className="flex flex-col gap-4">
      <Label>订阅套餐</Label>
      <RadioGroup defaultValue="pro" name="plan-orientation" orientation="horizontal">
        <Radio value="starter">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            入门版
          </Radio.Content>
          <Description>适合副项目</Description>
        </Radio>
        <Radio value="pro">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            专业版
          </Radio.Content>
          <Description>高级报表</Description>
        </Radio>
        <Radio value="teams">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            团队版
          </Radio.Content>
          <Description>最多 10 名队友</Description>
        </Radio>
      </RadioGroup>
    </div>
  );
}
