"use client";

import {Chip, InputGroup, TextField} from "@heroui/react";

export function WithBadgeSuffix() {
  return (
    <TextField aria-label="邮箱地址" className="w-full max-w-[280px]" name="email">
      <InputGroup>
        <InputGroup.Input className="w-full max-w-[280px]" placeholder="邮箱地址" />
        <InputGroup.Suffix className="pr-2">
          <Chip color="accent" size="md" variant="soft">
            Pro
          </Chip>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  );
}
