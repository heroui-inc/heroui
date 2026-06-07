"use client";

import type {TOCItemType} from "fumadocs-core/toc";
import type {ComponentProps, RefObject} from "react";

import * as Primitive from "fumadocs-core/toc";
import {useTOCItems} from "fumadocs-ui/components/toc";
import {useCallback, useEffect, useRef} from "react";

import {mergeRefs} from "@/components/fumadocs/utils/merge-refs";
import {cn} from "@/utils/cn";

function calc(container: HTMLElement, active: string[]): [number, number] {
  if (active.length === 0 || container.clientHeight === 0) return [0, 0];

  let upper = Number.MAX_VALUE;
  let lower = 0;

  for (const id of active) {
    const element =
      container.querySelector<HTMLElement>(`a[href="#${id}"]`) ??
      container.querySelector<HTMLElement>(`a[href="#${encodeURIComponent(id)}"]`);

    if (!element) continue;

    const styles = getComputedStyle(element);

    upper = Math.min(upper, element.offsetTop + parseFloat(styles.paddingTop));
    lower = Math.max(
      lower,
      element.offsetTop + element.clientHeight - parseFloat(styles.paddingBottom),
    );
  }

  if (upper === Number.MAX_VALUE) return [0, 0];

  return [upper, lower - upper];
}

function TocThumb({containerRef}: {containerRef: RefObject<HTMLDivElement | null>}) {
  const thumbRef = useRef<HTMLDivElement>(null);
  const active = Primitive.useActiveAnchors();

  const update = useCallback(() => {
    const thumb = thumbRef.current;
    const container = containerRef.current;

    if (!thumb || !container) return;

    const [top, height] = calc(container, active);

    thumb.style.setProperty("--fd-top", `${top}px`);
    thumb.style.setProperty("--fd-height", `${height}px`);
  }, [active, containerRef]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const observer = new ResizeObserver(update);

    observer.observe(container);
    update();

    return () => {
      observer.disconnect();
    };
  }, [update, containerRef]);

  return (
    <div
      ref={thumbRef}
      className="bg-fd-primary absolute inset-s-0 top-(--fd-top) h-(--fd-height) w-px transition-[top,height] ease-linear data-[hidden=true]:opacity-0"
      data-hidden={active.length === 0}
    />
  );
}

function TOCItem({item}: {item: TOCItemType}) {
  return (
    <Primitive.TOCItem
      href={item.url}
      className={cn(
        "prose text-fd-muted-foreground hover:text-fd-accent-foreground data-[active=true]:text-fd-primary scroll-m-4 py-1.5 text-sm wrap-anywhere transition-colors first:pt-0 last:pb-0",
        item.depth <= 2 && "ps-3",
        item.depth === 3 && "ps-6",
        item.depth >= 4 && "ps-8",
      )}
    >
      {item.title}
    </Primitive.TOCItem>
  );
}

export type TOCItemsProps = ComponentProps<"div">;

export function TOCItems({className, ref, ...props}: TOCItemsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = useTOCItems();

  if (items.length === 0) return null;

  return (
    <div className="relative">
      <TocThumb containerRef={containerRef} />
      <div
        ref={mergeRefs(ref, containerRef)}
        className={cn("border-fd-foreground/10 flex flex-col border-s", className)}
        {...props}
      >
        {items.map((item) => (
          <TOCItem key={item.url} item={item} />
        ))}
      </div>
    </div>
  );
}
