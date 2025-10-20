"use client";

import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  FieldsetActions,
  FieldsetLegend,
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
    <Form className="w-full max-w-96" onSubmit={onSubmit}>
      <Fieldset>
        <FieldsetLegend>Profile Settings</FieldsetLegend>
        <Description>Update your profile information.</Description>
        <FieldGroup>
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
        </FieldGroup>
        <FieldsetActions>
          <Button type="submit">
            <Icon icon="gravity-ui:floppy-disk" />
            Save changes
          </Button>
          <Button type="reset" variant="secondary">
            Cancel
          </Button>
        </FieldsetActions>
      </Fieldset>
    </Form>
  );
}
