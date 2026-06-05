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
  parameters: {
    layout: "centered",
  },
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
        <Checkbox.Button>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Label>Coding</Label>
        </Checkbox.Button>
        <Description>Love building software</Description>
      </Checkbox>
      <Checkbox value="design">
        <Checkbox.Button>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Label>Design</Label>
        </Checkbox.Button>
        <Description>Enjoy creating beautiful interfaces</Description>
      </Checkbox>
      <Checkbox value="writing">
        <Checkbox.Button>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Label>Writing</Label>
        </Checkbox.Button>
        <Description>Passionate about content creation</Description>
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
          <Label>Email notifications</Label>
        </Checkbox.Button>
        <Description>Receive updates via email</Description>
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
          <Label>Newsletter</Label>
        </Checkbox.Button>
        <Description>Get weekly newsletters</Description>
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
          <Checkbox.Button>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Label>Select all</Label>
          </Checkbox.Button>
        </Checkbox>
        <div className="ml-6 flex flex-col gap-2">
          <CheckboxGroup value={selected} onChange={setSelected}>
            <Checkbox value="coding">
              <Checkbox.Button>
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Label>Coding</Label>
              </Checkbox.Button>
            </Checkbox>
            <Checkbox value="design">
              <Checkbox.Button>
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Label>Design</Label>
              </Checkbox.Button>
            </Checkbox>
            <Checkbox value="writing">
              <Checkbox.Button>
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Label>Writing</Label>
              </Checkbox.Button>
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
            <Checkbox.Button>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Label>Email notifications</Label>
            </Checkbox.Button>
          </Checkbox>
          <Checkbox value="sms">
            <Checkbox.Button>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Label>SMS notifications</Label>
            </Checkbox.Button>
          </Checkbox>
          <Checkbox value="push">
            <Checkbox.Button>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Label>Push notifications</Label>
            </Checkbox.Button>
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
      <CheckboxGroup
        className="min-w-[320px]"
        name="skills"
        value={selected}
        onChange={setSelected}
      >
        <Label>Your skills</Label>
        <Checkbox value="coding">
          <Checkbox.Button>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Label>Coding</Label>
          </Checkbox.Button>
        </Checkbox>
        <Checkbox value="design">
          <Checkbox.Button>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Label>Design</Label>
          </Checkbox.Button>
        </Checkbox>
        <Checkbox value="writing">
          <Checkbox.Button>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Label>Writing</Label>
          </Checkbox.Button>
        </Checkbox>
        <Label className="my-4 text-sm text-muted">Selected: {selected.join(", ") || "None"}</Label>
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
        <Checkbox.Button>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Label>Feature 1</Label>
        </Checkbox.Button>
        <Description>This feature is coming soon</Description>
      </Checkbox>
      <Checkbox value="feature2">
        <Checkbox.Button>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Label>Feature 2</Label>
        </Checkbox.Button>
        <Description>This feature is coming soon</Description>
      </Checkbox>
    </CheckboxGroup>
  ),
};
