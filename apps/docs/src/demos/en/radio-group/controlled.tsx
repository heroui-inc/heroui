"use client";

import {Description, Label, Radio, RadioGroup} from "@heroui/react";
import React from "react";

export function Controlled() {
  const [value, setValue] = React.useState("pro");

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup name="plan-controlled" value={value} onChange={setValue}>
        <Label>Subscription plan</Label>
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
      <p className="text-sm text-muted">
        Selected plan: <span className="font-medium">{value}</span>
      </p>
    </div>
  );
}
