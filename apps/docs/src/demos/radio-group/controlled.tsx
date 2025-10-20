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
import React from "react";

export function Controlled() {
  const [value, setValue] = React.useState("pro");

  return (
    <div className="flex flex-col gap-4">
      <RadioGroupRoot name="plan-controlled" value={value} onChange={setValue}>
        <Label>Subscription plan</Label>
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
      <p className="text-muted text-sm">
        Selected plan: <span className="font-medium">{value}</span>
      </p>
    </div>
  );
}
