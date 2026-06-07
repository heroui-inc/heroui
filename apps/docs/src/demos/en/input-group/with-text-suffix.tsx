"use client";

import {InputGroup, Label, TextField} from "@heroui/react";

export function WithTextSuffix() {
  return (
    <TextField className="w-full max-w-[280px]" defaultValue="heroui" name="website">
      <Label>Website</Label>
      <InputGroup>
        <InputGroup.Input className="w-full max-w-[280px]" />
        <InputGroup.Suffix>.com</InputGroup.Suffix>
      </InputGroup>
    </TextField>
  );
}
