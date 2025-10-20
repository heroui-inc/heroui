"use client";

import {
  Description,
  Label,
  Radio,
  RadioContent,
  RadioControl,
  RadioGroup,
  RadioIndicator,
} from "@heroui/react";

export function Horizontal() {
  return (
    <div className="flex flex-col gap-4">
      <Label>Subscription plan</Label>
      <RadioGroup defaultValue="pro" name="plan-orientation" orientation="horizontal">
        <Radio value="starter">
          <RadioControl>
            <RadioIndicator />
          </RadioControl>
          <RadioContent>
            <Label>Starter</Label>
            <Description>For side projects</Description>
          </RadioContent>
        </Radio>
        <Radio value="pro">
          <RadioControl>
            <RadioIndicator />
          </RadioControl>
          <RadioContent>
            <Label>Pro</Label>
            <Description>Advanced reporting</Description>
          </RadioContent>
        </Radio>
        <Radio value="teams">
          <RadioControl>
            <RadioIndicator />
          </RadioControl>
          <RadioContent>
            <Label>Teams</Label>
            <Description>Up to 10 teammates</Description>
          </RadioContent>
        </Radio>
      </RadioGroup>
    </div>
  );
}
