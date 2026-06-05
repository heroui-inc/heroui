import {Description, Label, Radio, RadioGroup, Surface} from "@heroui/react";

export function OnSurface() {
  return (
    <Surface className="w-full rounded-3xl p-6">
      <RadioGroup defaultValue="premium" name="plan-on-surface" variant="secondary">
        <Label>Plan selection</Label>
        <Description>Choose the plan that suits you best</Description>
        <Radio value="basic">
          <Radio.Button>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Label>Basic Plan</Label>
          </Radio.Button>
          <Description>Includes 100 messages per month</Description>
        </Radio>
        <Radio value="premium">
          <Radio.Button>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Label>Premium Plan</Label>
          </Radio.Button>
          <Description>Includes 200 messages per month</Description>
        </Radio>
        <Radio value="business">
          <Radio.Button>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Label>Business Plan</Label>
          </Radio.Button>
          <Description>Unlimited messages</Description>
        </Radio>
      </RadioGroup>
    </Surface>
  );
}
