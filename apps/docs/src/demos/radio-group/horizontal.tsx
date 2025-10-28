import {Description, Label, Radio, RadioGroup} from "@heroui/react";

export function Horizontal() {
  return (
    <div className="flex flex-col gap-4">
      <Label>Subscription plan</Label>
      <RadioGroup defaultValue="pro" name="plan-orientation" orientation="horizontal">
        <Radio.Root value="starter">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Starter</Label>
            <Description>For side projects</Description>
          </Radio.Content>
        </Radio.Root>
        <Radio.Root value="pro">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Pro</Label>
            <Description>Advanced reporting</Description>
          </Radio.Content>
        </Radio.Root>
        <Radio.Root value="teams">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Teams</Label>
            <Description>Up to 10 teammates</Description>
          </Radio.Content>
        </Radio.Root>
      </RadioGroup>
    </div>
  );
}
