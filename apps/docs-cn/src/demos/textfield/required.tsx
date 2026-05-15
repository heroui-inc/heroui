import {Description, Input, Label, TextField} from "@heroui/react";

export function Required() {
  return (
    <TextField isRequired className="w-full max-w-64" name="fullName">
      <Label>全名</Label>
      <Input placeholder="John Doe" />
      <Description>此字段为必填项</Description>
    </TextField>
  );
}
