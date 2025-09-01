"use client";

import {TextField} from "@heroui/react";

export function Disabled() {
  return (
    <TextField isDisabled className="w-full max-w-sm">
      <TextField.Label>Account ID</TextField.Label>
      <TextField.Input placeholder="Auto-generated" value="USR-12345" />
      <TextField.Description>This field cannot be edited</TextField.Description>
    </TextField>
  );
}
