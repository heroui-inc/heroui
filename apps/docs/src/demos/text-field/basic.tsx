"use client";

import {TextField} from "@heroui/react";

export function Basic() {
  return (
    <TextField className="w-full max-w-sm">
      <TextField.Label>Email</TextField.Label>
      <TextField.Input placeholder="Enter your email" type="email" />
    </TextField>
  );
}
