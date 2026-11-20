"use client";

import type {TOCItemType} from "fumadocs-core/toc";
import type {ComponentProps} from "react";

import {useTOCItems} from "fumadocs-ui/components/toc";
import {useEffect, useRef} from "react";

import {cn} from "@/utils/cn";

import {useActiveHeading} from "./active-heading";

function TOCItem({active, item}: {active: boolean; item: TOCItemType}) {
  return (
    <a
      data-active={active}
      href={item.url}
      className={cn(
        // Block, not flex: a heading's text and inline code have to wrap as one line of text.
        "block min-h-6 scroll-m-4 py-0.5 text-[13px] leading-5 wrap-anywhere text-(--docs-fg-subtle) transition-colors duration-150",
        "hover:text-(--docs-fg) data-[active=true]:font-medium data-[active=true]:text-foreground",
        "[&_code]:font-mono [&_code]:text-[12px]",
        item.depth >= 3 && "ps-3",
      )}
    >
      {item.title}
    </a>
  );
}

export type TOCItemsProps = ComponentProps<"div">;

/** Flat list of the page's headings; the active one is set in the foreground color. */
export function TOCItems({className, ...props}: TOCItemsProps) {
  const items = useTOCItems();
  const active = useActiveHeading();
  const listRef = useRef<HTMLDivElement>(null);
  const hasScrolledRef = useRef(false);
  const activeIndex = items.findIndex((item) => item.url === `#${active}`);

  // Keep the active item centered in the TOC scroll area (the list's parent).
  useEffect(() => {
    const list = listRef.current;
    const container = list?.parentElement;
    const link = list?.children[activeIndex];

    if (!container || !(link instanceof HTMLElement)) return;

    const offset = link.getBoundingClientRect().top - container.getBoundingClientRect().top;

    container.scrollTo({
      behavior: hasScrolledRef.current ? "smooth" : "instant",
      top: container.scrollTop + offset - (container.clientHeight - link.offsetHeight) / 2,
    });
    hasScrolledRef.current = true;
  }, [activeIndex]);

  if (items.length === 0) return null;

  return (
    <div ref={listRef} className={cn("flex flex-col", className)} {...props}>
      {items.map((item, index) => (
        <TOCItem key={item.url} active={index === activeIndex} item={item} />
      ))}
    </div>
  );
}
