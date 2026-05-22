import {Description, Label, Radio, RadioGroup} from "@heroui/react";

export function Disabled() {
  return (
    <RadioGroup isDisabled defaultValue="pro" name="plan-disabled">
      <Label>Subscription plan</Label>
      <Description>Plan changes are temporarily paused while we roll out updates.</Description>
      <Radio value="starter">
        <Radio.Control>
          <Radio.Indicator />
        </Radio.Control>
        <Radio.Content>
          <Label>Starter</Label>
          <Description>For side projects and small teams</Description>
        </Radio.Content>
      </Radio>
      <Radio value="pro">
        <Radio.Control>
          <Radio.Indicator />
        </Radio.Control>
        <Radio.Content>
          <Label>Pro</Label>
          <Description>Advanced reporting and analytics</Description>
        </Radio.Content>
      </Radio>
      <Radio value="teams">
        <Radio.Control>
          <Radio.Indicator />
        </Radio.Control>
        <Radio.Content>
          <Label>Teams</Label>
          <Description>Share access with up to 10 teammates</Description>
        </Radio.Content>
      </Radio>
    </RadioGroup>
  );
}
