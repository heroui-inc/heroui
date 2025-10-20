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

export function Basic() {
  return (
    <RadioGroupRoot defaultValue="premium" name="plan">
      <Label>Plan selection</Label>
      <Description>Choose the plan that suits you best</Description>
      <Radio value="basic">
        <RadioControl>
          <RadioIndicator />
        </RadioControl>
        <RadioContent>
          <Label>Basic Plan</Label>
          <Description>Includes 100 messages per month</Description>
        </RadioContent>
      </Radio>
      <Radio value="premium">
        <RadioControl>
          <RadioIndicator />
        </RadioControl>
        <RadioContent>
          <Label>Premium Plan</Label>
          <Description>Includes 200 messages per month</Description>
        </RadioContent>
      </Radio>
      <Radio value="business">
        <RadioControl>
          <RadioIndicator />
        </RadioControl>
        <RadioContent>
          <Label>Business Plan</Label>
          <Description>Unlimited messages</Description>
        </RadioContent>
      </Radio>
    </RadioGroupRoot>
  );
}
