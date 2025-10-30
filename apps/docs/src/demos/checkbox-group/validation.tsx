"use client";

import {Button, Checkbox, CheckboxGroup, FieldError, Form, Label} from "@heroui/react";

export function Validation() {
  return (
    <Form
      className="flex flex-col gap-4 px-4"
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const values = formData.getAll("preferences");

        alert(`Selected preferences: ${values.join(", ")}`);
      }}
    >
      <CheckboxGroup isRequired name="preferences">
        <Label>Preferences</Label>
        <Checkbox value="email">
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label>Email notifications</Label>
          </Checkbox.Content>
        </Checkbox>
        <Checkbox value="sms">
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label>SMS notifications</Label>
          </Checkbox.Content>
        </Checkbox>
        <Checkbox value="push">
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Content>
            <Label>Push notifications</Label>
          </Checkbox.Content>
        </Checkbox>
        <FieldError>Please select at least one notification method.</FieldError>
      </CheckboxGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
