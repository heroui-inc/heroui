import {Description, Input, Label, Surface, TextArea, TextField} from "@heroui/react";

export function OnSurface() {
  return (
    <Surface className="flex w-full min-w-[340px] flex-col gap-4 rounded-3xl p-6">
      <TextField name="name">
        <Label>Your name</Label>
        <Input className="w-full" placeholder="John" />
        <Description>We'll never share this with anyone else</Description>
      </TextField>
      <TextField name="email" type="email">
        <Label>Email</Label>
        <Input className="w-full" placeholder="john@example.com" />
      </TextField>
      <TextField name="bio">
        <Label>Bio</Label>
        <TextArea className="w-full" placeholder="Tell us about yourself..." rows={4} />
        <Description>Minimum 4 rows</Description>
      </TextField>
    </Surface>
  );
}
