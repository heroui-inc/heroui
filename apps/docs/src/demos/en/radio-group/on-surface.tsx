import {Description, Label, Radio, RadioGroup, Surface} from "@heroui/react";

export function OnSurface() {
  return (
    <Surface className="w-full rounded-3xl p-6">
      <RadioGroup defaultValue="premium" name="plan-on-surface" variant="secondary">
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
    </Surface>
  );
}
