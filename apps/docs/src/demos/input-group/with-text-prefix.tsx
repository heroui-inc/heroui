"use client";

import {InputGroup, Label, TextField} from "@heroui/react";

export function WithTextPrefix() {
  return (
    <TextField className="w-full max-w-[280px]" name="website">
      <Label>Website</Label>
      <InputGroup>
        <InputGroup.Prefix>https://</InputGroup.Prefix>
        <InputGroup.Input className="w-full max-w-[280px]" defaultValue="heroui.com" />
      </InputGroup>
    </TextField>
  );
}
