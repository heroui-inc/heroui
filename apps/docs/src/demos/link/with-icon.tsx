"use client";

import {Link} from "@heroui/react";
import {Icon} from "@iconify/react";

export function LinkWithIcon() {
  return (
    <div className="flex flex-col gap-3">
      <Link showIcon href="#">
        Default with icon
        <Link.Icon />
      </Link>

      <Link showIcon href="#" iconPlacement="start">
        <Link.Icon />
        Icon at start
      </Link>

      <Link showIcon href="#">
        Custom icon
        <Link.Icon>
          <Icon className="h-3 w-3" icon="gravity-ui:arrow-up-right-from-square" />
        </Link.Icon>
      </Link>

      <Link showIcon href="#" iconPlacement="start">
        <Link.Icon>
          <Icon className="h-3 w-3" icon="gravity-ui:house" />
        </Link.Icon>
        Home
      </Link>
    </div>
  );
}
