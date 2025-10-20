"use client";

import {
  Description,
  Label,
  Radio,
  RadioContent,
  RadioControl,
  RadioGroupRoot,
  RadioIndicator,
} from "@heroui/react";

export function Disabled() {
  return (
    <RadioGroupRoot isDisabled defaultValue="pro" name="plan-disabled">
      <Label>Subscription plan</Label>
      <Description>Plan changes are temporarily paused while we roll out updates.</Description>
      <Radio value="starter">
        <RadioControl>
          <RadioIndicator />
        </RadioControl>
        <RadioContent>
          <Label>Starter</Label>
          <Description>For side projects and small teams</Description>
        </RadioContent>
      </Radio>
      <Radio value="pro">
        <RadioControl>
          <RadioIndicator />
        </RadioControl>
        <RadioContent>
          <Label>Pro</Label>
          <Description>Advanced reporting and analytics</Description>
        </RadioContent>
      </Radio>
      <Radio value="teams">
        <RadioControl>
          <RadioIndicator />
        </RadioControl>
        <RadioContent>
          <Label>Teams</Label>
          <Description>Share access with up to 10 teammates</Description>
        </RadioContent>
      </Radio>
    </RadioGroupRoot>
  );
}
