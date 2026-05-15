import {FieldError, Input, Label, TextField} from "@heroui/react";

export function FullWidth() {
  return (
    <div className="w-[400px] space-y-4">
      <TextField fullWidth name="name">
        <Label>你的姓名</Label>
        <Input placeholder="John" />
      </TextField>
      <TextField fullWidth isInvalid isRequired name="password" type="password">
        <Label>密码</Label>
        <Input />
        <FieldError>密码长度必须超过 8 个字符</FieldError>
      </TextField>
    </div>
  );
}
