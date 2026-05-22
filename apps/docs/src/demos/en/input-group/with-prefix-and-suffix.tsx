"use client";

import {Description, InputGroup, Label, TextField} from "@heroui/react";

export function WithPrefixAndSuffix() {
  return (
    <TextField className="w-full max-w-[280px]" defaultValue="10" name="price">
      <Label>Set a price</Label>
      <InputGroup>
        <InputGroup.Prefix>$</InputGroup.Prefix>
        <InputGroup.Input className="w-full max-w-[200px]" type="number" />
        <InputGroup.Suffix>USD</InputGroup.Suffix>
      </InputGroup>
      <Description>What customers would pay</Description>
    </TextField>
  );
}
