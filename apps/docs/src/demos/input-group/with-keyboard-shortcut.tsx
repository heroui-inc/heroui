"use client";

import {InputGroup, Kbd, TextField} from "@heroui/react";

export function WithKeyboardShortcut() {
  return (
    <TextField className="w-full max-w-[280px]" name="command">
      <InputGroup>
        <InputGroup.Input className="w-full max-w-[280px]" placeholder="Command" />
        <InputGroup.Suffix className="pr-2">
          <Kbd>
            <Kbd.Abbr keyValue="command" />
            <Kbd.Content>K</Kbd.Content>
          </Kbd>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  );
}
