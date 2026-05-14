"use client";

import type {ComponentInfo} from "../components-registry";
import type {StatusChipStatus} from "./status-chip";
import type {UrlObject} from "url";

import {Link} from "@heroui/react";
import Image from "next/image";
import NextLink from "next/link";

import {cn} from "@/utils/cn";
import {CDN_URL} from "@/utils/constants";

import StatusChip from "./status-chip";

function ComponentImagePair({
  alt,
  darkSrc,
  height = 594,
  lightSrc,
  width = 874,
}: {
  alt: string;
  darkSrc: string;
  height?: number;
  lightSrc: string;
  width?: number;
}) {
  return (
    <>
      <Image
        alt={alt}
        className="absolute inset-0 block h-full w-full object-cover dark:hidden"
        height={height}
        src={lightSrc}
        width={width}
      />
      <Image
        alt={alt}
        className="absolute inset-0 hidden h-full w-full object-cover dark:block"
        height={height}
        src={darkSrc}
        width={width}
      />
    </>
  );
}

function ComponentTitleContent({status, title}: {status?: StatusChipStatus; title: string}) {
  return (
    <div className="flex items-center gap-2">
      {title}
      {status ? <StatusChip className="w-fit" status={status} /> : null}
    </div>
  );
}

function ConditionalLink({
  children,
  className,
  href,
  openInNewTab,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  openInNewTab: boolean;
}) {
  const linkProps = openInNewTab
    ? {rel: "noopener noreferrer" as const, target: "_blank" as const}
    : {};

  if (openInNewTab) {
    return (
      <Link className={cn(className, "no-underline")} href={href} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <NextLink className={className} href={href as unknown as UrlObject}>
      {children}
    </NextLink>
  );
}

interface ComponentItemProps extends React.ComponentProps<"div"> {
  component: ComponentInfo;
  className?: string;
  status?: StatusChipStatus;
  openInNewTab?: boolean;
}

export function ComponentItem({
  className,
  component,
  openInNewTab = false,
  status,
}: ComponentItemProps) {
  const {href, title} = component;
  const imageName = title.toLowerCase();
  const lightSrc = `${CDN_URL}/docs/related-components/light-${imageName}.png`;
  const darkSrc = `${CDN_URL}/docs/related-components/dark-${imageName}.png`;

  return (
    <div className={cn("flex flex-col gap-[9px]", className)}>
      {/* Title first on mobile, image first on desktop */}
      <div className="order-1 sm:order-2">
        {openInNewTab ? (
          <Link className="no-underline" href={href} rel="noopener noreferrer" target="_blank">
            <ComponentTitleContent status={status} title={title} />
            <Link.Icon />
          </Link>
        ) : (
          <ConditionalLink className="link no-underline" href={href} openInNewTab={openInNewTab}>
            <ComponentTitleContent status={status} title={title} />
          </ConditionalLink>
        )}
      </div>
      <div className="relative order-2 h-[198px] overflow-hidden rounded-xl border border-separator sm:order-1">
        <ConditionalLink className="h-full w-full" href={href} openInNewTab={openInNewTab}>
          <ComponentImagePair alt={title} darkSrc={darkSrc} lightSrc={lightSrc} />
        </ConditionalLink>
      </div>
    </div>
  );
}
