"use client";

import {TextField} from "@heroui/react";

export function WithError() {
  return (
    <TextField isInvalid className="w-full max-w-sm">
      <TextField.Label>Email</TextField.Label>
      <TextField.Input placeholder="user@example.com" type="email" />
      <TextField.Error>
        Please enter a valid email address
      </TextField.Error>
    </TextField>
  );
}