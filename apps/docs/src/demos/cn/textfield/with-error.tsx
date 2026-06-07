import {FieldError, Input, Label, TextField} from "@heroui/react";

export function WithError() {
  return (
    <TextField isInvalid className="w-full max-w-64" name="email" type="email">
      <Label>邮箱</Label>
      <Input placeholder="user@example.com" />
      <FieldError>请输入有效的邮箱地址</FieldError>
    </TextField>
  );
}
