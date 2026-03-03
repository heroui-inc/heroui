import {FieldError, Input, Label, TextField} from "@heroui/react";

export function FullWidth() {
  return (
    <div className="w-[400px] space-y-4">
      <TextField fullWidth name="name">
        <Label>Your name</Label>
        <Input placeholder="John" />
      </TextField>
      <TextField fullWidth isInvalid isRequired name="password" type="password">
        <Label>Password</Label>
        <Input />
        <FieldError>Password must be longer than 8 characters</FieldError>
      </TextField>
    </div>
  );
}
