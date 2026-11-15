"use client";

import type {TOCItemType} from "fumadocs-core/toc";
import type {ComponentProps} from "react";

import * as Primitive from "fumadocs-core/toc";
import {useTOCItems} from "fumadocs-ui/components/toc";

import {cn} from "@/utils/cn";

function TOCItem({item}: {item: TOCItemType}) {
  return (
    <Primitive.TOCItem
      href={item.url}
      className={cn(
        "flex min-h-6 scroll-m-4 items-center py-0.5 text-[13px] leading-5 wrap-anywhere text-(--docs-fg-subtle) transition-colors duration-150",
        "hover:text-(--docs-fg) data-[active=true]:font-medium data-[active=true]:text-foreground",
        "[&_code]:font-mono [&_code]:text-[12px]",
        item.depth >= 3 && "ps-3",
      )}
    >
      {item.title}
    </Primitive.TOCItem>
  );
}

export type TOCItemsProps = ComponentProps<"div">;

/** Flat list of the page's headings; the active one is set in the foreground color. */
export function TOCItems({className, ...props}: TOCItemsProps) {
  const items = useTOCItems();

  if (items.length === 0) return null;

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {items.map((item) => (
        <TOCItem key={item.url} item={item} />
      ))}
    </div>
  );
}
