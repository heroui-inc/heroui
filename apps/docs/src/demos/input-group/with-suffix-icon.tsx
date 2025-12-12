"use client";

import {Description, InputGroup, Label, TextField} from "@heroui/react";
import {Icon} from "@iconify/react";

export function WithSuffixIcon() {
  return (
    <TextField className="w-full max-w-[280px]" name="email">
      <Label>Email address</Label>
      <InputGroup>
        <InputGroup.Input className="w-full max-w-[280px]" placeholder="name@email.com" />
        <InputGroup.Suffix>
          <Icon className="size-4 text-muted" icon="gravity-ui:envelope" />
        </InputGroup.Suffix>
      </InputGroup>
      <Description>We don't send spam</Description>
    </TextField>
  );
}
