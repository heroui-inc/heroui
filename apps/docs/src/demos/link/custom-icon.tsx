"use client";

import {Link} from "@heroui/react";

import {LinkIcon} from "@/icons/link";

export function LinkCustomIcon() {
  return (
    <div className="flex flex-col gap-3">
      <Link.Root href="#">
        External link
        <Link.Icon>
          <LinkIcon className="h-3.5 w-3.5" />
        </Link.Icon>
      </Link.Root>
      <Link.Root className="gap-1" href="#">
        <Link.Icon>
          <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 1 1-8 8 8.01 8.01 0 0 1 8-8Zm.75 4.75a.75.75 0 1 0-1.5 0v4.5a.75.75 0 0 0 1.5 0Zm0 6a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
          </svg>
        </Link.Icon>
        Inline SVG icon
      </Link.Root>
    </div>
  );
}
