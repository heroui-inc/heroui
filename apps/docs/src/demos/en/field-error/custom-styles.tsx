"use client";

import {FieldError, Input, Label, TextField} from "@heroui/react";
import {useState} from "react";

export function CustomStyles() {
  const [value, setValue] = useState("jr");
  const isInvalid = value.length > 0 && value.length < 3;

  return (
    <TextField className="w-64" isInvalid={isInvalid}>
      <Label htmlFor="handle">Handle</Label>
      <Input
        className="bg-field font-mono"
        id="handle"
        placeholder="min. 3 characters"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <FieldError className="font-medium">Handle must be at least 3 characters</FieldError>
    </TextField>
  );
}
