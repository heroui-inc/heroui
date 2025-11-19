"use client";

import {Chip, InputGroup, TextField} from "@heroui/react";

export function WithBadgeSuffix() {
  return (
    <TextField className="w-full max-w-[280px]" name="email">
      <InputGroup>
        <InputGroup.Input className="w-full max-w-[280px]" placeholder="Email address" />
        <InputGroup.Suffix className="pr-2">
          <Chip color="accent" size="md" variant="soft">
            Pro
          </Chip>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  );
}
