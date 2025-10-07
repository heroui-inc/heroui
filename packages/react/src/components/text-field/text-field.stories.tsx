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

export const Required: Story = {
  render: () => (
    <TextField isRequired>
      <TextField.Label>Your name</TextField.Label>
      <TextField.Input className="w-[280px]" placeholder="John" />
    </TextField>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <TextField>
      <TextField.Label>Your name</TextField.Label>
      <TextField.Input className="w-[280px]" placeholder="John" />
      <TextField.Description>We'll never share this with anyone else</TextField.Description>
    </TextField>
  ),
};

export const Invalid: Story = {
  render: () => (
    <TextField isInvalid isRequired>
      <TextField.Label>Your password</TextField.Label>
      <TextField.Input className="w-[280px]" type="password" />
      <TextField.Error>Password must be longer than 8 characters</TextField.Error>
    </TextField>
  ),
};

export const Disabled: Story = {
  render: () => (
    <TextField isDisabled>
      <TextField.Label>Your name</TextField.Label>
      <TextField.Input className="w-[280px]" placeholder="John" />
      <TextField.Description>We'll never share this with anyone else</TextField.Description>
    </TextField>
  ),
};

// TODO: Add TextArea
// export const TextArea: Story = {
//   render: () => (
//     <div className="w-80">
//       <TextField>
//         <TextField.Label>Your message</TextField.Label>
//         <TextField.TextArea placeholder="Tell us more about yourself..." />
//         <TextField.Description>Min 50 characters</TextField.Description>
//       </TextField>
//     </div>
//   ),
// };

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
    const [value, setValue] = React.useState("");

    return (
      <div className="w-80">
        <TextField>
          <TextField.Label>Your name</TextField.Label>
          <TextField.Input
            className="w-[280px]"
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
        <TextField isRequired isInvalid={isInvalid}>
          <TextField.Label>Username</TextField.Label>
          <TextField.Input
            className="w-[280px]"
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
