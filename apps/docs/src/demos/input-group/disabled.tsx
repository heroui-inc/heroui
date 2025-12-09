"use client";

import {InputGroup, Label, TextField} from "@heroui/react";
import {Icon} from "@iconify/react";

export function Disabled() {
  return (
    <div className="flex flex-col gap-4">
      <TextField isDisabled className="w-full max-w-[280px]" name="email">
        <Label>Email address</Label>
        <InputGroup>
          <InputGroup.Prefix>
            <Icon className="size-4 text-muted" icon="gravity-ui:envelope" />
          </InputGroup.Prefix>
          <InputGroup.Input className="w-full max-w-[280px]" defaultValue="name@email.com" />
        </InputGroup>
      </TextField>
      <TextField isDisabled className="w-full max-w-[280px]" name="price">
        <Label>Set a price</Label>
        <InputGroup>
          <InputGroup.Prefix>$</InputGroup.Prefix>
          <InputGroup.Input className="w-full max-w-[200px]" defaultValue="10" type="number" />
          <InputGroup.Suffix>USD</InputGroup.Suffix>
        </InputGroup>
      </TextField>
    </div>
  );
}
