import {Description, Label, Radio, RadioGroup} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Primary variant</p>
        <RadioGroup defaultValue="option1" name="primary-plan" variant="primary">
          <Radio value="option1">
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Radio.Content>
              <Label>Option 1</Label>
              <Description>Standard styling with default background</Description>
            </Radio.Content>
          </Radio>
          <Radio value="option2">
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Radio.Content>
              <Label>Option 2</Label>
              <Description>Another option with primary styling</Description>
            </Radio.Content>
          </Radio>
        </RadioGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Secondary variant</p>
        <RadioGroup defaultValue="option1" name="secondary-plan" variant="secondary">
          <Radio value="option1">
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Radio.Content>
              <Label>Option 1</Label>
              <Description>Lower emphasis variant for use in surfaces</Description>
            </Radio.Content>
          </Radio>
          <Radio value="option2">
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            <Radio.Content>
              <Label>Option 2</Label>
              <Description>Another option with secondary styling</Description>
            </Radio.Content>
          </Radio>
        </RadioGroup>
      </div>
    </div>
  );
}
