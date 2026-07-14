"use client";

import {FieldError, Input, Label, TextField} from "@heroui/react";
import {useState} from "react";

export function CustomStyles() {
  const [value, setValue] = useState("jr");
  const isInvalid = value.length > 0 && value.length < 3;

  return (
    <TextField className="w-64" isInvalid={isInvalid}>
      <Label htmlFor="handle">用户名</Label>
      <Input
        className="bg-field font-mono"
        id="handle"
        placeholder="至少 3 个字符"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <FieldError className="font-medium">用户名至少需要 3 个字符</FieldError>
    </TextField>
  );
}
