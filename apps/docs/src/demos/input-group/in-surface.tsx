"use client";

import {Envelope} from "@gravity-ui/icons";
import {Description, InputGroup, Label, Surface, TextField} from "@heroui/react";

export function InSurface() {
  return (
    <Surface className="rounded-2xl p-6">
      <TextField className="w-full max-w-[280px]" name="email">
        <Label>Email address</Label>
        <InputGroup inSurface="default">
          <InputGroup.Prefix>
            <Envelope className="size-4 text-muted" />
          </InputGroup.Prefix>
          <InputGroup.Input className="w-full max-w-[280px]" placeholder="name@email.com" />
        </InputGroup>
        <Description>We'll never share this with anyone else</Description>
      </TextField>
    </Surface>
  );
}
