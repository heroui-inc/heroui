import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {TextField} from "./index";

const meta: Meta<typeof TextField> = {
  component: TextField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/TextField",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TextField>
      <TextField.Label>Your name</TextField.Label>
      <TextField.Input className="w-[280px]" placeholder="John" />
    </TextField>
  ),
};

export const TextArea: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TextField>
        <TextField.Label>Describe your product</TextField.Label>
        <TextField.TextArea className="w-[280px]" placeholder="My product is..." />
      </TextField>
      <TextField>
        <TextField.Label>Detailed description</TextField.Label>
        <TextField.TextArea className="w-[280px]" placeholder="Provide more details..." rows={4} />
        <TextField.Description>Minimum 4 rows</TextField.Description>
      </TextField>
      <TextField>
        <TextField.Label>Review</TextField.Label>
        <TextField.TextArea
          className="w-[280px]"
          placeholder="Share your experience..."
          rows={6}
          style={{resize: "vertical"}}
        />
        <TextField.Description>Resizable vertically</TextField.Description>
      </TextField>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TextField isRequired>
        <TextField.Label>Email</TextField.Label>
        <TextField.Input className="w-[280px]" placeholder="john@example.com" />
      </TextField>
      <TextField isRequired>
        <TextField.Label>Delivery address</TextField.Label>
        <TextField.TextArea className="w-[280px]" placeholder="123 Main St, Anytown, USA" />
        <TextField.Description>Make sure to include the zip code</TextField.Description>
      </TextField>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TextField>
        <TextField.Label>Your name</TextField.Label>
        <TextField.Input className="w-[280px]" placeholder="John" />
        <TextField.Description>We'll never share this with anyone else</TextField.Description>
      </TextField>
      <TextField>
        <TextField.Label>Delivery address</TextField.Label>
        <TextField.TextArea className="w-[280px]" placeholder="123 Main St, Anytown, USA" />
        <TextField.Description>Make sure to include the zip code</TextField.Description>
      </TextField>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TextField isInvalid isRequired>
        <TextField.Label>Your password</TextField.Label>
        <TextField.Input className="w-[280px]" type="password" />
        <TextField.Error>Password must be longer than 8 characters</TextField.Error>
      </TextField>
      <TextField isInvalid isRequired>
        <TextField.Label>Delivery address</TextField.Label>
        <TextField.TextArea className="w-[280px]" placeholder="123 Main St, Anytown, USA" />
        <TextField.Error>The address is invalid</TextField.Error>
      </TextField>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TextField isDisabled>
        <TextField.Label>Your name</TextField.Label>
        <TextField.Input className="w-[280px]" placeholder="John" />
        <TextField.Description>We'll never share this with anyone else</TextField.Description>
      </TextField>
      <TextField isDisabled>
        <TextField.Label>Your message</TextField.Label>
        <TextField.TextArea className="w-[280px]" placeholder="Tell us more about yourself..." />
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
        <TextField.Input className="w-[280px]" placeholder="18" type="number" />
      </TextField>

      <TextField>
        <TextField.Label>Your password</TextField.Label>
        <TextField.Input className="w-[280px]" placeholder="••••••••" type="password" />
      </TextField>

      <TextField>
        <TextField.Label>Your email</TextField.Label>
        <TextField.Input className="w-[280px]" placeholder="john@example.com" type="email" />
      </TextField>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [inputValue, setInputValue] = React.useState("");
    const [textareaValue, setTextareaValue] = React.useState("");

    return (
      <div className="flex flex-col gap-4">
        <TextField>
          <TextField.Label>Your name</TextField.Label>
          <TextField.Input
            className="w-[280px]"
            placeholder="John"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <TextField.Description>Character count: {inputValue.length}</TextField.Description>
        </TextField>
        <TextField>
          <TextField.Label>Your bio</TextField.Label>
          <TextField.TextArea
            className="w-[280px]"
            placeholder="Tell us about yourself..."
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
          />
          <TextField.Description>
            Character count: {textareaValue.length} / 500
          </TextField.Description>
        </TextField>
      </div>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const [username, setUsername] = React.useState("");
    const [bio, setBio] = React.useState("");
    const isUsernameInvalid = username.length > 0 && username.length < 3;
    const isBioInvalid = bio.length > 0 && bio.length < 20;

    return (
      <div className="flex flex-col gap-4">
        <TextField isRequired isInvalid={isUsernameInvalid}>
          <TextField.Label>Username</TextField.Label>
          <TextField.Input
            className="w-[280px]"
            placeholder="john_doe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {isUsernameInvalid ? (
            <TextField.Error>Username must be at least 3 characters</TextField.Error>
          ) : (
            <TextField.Description>Choose a unique username</TextField.Description>
          )}
        </TextField>
        <TextField isRequired isInvalid={isBioInvalid}>
          <TextField.Label>Bio</TextField.Label>
          <TextField.TextArea
            className="w-[280px]"
            placeholder="Tell us about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          {isBioInvalid ? (
            <TextField.Error>Bio must be at least 20 characters</TextField.Error>
          ) : (
            <TextField.Description>Min 20 characters ({bio.length}/20)</TextField.Description>
          )}
        </TextField>
      </div>
    );
  },
};
