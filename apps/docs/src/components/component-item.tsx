"use client";

import type {ComponentInfo} from "../components-registry";
import type {StatusChipStatus} from "./status-chip";

import {Link} from "@heroui/react";
import Image from "next/image";

import {cn} from "@/utils/cn";
import {CDN_URL} from "@/utils/constants";

import StatusChip from "./status-chip";

interface ComponentItemProps extends React.ComponentProps<"div"> {
  component: ComponentInfo;
  className?: string;
  status?: StatusChipStatus;
  openInNewTab?: boolean;
}

export function ComponentItem({
  className,
  component,
  openInNewTab = true,
  status,
}: ComponentItemProps) {
  const {href, title} = component;
  const imageName = title.toLowerCase();
  const lightSrc = `${CDN_URL}/docs/related-components/light-${imageName}.png`;
  const darkSrc = `${CDN_URL}/docs/related-components/dark-${imageName}.png`;

  const linkProps = openInNewTab
    ? {rel: "noopener noreferrer" as const, target: "_blank" as const}
    : {};

  return (
    <div className={cn("flex flex-col gap-[9px]", className)}>
      <div className="border-divider relative h-[198px] overflow-hidden rounded-xl border">
        <Link className="h-full w-full" href={href} underline="none" {...linkProps}>
          <Image
            alt={title}
            className="absolute inset-0 block h-full w-full object-cover dark:hidden"
            height={594}
            src={lightSrc}
            width={874}
          />
          <Image
            alt={title}
            className="absolute inset-0 hidden h-full w-full object-cover dark:block"
            height={594}
            src={darkSrc}
            width={874}
          />
        </Link>
      </div>
      <Link href={href} underline="none" {...linkProps}>
        <span className="flex items-center gap-2">
          {title}
          {status ? <StatusChip className="w-fit" status={status} /> : null}
        </span>
        {!!openInNewTab && <Link.Icon />}
      </Link>
    </div>
  );
}
