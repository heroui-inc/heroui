import {Description, Input, Label, TextField} from "@heroui/react";

export function TextfieldDemo() {
  return (
    <div>
      <TextField isRequired className="items-start" name="name">
        <Label>Your email</Label>
        <Input className="w-[256px]" placeholder="john@email.com" />
        <Description className="mt-0.5">We'll never share this with anyone else</Description>
      </TextField>
    </div>
  );
}
