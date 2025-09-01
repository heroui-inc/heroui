"use client";

import {Link} from "@heroui/react";
import {Icon} from "@iconify/react";

export function LinkWithIcon() {
  return (
    <div className="flex flex-col gap-3">
      <Link href="#">
        Default with icon
        <Link.Icon />
      </Link>

      <Link className="gap-1" href="#">
        Custom icon
        <Link.Icon>
          <Icon className="size-4" icon="gravity-ui:arrow-up-right-from-square" />
        </Link.Icon>
      </Link>

      <Link className="gap-1" href="#">
        <Link.Icon>
          <Icon className="size-4" icon="gravity-ui:house" />
        </Link.Icon>
        Home
      </Link>
    </div>
  );
}
