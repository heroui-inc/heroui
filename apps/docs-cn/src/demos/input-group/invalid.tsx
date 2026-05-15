"use client";

import {Envelope} from "@gravity-ui/icons";
import {FieldError, InputGroup, Label, TextField} from "@heroui/react";

export function Invalid() {
  return (
    <div className="flex flex-col gap-4">
      <TextField isInvalid isRequired className="w-full max-w-[280px]" name="email">
        <Label>邮箱地址</Label>
        <InputGroup>
          <InputGroup.Prefix>
            <Envelope className="size-4 text-muted" />
          </InputGroup.Prefix>
          <InputGroup.Input className="w-full max-w-[280px]" placeholder="name@email.com" />
        </InputGroup>
        <FieldError>请输入有效的邮箱地址</FieldError>
      </TextField>
      <TextField isInvalid isRequired className="w-full max-w-[280px]" name="price">
        <Label>设置价格</Label>
        <InputGroup>
          <InputGroup.Prefix>$</InputGroup.Prefix>
          <InputGroup.Input className="w-full max-w-[200px]" placeholder="0" type="number" />
          <InputGroup.Suffix>USD</InputGroup.Suffix>
        </InputGroup>
        <FieldError>价格必须大于 0</FieldError>
      </TextField>
    </div>
  );
}
