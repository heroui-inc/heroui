"use client";

import {Description, Input, Label, TextField} from "@heroui/react";

export function Required() {
  return (
    <TextField isRequired className="w-full max-w-64" name="fullName">
      <Label>Full Name</Label>
      <Input placeholder="John Doe" />
      <Description>This field is required</Description>
    </TextField>
  );
}
