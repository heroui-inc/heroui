"use client";

import {Link} from "@heroui/react";
import {Icon} from "@iconify/react";

export function LinkNavigation() {
  return (
    <nav className="flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <Link href="#features">Features</Link>
        <Link href="#pricing">Pricing</Link>
        <Link href="#about">About</Link>
        <Link href="#contact">Contact</Link>
      </div>

      <div className="flex flex-col gap-2">
        <Link showIcon className="py-2" href="#" iconPlacement="start">
          <Link.Icon>
            <Icon className="h-4 w-4" icon="gravity-ui:display-pulse" />
          </Link.Icon>
          Dashboard
        </Link>
        <Link showIcon className="py-2" href="#" iconPlacement="start">
          <Link.Icon>
            <Icon className="h-4 w-4" icon="gravity-ui:person" />
          </Link.Icon>
          Profile
        </Link>
        <Link showIcon className="py-2" href="#" iconPlacement="start">
          <Link.Icon>
            <Icon className="h-4 w-4" icon="gravity-ui:gear" />
          </Link.Icon>
          Settings
        </Link>
        <Link showIcon className="py-2" href="#" iconPlacement="start">
          <Link.Icon>
            <Icon className="h-4 w-4" icon="gravity-ui:arrow-right-from-square" />
          </Link.Icon>
          Sign out
        </Link>
      </div>
    </nav>
  );
}
