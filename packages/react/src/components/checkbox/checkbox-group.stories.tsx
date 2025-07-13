import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Description} from "../description";
import {Field, FieldError} from "../fieldset";
import {Label} from "../label";

import {Checkbox, CheckboxGroup} from "./checkbox";

const meta: Meta<typeof CheckboxGroup.Root> = {
  title: "Components/CheckboxGroup",
  component: CheckboxGroup.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup.Root>;

export const Default: Story = {
  render: () => (
    <CheckboxGroup.Root>
      <Label>Favorite sports</Label>
      <CheckboxGroup.Items>
        <Field variant="checkbox">
          <Checkbox.Root value="soccer">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <Label>Soccer</Label>
        </Field>
        <Field variant="checkbox">
          <Checkbox.Root value="baseball">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <Label>Baseball</Label>
        </Field>
        <Field variant="checkbox">
          <Checkbox.Root value="basketball">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <Label>Basketball</Label>
        </Field>
      </CheckboxGroup.Items>
    </CheckboxGroup.Root>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <CheckboxGroup.Root>
      <Label>Notifications</Label>
      <Description>Choose how you want to be notified</Description>
      <CheckboxGroup.Items>
        <Field variant="checkbox">
          <Checkbox.Root value="email">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <Label>Email</Label>
        </Field>
        <Field variant="checkbox">
          <Checkbox.Root value="sms">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <Label>SMS</Label>
        </Field>
        <Field variant="checkbox">
          <Checkbox.Root value="push">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <Label>Push notifications</Label>
        </Field>
      </CheckboxGroup.Items>
    </CheckboxGroup.Root>
  ),
};

export const DefaultValue: Story = {
  render: () => (
    <CheckboxGroup.Root defaultValue={["email", "push"]}>
      <Label>Communication preferences</Label>
      <CheckboxGroup.Items>
        <Field variant="checkbox">
          <Checkbox.Root value="email">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <Label>Email updates</Label>
        </Field>
        <Field variant="checkbox">
          <Checkbox.Root value="sms">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <Label>Text messages</Label>
        </Field>
        <Field variant="checkbox">
          <Checkbox.Root value="push">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <Label>Push notifications</Label>
        </Field>
      </CheckboxGroup.Items>
    </CheckboxGroup.Root>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(["reading"]);

    return (
      <div className="flex flex-col gap-4">
        <CheckboxGroup.Root value={selected} onChange={setSelected}>
          <Label>Hobbies</Label>
          <CheckboxGroup.Items>
            <div className="flex items-center gap-3">
              <Checkbox.Root id="reading" value="reading">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <Label htmlFor="reading">Reading</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox.Root id="gaming" value="gaming">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <Label htmlFor="gaming">Gaming</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox.Root id="traveling" value="traveling">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <Label htmlFor="traveling">Traveling</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox.Root id="cooking" value="cooking">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <Label htmlFor="cooking">Cooking</Label>
            </div>
          </CheckboxGroup.Items>
        </CheckboxGroup.Root>
        <p className="text-muted-foreground text-sm">
          Selected: {selected.length > 0 ? selected.join(", ") : "none"}
        </p>
      </div>
    );
  },
};

export const Horizontal: Story = {
  render: () => (
    <CheckboxGroup.Root orientation="horizontal">
      <Label>Select features</Label>
      <CheckboxGroup.Items>
        <div className="flex items-center gap-3">
          <Checkbox.Root id="feature1" value="feature1">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <Label htmlFor="feature1">Feature 1</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox.Root id="feature2" value="feature2">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <Label htmlFor="feature2">Feature 2</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox.Root id="feature3" value="feature3">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <Label htmlFor="feature3">Feature 3</Label>
        </div>
      </CheckboxGroup.Items>
    </CheckboxGroup.Root>
  ),
};

export const Disabled: Story = {
  render: () => (
    <CheckboxGroup.Root isDisabled defaultValue={["option1"]}>
      <Label>Disabled options</Label>
      <CheckboxGroup.Items>
        <div className="flex items-center gap-3">
          <Checkbox.Root id="option1" value="option1">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <Label htmlFor="option1">Option 1</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox.Root id="option2" value="option2">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <Label htmlFor="option2">Option 2</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox.Root id="option3" value="option3">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <Label htmlFor="option3">Option 3</Label>
        </div>
      </CheckboxGroup.Items>
    </CheckboxGroup.Root>
  ),
};

export const DisabledIndividual: Story = {
  render: () => (
    <CheckboxGroup.Root>
      <Label>Mixed availability</Label>
      <CheckboxGroup.Items>
        <div className="flex items-center gap-3">
          <Checkbox.Root id="available" value="available">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <Label htmlFor="available">Available option</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox.Root isDisabled id="unavailable" value="unavailable">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <Label disabled htmlFor="unavailable">
            Unavailable option
          </Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox.Root isDisabled id="coming-soon" value="coming-soon">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <Label disabled htmlFor="coming-soon">
            Coming soon
          </Label>
        </div>
      </CheckboxGroup.Items>
    </CheckboxGroup.Root>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <CheckboxGroup.Root isReadOnly defaultValue={["agreed", "understood"]}>
      <Label>Review only</Label>
      <CheckboxGroup.Items>
        <div className="flex items-center gap-3">
          <Checkbox.Root id="agreed" value="agreed">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <Label htmlFor="agreed">Terms agreed</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox.Root id="understood" value="understood">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <Label htmlFor="understood">Privacy policy understood</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox.Root id="newsletter-readonly" value="newsletter">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <Label htmlFor="newsletter-readonly">Newsletter subscription</Label>
        </div>
      </CheckboxGroup.Items>
    </CheckboxGroup.Root>
  ),
};

export const WithValidation: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>([]);

    return (
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (selected.length < 2) {
            alert("Please select at least 2 options");
          } else {
            alert("Form submitted successfully!");
          }
        }}
      >
        <CheckboxGroup.Root isInvalid={selected.length < 2} value={selected} onChange={setSelected}>
          <Label required>Select your interests (at least 2)</Label>
          <Description>Choose topics you'd like to receive updates about</Description>
          <CheckboxGroup.Items>
            <div className="flex items-center gap-3">
              <Checkbox.Root id="technology" value="technology">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <Label htmlFor="technology">Technology</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox.Root id="design" value="design">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <Label htmlFor="design">Design</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox.Root id="business" value="business">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <Label htmlFor="business">Business</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox.Root id="marketing" value="marketing">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <Label htmlFor="marketing">Marketing</Label>
            </div>
          </CheckboxGroup.Items>
          <FieldError>Please select at least 2 interests</FieldError>
        </CheckboxGroup.Root>
        <button
          className="bg-accent text-accent-foreground hover:bg-accent-hover rounded-md px-4 py-2"
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  },
};

export const ComplexLabels: Story = {
  render: () => (
    <CheckboxGroup.Root>
      <Label>Subscription tiers</Label>
      <CheckboxGroup.Items className="gap-4">
        <div className="flex gap-3">
          <Checkbox.Root className="mt-1" id="basic-tier" value="basic">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <div className="flex flex-col gap-1">
            <Label className="font-medium" htmlFor="basic-tier">
              Basic Plan
            </Label>
            <Description>Essential features for individuals</Description>
          </div>
        </div>
        <div className="flex gap-3">
          <Checkbox.Root className="mt-1" id="pro-tier" value="pro">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <div className="flex flex-col gap-1">
            <Label className="font-medium" htmlFor="pro-tier">
              Pro Plan
            </Label>
            <Description>Advanced features for professionals</Description>
          </div>
        </div>
        <div className="flex gap-3">
          <Checkbox.Root className="mt-1" id="enterprise-tier" value="enterprise">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <div className="flex flex-col gap-1">
            <Label className="font-medium" htmlFor="enterprise-tier">
              Enterprise Plan
            </Label>
            <Description>Custom solutions for large teams</Description>
          </div>
        </div>
      </CheckboxGroup.Items>
    </CheckboxGroup.Root>
  ),
};

export const FormIntegration: Story = {
  render: () => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const values = formData.getAll("preferences");

      alert(`Selected preferences: ${values.join(", ")}`);
    };

    return (
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <CheckboxGroup.Root name="preferences">
          <Label>Email preferences</Label>
          <CheckboxGroup.Items>
            <div className="flex items-center gap-3">
              <Checkbox.Root id="updates" value="updates">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <Label htmlFor="updates">Product updates</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox.Root id="newsletter-form" value="newsletter">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <Label htmlFor="newsletter-form">Newsletter</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox.Root id="offers" value="offers">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <Label htmlFor="offers">Special offers</Label>
            </div>
          </CheckboxGroup.Items>
        </CheckboxGroup.Root>
        <button
          className="bg-accent text-accent-foreground hover:bg-accent-hover rounded-md px-4 py-2"
          type="submit"
        >
          Save preferences
        </button>
      </form>
    );
  },
};

export const CleanPattern: Story = {
  render: () => (
    <CheckboxGroup.Root defaultValue={["product"]}>
      <Label>Email Preferences</Label>
      <Description>Select the types of emails you'd like to receive</Description>
      <CheckboxGroup.Items>
        <Field variant="checkbox">
          <Checkbox.Root value="product">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <div>
            <Label>Product updates</Label>
            <Description>New features and improvements</Description>
          </div>
        </Field>
        <Field variant="checkbox">
          <Checkbox.Root value="marketing">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <Label>Marketing emails</Label>
        </Field>
        <Field variant="checkbox">
          <Checkbox.Root value="security">
            <Checkbox.Indicator />
          </Checkbox.Root>
          <div>
            <Label>Security alerts</Label>
            <Description>Important notifications about your account</Description>
          </div>
        </Field>
      </CheckboxGroup.Items>
    </CheckboxGroup.Root>
  ),
};
