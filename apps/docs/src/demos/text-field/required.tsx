"use client";

import {TextField} from "@heroui/react";

export function Required() {
  return (
    <TextField isRequired className="w-full max-w-sm">
      <TextField.Label>Full Name</TextField.Label>
      <TextField.Input placeholder="John Doe" />
      <TextField.Description>This field is required</TextField.Description>
    </TextField>
  );
}
