import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Description} from "../description";
import {Field, FieldError} from "../fieldset";
import {Label} from "../label";

import {Checkbox, CheckboxGroup} from "./index";

const meta: Meta<typeof CheckboxGroup> = {
  component: CheckboxGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "📝 ToDo/CheckboxGroup",
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

export const Default: Story = {
  render: () => (
    <CheckboxGroup>
      <Label>Favorite sports</Label>
      <CheckboxGroup.Items>
        <Field variant="checkbox">
          <Checkbox value="soccer">
            <Checkbox.Indicator />
          </Checkbox>
          <Label>Soccer</Label>
        </Field>
        <Field variant="checkbox">
          <Checkbox value="baseball">
            <Checkbox.Indicator />
          </Checkbox>
          <Label>Baseball</Label>
        </Field>
        <Field variant="checkbox">
          <Checkbox value="basketball">
            <Checkbox.Indicator />
          </Checkbox>
          <Label>Basketball</Label>
        </Field>
      </CheckboxGroup.Items>
    </CheckboxGroup>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <CheckboxGroup>
      <Label>Notifications</Label>
      <Description>Choose how you want to be notified</Description>
      <CheckboxGroup.Items>
        <Field variant="checkbox">
          <Checkbox value="email">
            <Checkbox.Indicator />
          </Checkbox>
          <Label>Email</Label>
        </Field>
        <Field variant="checkbox">
          <Checkbox value="sms">
            <Checkbox.Indicator />
          </Checkbox>
          <Label>SMS</Label>
        </Field>
        <Field variant="checkbox">
          <Checkbox value="push">
            <Checkbox.Indicator />
          </Checkbox>
          <Label>Push notifications</Label>
        </Field>
      </CheckboxGroup.Items>
    </CheckboxGroup>
  ),
};

export const DefaultValue: Story = {
  render: () => (
    <CheckboxGroup defaultValue={["email", "push"]}>
      <Label>Communication preferences</Label>
      <CheckboxGroup.Items>
        <Field variant="checkbox">
          <Checkbox value="email">
            <Checkbox.Indicator />
          </Checkbox>
          <Label>Email updates</Label>
        </Field>
        <Field variant="checkbox">
          <Checkbox value="sms">
            <Checkbox.Indicator />
          </Checkbox>
          <Label>Text messages</Label>
        </Field>
        <Field variant="checkbox">
          <Checkbox value="push">
            <Checkbox.Indicator />
          </Checkbox>
          <Label>Push notifications</Label>
        </Field>
      </CheckboxGroup.Items>
    </CheckboxGroup>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(["reading"]);

    return (
      <div className="flex flex-col gap-4">
        <CheckboxGroup value={selected} onChange={setSelected}>
          <Label>Hobbies</Label>
          <CheckboxGroup.Items>
            <div className="flex items-center gap-3">
              <Checkbox id="reading" value="reading">
                <Checkbox.Indicator />
              </Checkbox>
              <Label htmlFor="reading">Reading</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="gaming" value="gaming">
                <Checkbox.Indicator />
              </Checkbox>
              <Label htmlFor="gaming">Gaming</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="traveling" value="traveling">
                <Checkbox.Indicator />
              </Checkbox>
              <Label htmlFor="traveling">Traveling</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="cooking" value="cooking">
                <Checkbox.Indicator />
              </Checkbox>
              <Label htmlFor="cooking">Cooking</Label>
            </div>
          </CheckboxGroup.Items>
        </CheckboxGroup>
        <p className="text-muted-foreground text-sm">
          Selected: {selected.length > 0 ? selected.join(", ") : "none"}
        </p>
      </div>
    );
  },
};

export const Horizontal: Story = {
  render: () => (
    <CheckboxGroup orientation="horizontal">
      <Label>Select features</Label>
      <CheckboxGroup.Items>
        <div className="flex items-center gap-3">
          <Checkbox id="feature1" value="feature1">
            <Checkbox.Indicator />
          </Checkbox>
          <Label htmlFor="feature1">Feature 1</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox id="feature2" value="feature2">
            <Checkbox.Indicator />
          </Checkbox>
          <Label htmlFor="feature2">Feature 2</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox id="feature3" value="feature3">
            <Checkbox.Indicator />
          </Checkbox>
          <Label htmlFor="feature3">Feature 3</Label>
        </div>
      </CheckboxGroup.Items>
    </CheckboxGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <CheckboxGroup isDisabled defaultValue={["option1"]}>
      <Label>Disabled options</Label>
      <CheckboxGroup.Items>
        <div className="flex items-center gap-3">
          <Checkbox id="option1" value="option1">
            <Checkbox.Indicator />
          </Checkbox>
          <Label htmlFor="option1">Option 1</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox id="option2" value="option2">
            <Checkbox.Indicator />
          </Checkbox>
          <Label htmlFor="option2">Option 2</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox id="option3" value="option3">
            <Checkbox.Indicator />
          </Checkbox>
          <Label htmlFor="option3">Option 3</Label>
        </div>
      </CheckboxGroup.Items>
    </CheckboxGroup>
  ),
};

export const DisabledIndividual: Story = {
  render: () => (
    <CheckboxGroup>
      <Label>Mixed availability</Label>
      <CheckboxGroup.Items>
        <div className="flex items-center gap-3">
          <Checkbox id="available" value="available">
            <Checkbox.Indicator />
          </Checkbox>
          <Label htmlFor="available">Available option</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox isDisabled id="unavailable" value="unavailable">
            <Checkbox.Indicator />
          </Checkbox>
          <Label disabled htmlFor="unavailable">
            Unavailable option
          </Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox isDisabled id="coming-soon" value="coming-soon">
            <Checkbox.Indicator />
          </Checkbox>
          <Label disabled htmlFor="coming-soon">
            Coming soon
          </Label>
        </div>
      </CheckboxGroup.Items>
    </CheckboxGroup>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <CheckboxGroup isReadOnly defaultValue={["agreed", "understood"]}>
      <Label>Review only</Label>
      <CheckboxGroup.Items>
        <div className="flex items-center gap-3">
          <Checkbox id="agreed" value="agreed">
            <Checkbox.Indicator />
          </Checkbox>
          <Label htmlFor="agreed">Terms agreed</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox id="understood" value="understood">
            <Checkbox.Indicator />
          </Checkbox>
          <Label htmlFor="understood">Privacy policy understood</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox id="newsletter-readonly" value="newsletter">
            <Checkbox.Indicator />
          </Checkbox>
          <Label htmlFor="newsletter-readonly">Newsletter subscription</Label>
        </div>
      </CheckboxGroup.Items>
    </CheckboxGroup>
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
        <CheckboxGroup isInvalid={selected.length < 2} value={selected} onChange={setSelected}>
          <Label required>Select your interests (at least 2)</Label>
          <Description>Choose topics you'd like to receive updates about</Description>
          <CheckboxGroup.Items>
            <div className="flex items-center gap-3">
              <Checkbox id="technology" value="technology">
                <Checkbox.Indicator />
              </Checkbox>
              <Label htmlFor="technology">Technology</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="design" value="design">
                <Checkbox.Indicator />
              </Checkbox>
              <Label htmlFor="design">Design</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="business" value="business">
                <Checkbox.Indicator />
              </Checkbox>
              <Label htmlFor="business">Business</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="marketing" value="marketing">
                <Checkbox.Indicator />
              </Checkbox>
              <Label htmlFor="marketing">Marketing</Label>
            </div>
          </CheckboxGroup.Items>
          <FieldError>Please select at least 2 interests</FieldError>
        </CheckboxGroup>
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
    <CheckboxGroup>
      <Label>Subscription tiers</Label>
      <CheckboxGroup.Items className="gap-4">
        <div className="flex gap-3">
          <Checkbox className="mt-1" id="basic-tier" value="basic">
            <Checkbox.Indicator />
          </Checkbox>
          <div className="flex flex-col gap-1">
            <Label className="font-medium" htmlFor="basic-tier">
              Basic Plan
            </Label>
            <Description>Essential features for individuals</Description>
          </div>
        </div>
        <div className="flex gap-3">
          <Checkbox className="mt-1" id="pro-tier" value="pro">
            <Checkbox.Indicator />
          </Checkbox>
          <div className="flex flex-col gap-1">
            <Label className="font-medium" htmlFor="pro-tier">
              Pro Plan
            </Label>
            <Description>Advanced features for professionals</Description>
          </div>
        </div>
        <div className="flex gap-3">
          <Checkbox className="mt-1" id="enterprise-tier" value="enterprise">
            <Checkbox.Indicator />
          </Checkbox>
          <div className="flex flex-col gap-1">
            <Label className="font-medium" htmlFor="enterprise-tier">
              Enterprise Plan
            </Label>
            <Description>Custom solutions for large teams</Description>
          </div>
        </div>
      </CheckboxGroup.Items>
    </CheckboxGroup>
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
        <CheckboxGroup name="preferences">
          <Label>Email preferences</Label>
          <CheckboxGroup.Items>
            <div className="flex items-center gap-3">
              <Checkbox id="updates" value="updates">
                <Checkbox.Indicator />
              </Checkbox>
              <Label htmlFor="updates">Product updates</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="newsletter-form" value="newsletter">
                <Checkbox.Indicator />
              </Checkbox>
              <Label htmlFor="newsletter-form">Newsletter</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="offers" value="offers">
                <Checkbox.Indicator />
              </Checkbox>
              <Label htmlFor="offers">Special offers</Label>
            </div>
          </CheckboxGroup.Items>
        </CheckboxGroup>
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
    <CheckboxGroup defaultValue={["product"]}>
      <Label>Email Preferences</Label>
      <Description>Select the types of emails you'd like to receive</Description>
      <CheckboxGroup.Items>
        <Field variant="checkbox">
          <Checkbox value="product">
            <Checkbox.Indicator />
          </Checkbox>
          <div>
            <Label>Product updates</Label>
            <Description>New features and improvements</Description>
          </div>
        </Field>
        <Field variant="checkbox">
          <Checkbox value="marketing">
            <Checkbox.Indicator />
          </Checkbox>
          <Label>Marketing emails</Label>
        </Field>
        <Field variant="checkbox">
          <Checkbox value="security">
            <Checkbox.Indicator />
          </Checkbox>
          <div>
            <Label>Security alerts</Label>
            <Description>Important notifications about your account</Description>
          </div>
        </Field>
      </CheckboxGroup.Items>
    </CheckboxGroup>
  ),
};
