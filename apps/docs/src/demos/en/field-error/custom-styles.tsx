"use client";

import {FieldError, Input, Label, TextField} from "@heroui/react";
import {useState} from "react";

export function CustomStyles() {
  const [value, setValue] = useState("jr");
  const isInvalid = value.length > 0 && value.length < 3;

  return (
    <TextField className="w-64" isInvalid={isInvalid}>
      <Label className="text-sm font-medium text-foreground" htmlFor="handle">
        Handle
      </Label>
      <Input
        className="rounded-lg border border-border bg-surface font-mono text-sm text-foreground shadow-sm ring-1 ring-black/5 focus-visible:ring-2 focus-visible:ring-foreground/15 dark:ring-white/10"
        id="handle"
        placeholder="min. 3 characters"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <FieldError className="text-xs font-medium tracking-wide">
        Handle must be at least 3 characters
      </FieldError>
    </TextField>
  );
}
