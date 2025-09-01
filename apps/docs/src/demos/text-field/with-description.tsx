"use client";

import {TextField} from "@heroui/react";

export function WithDescription() {
  return (
    <TextField className="w-full max-w-sm">
      <TextField.Label>Username</TextField.Label>
      <TextField.Input placeholder="Enter username" />
      <TextField.Description>Choose a unique username for your account</TextField.Description>
    </TextField>
  );
}
