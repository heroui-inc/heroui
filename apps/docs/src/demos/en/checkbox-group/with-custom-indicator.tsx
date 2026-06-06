"use client";

import {Checkbox, CheckboxGroup, Description, Label} from "@heroui/react";

export function WithCustomIndicator() {
  return (
    <CheckboxGroup name="features">
      <Label>Features</Label>
      <Description>Select the features you want</Description>
      <Checkbox value="notifications">
        <Checkbox.Content>
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
          Email notifications
        </Checkbox.Content>
        <Description>Receive updates via email</Description>
      </Checkbox>
      <Checkbox value="newsletter">
        <Checkbox.Content>
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
          Newsletter
        </Checkbox.Content>
        <Description>Get weekly newsletters</Description>
      </Checkbox>
    </CheckboxGroup>
  );
}
