"use client";

import {FieldError, Input, Label, TextField} from "@heroui/react";
import {useState} from "react";

export function Basic() {
  const [value, setValue] = useState("jr");
  const isInvalid = value.length > 0 && value.length < 3;

  return (
    <TextField className="w-64" isInvalid={isInvalid}>
      <Label htmlFor="username">用户名</Label>
      <Input
        id="username"
        placeholder="输入用户名"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <FieldError>用户名至少需要 3 个字符</FieldError>
    </TextField>
  );
}
