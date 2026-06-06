"use client";

import {Description, Label, Radio, RadioGroup} from "@heroui/react";

export function CustomIndicator() {
  return (
    <RadioGroup defaultValue="premium" name="plan-custom-indicator">
      <Label>选择套餐</Label>
      <Description>选择最适合你的套餐</Description>
      <Radio value="basic">
        <Radio.Content>
          <Radio.Control>
            <Radio.Indicator>
              {({isSelected}) =>
                isSelected ? <span className="text-xs leading-none text-background">✓</span> : null
              }
            </Radio.Indicator>
          </Radio.Control>
          基础版
        </Radio.Content>
        <Description>每月包含 100 条消息</Description>
      </Radio>
      <Radio value="premium">
        <Radio.Content>
          <Radio.Control>
            <Radio.Indicator>
              {({isSelected}) =>
                isSelected ? <span className="text-xs leading-none text-background">✓</span> : null
              }
            </Radio.Indicator>
          </Radio.Control>
          高级版
        </Radio.Content>
        <Description>每月包含 200 条消息</Description>
      </Radio>
      <Radio value="business">
        <Radio.Content>
          <Radio.Control>
            <Radio.Indicator>
              {({isSelected}) =>
                isSelected ? <span className="text-xs leading-none text-background">✓</span> : null
              }
            </Radio.Indicator>
          </Radio.Control>
          商业版
        </Radio.Content>
        <Description>无限消息</Description>
      </Radio>
    </RadioGroup>
  );
}
