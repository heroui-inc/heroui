import {Description, Label, Radio, RadioGroup} from "@heroui/react";

export function Horizontal() {
  return (
    <div className="flex flex-col gap-4">
      <Label>Subscription plan</Label>
      <RadioGroup defaultValue="pro" name="plan-orientation" orientation="horizontal">
        <Radio value="starter">
          <Radio.Button>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Label>Starter</Label>
          </Radio.Button>
          <Description>For side projects</Description>
        </Radio>
        <Radio value="pro">
          <Radio.Button>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Label>Pro</Label>
          </Radio.Button>
          <Description>Advanced reporting</Description>
        </Radio>
        <Radio value="teams">
          <Radio.Button>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Label>Teams</Label>
          </Radio.Button>
          <Description>Up to 10 teammates</Description>
        </Radio>
      </RadioGroup>
    </div>
  );
}
