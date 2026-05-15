import {Input, Label, TextField} from "@heroui/react";

export function InputTypes() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-4">
      <TextField name="password" type="password">
        <Label>密码</Label>
        <Input placeholder="••••••••" />
      </TextField>

      <TextField name="age" type="number">
        <Label>年龄</Label>
        <Input max="150" min="0" placeholder="21" />
      </TextField>

      <TextField name="email" type="email">
        <Label>邮箱</Label>
        <Input placeholder="user@example.com" />
      </TextField>

      <TextField name="website" type="url">
        <Label>网站</Label>
        <Input placeholder="https://example.com" />
      </TextField>

      <TextField name="phone" type="tel">
        <Label>电话</Label>
        <Input placeholder="+1 (555) 000-0000" />
      </TextField>
    </div>
  );
}
