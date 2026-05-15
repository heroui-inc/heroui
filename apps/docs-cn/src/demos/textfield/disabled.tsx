import {Description, Input, Label, TextField} from "@heroui/react";

export function Disabled() {
  return (
    <TextField isDisabled className="w-full max-w-64" name="accountId" value="USR-12345">
      <Label>账户 ID</Label>
      <Input placeholder="自动生成" />
      <Description>此字段不可编辑</Description>
    </TextField>
  );
}
