"use client";

import {TextField} from "@heroui/react";

export function TextArea() {
  return (
    <TextField className="w-full max-w-sm">
      <TextField.Label>Message</TextField.Label>
      <TextField.TextArea 
        placeholder="Write your message here..." 
        rows={4}
      />
      <TextField.Description>
        Maximum 500 characters
      </TextField.Description>
    </TextField>
  );
}