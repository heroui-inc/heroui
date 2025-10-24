import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Button} from "../button";
import {Description} from "../description";
import {FieldError} from "../field-error";
import {Form} from "../form";
import {Input} from "../input";
import {Label} from "../label";
import {TextField} from "../text-field";
import {TextArea} from "../textarea";

import {Fieldset} from "./index";

const meta: Meta<typeof Fieldset.Root> = {
  component: Fieldset.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Forms/Fieldset",
};

export default meta;
type Story = StoryObj<typeof Fieldset.Root>;

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
        <Fieldset.Root className="w-96">
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
        </Fieldset.Root>
      </Form>
    );
  },
};
