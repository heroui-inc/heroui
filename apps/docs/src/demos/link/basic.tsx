"use client";

import {Link} from "@heroui/react";

export function LinkBasic() {
  return (
    <div className="flex flex-col gap-3">
      <Link href="#">Simple link</Link>

      <Link href="https://heroui.com" rel="noopener noreferrer" target="_blank">
        External link to HeroUI
      </Link>

      <Link isDisabled href="#">
        Disabled link
      </Link>
    </div>
  );
}
