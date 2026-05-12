import {Description, FieldError, Input, Label, TextField} from "@heroui/react";

export function TextfieldDemo() {
  return (
    <div>
      <TextField isRequired className="items-start" name="name">
        <Label>Your email</Label>
        <Input className="w-[256px]" placeholder="john@email.com" />
        <Description className="mt-0.5">We won&apos;t share your email</Description>
        <FieldError>The email is invalid</FieldError>
      </TextField>
    </div>
  );
}
