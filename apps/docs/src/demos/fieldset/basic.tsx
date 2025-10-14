"use client";

import {Button, Description, Fieldset, TextField} from "@heroui/react";
import {Icon} from "@iconify/react";

export function Basic() {
  return (
    <Fieldset className="w-full max-w-md">
      <Fieldset.Legend>Profile Settings</Fieldset.Legend>
      <Description>Update the details that appear on your public profile.</Description>
      <Fieldset.Group>
        <TextField
          isRequired
          validate={(value) => {
            if (value.trim().length < 3) {
              return "Name must be at least 3 characters long.";
            }

            return null;
          }}
        >
          <TextField.Label>Name</TextField.Label>
          <TextField.Input name="name" placeholder="Jane Doe" />
          <TextField.Error />
        </TextField>
        <TextField
          isRequired
          validate={(value) => {
            if (!/^\S+@\S+\.\S+$/.test(value)) {
              return "Please enter a valid email address.";
            }

            return null;
          }}
        >
          <TextField.Label>Email</TextField.Label>
          <TextField.Input name="email" placeholder="jane@example.com" type="email" />
          <TextField.Error />
        </TextField>
        <TextField
          validate={(value) => {
            if (value && value.trim().length < 10) {
              return "Bio must be at least 10 characters if provided.";
            }

            return null;
          }}
        >
          <TextField.Label>Bio</TextField.Label>
          <TextField.TextArea name="bio" placeholder="Tell us about yourself..." />
          <TextField.Description>Optional, but helps others get to know you.</TextField.Description>
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
  );
}
