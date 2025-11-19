"use client";

import {Button, InputGroup, Label, TextField} from "@heroui/react";
import {Icon} from "@iconify/react";

export function WithCopySuffix() {
  return (
    <TextField className="w-full max-w-[280px]" name="website">
      <Label>Website</Label>
      <InputGroup>
        <InputGroup.Input className="w-full max-w-[280px]" defaultValue="heroui.com" />
        <InputGroup.Suffix className="pr-0">
          <Button isIconOnly aria-label="Copy" size="sm" variant="ghost">
            <Icon className="size-4" icon="gravity-ui:copy" />
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  );
}
