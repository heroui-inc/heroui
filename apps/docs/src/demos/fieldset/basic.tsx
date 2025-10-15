"use client";

import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import {Icon} from "@iconify/react";

export function Basic() {
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
            <Label>Name</Label>
            <Input name="name" placeholder="John Doe" />
            <FieldError />
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
            <Label>Email</Label>
            <Input name="email" placeholder="john@example.com" type="email" />
            <FieldError />
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
            <Label>Bio</Label>
            <TextArea name="bio" placeholder="Tell us about yourself..." />
            <Description>Minimum 10 characters</Description>
            <FieldError />
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
}
