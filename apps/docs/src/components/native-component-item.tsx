"use client";

import type {StatusChipStatus} from "./status-chip";
import type {UrlObject} from "url";

import {Link as LocalLinkIcon} from "@gravity-ui/icons";
import {Link} from "@heroui/react";
import NextLink from "next/link";

import {useIsMobileDevice} from "@/hooks/use-is-mobile-device";
import {cn} from "@/utils/cn";

import {NativeVideoPlayerView} from "./native-video-player-view";
import StatusChip from "./status-chip";

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
      <Link className={className} href={href} underline="none" {...linkProps}>
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

interface NativeComponentInfo {
  name: string;
  title: string;
  description: string;
  href: string;
  category?: string;
}

interface NativeComponentItemProps extends React.ComponentProps<"div"> {
  component: NativeComponentInfo;
  srcLight: string;
  srcDark: string;
  className?: string;
  status?: StatusChipStatus;
  openInNewTab?: boolean;
}

export function NativeComponentItem({
  className,
  component,
  openInNewTab = false,
  srcDark,
  srcLight,
  status,
}: NativeComponentItemProps) {
  const {href, title} = component;
  const isMobile = useIsMobileDevice();

  return (
    <div className={cn("flex flex-col gap-[9px]", className)}>
      {/* Title first on mobile, video first on desktop */}
      <div className="order-1 sm:order-2">
        {openInNewTab ? (
          <Link href={href} rel="noopener noreferrer" target="_blank" underline="none">
            <ComponentTitleContent status={status} title={title} />
            <Link.Icon />
          </Link>
        ) : (
          <ConditionalLink className="link" href={href} openInNewTab={openInNewTab}>
            <ComponentTitleContent status={status} title={title} />
            <LocalLinkIcon className="ml-1 size-3.5 text-muted" />
          </ConditionalLink>
        )}
      </div>
      <div className="relative order-2 overflow-hidden rounded-xl sm:order-1">
        {isMobile ? (
          <NativeVideoPlayerView
            autoPlay
            className="w-full"
            height={300}
            playMode="auto"
            showQRCode={false}
            srcDark={srcDark}
            srcLight={srcLight}
          />
        ) : (
          <ConditionalLink className="block" href={href} openInNewTab={openInNewTab}>
            <NativeVideoPlayerView
              autoPlay
              className="w-full"
              height={300}
              playMode="auto"
              showQRCode={false}
              srcDark={srcDark}
              srcLight={srcLight}
            />
          </ConditionalLink>
        )}
      </div>
    </div>
  );
}
