"use client";

import {LinkIcon, LinkRoot} from "@heroui/react";

export function LinkBasic() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <LinkRoot href="#">
        Call to action
        <LinkIcon />
      </LinkRoot>
      <LinkRoot isDisabled href="#">
        Call to action
        <LinkIcon />
      </LinkRoot>
      <LinkRoot
        className="border-default bg-default-100 text-foreground hover:bg-default-200 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium transition"
        href="https://heroui.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        HeroUI
        <LinkIcon className="h-3 w-3" />
      </LinkRoot>
    </div>
  );
}
