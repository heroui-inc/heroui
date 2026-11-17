"use client";

import type {CatalogItem} from "@/lib/components-catalog";
import type {ReactNode} from "react";

import LinkRoot from "fumadocs-core/link";
import Image from "next/image";

import {VideoPlayerView} from "@/components/native/video-player-view";
import StatusChip from "@/components/status-chip";

function ProChip() {
  return (
    <span className="inline-flex h-4.5 shrink-0 items-center rounded-full bg-accent px-1.5 text-[10px] leading-none font-semibold tracking-[0.07em] text-accent-foreground">
      PRO
    </span>
  );
}

function TileMedia({item}: {item: CatalogItem}) {
  if (item.media.type === "video") {
    return (
      <VideoPlayerView
        autoPlay
        className="w-full"
        height={300}
        playMode="auto"
        showQRCode={false}
        srcDark={item.media.dark}
        srcLight={item.media.light}
        target="auto"
      />
    );
  }

  return (
    <div className="relative h-[198px] bg-(--docs-card)">
      <Image
        alt=""
        className="absolute inset-0 block size-full object-cover dark:hidden"
        height={594}
        src={item.media.light}
        width={874}
      />
      <Image
        alt=""
        className="absolute inset-0 hidden size-full object-cover dark:block"
        height={594}
        src={item.media.dark}
        width={874}
      />
    </div>
  );
}

function TileLink({
  children,
  className,
  item,
}: {
  children: ReactNode;
  className?: string;
  item: CatalogItem;
}) {
  // Pro components live on the Pro docs, a separate site.
  return item.pro ? (
    <a className={className} href={item.href} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  ) : (
    <LinkRoot className={className} href={item.href}>
      {children}
    </LinkRoot>
  );
}

/** A component card on the components index and in Related Components. */
export function ComponentTile({item}: {item: CatalogItem}) {
  const title = (
    <span className="order-1 flex h-5 min-w-0 items-center gap-2 text-sm font-medium text-(--docs-fg) sm:order-2">
      <span className="truncate">{item.title}</span>
      {item.pro ? <ProChip /> : null}
      {item.status ? <StatusChip className="w-fit" status={item.status} /> : null}
    </span>
  );
  const media = (
    <span className="order-2 block overflow-hidden rounded-2xl transition-opacity duration-150 group-hover:opacity-85 sm:order-1">
      <TileMedia item={item} />
    </span>
  );

  // The video player has its own buttons, which can't sit inside a link.
  if (item.media.type === "video") {
    return (
      <div className="flex flex-col gap-[9px]">
        <TileLink className="order-1 w-fit rounded-sm sm:order-2" item={item}>
          {title}
        </TileLink>
        {media}
      </div>
    );
  }

  return (
    <TileLink className="group flex flex-col gap-[9px] rounded-2xl" item={item}>
      {title}
      {media}
    </TileLink>
  );
}
