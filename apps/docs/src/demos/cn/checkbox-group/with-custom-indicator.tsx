"use client";

import {Checkbox, CheckboxGroup, Description, Label} from "@heroui/react";

export function WithCustomIndicator() {
  return (
    <CheckboxGroup name="features">
      <Label>功能</Label>
      <Description>选择你需要的功能</Description>
      <Checkbox value="notifications">
        <Checkbox.Button>
          <Checkbox.Control>
            <Checkbox.Indicator>
              {({isSelected}) =>
                isSelected ? (
                  <svg
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : null
              }
            </Checkbox.Indicator>
          </Checkbox.Control>
          <Label>邮件通知</Label>
        </Checkbox.Button>
        <Description>通过邮件接收更新</Description>
      </Checkbox>
      <Checkbox value="newsletter">
        <Checkbox.Button>
          <Checkbox.Control>
            <Checkbox.Indicator>
              {({isSelected}) =>
                isSelected ? (
                  <svg
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : null
              }
            </Checkbox.Indicator>
          </Checkbox.Control>
          <Label>邮件通讯</Label>
        </Checkbox.Button>
        <Description>每周接收邮件简报</Description>
      </Checkbox>
    </CheckboxGroup>
  );
}
