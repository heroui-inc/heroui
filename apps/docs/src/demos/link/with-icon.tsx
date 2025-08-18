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
      
      <Link showIcon iconPlacement="start" href="#">
        <Link.Icon />
        Icon at start
      </Link>
      
      <Link showIcon href="#">
        Custom icon
        <Link.Icon>
          <Icon icon="gravity-ui:arrow-up-right-from-square" className="h-3 w-3" />
        </Link.Icon>
      </Link>
      
      <Link showIcon iconPlacement="start" href="#">
        <Link.Icon>
          <Icon icon="gravity-ui:house" className="h-3 w-3" />
        </Link.Icon>
        Home
      </Link>
    </div>
  );
}