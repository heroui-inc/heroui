import {Description, Label, Radio, RadioGroup} from "@heroui/react";

export function Disabled() {
  return (
    <RadioGroup isDisabled defaultValue="pro" name="plan-disabled">
      <Label>Subscription plan</Label>
      <Description>Plan changes are temporarily paused while we roll out updates.</Description>
      <Radio value="starter">
        <Radio.Content>
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          Starter
        </Radio.Content>
        <Description>For side projects and small teams</Description>
      </Radio>
      <Radio value="pro">
        <Radio.Content>
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          Pro
        </Radio.Content>
        <Description>Advanced reporting and analytics</Description>
      </Radio>
      <Radio value="teams">
        <Radio.Content>
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          Teams
        </Radio.Content>
        <Description>Share access with up to 10 teammates</Description>
      </Radio>
    </RadioGroup>
  );
}
