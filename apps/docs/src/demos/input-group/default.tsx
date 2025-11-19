"use client";

import {InputGroup, Label, TextField} from "@heroui/react";
import {Icon} from "@iconify/react";

export function Default() {
  return (
    <TextField className="w-full max-w-[280px]" name="email">
      <Label>Email address</Label>
      <InputGroup>
        <InputGroup.Prefix>
          <Icon className="text-muted size-4" icon="gravity-ui:envelope" />
        </InputGroup.Prefix>
        <InputGroup.Input className="w-full max-w-[280px]" placeholder="name@email.com" />
      </InputGroup>
    </TextField>
  );
}
