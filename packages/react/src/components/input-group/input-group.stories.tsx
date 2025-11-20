import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import React, {useState} from "react";

import {Button} from "../button";
import {Chip} from "../chip";
import {Description} from "../description";
import {FieldError} from "../field-error";
import {Kbd} from "../kbd";
import {Label} from "../label";
import {Spinner} from "../spinner";
import {Surface} from "../surface";
import {TextField} from "../text-field";

import {InputGroup} from "./index";

const meta: Meta<typeof InputGroup> = {
  component: InputGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Forms/InputGroup",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TextField className="w-[280px]" name="email">
      <Label>Email address</Label>
      <InputGroup>
        <InputGroup.Prefix>
          <Icon className="text-muted size-4" icon="gravity-ui:envelope" />
        </InputGroup.Prefix>
        <InputGroup.Input className="w-[280px]" placeholder="name@email.com" />
      </InputGroup>
    </TextField>
  ),
};

export const WithPrefixIcon: Story = {
  render: () => (
    <TextField className="w-[280px]" name="email">
      <Label>Email address</Label>
      <InputGroup>
        <InputGroup.Prefix>
          <Icon className="text-muted size-4" icon="gravity-ui:envelope" />
        </InputGroup.Prefix>
        <InputGroup.Input className="w-[280px]" placeholder="name@email.com" />
      </InputGroup>
      <Description>We'll never share this with anyone else</Description>
    </TextField>
  ),
};

export const WithSuffixIcon: Story = {
  render: () => (
    <TextField className="w-[280px]" name="email">
      <Label>Email address</Label>
      <InputGroup>
        <InputGroup.Input className="w-[280px]" placeholder="name@email.com" />
        <InputGroup.Suffix>
          <Icon className="text-muted size-4" icon="gravity-ui:envelope" />
        </InputGroup.Suffix>
      </InputGroup>
      <Description>We don't send spam</Description>
    </TextField>
  ),
};

export const WithPrefixAndSuffix: Story = {
  render: () => (
    <TextField className="w-[280px]" name="price">
      <Label>Set a price</Label>
      <InputGroup>
        <InputGroup.Prefix>$</InputGroup.Prefix>
        <InputGroup.Input className="w-[200px]" defaultValue="10" type="number" />
        <InputGroup.Suffix>USD</InputGroup.Suffix>
      </InputGroup>
      <Description>What customers would pay</Description>
    </TextField>
  ),
};

export const WithTextPrefix: Story = {
  render: () => (
    <TextField className="w-[280px]" name="website">
      <Label>Website</Label>
      <InputGroup>
        <InputGroup.Prefix>https://</InputGroup.Prefix>
        <InputGroup.Input className="w-[280px]" defaultValue="heroui.com" />
      </InputGroup>
    </TextField>
  ),
};

export const WithTextSuffix: Story = {
  render: () => (
    <TextField className="w-[280px]" name="website">
      <Label>Website</Label>
      <InputGroup>
        <InputGroup.Input className="w-[280px]" defaultValue="heroui" />
        <InputGroup.Suffix>.com</InputGroup.Suffix>
      </InputGroup>
    </TextField>
  ),
};

export const WithIconPrefixAndTextSuffix: Story = {
  render: () => (
    <TextField className="w-[280px]" name="website">
      <Label>Website</Label>
      <InputGroup>
        <InputGroup.Prefix>
          <Icon className="text-muted size-4" icon="gravity-ui:globe" />
        </InputGroup.Prefix>
        <InputGroup.Input className="w-[280px]" defaultValue="heroui" />
        <InputGroup.Suffix>.com</InputGroup.Suffix>
      </InputGroup>
    </TextField>
  ),
};

export const WithCopySuffix: Story = {
  render: () => (
    <TextField className="w-[280px]" name="website">
      <Label>Website</Label>
      <InputGroup>
        <InputGroup.Input className="w-[280px]" defaultValue="heroui.com" />
        <InputGroup.Suffix className="pr-0">
          <Button isIconOnly aria-label="Copy" size="sm" variant="ghost">
            <Icon className="size-4" icon="gravity-ui:copy" />
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  ),
};

export const WithIconPrefixAndCopySuffix: Story = {
  render: () => (
    <TextField className="w-[280px]" name="website">
      <Label>Website</Label>
      <InputGroup>
        <InputGroup.Prefix>
          <Icon className="text-muted size-4" icon="gravity-ui:globe" />
        </InputGroup.Prefix>
        <InputGroup.Input className="w-[280px]" defaultValue="heroui.com" />
        <InputGroup.Suffix className="pr-0">
          <Button isIconOnly aria-label="Copy" size="sm" variant="ghost">
            <Icon className="size-4" icon="gravity-ui:copy" />
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  ),
};

export const PasswordWithToggle: Story = {
  render: () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <TextField className="w-[280px]" name="password">
        <Label>Password</Label>
        <InputGroup>
          <InputGroup.Input
            className="w-[280px]"
            type={isVisible ? "text" : "password"}
            value={isVisible ? "87$2h.3diua" : "••••••••"}
          />
          <InputGroup.Suffix className="pr-0">
            <Button
              isIconOnly
              aria-label={isVisible ? "Hide password" : "Show password"}
              size="sm"
              variant="ghost"
              onPress={() => setIsVisible(!isVisible)}
            >
              <Icon
                className="size-4"
                icon={isVisible ? "gravity-ui:eye" : "gravity-ui:eye-slash"}
              />
            </Button>
          </InputGroup.Suffix>
        </InputGroup>
      </TextField>
    );
  },
};

export const WithLoadingSuffix: Story = {
  render: () => (
    <TextField className="w-[280px]" name="status">
      <InputGroup>
        <InputGroup.Input className="w-[280px]" defaultValue="Sending..." />
        <InputGroup.Suffix>
          <Spinner className="size-4" />
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  ),
};

export const WithKeyboardShortcut: Story = {
  render: () => (
    <TextField className="w-[280px]" name="command">
      <InputGroup>
        <InputGroup.Input className="w-[280px]" placeholder="Command" />
        <InputGroup.Suffix className="pr-2">
          <Kbd>
            <Kbd.Abbr keyValue="command" />
            <Kbd.Content>K</Kbd.Content>
          </Kbd>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  ),
};

export const WithBadgeSuffix: Story = {
  render: () => (
    <TextField className="w-[280px]" name="email">
      <InputGroup>
        <InputGroup.Input className="w-[280px]" placeholder="Email address" />
        <InputGroup.Suffix className="pr-2">
          <Chip color="accent" size="md" variant="soft">
            Pro
          </Chip>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TextField isRequired className="w-[280px]" name="email">
        <Label>Email address</Label>
        <InputGroup>
          <InputGroup.Prefix>
            <Icon className="text-muted size-4" icon="gravity-ui:envelope" />
          </InputGroup.Prefix>
          <InputGroup.Input className="w-[280px]" placeholder="name@email.com" />
        </InputGroup>
      </TextField>
      <TextField isRequired name="price">
        <Label>Set a price</Label>
        <InputGroup>
          <InputGroup.Prefix>$</InputGroup.Prefix>
          <InputGroup.Input className="w-[200px]" placeholder="0" type="number" />
          <InputGroup.Suffix>USD</InputGroup.Suffix>
        </InputGroup>
        <Description>What customers would pay</Description>
      </TextField>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TextField isInvalid isRequired className="w-[280px]" name="email">
        <Label>Email address</Label>
        <InputGroup>
          <InputGroup.Prefix>
            <Icon className="text-muted size-4" icon="gravity-ui:envelope" />
          </InputGroup.Prefix>
          <InputGroup.Input className="w-[280px]" placeholder="name@email.com" />
        </InputGroup>
        <FieldError>Please enter a valid email address</FieldError>
      </TextField>
      <TextField isInvalid isRequired className="w-[280px]" name="price">
        <Label>Set a price</Label>
        <InputGroup>
          <InputGroup.Prefix>$</InputGroup.Prefix>
          <InputGroup.Input className="w-[200px]" placeholder="0" type="number" />
          <InputGroup.Suffix>USD</InputGroup.Suffix>
        </InputGroup>
        <FieldError>Price must be greater than 0</FieldError>
      </TextField>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TextField isDisabled className="w-[280px]" name="email">
        <Label>Email address</Label>
        <InputGroup>
          <InputGroup.Prefix>
            <Icon className="text-muted size-4" icon="gravity-ui:envelope" />
          </InputGroup.Prefix>
          <InputGroup.Input className="w-[280px]" defaultValue="name@email.com" />
        </InputGroup>
      </TextField>
      <TextField isDisabled className="w-[280px]" name="price">
        <Label>Set a price</Label>
        <InputGroup>
          <InputGroup.Prefix>$</InputGroup.Prefix>
          <InputGroup.Input className="w-[200px]" defaultValue="10" type="number" />
          <InputGroup.Suffix>USD</InputGroup.Suffix>
        </InputGroup>
      </TextField>
    </div>
  ),
};

export const OnSurface: Story = {
  render: () => (
    <Surface className="rounded-2xl p-6">
      <TextField name="email">
        <Label>Email address</Label>
        <InputGroup isOnSurface>
          <InputGroup.Prefix>
            <Icon className="text-muted size-4" icon="gravity-ui:envelope" />
          </InputGroup.Prefix>
          <InputGroup.Input className="w-[280px]" placeholder="name@email.com" />
        </InputGroup>
        <Description>We'll never share this with anyone else</Description>
      </TextField>
    </Surface>
  ),
};

export const AllVariations: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <TextField className="w-[280px]" name="email1">
          <Label>Email address *</Label>
          <InputGroup>
            <InputGroup.Prefix>
              <Icon className="text-muted size-4" icon="gravity-ui:envelope" />
            </InputGroup.Prefix>
            <InputGroup.Input className="w-[280px]" placeholder="name@email.com" />
          </InputGroup>
          <Description>We'll never share this with anyone else</Description>
        </TextField>

        <TextField className="w-[280px]" name="email2">
          <Label>Email address *</Label>
          <InputGroup>
            <InputGroup.Input className="w-[280px]" placeholder="name@email.com" />
            <InputGroup.Suffix>
              <Icon className="text-muted size-4" icon="gravity-ui:envelope" />
            </InputGroup.Suffix>
          </InputGroup>
          <Description>We don't send spam</Description>
        </TextField>

        <TextField className="w-[280px]" name="price">
          <Label>Set a price</Label>
          <InputGroup>
            <InputGroup.Prefix>$</InputGroup.Prefix>
            <InputGroup.Input className="w-[200px]" defaultValue="10" type="number" />
            <InputGroup.Suffix>USD</InputGroup.Suffix>
          </InputGroup>
          <Description>What customers would pay</Description>
        </TextField>

        <TextField className="w-[280px]" name="website1">
          <Label>Website</Label>
          <InputGroup>
            <InputGroup.Prefix>https://</InputGroup.Prefix>
            <InputGroup.Input className="w-[280px]" defaultValue="heroui.com" />
          </InputGroup>
        </TextField>

        <TextField className="w-[280px]" name="website2">
          <Label>Website</Label>
          <InputGroup>
            <InputGroup.Input className="w-[280px]" defaultValue="heroui" />
            <InputGroup.Suffix>.com</InputGroup.Suffix>
          </InputGroup>
        </TextField>

        <TextField className="w-[280px]" name="website3">
          <Label>Website</Label>
          <InputGroup>
            <InputGroup.Prefix>
              <Icon className="text-muted size-4" icon="gravity-ui:globe" />
            </InputGroup.Prefix>
            <InputGroup.Input className="w-[280px]" defaultValue="heroui" />
            <InputGroup.Suffix>.com</InputGroup.Suffix>
          </InputGroup>
        </TextField>

        <TextField className="w-[280px]" name="website4">
          <Label>Website</Label>
          <InputGroup>
            <InputGroup.Input className="w-[280px]" defaultValue="heroui.com" />
            <InputGroup.Suffix className="pr-0">
              <Button isIconOnly aria-label="Copy" className="h-auto p-0" size="sm" variant="ghost">
                <Icon className="size-4" icon="gravity-ui:copy" />
              </Button>
            </InputGroup.Suffix>
          </InputGroup>
        </TextField>

        <TextField className="w-[280px]" name="website5">
          <Label>Website</Label>
          <InputGroup>
            <InputGroup.Prefix>
              <Icon className="text-muted size-4" icon="gravity-ui:globe" />
            </InputGroup.Prefix>
            <InputGroup.Input className="w-[280px]" defaultValue="heroui.com" />
            <InputGroup.Suffix className="pr-0">
              <Button isIconOnly aria-label="Copy" className="h-auto p-0" size="sm" variant="ghost">
                <Icon className="size-4" icon="gravity-ui:copy" />
              </Button>
            </InputGroup.Suffix>
          </InputGroup>
        </TextField>
      </div>
    </div>
  ),
};
