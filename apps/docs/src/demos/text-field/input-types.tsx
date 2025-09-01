"use client";

import {TextField} from "@heroui/react";

export function InputTypes() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <TextField>
        <TextField.Label>Password</TextField.Label>
        <TextField.Input placeholder="••••••••" type="password" />
      </TextField>

      <TextField>
        <TextField.Label>Age</TextField.Label>
        <TextField.Input max="150" min="0" placeholder="21" type="number" />
      </TextField>

      <TextField>
        <TextField.Label>Email</TextField.Label>
        <TextField.Input placeholder="user@example.com" type="email" />
      </TextField>

      <TextField>
        <TextField.Label>Website</TextField.Label>
        <TextField.Input placeholder="https://example.com" type="url" />
      </TextField>

      <TextField>
        <TextField.Label>Phone</TextField.Label>
        <TextField.Input placeholder="+1 (555) 000-0000" type="tel" />
      </TextField>
    </div>
  );
}
