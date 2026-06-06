import {Description, Radio, RadioGroup} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">主要变体</p>
        <RadioGroup defaultValue="option1" name="primary-plan" variant="primary">
          <Radio value="option1">
            <Radio.Content>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              选项 1
            </Radio.Content>
            <Description>默认背景的标准样式</Description>
          </Radio>
          <Radio value="option2">
            <Radio.Content>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              选项 2
            </Radio.Content>
            <Description>另一种主要样式选项</Description>
          </Radio>
        </RadioGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">次要变体</p>
        <RadioGroup defaultValue="option1" name="secondary-plan" variant="secondary">
          <Radio value="option1">
            <Radio.Content>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              选项 1
            </Radio.Content>
            <Description>用于表面上的低强调变体</Description>
          </Radio>
          <Radio value="option2">
            <Radio.Content>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              选项 2
            </Radio.Content>
            <Description>另一种次要样式选项</Description>
          </Radio>
        </RadioGroup>
      </div>
    </div>
  );
}
