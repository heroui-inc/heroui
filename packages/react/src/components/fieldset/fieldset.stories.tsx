import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Checkbox, CheckboxGroup} from "../checkbox";
import {Description} from "../description";
import {Label} from "../label";
import {Text} from "../text";

import {Field, FieldError, FieldGroup, Fieldset, Legend} from "./fieldset";

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
            <Checkbox id="marketing-interest" name="interests" value="marketing">
              <Checkbox.Indicator />
            </Checkbox>
            <Label htmlFor="marketing-interest">Marketing</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="sales" name="interests" value="sales">
              <Checkbox.Indicator />
            </Checkbox>
            <Label htmlFor="sales">Sales</Label>
          </div>
        </FieldGroup>
      </CheckboxGroup>
    </Fieldset>
  ),
};

export const WithDisabledState: Story = {
  render: () => (
    <Fieldset className="w-96">
      <Legend>Feature Access</Legend>
      <Text>Some features require a premium subscription.</Text>
      <CheckboxGroup>
        <FieldGroup>
          <div className="flex items-start gap-3">
            <Checkbox defaultSelected id="basic-features" name="features" value="basic">
              <Checkbox.Indicator />
            </Checkbox>
            <div className="flex flex-col gap-1">
              <Label htmlFor="basic-features">Basic features</Label>
              <Description>Available to all users.</Description>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox isDisabled id="advanced-features" name="features" value="advanced">
              <Checkbox.Indicator />
            </Checkbox>
            <div className="flex flex-col gap-1">
              <Label disabled htmlFor="advanced-features">
                Advanced features
              </Label>
              <Description>Requires premium subscription.</Description>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox isDisabled id="beta-features" name="features" value="beta">
              <Checkbox.Indicator />
            </Checkbox>
            <div className="flex flex-col gap-1">
              <Label disabled htmlFor="beta-features">
                Beta features
              </Label>
              <Description>Coming soon for premium users.</Description>
            </div>
          </div>
        </FieldGroup>
      </CheckboxGroup>
    </Fieldset>
  ),
};

export const NestedFieldsets: Story = {
  render: () => (
    <Fieldset className="w-[32rem]">
      <Legend>Account Settings</Legend>
      <div className="space-y-8">
        <Fieldset>
          <Legend className="text-sm">Security</Legend>
          <CheckboxGroup>
            <FieldGroup spacing="sm">
              <div className="flex items-start gap-3">
                <Checkbox defaultSelected id="2fa" name="security" value="2fa">
                  <Checkbox.Indicator />
                </Checkbox>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="2fa">Two-factor authentication</Label>
                  <Description>Add an extra layer of security to your account.</Description>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox id="login-alerts" name="security" value="login_alerts">
                  <Checkbox.Indicator />
                </Checkbox>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="login-alerts">Login alerts</Label>
                  <Description>Get notified when someone logs into your account.</Description>
                </div>
              </div>
            </FieldGroup>
          </CheckboxGroup>
        </Fieldset>

        <Fieldset>
          <Legend className="text-sm">Privacy</Legend>
          <CheckboxGroup>
            <FieldGroup spacing="sm">
              <div className="flex items-start gap-3">
                <Checkbox defaultSelected id="activity" name="privacy" value="activity_status">
                  <Checkbox.Indicator />
                </Checkbox>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="activity">Show activity status</Label>
                  <Description>Let others see when you&apos;re online.</Description>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox defaultSelected id="receipts" name="privacy" value="read_receipts">
                  <Checkbox.Indicator />
                </Checkbox>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="receipts">Read receipts</Label>
                  <Description>Let people know when you&apos;ve read their messages.</Description>
                </div>
              </div>
            </FieldGroup>
          </CheckboxGroup>
        </Fieldset>
      </div>
    </Fieldset>
  ),
};
