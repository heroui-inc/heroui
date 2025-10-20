"use client";

import {Kbd} from "@heroui/react";

export function Basic() {
  return (
    <div className="flex items-center gap-4">
      <Kbd.Root>
        <Kbd.Abbr keyValue="command" />
        <Kbd.Content>K</Kbd.Content>
      </Kbd.Root>
      <Kbd.Root>
        <Kbd.Abbr keyValue="shift" />
        <Kbd.Content>P</Kbd.Content>
      </Kbd.Root>
      <Kbd.Root>
        <Kbd.Abbr keyValue="ctrl" />
        <Kbd.Content>C</Kbd.Content>
      </Kbd.Root>
      <Kbd.Root>
        <Kbd.Abbr keyValue="option" />
        <Kbd.Content>D</Kbd.Content>
      </Kbd.Root>
    </div>
  );
}
