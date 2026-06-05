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
          <Checkbox.Button>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Label>Email notifications</Label>
          </Checkbox.Button>
        </Checkbox>
        <Checkbox value="sms">
          <Checkbox.Button>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Label>SMS notifications</Label>
          </Checkbox.Button>
        </Checkbox>
        <Checkbox value="push">
          <Checkbox.Button>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Label>Push notifications</Label>
          </Checkbox.Button>
        </Checkbox>
        <FieldError>Please select at least one notification method.</FieldError>
      </CheckboxGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
