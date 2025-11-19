"use client";

import {Description, InputGroup, Label, Surface, TextField} from "@heroui/react";
import {Icon} from "@iconify/react";

export function OnSurface() {
  return (
    <Surface className="rounded-2xl p-6">
      <TextField className="w-full max-w-[280px]" name="email">
        <Label>Email address</Label>
        <InputGroup isOnSurface>
          <InputGroup.Prefix>
            <Icon className="text-muted size-4" icon="gravity-ui:envelope" />
          </InputGroup.Prefix>
          <InputGroup.Input className="w-full max-w-[280px]" placeholder="name@email.com" />
        </InputGroup>
        <Description>We'll never share this with anyone else</Description>
      </TextField>
    </Surface>
  );
}
