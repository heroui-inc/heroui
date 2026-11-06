"use client";

import type {ComponentProps} from "react";

import {HeroUILogo} from "@/components/heroui-logo";

/**
 * The header logo. The home page belongs to the heroui.com website, a separate app, so this is a
 * plain link: Next's `Link` would prefetch that app's page and its styles on every docs page.
 */
export function HomeNavTitle(props: ComponentProps<"a">) {
  return (
    <a {...props}>
      <HeroUILogo />
    </a>
  );
}
