import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import clsx from "clsx";
import React from "react";

import {Button} from "../button";
import {Description} from "../description";
import {FieldError} from "../field-error";
import {Form} from "../form";
import {Label} from "../label";

import {Checkbox, CheckboxGroup} from "./checkbox";

export default {
  argTypes: {},
  component: CheckboxGroup,
  title: "Components/Forms/Checkbox",
} as Meta<typeof CheckboxGroup>;

type Story = StoryObj<typeof CheckboxGroup>;

export const Default: Story = {
  render: () => (
    <div className="px-4">
      <CheckboxGroup name="interests">
        <Label>Select your interests</Label>
        <Description>Choose all that apply</Description>
        <Checkbox value="coding">
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label>Coding</Label>
            <Description>Love building software</Description>
          </Checkbox.Content>
        </Checkbox>
        <Checkbox value="design">
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label>Design</Label>
            <Description>Enjoy creating beautiful interfaces</Description>
          </Checkbox.Content>
        </Checkbox>
        <Checkbox value="writing">
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label>Writing</Label>
            <Description>Passionate about content creation</Description>
          </Checkbox.Content>
        </Checkbox>
      </CheckboxGroup>
    </div>
  ),
};

export const SingleCheckbox: Story = {
  render: () => (
    <div className="px-4">
      <Checkbox name="terms">
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Content>
          <Label>Accept terms and conditions</Label>
          <Description>I agree to the terms and privacy policy</Description>
        </Checkbox.Content>
      </Checkbox>
    </div>
  ),
};

export const WithCustomIndicator: Story = {
  render: () => (
    <div className="px-4">
      <CheckboxGroup name="features">
        <Label>Features</Label>
        <Description>Select the features you want</Description>
        <Checkbox value="notifications">
          <Checkbox.Control>
            <Checkbox.Indicator>
              {({isSelected}) =>
                isSelected ? <span className="text-background text-xs leading-none">✓</span> : null
              }
            </Checkbox.Indicator>
          </Checkbox.Control>
          <Checkbox.Content>
            <Label>Email notifications</Label>
            <Description>Receive updates via email</Description>
          </Checkbox.Content>
        </Checkbox>
        <Checkbox value="newsletter">
          <Checkbox.Control>
            <Checkbox.Indicator>
              {({isSelected}) =>
                isSelected ? <span className="text-background text-xs leading-none">✓</span> : null
              }
            </Checkbox.Indicator>
          </Checkbox.Control>
          <Checkbox.Content>
            <Label>Newsletter</Label>
            <Description>Get weekly newsletters</Description>
          </Checkbox.Content>
        </Checkbox>
      </CheckboxGroup>
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => {
    const [selected, setSelected] = React.useState(["coding"]);
    const allOptions = ["coding", "design", "writing"];

    return (
      <div>
        <Checkbox
          isIndeterminate={selected.length > 0 && selected.length < allOptions.length}
          isSelected={selected.length === allOptions.length}
          name="select-all"
          onChange={(isSelected) => {
            setSelected(isSelected ? allOptions : []);
          }}
        >
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label>Select all</Label>
          </Checkbox.Content>
        </Checkbox>
        <div className="ml-6 flex flex-col gap-2">
          <CheckboxGroup value={selected} onChange={setSelected}>
            <Checkbox value="coding">
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Content>
                <Label>Coding</Label>
              </Checkbox.Content>
            </Checkbox>
            <Checkbox value="design">
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Content>
                <Label>Design</Label>
              </Checkbox.Content>
            </Checkbox>
            <Checkbox value="writing">
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Content>
                <Label>Writing</Label>
              </Checkbox.Content>
            </Checkbox>
          </CheckboxGroup>
        </div>
      </div>
    );
  },
};

export const Validation: Story = {
  render: () => {
    return (
      <Form
        className="flex flex-col gap-4 px-4"
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const values = formData.getAll("preferences");

          alert(`Selected preferences: ${values.join(", ")}`);
        }}
      >
        <CheckboxGroup isRequired name="preferences">
          <Label>Preferences</Label>
          <Description>Select at least one preference</Description>
          <Checkbox value="email">
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Content>
              <Label>Email notifications</Label>
            </Checkbox.Content>
          </Checkbox>
          <Checkbox value="sms">
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Content>
              <Label>SMS notifications</Label>
            </Checkbox.Content>
          </Checkbox>
          <Checkbox value="push">
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Content>
              <Label>Push notifications</Label>
            </Checkbox.Content>
          </Checkbox>
          <FieldError>Please select at least one notification method.</FieldError>
        </CheckboxGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = React.useState(["coding", "design"]);

    return (
      <div className="flex flex-col gap-3 px-4">
        <CheckboxGroup name="skills" value={selected} onChange={setSelected}>
          <Label>Your skills</Label>
          <Checkbox value="coding">
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Content>
              <Label>Coding</Label>
            </Checkbox.Content>
          </Checkbox>
          <Checkbox value="design">
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Content>
              <Label>Design</Label>
            </Checkbox.Content>
          </Checkbox>
          <Checkbox value="writing">
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Content>
              <Label>Writing</Label>
            </Checkbox.Content>
          </Checkbox>
        </CheckboxGroup>
        <p className="text-muted mt-2 text-sm">
          Selected: <span className="font-medium">{selected.join(", ") || "None"}</span>
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="px-4">
      <CheckboxGroup isDisabled name="disabled-features">
        <Label>Features</Label>
        <Description>Feature selection is temporarily disabled</Description>
        <Checkbox value="feature1">
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label>Feature 1</Label>
            <Description>This feature is coming soon</Description>
          </Checkbox.Content>
        </Checkbox>
        <Checkbox value="feature2">
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label>Feature 2</Label>
            <Description>This feature is coming soon</Description>
          </Checkbox.Content>
        </Checkbox>
      </CheckboxGroup>
    </div>
  ),
};

export const CustomStyleExample: Story = {
  render: () => {
    const options = [
      {
        value: "basic",
        title: "Basic",
        description: "Essential features",
        price: "$9/mo",
        icon: "gravity-ui:circle-check",
      },
      {
        value: "pro",
        title: "Pro",
        description: "Advanced features",
        price: "$29/mo",
        icon: "gravity-ui:star",
      },
      {
        value: "enterprise",
        title: "Enterprise",
        description: "Full features",
        price: "$99/mo",
        icon: "gravity-ui:crown",
      },
    ];

    return (
      <div
        className="flex w-full flex-col items-center gap-10 px-4 py-8"
        style={{
          // @ts-expect-error - Overrides default variables
          "--accent": "#006FEE",
          "--accent-hover": "#006FEE",
          "--accent-foreground": "#fff",
          "--focus": "#006FEE",
          "--border-width": "2px",
          "--border-width-field": "2px",
        }}
      >
        <section className="flex w-full max-w-lg flex-col gap-4">
          <CheckboxGroup name="plans">
            <Label>Select plans</Label>
            <Description>You can select multiple plans</Description>
            <div className="grid gap-x-4 md:grid-cols-3">
              {options.map((option) => (
                <Checkbox
                  key={option.value}
                  value={option.value}
                  className={clsx(
                    "bg-surface-2 data-[selected=true]:border-accent data-[selected=true]:bg-accent/10 group relative flex-col gap-4 rounded-md border border-transparent px-5 py-4 transition-all",
                    "data-[focus-visible=true]:border-accent data-[focus-visible=true]:bg-accent/10",
                  )}
                >
                  <Checkbox.Control className="absolute right-4 top-3 size-5">
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Content className="flex flex-col gap-6">
                    <div className="flex items-center gap-2">
                      <Icon className="size-5" icon={option.icon} />
                      <Label>{option.title}</Label>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Description>{option.description}</Description>
                      <span className="text-sm font-semibold">{option.price}</span>
                    </div>
                  </Checkbox.Content>
                </Checkbox>
              ))}
            </div>
          </CheckboxGroup>
        </section>
      </div>
    );
  },
};
