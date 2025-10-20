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
import React from "react";

export function Uncontrolled() {
  const [selection, setSelection] = React.useState("pro");

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup
        defaultValue="pro"
        name="plan-uncontrolled"
        onChange={(nextValue) => setSelection(nextValue)}
      >
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
      </RadioGroup>
      <p className="text-muted text-sm">
        Last chosen plan: <span className="font-medium">{selection}</span>
      </p>
    </div>
  );
}
