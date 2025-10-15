"use client";

import {Link} from "@heroui/react";

export function LinkIconPlacement() {
  return (
    <div className="flex flex-col gap-3">
      <Link href="#">
        Icon at end (default)
        <Link.Icon />
      </Link>
      <Link className="gap-1" href="#">
        <Link.Icon />
        Icon at start
      </Link>
    </div>
  );
}
