import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {TextField} from "./index";

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <TextField>
        <TextField.Label>Your name</TextField.Label>
        <TextField.Input placeholder="John" />
      </TextField>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="w-80">
      <TextField isRequired>
        <TextField.Label isRequired>Your name</TextField.Label>
        <TextField.Input placeholder="John" />
      </TextField>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="w-80">
      <TextField>
        <TextField.Label isRequired>Your name</TextField.Label>
        <TextField.Input placeholder="John" />
        <TextField.Description>We'll never share this with anyone else</TextField.Description>
      </TextField>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="w-80">
      <TextField isInvalid>
        <TextField.Label isRequired>Your age</TextField.Label>
        <TextField.Input placeholder="18" type="number" />
        <TextField.Error>Please enter a valid age</TextField.Error>
      </TextField>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <TextField isDisabled>
        <TextField.Label>Your name</TextField.Label>
        <TextField.Input placeholder="John" />
        <TextField.Description>We'll never share this with anyone else</TextField.Description>
      </TextField>
    </div>
  ),
};

export const TextArea: Story = {
  render: () => (
    <div className="w-80">
      <TextField>
        <TextField.Label>Your message</TextField.Label>
        <TextField.TextArea placeholder="Tell us more about yourself..." />
        <TextField.Description>Min 50 characters</TextField.Description>
      </TextField>
    </div>
  ),
};

export const InputTypes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <TextField>
        <TextField.Label>Your age</TextField.Label>
        <TextField.Input placeholder="18" type="number" />
      </TextField>

      <TextField>
        <TextField.Label>Your password</TextField.Label>
        <TextField.Input placeholder="••••••••" type="password" />
      </TextField>

      <TextField>
        <TextField.Label>Your email</TextField.Label>
        <TextField.Input placeholder="john@example.com" type="email" />
      </TextField>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("");

    return (
      <div className="w-80">
        <TextField>
          <TextField.Label>Your name</TextField.Label>
          <TextField.Input
            placeholder="John"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <TextField.Description>Character count: {value.length}</TextField.Description>
        </TextField>
      </div>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    const isInvalid = value.length > 0 && value.length < 3;

    return (
      <div className="w-80">
        <TextField isInvalid={isInvalid}>
          <TextField.Label isRequired>Username</TextField.Label>
          <TextField.Input
            placeholder="john_doe"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {isInvalid ? (
            <TextField.Error>Username must be at least 3 characters</TextField.Error>
          ) : (
            <TextField.Description>Choose a unique username</TextField.Description>
          )}
        </TextField>
      </div>
    );
  },
};
