import {Description, Label, Radio, RadioGroup} from "@heroui/react";

export function Disabled() {
  return (
    <RadioGroup isDisabled defaultValue="pro" name="plan-disabled">
      <Label>Subscription plan</Label>
      <Description>Plan changes are temporarily paused while we roll out updates.</Description>
      <Radio value="starter">
        <Radio.Button>
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Label>Starter</Label>
        </Radio.Button>
        <Description>For side projects and small teams</Description>
      </Radio>
      <Radio value="pro">
        <Radio.Button>
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Label>Pro</Label>
        </Radio.Button>
        <Description>Advanced reporting and analytics</Description>
      </Radio>
      <Radio value="teams">
        <Radio.Button>
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Label>Teams</Label>
        </Radio.Button>
        <Description>Share access with up to 10 teammates</Description>
      </Radio>
    </RadioGroup>
  );
}
