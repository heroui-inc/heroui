import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Button} from "../button";
import {Checkbox} from "../checkbox";
import {Description} from "../description";
import {Label} from "../label";
import {Radio, RadioGroup} from "../radio";
import {TextField} from "../text-field";

import {Form} from "./index";

const meta: Meta<typeof Form> = {
  argTypes: {
    isDisabled: {
      control: {type: "boolean"},
      defaultValue: false,
      description: "Whether the form is disabled",
    },
    validationBehavior: {
      control: {type: "select"},
      defaultValue: "native",
      description: "How validation errors are displayed",
      options: ["native", "aria"],
    },
  },
  component: Form,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "📝 ToDo/Form",
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: (args) => (
    <Form className="w-96 space-y-4" {...args}>
      <TextField isRequired name="username" type="text">
        <TextField.Label>Username</TextField.Label>
        <TextField.Input />
        <TextField.Error />
      </TextField>

      <TextField isRequired name="email" type="email">
        <TextField.Label>Email</TextField.Label>
        <TextField.Input />
        <TextField.Description>We&apos;ll never share your email</TextField.Description>
        <TextField.Error />
      </TextField>

      <Form.Actions>
        <Button type="submit">Submit</Button>
        <Button type="reset" variant="tertiary">
          Reset
        </Button>
      </Form.Actions>
    </Form>
  ),
};

export const WithSections: Story = {
  render: (args) => (
    <Form className="w-96" {...args}>
      <Form.Section>
        <h3 className="mb-3 text-lg font-semibold">Account Information</h3>
        <div className="space-y-4">
          <TextField isRequired name="username" type="text">
            <TextField.Label>Username</TextField.Label>
            <TextField.Input />
            <TextField.Error />
          </TextField>

          <TextField isRequired name="email" type="email">
            <TextField.Label>Email</TextField.Label>
            <TextField.Input />
            <TextField.Error />
          </TextField>
        </div>
      </Form.Section>

      <Form.Section>
        <h3 className="mb-3 text-lg font-semibold">Preferences</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Checkbox id="newsletter">
              <Checkbox.Indicator />
            </Checkbox>
            <Label htmlFor="newsletter">Subscribe to newsletter</Label>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox id="notifications">
              <Checkbox.Indicator />
            </Checkbox>
            <div className="space-y-1">
              <Label htmlFor="notifications">Email notifications</Label>
              <Description>Get notified when someone mentions you</Description>
            </div>
          </div>
        </div>
      </Form.Section>

      <Form.Actions>
        <Button type="submit">Save Changes</Button>
        <Button type="reset" variant="tertiary">
          Cancel
        </Button>
      </Form.Actions>
    </Form>
  ),
};

export const WithValidation: Story = {
  render: (args) => {
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    return (
      <Form
        className="w-96 space-y-4"
        validationBehavior="aria"
        validationErrors={errors}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const username = formData.get("username");
          const email = formData.get("email");

          const newErrors: Record<string, string> = {};

          if (!username) {
            newErrors["username"] = "Username is required";
          } else if (username.toString().length < 3) {
            newErrors["username"] = "Username must be at least 3 characters";
          }

          if (!email) {
            newErrors["email"] = "Email is required";
          } else if (!email.toString().includes("@")) {
            newErrors["email"] = "Please enter a valid email";
          }

          if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
          } else {
            setErrors({});
            alert("Form submitted successfully!");
          }
        }}
        {...args}
      >
        <TextField isRequired name="username" type="text">
          <TextField.Label>Username</TextField.Label>
          <TextField.Input />
          <TextField.Error />
        </TextField>

        <TextField isRequired name="email" type="email">
          <TextField.Label>Email</TextField.Label>
          <TextField.Input />
          <TextField.Error />
        </TextField>

        <TextField isRequired minLength={8} name="password" type="password">
          <TextField.Label>Password</TextField.Label>
          <TextField.Input />
          <TextField.Description>Must be at least 8 characters</TextField.Description>
          <TextField.Error />
        </TextField>

        <Form.Actions>
          <Button type="submit">Create Account</Button>
        </Form.Actions>
      </Form>
    );
  },
};

export const ComplexForm: Story = {
  render: (args) => (
    <Form className="w-[600px]" {...args}>
      <Form.Section>
        <h2 className="mb-6 text-2xl font-bold">User Registration</h2>

        <div className="grid grid-cols-2 gap-4">
          <TextField isRequired name="firstName" type="text">
            <TextField.Label>First Name</TextField.Label>
            <TextField.Input />
            <TextField.Error />
          </TextField>

          <TextField isRequired name="lastName" type="text">
            <TextField.Label>Last Name</TextField.Label>
            <TextField.Input />
            <TextField.Error />
          </TextField>
        </div>

        <div className="mt-4 space-y-4">
          <TextField isRequired name="email" type="email">
            <TextField.Label>Email Address</TextField.Label>
            <TextField.Input />
            <TextField.Error />
          </TextField>

          <TextField name="phone" type="tel">
            <TextField.Label>Phone Number</TextField.Label>
            <TextField.Input placeholder="+1 (555) 000-0000" />
            <TextField.Description>Optional</TextField.Description>
          </TextField>
        </div>
      </Form.Section>

      <Form.Section>
        <h3 className="mb-3 text-lg font-semibold">Address Information</h3>

        <div className="space-y-4">
          <TextField name="street" type="text">
            <TextField.Label>Street Address</TextField.Label>
            <TextField.Input />
          </TextField>

          <div className="grid grid-cols-2 gap-4">
            <TextField name="city" type="text">
              <TextField.Label>City</TextField.Label>
              <TextField.Input />
            </TextField>

            <TextField name="zipCode" type="text">
              <TextField.Label>ZIP Code</TextField.Label>
              <TextField.Input />
            </TextField>
          </div>
        </div>
      </Form.Section>

      <Form.Section>
        <h3 className="mb-3 text-lg font-semibold">Communication Preferences</h3>

        <div className="space-y-3">
          <fieldset className="space-y-2">
            <legend className="mb-2 text-sm font-medium">Contact Method</legend>
            <RadioGroup name="contactMethod">
              <div className="flex items-center gap-3">
                <Radio id="contact-email" value="email">
                  <Radio.Indicator />
                </Radio>
                <Label htmlFor="contact-email">Email</Label>
              </div>
              <div className="flex items-center gap-3">
                <Radio id="contact-phone" value="phone">
                  <Radio.Indicator />
                </Radio>
                <Label htmlFor="contact-phone">Phone</Label>
              </div>
              <div className="flex items-center gap-3">
                <Radio id="contact-both" value="both">
                  <Radio.Indicator />
                </Radio>
                <Label htmlFor="contact-both">Both</Label>
              </div>
            </RadioGroup>
          </fieldset>

          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-3">
              <Checkbox id="terms">
                <Checkbox.Indicator />
              </Checkbox>
              <Label htmlFor="terms">I agree to the terms and conditions</Label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox id="privacy">
                <Checkbox.Indicator />
              </Checkbox>
              <Label htmlFor="privacy">I have read the privacy policy</Label>
            </div>
          </div>
        </div>
      </Form.Section>

      <Form.Actions className="justify-end">
        <Button type="reset" variant="ghost">
          Clear Form
        </Button>
        <Button type="submit">Register</Button>
      </Form.Actions>
    </Form>
  ),
};

export const DisabledForm: Story = {
  args: {
    isDisabled: true,
  },
  render: (args) => (
    <Form className="w-96 space-y-4" {...args}>
      <TextField name="username" type="text">
        <TextField.Label>Username</TextField.Label>
        <TextField.Input defaultValue="johndoe" />
      </TextField>

      <TextField name="email" type="email">
        <TextField.Label>Email</TextField.Label>
        <TextField.Input defaultValue="john@example.com" />
      </TextField>

      <div className="flex items-center gap-3">
        <Checkbox defaultSelected id="disabled-checkbox">
          <Checkbox.Indicator />
        </Checkbox>
        <Label htmlFor="disabled-checkbox">Remember me</Label>
      </div>

      <Form.Actions>
        <Button type="submit">Submit</Button>
      </Form.Actions>
    </Form>
  ),
};

export const InlineErrors: Story = {
  render: (args) => (
    <Form
      className="w-96 space-y-4"
      validationBehavior="aria"
      validationErrors={{
        email: "Please enter a valid email address",
        username: "This username is already taken",
      }}
      {...args}
    >
      <TextField isInvalid name="username" type="text">
        <TextField.Label>Username</TextField.Label>
        <TextField.Input defaultValue="admin" />
        <TextField.Error />
      </TextField>

      <TextField isInvalid name="email" type="email">
        <TextField.Label>Email</TextField.Label>
        <TextField.Input defaultValue="invalid-email" />
        <TextField.Error />
      </TextField>

      <TextField name="password" type="password">
        <TextField.Label>Password</TextField.Label>
        <TextField.Input />
        <TextField.Description>Choose a strong password</TextField.Description>
      </TextField>

      <Form.Actions>
        <Button type="submit">Continue</Button>
      </Form.Actions>
    </Form>
  ),
};
