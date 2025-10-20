"use client";

import {
  Description,
  Label,
  Radio,
  RadioContent,
  RadioControl,
  RadioGroupRoot,
  RadioIndicator,
} from "@heroui/react";

export function CustomIndicator() {
  return (
    <RadioGroupRoot defaultValue="premium" name="plan-custom-indicator">
      <Label>Plan selection</Label>
      <Description>Choose the plan that suits you best</Description>
      <Radio value="basic">
        <RadioControl>
          <RadioIndicator>
            {({isSelected}) =>
              isSelected ? <span className="text-background text-xs leading-none">✓</span> : null
            }
          </RadioIndicator>
        </RadioControl>
        <RadioContent>
          <Label>Basic Plan</Label>
          <Description>Includes 100 messages per month</Description>
        </RadioContent>
      </Radio>
      <Radio value="premium">
        <RadioControl>
          <RadioIndicator>
            {({isSelected}) =>
              isSelected ? <span className="text-background text-xs leading-none">✓</span> : null
            }
          </RadioIndicator>
        </RadioControl>
        <RadioContent>
          <Label>Premium Plan</Label>
          <Description>Includes 200 messages per month</Description>
        </RadioContent>
      </Radio>
      <Radio value="business">
        <RadioControl>
          <RadioIndicator>
            {({isSelected}) =>
              isSelected ? <span className="text-background text-xs leading-none">✓</span> : null
            }
          </RadioIndicator>
        </RadioControl>
        <RadioContent>
          <Label>Business Plan</Label>
          <Description>Unlimited messages</Description>
        </RadioContent>
      </Radio>
    </RadioGroupRoot>
  );
}
