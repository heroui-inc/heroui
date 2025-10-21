"use client";

import {Kbd} from "@heroui/react";

export function NavigationKeys() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-muted text-sm">Arrow Keys:</span>
        <div className="flex items-center gap-2">
          <Kbd.Root>
            <Kbd.Abbr keyValue="up" />
          </Kbd.Root>
          <Kbd.Root>
            <Kbd.Abbr keyValue="down" />
          </Kbd.Root>
          <Kbd.Root>
            <Kbd.Abbr keyValue="left" />
          </Kbd.Root>
          <Kbd.Root>
            <Kbd.Abbr keyValue="right" />
          </Kbd.Root>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted text-sm">Page Navigation:</span>
        <div className="flex items-center gap-2">
          <Kbd.Root>
            <Kbd.Abbr keyValue="pageup" />
          </Kbd.Root>
          <Kbd.Root>
            <Kbd.Abbr keyValue="pagedown" />
          </Kbd.Root>
          <Kbd.Root>
            <Kbd.Abbr keyValue="home" />
          </Kbd.Root>
          <Kbd.Root>
            <Kbd.Abbr keyValue="end" />
          </Kbd.Root>
        </div>
      </div>
    </div>
  );
}
