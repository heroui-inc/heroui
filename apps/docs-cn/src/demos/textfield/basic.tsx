import {Input, Label, TextField} from "@heroui/react";

export function Basic() {
  return (
    <TextField className="w-full max-w-64" name="email" type="email">
      <Label>邮箱</Label>
      <Input placeholder="输入你的邮箱" />
    </TextField>
  );
}
