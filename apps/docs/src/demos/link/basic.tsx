"use client";

import {Link} from "@heroui/react";

export function LinkBasic() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Link href="#">
        Call to action
        <Link.Icon />
      </Link>
      <Link isDisabled href="#">
        Call to action
        <Link.Icon />
      </Link>
      <Link
        className="border-default bg-default-100 text-foreground hover:bg-default-200 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium transition"
        href="https://heroui.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        HeroUI
        <Link.Icon className="h-3 w-3" />
      </Link>
    </div>
  );
}
