"use client";

import {Description, Label, Radio, RadioGroup} from "@heroui/react";

export function Basic() {
  return (
    <RadioGroup defaultValue="premium" name="plan">
      <Label>Plan selection</Label>
      <Description>Choose the plan that best suits your needs</Description>
      <Radio value="basic">
        <Radio.Control>
          <Radio.Indicator />
        </Radio.Control>
        <Radio.Content>
          <Label>Basic Plan</Label>
          <Description>Includes 100 messages per month and up to 3 themes to set up</Description>
        </Radio.Content>
      </Radio>
      <Radio value="premium">
        <Radio.Control>
          <Radio.Indicator />
        </Radio.Control>
        <Radio.Content>
          <Label>Premium Plan</Label>
          <Description>Includes 200 messages per month and up to 6 themes to set up</Description>
        </Radio.Content>
      </Radio>
      <Radio value="business">
        <Radio.Control>
          <Radio.Indicator />
        </Radio.Control>
        <Radio.Content>
          <Label>Business Plan</Label>
          <Description>Unlimited messages and themes</Description>
        </Radio.Content>
      </Radio>
    </RadioGroup>
  );
}
