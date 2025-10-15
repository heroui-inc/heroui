"use client";

import {Description, Input, Label, TextField} from "@heroui/react";

export function Disabled() {
  return (
    <TextField isDisabled className="w-full max-w-64">
      <Label>Account ID</Label>
      <Input placeholder="Auto-generated" value="USR-12345" />
      <Description>This field cannot be edited</Description>
    </TextField>
  );
}
