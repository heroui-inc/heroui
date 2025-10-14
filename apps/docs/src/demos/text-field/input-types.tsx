"use client";

import {Input, Label, TextField} from "@heroui/react";

export function InputTypes() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-4">
      <TextField>
        <Label>Password</Label>
        <Input placeholder="••••••••" type="password" />
      </TextField>

      <TextField>
        <Label>Age</Label>
        <Input max="150" min="0" placeholder="21" type="number" />
      </TextField>

      <TextField>
        <Label>Email</Label>
        <Input placeholder="user@example.com" type="email" />
      </TextField>

      <TextField>
        <Label>Website</Label>
        <Input placeholder="https://example.com" type="url" />
      </TextField>

      <TextField>
        <Label>Phone</Label>
        <Input placeholder="+1 (555) 000-0000" type="tel" />
      </TextField>
    </div>
  );
}
