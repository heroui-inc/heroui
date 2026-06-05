import {Description, Label, Radio, RadioGroup} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">主要变体</p>
        <RadioGroup defaultValue="option1" name="primary-plan" variant="primary">
          <Radio value="option1">
            <Radio.Button>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Label>选项 1</Label>
            </Radio.Button>
            <Description>默认背景的标准样式</Description>
          </Radio>
          <Radio value="option2">
            <Radio.Button>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Label>选项 2</Label>
            </Radio.Button>
            <Description>另一种主要样式选项</Description>
          </Radio>
        </RadioGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">次要变体</p>
        <RadioGroup defaultValue="option1" name="secondary-plan" variant="secondary">
          <Radio value="option1">
            <Radio.Button>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Label>选项 1</Label>
            </Radio.Button>
            <Description>用于表面上的低强调变体</Description>
          </Radio>
          <Radio value="option2">
            <Radio.Button>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Label>选项 2</Label>
            </Radio.Button>
            <Description>另一种次要样式选项</Description>
          </Radio>
        </RadioGroup>
      </div>
    </div>
  );
}
