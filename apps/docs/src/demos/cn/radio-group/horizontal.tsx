import {Description, Label, Radio, RadioGroup} from "@heroui/react";

export function Horizontal() {
  return (
    <div className="flex flex-col gap-4">
      <Label>订阅套餐</Label>
      <RadioGroup defaultValue="pro" name="plan-orientation" orientation="horizontal">
        <Radio value="starter">
          <Radio.Button>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Label>入门版</Label>
          </Radio.Button>
          <Description>适合副项目</Description>
        </Radio>
        <Radio value="pro">
          <Radio.Button>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Label>专业版</Label>
          </Radio.Button>
          <Description>高级报表</Description>
        </Radio>
        <Radio value="teams">
          <Radio.Button>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Label>团队版</Label>
          </Radio.Button>
          <Description>最多 10 名队友</Description>
        </Radio>
      </RadioGroup>
    </div>
  );
}
