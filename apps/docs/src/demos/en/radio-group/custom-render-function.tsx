"use client";

import {Description, Label, Radio, RadioGroup} from "@heroui/react";

export function CustomRenderFunction() {
  return (
    <RadioGroup
      defaultValue="premium"
      name="plan-custom-render"
      render={(props) => <div {...props} data-custom="foo" />}
    >
      <Label>Plan selection</Label>
      <Description>Choose the plan that suits you best</Description>
      <Radio value="basic">
        <Radio.Content>
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          Basic Plan
        </Radio.Content>
        <Description>Includes 100 messages per month</Description>
      </Radio>
      <Radio value="premium">
        <Radio.Content>
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          Premium Plan
        </Radio.Content>
        <Description>Includes 200 messages per month</Description>
      </Radio>
      <Radio value="business">
        <Radio.Content>
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          Business Plan
        </Radio.Content>
        <Description>Unlimited messages</Description>
      </Radio>
    </RadioGroup>
  );
}
