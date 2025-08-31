"use client";

import {TextField} from "@heroui/react";

export function InputTypes() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <TextField>
        <TextField.Label>Password</TextField.Label>
        <TextField.Input type="password" placeholder="••••••••" />
      </TextField>

      <TextField>
        <TextField.Label>Age</TextField.Label>
        <TextField.Input type="number" placeholder="21" min="0" max="150" />
      </TextField>

      <TextField>
        <TextField.Label>Email</TextField.Label>
        <TextField.Input type="email" placeholder="user@example.com" />
      </TextField>

      <TextField>
        <TextField.Label>Website</TextField.Label>
        <TextField.Input type="url" placeholder="https://example.com" />
      </TextField>

      <TextField>
        <TextField.Label>Phone</TextField.Label>
        <TextField.Input type="tel" placeholder="+1 (555) 000-0000" />
      </TextField>
    </div>
  );
}