"use client";

import {InputGroup, Spinner, TextField} from "@heroui/react";

export function WithLoadingSuffix() {
  return (
    <TextField className="w-full max-w-[280px]" name="status">
      <InputGroup>
        <InputGroup.Input className="w-full max-w-[280px]" defaultValue="Sending..." />
        <InputGroup.Suffix>
          <Spinner className="size-4" />
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  );
}
