"use client";

import {Envelope} from "@gravity-ui/icons";
import {Description, InputGroup, Label, TextField} from "@heroui/react";

export function WithPrefixIcon() {
  return (
    <TextField className="w-full max-w-[280px]" name="email">
      <Label>邮箱地址</Label>
      <InputGroup>
        <InputGroup.Prefix>
          <Envelope className="size-4 text-muted" />
        </InputGroup.Prefix>
        <InputGroup.Input className="w-full max-w-[280px]" placeholder="name@email.com" />
      </InputGroup>
      <Description>我们不会将此邮箱分享给任何人</Description>
    </TextField>
  );
}
