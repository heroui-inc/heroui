"use client";

import {Checkbox, Label} from "@heroui/react";

export function CustomIndicator() {
  return (
    <div className="flex gap-4">
      <Checkbox defaultSelected name="heart">
        <Checkbox.Control>
          <Checkbox.Indicator>
            {({isSelected}) =>
              isSelected ? (
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
                    fill="currentColor"
                  />
                </svg>
              ) : null
            }
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Content>
          <Label>Heart</Label>
        </Checkbox.Content>
      </Checkbox>
      <Checkbox defaultSelected name="plus">
        <Checkbox.Control>
          <Checkbox.Indicator>
            {({isSelected}) =>
              isSelected ? (
                <svg fill="none" viewBox="0 0 24 24">
                  <path
                    d="M6 12H18"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />
                  <path
                    d="M12 18V6"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />
                </svg>
              ) : null
            }
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Content>
          <Label>Plus</Label>
        </Checkbox.Content>
      </Checkbox>
      <Checkbox isIndeterminate name="indeterminate">
        <Checkbox.Control>
          <Checkbox.Indicator>
            {({isIndeterminate}) =>
              isIndeterminate ? (
                <svg stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                  <line x1="21" x2="3" y1="12" y2="12" />
                </svg>
              ) : null
            }
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Content>
          <Label>Indeterminate</Label>
        </Checkbox.Content>
      </Checkbox>
    </div>
  );
}
