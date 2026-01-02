import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Button} from "../button";
import {Description} from "../description";
import {FieldError} from "../field-error";
import {Form} from "../form";
import {Input} from "../input";
import {Label} from "../label";
import {Surface} from "../surface";
import {TextField} from "../text-field";
import {TextArea} from "../textarea";

import {Fieldset} from "./index";

const meta: Meta<typeof Fieldset> = {
  component: Fieldset,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Forms/Fieldset",
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

export const Default: Story = {
  render: () => {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data: Record<string, string> = {};

      // Convert FormData to plain object
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });

      alert("Form submitted successfully!");
    };

    return (
      <Form onSubmit={onSubmit}>
        <Fieldset className="w-96">
          <Fieldset.Legend>Profile Settings</Fieldset.Legend>
          <Description>Update your profile information.</Description>
          <Fieldset.Group>
            <TextField
              isRequired
              name="name"
              validate={(value) => {
                if (value.length < 3) {
                  return "Name must be at least 3 characters";
                }

                return null;
              }}
            >
              <Label>Name</Label>
              <Input placeholder="John Doe" />
              <FieldError />
            </TextField>
            <TextField isRequired name="email" type="email">
              <Label>Email</Label>
              <Input placeholder="john@example.com" />
              <FieldError />
            </TextField>
            <TextField
              isRequired
              name="bio"
              validate={(value) => {
                if (value.length < 10) {
                  return "Bio must be at least 10 characters";
                }

                return null;
              }}
            >
              <Label>Bio</Label>
              <TextArea placeholder="Tell us about yourself..." />
              <Description>Minimum 10 characters</Description>
              <FieldError />
            </TextField>
          </Fieldset.Group>
          <Fieldset.Actions>
            <Button type="submit">
              <Icon icon="gravity-ui:floppy-disk" />
              Save changes
            </Button>
            <Button type="reset" variant="tertiary">
              Cancel
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>
    );
  },
};

export const SurfaceVariants: Story = {
  render: () => (
    <div className="flex max-w-[520px] flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Default Surface</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="default">
          <Fieldset className="w-full">
            <Fieldset.Legend>Profile Settings</Fieldset.Legend>
            <Fieldset.Group>
              <TextField name="name-default">
                <Label>Name</Label>
                <Input placeholder="John Doe" />
              </TextField>
              <TextField name="email-default" type="email">
                <Label>Email</Label>
                <Input placeholder="john@example.com" />
              </TextField>
            </Fieldset.Group>
          </Fieldset>
          <p className="text-sm text-muted">
            Fieldset automatically detects default surface level through its child form components.
          </p>
        </Surface>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Secondary Surface</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="secondary">
          <Fieldset className="w-full">
            <Fieldset.Legend>Profile Settings</Fieldset.Legend>
            <Fieldset.Group>
              <TextField name="name-secondary">
                <Label>Name</Label>
                <Input placeholder="John Doe" />
              </TextField>
              <TextField name="email-secondary" type="email">
                <Label>Email</Label>
                <Input placeholder="john@example.com" />
              </TextField>
            </Fieldset.Group>
          </Fieldset>
          <p className="text-sm text-muted">
            Fieldset automatically detects secondary surface level through its child form
            components.
          </p>
        </Surface>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Tertiary Surface</p>
        <Surface className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="tertiary">
          <Fieldset className="w-full">
            <Fieldset.Legend>Profile Settings</Fieldset.Legend>
            <Fieldset.Group>
              <TextField name="name-tertiary">
                <Label>Name</Label>
                <Input placeholder="John Doe" />
              </TextField>
              <TextField name="email-tertiary" type="email">
                <Label>Email</Label>
                <Input placeholder="john@example.com" />
              </TextField>
            </Fieldset.Group>
          </Fieldset>
          <p className="text-sm text-muted">
            Fieldset automatically detects tertiary surface level through its child form components.
          </p>
        </Surface>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">Transparent Surface</p>
        <Surface
          className="flex min-w-[320px] flex-col gap-3 rounded-3xl border p-6"
          variant="transparent"
        >
          <Fieldset className="w-full">
            <Fieldset.Legend>Profile Settings</Fieldset.Legend>
            <Fieldset.Group>
              <TextField name="name-transparent">
                <Label>Name</Label>
                <Input placeholder="John Doe" />
              </TextField>
              <TextField name="email-transparent" type="email">
                <Label>Email</Label>
                <Input placeholder="john@example.com" />
              </TextField>
            </Fieldset.Group>
          </Fieldset>
          <p className="text-sm text-muted">
            Fieldset automatically detects transparent surface level through its child form
            components.
          </p>
        </Surface>
      </div>
    </div>
  ),
};
