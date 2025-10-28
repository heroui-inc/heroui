import {Description, Label, Radio, RadioGroup} from "@heroui/react";

export function Basic() {
  return (
    <RadioGroup defaultValue="premium" name="plan">
      <Label>Plan selection</Label>
      <Description>Choose the plan that suits you best</Description>
      <Radio.Root value="basic">
        <Radio.Control>
          <Radio.Indicator />
        </Radio.Control>
        <Radio.Content>
          <Label>Basic Plan</Label>
          <Description>Includes 100 messages per month</Description>
        </Radio.Content>
      </Radio.Root>
      <Radio.Root value="premium">
        <Radio.Control>
          <Radio.Indicator />
        </Radio.Control>
        <Radio.Content>
          <Label>Premium Plan</Label>
          <Description>Includes 200 messages per month</Description>
        </Radio.Content>
      </Radio.Root>
      <Radio.Root value="business">
        <Radio.Control>
          <Radio.Indicator />
        </Radio.Control>
        <Radio.Content>
          <Label>Business Plan</Label>
          <Description>Unlimited messages</Description>
        </Radio.Content>
      </Radio.Root>
    </RadioGroup>
  );
}
