"use client";

import type {StatusChipStatus} from "../status-chip";

import {Link as LocalLinkIcon} from "@gravity-ui/icons";
import {Link} from "@heroui/react";
import LinkRoot from "fumadocs-core/link";

import {useIsMobileDevice} from "@/hooks/use-is-mobile-device";
import {cn} from "@/utils/cn";

import StatusChip from "../status-chip";

import {VideoPlayerView} from "./video-player-view";

/**
 * Title + optional status-chip pair, factored out so it can render inside
 * both the in-page `NextLink` and the external `Link` variants without
 * duplicating layout markup.
 */
function ComponentTitleContent({status, title}: {status?: StatusChipStatus; title: string}) {
  return (
    <div className="flex items-center gap-2">
      {title}
      {status ? <StatusChip className="w-fit" status={status} /> : null}
    </div>
  );
}

/**
 * Helper that picks between Next.js client routing (`NextLink`) and the
 * HeroUI `<Link>` based on whether the destination should open in a new tab.
 */
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
    <LinkRoot className={className} href={href}>
      {children}
    </LinkRoot>
  );
}

interface NativeComponentInfo {
  name: string;
  title: string;
  description: string;
  href: string;
  category?: string;
}

interface ComponentItemProps extends React.ComponentProps<"div"> {
  component: NativeComponentInfo;
  srcLight: string;
  srcDark: string;
  className?: string;
  status?: StatusChipStatus;
  openInNewTab?: boolean;
}

/**
 * ComponentItem renders a single native-component preview tile: a video
 * (theme-aware) and the component's title with optional status chip. Used by
 * {@link ComponentsCategory} to lay out the components-overview index.
 *
 * `target="auto"` on the inner VideoPlayerView is safe here because this
 * component is only rendered from index pages that don't show the QR popover
 * (`showQRCode={false}`) — the `target` is required by the type but never
 * actually consumed.
 */
export function ComponentItem({
  className,
  component,
  openInNewTab = false,
  srcDark,
  srcLight,
  status,
}: ComponentItemProps) {
  const {href, title} = component;
  const isMobile = useIsMobileDevice();

  return (
    <div className={cn("flex flex-col gap-[9px]", className)}>
      {/* Title first on mobile, video first on desktop */}
      <div className="order-1 sm:order-2">
        {openInNewTab ? (
          <Link className="no-underline" href={href} rel="noopener noreferrer" target="_blank">
            <ComponentTitleContent status={status} title={title} />
            <Link.Icon />
          </Link>
        ) : (
          <ConditionalLink className="link no-underline" href={href} openInNewTab={openInNewTab}>
            <ComponentTitleContent status={status} title={title} />
            <LocalLinkIcon className="ml-1 size-3.5 text-muted" />
          </ConditionalLink>
        )}
      </div>
      <div className="relative order-2 overflow-hidden rounded-xl sm:order-1">
        {isMobile ? (
          <VideoPlayerView
            autoPlay
            className="w-full"
            height={300}
            playMode="auto"
            showQRCode={false}
            srcDark={srcDark}
            srcLight={srcLight}
            target="auto"
          />
        ) : (
          <ConditionalLink className="block" href={href} openInNewTab={openInNewTab}>
            <VideoPlayerView
              autoPlay
              className="w-full"
              height={300}
              playMode="auto"
              showQRCode={false}
              srcDark={srcDark}
              srcLight={srcLight}
              target="auto"
            />
          </ConditionalLink>
        )}
      </div>
    </div>
  );
}
