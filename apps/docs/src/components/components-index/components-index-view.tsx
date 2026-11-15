"use client";

import type {CatalogCategory, CatalogItem, ComponentsCatalog} from "@/lib/components-catalog";
import type {Key} from "@heroui/react";
import type {ReactNode} from "react";

import {SearchField, Tabs} from "@heroui/react";
import LinkRoot from "fumadocs-core/link";
import Image from "next/image";
import {useDeferredValue, useMemo, useState} from "react";

import {VideoPlayerView} from "@/components/native/video-player-view";
import StatusChip from "@/components/status-chip";
import {useDictionary} from "@/hooks/use-dictionary";
import {cn} from "@/utils/cn";

type License = "all" | "free" | "pro";

const LICENSES: License[] = ["all", "free", "pro"];

function matchesQuery(item: CatalogItem, query: string) {
  if (!query) return true;

  return `${item.title} ${item.name.replaceAll("-", " ")}`.toLowerCase().includes(query);
}

function matchesLicense(item: CatalogItem, license: License) {
  return license === "all" || (license === "pro") === item.pro;
}

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

function ComponentTile({item}: {item: CatalogItem}) {
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

function CategorySection({category, isFirst}: {category: CatalogCategory; isFirst: boolean}) {
  return (
    <section className={cn("flex flex-col gap-4", isFirst ? "pt-9" : "pt-12")}>
      <h2
        className="scroll-m-28 text-xl leading-7 font-semibold tracking-[-0.015em] text-(--docs-fg)"
        id={category.id}
      >
        {category.title}
      </h2>
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {category.items.map((item) => (
          <ComponentTile key={`${item.pro ? "pro" : "free"}-${item.name}`} item={item} />
        ))}
      </div>
    </section>
  );
}

export function ComponentsIndexView({catalog}: {catalog: ComponentsCatalog}) {
  const dict = useDictionary().componentsIndex;
  const [license, setLicense] = useState<License>("all");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const hasPro = useMemo(
    () => catalog.categories.some((category) => category.items.some((item) => item.pro)),
    [catalog],
  );

  const visibleCategories = useMemo(
    () =>
      catalog.categories
        .map((category) => ({
          ...category,
          items: category.items.filter(
            (item) => matchesLicense(item, license) && matchesQuery(item, deferredQuery),
          ),
        }))
        .filter((category) => category.items.length > 0),
    [catalog, deferredQuery, license],
  );

  // Hide TOC entries whose section is filtered out.
  const hiddenTocCss = useMemo(() => {
    const visibleIds = new Set(visibleCategories.map((category) => category.id));

    return catalog.categories
      .filter((category) => !visibleIds.has(category.id))
      .map(
        (category) =>
          `:is(#nd-toc,[data-toc-popover-content]) a[href="#${category.id}"]{display:none}`,
      )
      .join("");
  }, [catalog, visibleCategories]);

  return (
    <div className="not-prose flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {hasPro ? (
          <Tabs
            selectedKey={license}
            onSelectionChange={(key: Key) => setLicense(String(key) as License)}
          >
            <Tabs.ListContainer>
              <Tabs.List aria-label={dict.licenseLabel}>
                {LICENSES.map((id) => (
                  <Tabs.Tab key={id} className="h-7 px-3 text-[13px] whitespace-nowrap" id={id}>
                    {dict[id]}
                    <Tabs.Indicator />
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </Tabs.ListContainer>
          </Tabs>
        ) : null}
        <SearchField
          aria-label={dict.filterLabel}
          className="w-full sm:ms-auto sm:w-60"
          value={query}
          variant="secondary"
          onChange={setQuery}
        >
          <SearchField.Group className="h-8.5 rounded-full">
            <SearchField.SearchIcon />
            <SearchField.Input className="text-[13px]" placeholder={dict.filterLabel} />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
      </div>

      {visibleCategories.map((category, index) => (
        <CategorySection key={category.id} category={category} isFirst={index === 0} />
      ))}

      {visibleCategories.length === 0 ? (
        <p className="pt-12 text-sm text-(--docs-fg-muted)">
          {dict.noResults.replace("{query}", query.trim())}
        </p>
      ) : null}

      {hiddenTocCss ? <style>{hiddenTocCss}</style> : null}
    </div>
  );
}
