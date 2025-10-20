"use client";

import {Link, LinkIcon} from "@heroui/react";

export function LinkIconPlacement() {
  return (
    <div className="flex flex-col gap-3">
      <Link href="#">
        Icon at end (default)
        <LinkIcon />
      </Link>
      <Link className="gap-1" href="#">
        <LinkIcon />
        Icon at start
      </Link>
    </div>
  );
}
