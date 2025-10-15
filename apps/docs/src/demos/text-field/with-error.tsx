"use client";

import {FieldError, Input, Label, TextField} from "@heroui/react";

export function WithError() {
  return (
    <TextField isInvalid className="w-full max-w-64">
      <Label>Email</Label>
      <Input placeholder="user@example.com" type="email" />
      <FieldError>Please enter a valid email address</FieldError>
    </TextField>
  );
}
