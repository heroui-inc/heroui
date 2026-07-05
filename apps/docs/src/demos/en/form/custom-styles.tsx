"use client";

import {Button, Form, Input, Label, TextField} from "@heroui/react";

export function CustomStyles() {
  return (
    <Form
      className="flex w-80 flex-col gap-3 rounded-xl border border-border/80 bg-surface p-4 shadow-sm"
      onSubmit={(e) => e.preventDefault()}
    >
      <TextField isRequired name="email" type="email">
        <Label>Work email</Label>
        <Input className="bg-field" placeholder="you@company.com" />
      </TextField>
      <Button className="w-full" type="submit">
        Continue
      </Button>
    </Form>
  );
}
