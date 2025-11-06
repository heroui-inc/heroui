import {FieldError, Input, Label, TextField} from "@heroui/react";

export function WithError() {
  return (
    <TextField isInvalid className="w-full max-w-64" name="email" type="email">
      <Label>Email</Label>
      <Input placeholder="user@example.com" />
      <FieldError>Please enter a valid email address</FieldError>
    </TextField>
  );
}
