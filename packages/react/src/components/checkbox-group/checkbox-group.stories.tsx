import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Button} from "../button";
import {Checkbox} from "../checkbox";
import {Description} from "../description";
import {FieldError} from "../field-error";
import {Form} from "../form";
import {Label} from "../label";

import {CheckboxGroup} from "./index";

export default {
  argTypes: {},
  component: CheckboxGroup,
  title: "Components/Forms/CheckboxGroup",
} as Meta<typeof CheckboxGroup>;

type Story = StoryObj<typeof CheckboxGroup>;

export const Default: Story = {
  render: () => (
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
  ),
};

export const WithCustomIndicator: Story = {
  render: () => (
    <CheckboxGroup name="features">
      <Label>Features</Label>
      <Description>Select the features you want</Description>
      <Checkbox value="notifications">
        <Checkbox.Control>
          <Checkbox.Indicator>
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
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Content>
          <Label>Newsletter</Label>
          <Description>Get weekly newsletters</Description>
        </Checkbox.Content>
      </Checkbox>
    </CheckboxGroup>
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
          onChange={(isSelected: boolean) => {
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
        <Label className="my-4 text-sm">Selected: {selected.join(", ") || "None"}</Label>
      </CheckboxGroup>
    );
  },
};

export const Disabled: Story = {
  render: () => (
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
  ),
};
