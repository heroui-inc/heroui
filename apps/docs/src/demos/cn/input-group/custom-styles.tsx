"use client";

import {Envelope} from "@gravity-ui/icons";
import {InputGroup, Label, TextField} from "@heroui/react";

export function CustomStyles() {
  return (
    <TextField className="w-full max-w-xs" name="email">
      <Label>工作邮箱</Label>
      <InputGroup className="rounded-xl border border-border/80 bg-default shadow-sm">
        <InputGroup.Prefix>
          <Envelope className="size-4 text-muted" />
        </InputGroup.Prefix>
        <InputGroup.Input placeholder="you@company.com" />
      </InputGroup>
    </TextField>
  );
}
