import {Description, Label, Radio, RadioGroup, Surface} from "@heroui/react";

export function OnSurface() {
  return (
    <Surface className="w-full rounded-3xl p-6">
      <RadioGroup defaultValue="premium" name="plan">
        <Label>Plan selection</Label>
        <Description>Choose the plan that suits you best</Description>
        <Radio value="basic">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Basic Plan</Label>
            <Description>Includes 100 messages per month</Description>
          </Radio.Content>
        </Radio>
        <Radio value="premium">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Premium Plan</Label>
            <Description>Includes 200 messages per month</Description>
          </Radio.Content>
        </Radio>
        <Radio value="business">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Business Plan</Label>
            <Description>Unlimited messages</Description>
          </Radio.Content>
        </Radio>
      </RadioGroup>
    </Surface>
  );
}
