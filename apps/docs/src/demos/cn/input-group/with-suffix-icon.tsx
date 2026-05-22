"use client";

import {Envelope} from "@gravity-ui/icons";
import {Description, InputGroup, Label, TextField} from "@heroui/react";

export function WithSuffixIcon() {
  return (
    <TextField className="w-full max-w-[280px]" name="email">
      <Label>邮箱地址</Label>
      <InputGroup>
        <InputGroup.Input className="w-full max-w-[280px]" placeholder="name@email.com" />
        <InputGroup.Suffix>
          <Envelope className="size-4 text-muted" />
        </InputGroup.Suffix>
      </InputGroup>
      <Description>我们不会发送垃圾邮件</Description>
    </TextField>
  );
}
