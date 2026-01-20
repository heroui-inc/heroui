import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Description} from "../description";
import {FieldError} from "../field-error";
import {Input} from "../input";
import {Label} from "../label";
import {TextArea} from "../textarea";

import {TextField} from "./index";

const meta: Meta<typeof TextField> = {
  component: TextField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Forms/TextField",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TextField name="name">
      <Label>Your name</Label>
      <Input className="w-[280px]" placeholder="John" />
    </TextField>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <TextField fullWidth name="name">
        <Label>Your name</Label>
        <Input placeholder="John" />
      </TextField>
      <TextField fullWidth name="productDescription">
        <Label>Describe your product</Label>
        <TextArea placeholder="My product is..." />
      </TextField>
      <TextField fullWidth isInvalid isRequired name="password" type="password">
        <Label>Password</Label>
        <Input />
        <FieldError>Password must be longer than 8 characters</FieldError>
      </TextField>
    </div>
  ),
};

export const WithTextArea: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TextField name="productDescription">
        <Label>Describe your product</Label>
        <TextArea className="w-[280px]" placeholder="My product is..." />
      </TextField>
      <TextField name="detailedDescription">
        <Label>Detailed description</Label>
        <TextArea className="w-[280px]" placeholder="Provide more details..." rows={4} />
        <Description>Minimum 4 rows</Description>
      </TextField>
      <TextField name="review">
        <Label>Review</Label>
        <TextArea
          className="w-[280px]"
          placeholder="Share your experience..."
          rows={6}
          style={{resize: "vertical"}}
        />
        <Description>Resizable vertically</Description>
      </TextField>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TextField isRequired name="email" type="email">
        <Label>Email</Label>
        <Input className="w-[280px]" placeholder="john@example.com" />
      </TextField>
      <TextField isRequired name="address">
        <Label>Delivery address</Label>
        <TextArea className="w-[280px]" placeholder="123 Main St, Anytown, USA" />
        <Description>Make sure to include the zip code</Description>
      </TextField>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TextField name="name">
        <Label>Your name</Label>
        <Input className="w-[280px]" placeholder="John" />
        <Description>We'll never share this with anyone else</Description>
      </TextField>
      <TextField name="address">
        <Label>Delivery address</Label>
        <TextArea className="w-[280px]" placeholder="123 Main St, Anytown, USA" />
        <Description>Make sure to include the zip code</Description>
      </TextField>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TextField isInvalid isRequired name="password" type="password">
        <Label>Your password</Label>
        <Input className="w-[280px]" />
        <FieldError>Password must be longer than 8 characters</FieldError>
      </TextField>
      <TextField isInvalid isRequired name="address">
        <Label>Delivery address</Label>
        <TextArea className="w-[280px]" placeholder="123 Main St, Anytown, USA" />
        <FieldError>The address is invalid</FieldError>
      </TextField>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TextField isDisabled name="name">
        <Label>Your name</Label>
        <Input className="w-[280px]" placeholder="John" />
        <Description>We'll never share this with anyone else</Description>
      </TextField>
      <TextField isDisabled name="message">
        <Label>Your message</Label>
        <TextArea className="w-[280px]" placeholder="Tell us more about yourself..." />
        <Description>Min 50 characters</Description>
      </TextField>
    </div>
  ),
};

export const InputTypes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <TextField name="age" type="number">
        <Label>Your age</Label>
        <Input className="w-[280px]" placeholder="18" />
      </TextField>

      <TextField name="password" type="password">
        <Label>Your password</Label>
        <Input className="w-[280px]" placeholder="••••••••" />
      </TextField>

      <TextField name="email" type="email">
        <Label>Your email</Label>
        <Input className="w-[280px]" placeholder="john@example.com" />
      </TextField>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [inputValue, setInputValue] = React.useState("");
    const [TextAreaValue, setTextAreaValue] = React.useState("");

    return (
      <div className="flex flex-col gap-4">
        <TextField name="name" onChange={setInputValue}>
          <Label>Your name</Label>
          <Input className="w-[280px]" placeholder="John" value={inputValue} />
          <Description>Character count: {inputValue.length}</Description>
        </TextField>
        <TextField name="bio" onChange={setTextAreaValue}>
          <Label>Your bio</Label>
          <TextArea
            className="w-[280px]"
            placeholder="Tell us about yourself..."
            value={TextAreaValue}
          />
          <Description>Character count: {TextAreaValue.length} / 500</Description>
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
        <TextField isRequired isInvalid={isUsernameInvalid} name="username" onChange={setUsername}>
          <Label>Username</Label>
          <Input className="w-[280px]" placeholder="john_doe" value={username} />
          {isUsernameInvalid ? (
            <FieldError>Username must be at least 3 characters</FieldError>
          ) : (
            <Description>Choose a unique username</Description>
          )}
        </TextField>
        <TextField isRequired isInvalid={isBioInvalid} name="bio" onChange={setBio}>
          <Label>Bio</Label>
          <TextArea className="w-[280px]" placeholder="Tell us about yourself..." value={bio} />
          {isBioInvalid ? (
            <FieldError>Bio must be at least 20 characters</FieldError>
          ) : (
            <Description>Min 20 characters ({bio.length}/20)</Description>
          )}
        </TextField>
      </div>
    );
  },
};
