"use client";

import {Envelope} from "@gravity-ui/icons";
import {InputGroup, Label, TextField} from "@heroui/react";

export function CustomStyles() {
  return (
    <TextField className="w-full max-w-[280px]" name="email">
      <Label className="font-medium text-foreground">Email address</Label>
      <InputGroup className="rounded-xl border border-border bg-surface shadow-sm ring-1 ring-black/5 transition-[box-shadow,border-color] focus-within:ring-2 focus-within:ring-foreground/15 dark:ring-white/10">
        <InputGroup.Prefix>
          <Envelope className="size-4 text-muted" />
        </InputGroup.Prefix>
        <InputGroup.Input
          className="w-full max-w-[280px] text-foreground"
          placeholder="name@email.com"
        />
      </InputGroup>
    </TextField>
  );
}
