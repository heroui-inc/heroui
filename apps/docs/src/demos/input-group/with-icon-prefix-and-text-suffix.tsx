"use client";

import {InputGroup, Label, TextField} from "@heroui/react";
import {Icon} from "@iconify/react";

export function WithIconPrefixAndTextSuffix() {
  return (
    <TextField className="w-full max-w-[280px]" name="website">
      <Label>Website</Label>
      <InputGroup>
        <InputGroup.Prefix>
          <Icon className="text-muted size-4" icon="gravity-ui:globe" />
        </InputGroup.Prefix>
        <InputGroup.Input className="w-full max-w-[280px]" defaultValue="heroui" />
        <InputGroup.Suffix>.com</InputGroup.Suffix>
      </InputGroup>
    </TextField>
  );
}
