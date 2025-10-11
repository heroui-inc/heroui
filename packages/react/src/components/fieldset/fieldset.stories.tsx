import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Button} from "../button";
import {Description} from "../description";
import {Form} from "../form";
import {TextField} from "../text-field";

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
              validate={(value) => {
                if (value.length < 3) {
                  return "Name must be at least 3 characters";
                }

                return null;
              }}
            >
              <TextField.Label>Name</TextField.Label>
              <TextField.Input name="name" placeholder="John Doe" />
              <TextField.Error />
            </TextField>
            <TextField
              isRequired
              validate={(value) => {
                if (!/^\S+@\S+\.\S+$/.test(value)) {
                  return "Please enter a valid email address";
                }

                return null;
              }}
            >
              <TextField.Label>Email</TextField.Label>
              <TextField.Input name="email" placeholder="john@example.com" type="email" />
              <TextField.Error />
            </TextField>
            <TextField
              isRequired
              validate={(value) => {
                if (value.length < 10) {
                  return "Bio must be at least 10 characters";
                }

                return null;
              }}
            >
              <TextField.Label>Bio</TextField.Label>
              <TextField.TextArea name="bio" placeholder="Tell us about yourself..." />
              <TextField.Description>Minimum 10 characters</TextField.Description>
              <TextField.Error />
            </TextField>
          </Fieldset.Group>
          <Fieldset.Actions>
            <Button type="submit">
              <Icon icon="gravity-ui:floppy-disk" />
              Save changes
            </Button>
            <Button type="reset" variant="secondary">
              Cancel
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>
    );
  },
};
