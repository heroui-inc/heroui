"use client";

import {Copy, Globe} from "@gravity-ui/icons";
import {Button, InputGroup, Label, TextField} from "@heroui/react";

export function WithIconPrefixAndCopySuffix() {
  return (
    <TextField className="w-full max-w-[280px]" defaultValue="heroui.com" name="website">
      <Label>Website</Label>
      <InputGroup>
        <InputGroup.Prefix>
          <Globe className="size-4 text-muted" />
        </InputGroup.Prefix>
        <InputGroup.Input className="w-full max-w-[280px]" />
        <InputGroup.Suffix className="pr-0">
          <Button isIconOnly aria-label="Copy" size="sm" variant="ghost">
            <Copy className="size-4" />
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  );
}
