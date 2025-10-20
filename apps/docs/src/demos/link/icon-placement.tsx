"use client";

import {LinkIcon, LinkRoot} from "@heroui/react";

export function LinkIconPlacement() {
  return (
    <div className="flex flex-col gap-3">
      <LinkRoot href="#">
        Icon at end (default)
        <LinkIcon />
      </LinkRoot>
      <LinkRoot className="gap-1" href="#">
        <LinkIcon />
        Icon at start
      </LinkRoot>
    </div>
  );
}
