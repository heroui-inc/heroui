"use client";

import {Description, Label, Radio, RadioGroup} from "@heroui/react";
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
        <Radio.Root value="starter">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Starter</Label>
            <Description>For side projects and small teams</Description>
          </Radio.Content>
        </Radio.Root>
        <Radio.Root value="pro">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Pro</Label>
            <Description>Advanced reporting and analytics</Description>
          </Radio.Content>
        </Radio.Root>
        <Radio.Root value="teams">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Teams</Label>
            <Description>Share access with up to 10 teammates</Description>
          </Radio.Content>
        </Radio.Root>
      </RadioGroup>
      <p className="text-muted text-sm">
        Last chosen plan: <span className="font-medium">{selection}</span>
      </p>
    </div>
  );
}
