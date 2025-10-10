import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Checkbox, CheckboxGroup} from "../checkbox";
import {Text} from "../text";

import {Description, Field, FieldError, FieldGroup, Fieldset, Label, Legend} from "./field";

const meta: Meta<typeof Fieldset> = {
  component: Fieldset,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "📝 ToDo/Fieldset",
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

export const Default: Story = {
  render: () => (
    <Fieldset className="w-96">
      <Legend>Notification Settings</Legend>
      <Text>Choose how you want to be notified about updates.</Text>
      <FieldGroup>
        <Field>
          <Label htmlFor="email-notifications">Email notifications</Label>
          <Description>Receive updates via email</Description>
          <div className="flex items-center gap-3">
            <Checkbox id="email-notifications">
              <Checkbox.Indicator />
            </Checkbox>
            <Label className="font-normal" htmlFor="email-notifications">
              Enable email notifications
            </Label>
          </div>
        </Field>
      </FieldGroup>
    </Fieldset>
  ),
};

export const WithCheckboxGroup: Story = {
  render: () => (
    <Fieldset className="w-96">
      <Legend>Discoverability</Legend>
      <Text>Decide where your events can be found across the web.</Text>
      <CheckboxGroup>
        <FieldGroup>
          <div className="flex items-start gap-3">
            <Checkbox
              defaultSelected
              id="show-events"
              name="discoverability"
              value="show_on_events_page"
            >
              <Checkbox.Indicator />
            </Checkbox>
            <div className="flex flex-col gap-1">
              <Label htmlFor="show-events">Show on events page</Label>
              <Description>Make this event visible on your profile.</Description>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox id="allow-embed" name="discoverability" value="allow_embedding">
              <Checkbox.Indicator />
            </Checkbox>
            <div className="flex flex-col gap-1">
              <Label htmlFor="allow-embed">Allow embedding</Label>
              <Description>Allow others to embed your event details on their own site.</Description>
            </div>
          </div>
        </FieldGroup>
      </CheckboxGroup>
    </Fieldset>
  ),
};

export const WithFieldError: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>([]);

    return (
      <Fieldset className="w-96">
        <Legend>Select Required Options</Legend>
        <Text>You must select at least two options to continue.</Text>
        <CheckboxGroup isInvalid={selected.length < 2} value={selected} onChange={setSelected}>
          <FieldGroup>
            <div className="flex items-center gap-3">
              <Checkbox id="opt1" name="options" value="option1">
                <Checkbox.Indicator />
              </Checkbox>
              <Label htmlFor="opt1">Option 1</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="opt2" name="options" value="option2">
                <Checkbox.Indicator />
              </Checkbox>
              <Label htmlFor="opt2">Option 2</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="opt3" name="options" value="option3">
                <Checkbox.Indicator />
              </Checkbox>
              <Label htmlFor="opt3">Option 3</Label>
            </div>
          </FieldGroup>
          <FieldError>Please select at least 2 options</FieldError>
        </CheckboxGroup>
      </Fieldset>
    );
  },
};

export const MultipleFieldsets: Story = {
  render: () => (
    <div className="w-96 space-y-8">
      <Fieldset>
        <Legend>Privacy Settings</Legend>
        <Text>Control who can see your content and interact with you.</Text>
        <CheckboxGroup>
          <FieldGroup>
            <div className="flex items-start gap-3">
              <Checkbox defaultSelected id="public" name="privacy" value="public_profile">
                <Checkbox.Indicator />
              </Checkbox>
              <div className="flex flex-col gap-1">
                <Label htmlFor="public">Public profile</Label>
                <Description>Anyone can view your profile and content.</Description>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Checkbox id="searchable" name="privacy" value="searchable">
                <Checkbox.Indicator />
              </Checkbox>
              <div className="flex flex-col gap-1">
                <Label htmlFor="searchable">Searchable</Label>
                <Description>Your profile appears in search results.</Description>
              </div>
            </div>
          </FieldGroup>
        </CheckboxGroup>
      </Fieldset>

      <Fieldset>
        <Legend>Email Preferences</Legend>
        <Text>Choose which emails you&apos;d like to receive from us.</Text>
        <CheckboxGroup>
          <FieldGroup>
            <div className="flex items-start gap-3">
              <Checkbox defaultSelected id="marketing" name="emails" value="marketing">
                <Checkbox.Indicator />
              </Checkbox>
              <div className="flex flex-col gap-1">
                <Label htmlFor="marketing">Marketing emails</Label>
                <Description>New features, product updates, and special offers.</Description>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Checkbox id="newsletter" name="emails" value="newsletter">
                <Checkbox.Indicator />
              </Checkbox>
              <div className="flex flex-col gap-1">
                <Label htmlFor="newsletter">Newsletter</Label>
                <Description>Weekly digest of the best content.</Description>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Checkbox defaultSelected id="notifications" name="emails" value="notifications">
                <Checkbox.Indicator />
              </Checkbox>
              <div className="flex flex-col gap-1">
                <Label htmlFor="notifications">Notifications</Label>
                <Description>Important account activity and security alerts.</Description>
              </div>
            </div>
          </FieldGroup>
        </CheckboxGroup>
      </Fieldset>
    </div>
  ),
};

export const SimpleCheckboxGroup: Story = {
  render: () => (
    <Fieldset className="w-96">
      <Legend>Select your interests</Legend>
      <CheckboxGroup>
        <FieldGroup>
          <div className="flex items-center gap-3">
            <Checkbox id="design" name="interests" value="design">
              <Checkbox.Indicator />
            </Checkbox>
            <Label htmlFor="design">Design</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="development" name="interests" value="development">
              <Checkbox.Indicator />
            </Checkbox>
            <Label htmlFor="development">Development</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="marketing" name="interests" value="marketing">
              <Checkbox.Indicator />
            </Checkbox>
            <Label htmlFor="marketing">Marketing</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="business" name="interests" value="business">
              <Checkbox.Indicator />
            </Checkbox>
            <Label htmlFor="business">Business</Label>
          </div>
        </FieldGroup>
      </CheckboxGroup>
    </Fieldset>
  ),
};

export const RequiredOptions: Story = {
  render: () => (
    <Fieldset className="w-96">
      <Legend>Choose your subscription options</Legend>
      <Text>Pick at least one option to proceed.</Text>
      <CheckboxGroup isInvalid>
        <FieldGroup>
          <Field>
            <Checkbox value="monthly">
              <Checkbox.Indicator />
            </Checkbox>
            <Label>Monthly updates</Label>
            <Description>Stay informed with monthly product news.</Description>
          </Field>
          <Field>
            <Checkbox value="quarterly">
              <Checkbox.Indicator />
            </Checkbox>
            <Label>Quarterly insights</Label>
            <Description>Receive quarterly reports and metrics.</Description>
          </Field>
        </FieldGroup>
        <FieldError>Select at least one option.</FieldError>
      </CheckboxGroup>
    </Fieldset>
  ),
};
