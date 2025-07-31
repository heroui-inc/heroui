import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Description} from "../description";
import {Field, FieldGroup, Fieldset, Legend} from "../fieldset";
import {Label} from "../label";
import {Text} from "../text";

import {Checkbox} from "./index";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "📝 ToDo/Checkbox",
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Checkbox id="subscribe">
        <Checkbox.Indicator />
      </Checkbox>
      <Label htmlFor="subscribe">Subscribe to newsletter</Label>
    </div>
  ),
};

export const WithLabelAsChild: Story = {
  render: () => (
    <Checkbox>
      <Checkbox.Indicator />
      <Label>Subscribe to newsletter</Label>
    </Checkbox>
  ),
};

export const WithLabelAndDescription: Story = {
  render: () => (
    <Checkbox>
      <Checkbox.Indicator />
      <Label>Postal mail</Label>
      <Description>Receive notifications via postal mail</Description>
    </Checkbox>
  ),
};

export const DesignStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <h3 className="text-sm font-medium">Design States Preview</h3>

      <div className="grid grid-cols-6 items-center gap-4">
        <div className="text-muted-foreground text-xs">Default</div>
        <div className="text-muted-foreground text-xs">Hover</div>
        <div className="text-muted-foreground text-xs">Pressed</div>
        <div className="text-muted-foreground text-xs">Focus</div>
        <div className="text-muted-foreground text-xs">Error</div>
        <div className="text-muted-foreground text-xs">Disabled</div>

        {/* Unselected row */}
        <Checkbox>
          <Checkbox.Indicator />
        </Checkbox>
        <div className="[&>*]:data-[hovered=true]:border-accent-hover">
          <Checkbox data-hovered>
            <Checkbox.Indicator />
          </Checkbox>
        </div>
        <div className="[&>*]:data-[pressed=true]:scale-[0.97]">
          <Checkbox data-pressed>
            <Checkbox.Indicator />
          </Checkbox>
        </div>
        <div className="[&>*]:data-[focus-visible=true]:border-2">
          <Checkbox data-focus-visible>
            <Checkbox.Indicator />
          </Checkbox>
        </div>
        <Checkbox isInvalid>
          <Checkbox.Indicator />
        </Checkbox>
        <Checkbox isDisabled>
          <Checkbox.Indicator />
        </Checkbox>

        {/* Selected row */}
        <Checkbox defaultSelected>
          <Checkbox.Indicator />
        </Checkbox>
        <div className="[&>*]:data-[hovered=true]:bg-accent-hover">
          <Checkbox data-hovered defaultSelected>
            <Checkbox.Indicator />
          </Checkbox>
        </div>
        <div className="[&>*]:data-[pressed=true]:scale-[0.97]">
          <Checkbox data-pressed defaultSelected>
            <Checkbox.Indicator />
          </Checkbox>
        </div>
        <div className="[&>*]:data-[focus-visible=true]:border-2">
          <Checkbox data-focus-visible defaultSelected>
            <Checkbox.Indicator />
          </Checkbox>
        </div>
        <Checkbox defaultSelected isInvalid>
          <Checkbox.Indicator />
        </Checkbox>
        <Checkbox defaultSelected isDisabled>
          <Checkbox.Indicator />
        </Checkbox>

        {/* Indeterminate row */}
        <Checkbox isIndeterminate>
          <Checkbox.Indicator />
        </Checkbox>
        <div className="[&>*]:data-[hovered=true]:bg-accent-hover">
          <Checkbox data-hovered isIndeterminate>
            <Checkbox.Indicator />
          </Checkbox>
        </div>
        <div className="[&>*]:data-[pressed=true]:scale-[0.97]">
          <Checkbox data-pressed isIndeterminate>
            <Checkbox.Indicator />
          </Checkbox>
        </div>
        <div className="[&>*]:data-[focus-visible=true]:border-2">
          <Checkbox data-focus-visible isIndeterminate>
            <Checkbox.Indicator />
          </Checkbox>
        </div>
        <Checkbox isIndeterminate isInvalid>
          <Checkbox.Indicator />
        </Checkbox>
        <Checkbox isDisabled isIndeterminate>
          <Checkbox.Indicator />
        </Checkbox>
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-sm font-medium">Selection States</h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Checkbox id="unchecked">
              <Checkbox.Indicator />
            </Checkbox>
            <Label htmlFor="unchecked">Unchecked</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox defaultSelected id="checked">
              <Checkbox.Indicator />
            </Checkbox>
            <Label htmlFor="checked">Checked</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox isIndeterminate id="indeterminate">
              <Checkbox.Indicator />
            </Checkbox>
            <Label htmlFor="indeterminate">Indeterminate</Label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">Interactive States</h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Checkbox isDisabled id="disabled">
              <Checkbox.Indicator />
            </Checkbox>
            <Label disabled htmlFor="disabled">
              Disabled
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox defaultSelected isDisabled id="disabled-checked">
              <Checkbox.Indicator />
            </Checkbox>
            <Label disabled htmlFor="disabled-checked">
              Disabled and checked
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox isDisabled isIndeterminate id="disabled-indeterminate">
              <Checkbox.Indicator />
            </Checkbox>
            <Label disabled htmlFor="disabled-indeterminate">
              Disabled and indeterminate
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox defaultSelected isReadOnly id="readonly">
              <Checkbox.Indicator />
            </Checkbox>
            <Label htmlFor="readonly">Read only</Label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">Validation States</h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Checkbox isInvalid id="invalid">
              <Checkbox.Indicator />
            </Checkbox>
            <Label htmlFor="invalid">Invalid</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox defaultSelected isInvalid id="invalid-checked">
              <Checkbox.Indicator />
            </Checkbox>
            <Label htmlFor="invalid-checked">Invalid and checked</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox isIndeterminate isInvalid id="invalid-indeterminate">
              <Checkbox.Indicator />
            </Checkbox>
            <Label htmlFor="invalid-indeterminate">Invalid and indeterminate</Label>
          </div>
        </div>
      </div>

      <div>
        <p className="text-muted-foreground text-xs">
          Note: Hover over checkboxes to see hover state. Tab to focus for keyboard navigation.
        </p>
      </div>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [isSelected, setIsSelected] = React.useState(false);

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Checkbox id="terms-controlled" isSelected={isSelected} onChange={setIsSelected}>
            <Checkbox.Indicator />
          </Checkbox>
          <Label htmlFor="terms-controlled">I agree to the terms and conditions</Label>
        </div>
        <p className="text-muted-foreground text-sm">
          You have {isSelected ? "agreed" : "not agreed"} to the terms
        </p>
      </div>
    );
  },
};

export const Uncontrolled: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Checkbox defaultSelected id="marketing">
        <Checkbox.Indicator />
      </Checkbox>
      <Label htmlFor="marketing">Receive marketing emails</Label>
    </div>
  ),
};

export const WithExternalLabel: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Checkbox id="terms">
        <Checkbox.Indicator />
      </Checkbox>
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="flex gap-3">
      <Checkbox className="mt-0.5" id="notifications">
        <Checkbox.Indicator />
      </Checkbox>
      <div className="flex flex-col gap-1">
        <Label htmlFor="notifications">Email notifications</Label>
        <Description>Get notified when someone mentions you</Description>
      </div>
    </div>
  ),
};

export const WithFieldComponent: Story = {
  render: () => (
    <Field variant="checkbox">
      <Checkbox>
        <Checkbox.Indicator />
      </Checkbox>
      <div>
        <Label>Email notifications</Label>
        <Description>Get notified when someone mentions you</Description>
      </div>
    </Field>
  ),
};

export const CleanFieldsetPattern: Story = {
  render: () => (
    <Fieldset className="w-96">
      <Legend>Preferences</Legend>
      <FieldGroup>
        <Field variant="checkbox">
          <Checkbox name="marketing">
            <Checkbox.Indicator />
          </Checkbox>
          <Label>Marketing emails</Label>
        </Field>
        <Field variant="checkbox">
          <Checkbox defaultSelected name="updates">
            <Checkbox.Indicator />
          </Checkbox>
          <div>
            <Label>Product updates</Label>
            <Description>New features and improvements</Description>
          </div>
        </Field>
        <Field variant="checkbox">
          <Checkbox name="security">
            <Checkbox.Indicator />
          </Checkbox>
          <Label>Security alerts</Label>
        </Field>
      </FieldGroup>
    </Fieldset>
  ),
};

export const CheckboxOnly: Story = {
  render: () => (
    <Checkbox aria-label="Select item">
      <Checkbox.Indicator />
    </Checkbox>
  ),
};

export const CustomIcon: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Checkbox id="custom-icon">
        <Checkbox.Indicator>
          {(isIndeterminate) =>
            isIndeterminate ? (
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
              </svg>
            ) : (
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  clipRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  fillRule="evenodd"
                />
              </svg>
            )
          }
        </Checkbox.Indicator>
      </Checkbox>
      <Label htmlFor="custom-icon">Custom icon checkbox</Label>
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => {
    const [checkedItems, setCheckedItems] = React.useState(["option2"]);
    const allOptions = ["option1", "option2", "option3"];

    const isIndeterminate = checkedItems.length > 0 && checkedItems.length < allOptions.length;
    const isAllSelected = checkedItems.length === allOptions.length;

    const handleParentChange = (isSelected: boolean) => {
      setCheckedItems(isSelected ? allOptions : []);
    };

    const handleChildChange = (value: string, isSelected: boolean) => {
      setCheckedItems((prev) =>
        isSelected ? [...prev, value] : prev.filter((item) => item !== value),
      );
    };

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Checkbox
            id="select-all"
            isIndeterminate={isIndeterminate}
            isSelected={isAllSelected}
            onChange={handleParentChange}
          >
            <Checkbox.Indicator />
          </Checkbox>
          <Label htmlFor="select-all">Select all</Label>
        </div>
        <div className="ml-6 flex flex-col gap-2">
          {allOptions.map((option) => (
            <div key={option} className="flex items-center gap-3">
              <Checkbox
                id={option}
                isSelected={checkedItems.includes(option)}
                value={option}
                onChange={(isSelected) => handleChildChange(option, isSelected)}
              >
                <Checkbox.Indicator />
              </Checkbox>
              <Label htmlFor={option}>
                {option.charAt(0).toUpperCase() + option.slice(1).replace(/\d+/, " $&")}
              </Label>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const FormIntegration: Story = {
  render: () => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const subscribe = formData.get("subscribe");

      alert(`Newsletter subscription: ${subscribe ? "Yes" : "No"}`);
    };

    return (
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex items-center gap-3">
          <Checkbox id="newsletter" name="subscribe" value="yes">
            <Checkbox.Indicator />
          </Checkbox>
          <Label htmlFor="newsletter">Subscribe to our newsletter</Label>
        </div>
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

export const Required: Story = {
  render: () => (
    <form className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Checkbox isRequired id="agree">
          <Checkbox.Indicator />
        </Checkbox>
        <Label required htmlFor="agree">
          I agree to the terms and conditions
        </Label>
      </div>
      <button
        className="bg-accent text-accent-foreground hover:bg-accent-hover rounded-md px-4 py-2"
        type="submit"
      >
        Continue
      </button>
    </form>
  ),
};

export const RequiredWithChildLabel: Story = {
  render: () => (
    <form className="flex flex-col gap-4">
      <Checkbox isRequired>
        <Checkbox.Indicator />
        <Label required>I agree to the terms and conditions</Label>
      </Checkbox>
      <button
        className="bg-accent text-accent-foreground hover:bg-accent-hover rounded-md px-4 py-2"
        type="submit"
      >
        Continue
      </button>
    </form>
  ),
};

export const WithFieldset: Story = {
  render: () => (
    <Fieldset className="w-96">
      <Legend>Notification Preferences</Legend>
      <Text>Select how you&apos;d like to receive updates from us.</Text>
      <FieldGroup>
        <Field variant="checkbox">
          <Checkbox defaultSelected name="notifications" value="email">
            <Checkbox.Indicator />
          </Checkbox>
          <div>
            <Label>Email notifications</Label>
            <Description>Get updates about your account via email</Description>
          </div>
        </Field>
        <Field variant="checkbox">
          <Checkbox name="notifications" value="sms">
            <Checkbox.Indicator />
          </Checkbox>
          <div>
            <Label>SMS notifications</Label>
            <Description>Receive text messages for important alerts</Description>
          </div>
        </Field>
        <Field variant="checkbox">
          <Checkbox defaultSelected name="notifications" value="push">
            <Checkbox.Indicator />
          </Checkbox>
          <div>
            <Label>Push notifications</Label>
            <Description>Get instant updates on your device</Description>
          </div>
        </Field>
      </FieldGroup>
    </Fieldset>
  ),
};
