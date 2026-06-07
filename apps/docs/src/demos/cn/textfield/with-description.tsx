import {Description, Input, Label, TextField} from "@heroui/react";

export function WithDescription() {
  return (
    <TextField className="w-full max-w-64" name="username">
      <Label>用户名</Label>
      <Input placeholder="输入用户名" />
      <Description>为你的账户选择一个唯一的用户名</Description>
    </TextField>
  );
}
