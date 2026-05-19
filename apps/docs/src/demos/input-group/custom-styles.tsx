"use client";

import {Envelope} from "@gravity-ui/icons";
import {InputGroup, Label, TextField} from "@heroui/react";

export function CustomStyles() {
  return (
    <TextField className="w-full max-w-[280px]" name="email">
      <Label className="font-medium text-neutral-800 dark:text-neutral-100">Email address</Label>
      <InputGroup className="rounded-xl border border-border/80 bg-surface shadow-sm ring-1 ring-black/5 transition-[box-shadow,border-color] focus-within:ring-2 focus-within:ring-neutral-400/25 dark:ring-white/10 dark:focus-within:ring-neutral-500/30">
        <InputGroup.Prefix>
          <Envelope className="size-4 text-neutral-500 dark:text-neutral-400" />
        </InputGroup.Prefix>
        <InputGroup.Input className="w-full max-w-[280px]" placeholder="name@email.com" />
      </InputGroup>
    </TextField>
  );
}
