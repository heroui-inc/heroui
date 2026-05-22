"use client";

import {Input, Label, TextField} from "@heroui/react";

export function CustomRenderFunction() {
  return (
    <TextField
      className="w-full max-w-64"
      name="email"
      render={(props) => <div {...props} data-custom="foo" />}
      type="email"
    >
      <Label>邮箱</Label>
      <Input placeholder="输入你的邮箱" />
    </TextField>
  );
}
