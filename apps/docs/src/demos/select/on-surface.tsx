"use client";

import {Button, FieldError, Form, Label, ListBox, Select, Surface} from "@heroui/react";

export function OnSurface() {
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
    <Surface className="w-[320px] rounded-3xl p-6">
      <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
        <Select
          isRequired
          className="w-full"
          name="state"
          placeholder="Select one"
          variant="secondary"
        >
          <Label>State</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="florida" textValue="Florida">
                Florida
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="delaware" textValue="Delaware">
                Delaware
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="california" textValue="California">
                California
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="texas" textValue="Texas">
                Texas
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="new-york" textValue="New York">
                New York
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="washington" textValue="Washington">
                Washington
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
          <FieldError />
        </Select>
        <Select
          isRequired
          className="w-full"
          name="country"
          placeholder="Select a country"
          variant="secondary"
        >
          <Label>Country</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="usa" textValue="United States">
                United States
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="canada" textValue="Canada">
                Canada
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="mexico" textValue="Mexico">
                Mexico
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="uk" textValue="United Kingdom">
                United Kingdom
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="france" textValue="France">
                France
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="germany" textValue="Germany">
                Germany
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
          <FieldError />
        </Select>
        <Button type="submit">Submit</Button>
      </Form>
    </Surface>
  );
}
