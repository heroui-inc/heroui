"use client";

import type {TOCItemType} from "fumadocs-core/toc";
import type {ReactNode} from "react";

import {createContext, use, useEffect, useState} from "react";

/** How far past a heading's scroll-margin line it still counts as reached, in px. */
const LINE_TOLERANCE = 8;

/** Quiet time after which the scroll started by an anchor click is considered finished, in ms. */
const SCROLL_SETTLE_MS = 150;

const ActiveHeadingContext = createContext<string | undefined>(undefined);

/**
 * Scroll-spy for the TOC: the active heading is the last one whose top has reached the line a
 * TOC link scrolls it to (its `scroll-margin-top`), so clicking an item always activates it.
 * Replaces fumadocs' IntersectionObserver, which keeps a stale `single` state and jumps ahead.
 */
export function ActiveHeadingProvider({children, toc}: {children: ReactNode; toc: TOCItemType[]}) {
  const [active, setActive] = useState<string>();

  useEffect(() => {
    const ids = toc.flatMap((item) => (item.url.startsWith("#") ? [item.url.slice(1)] : []));

    if (ids.length === 0) return;

    let frame = 0;
    // Heading picked by an anchor click; holds until the user scrolls on their own, so headings
    // that can't reach the top (near the page end) still show as active.
    let pinned: string | null = null;
    let settled = true;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;

    const compute = () => {
      frame = 0;
      if (pinned) return setActive(pinned);

      const headings = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null && el.getClientRects().length > 0);
      const first = headings[0];

      if (!first) return;

      const root = document.documentElement;
      const atEnd = window.innerHeight + window.scrollY >= root.scrollHeight - 2;
      const line = atEnd
        ? window.innerHeight
        : (Number.parseFloat(getComputedStyle(first).scrollMarginTop) || 0) + LINE_TOLERANCE;
      let current = first;

      for (const heading of headings) {
        if (heading.getBoundingClientRect().top > line) break;
        current = heading;
      }
      setActive(current.id);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };

    const settle = () => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => (settled = true), SCROLL_SETTLE_MS);
    };

    const unpin = () => {
      if (!pinned) return;
      pinned = null;
      schedule();
    };

    const onScroll = () => {
      if (pinned && !settled) settle();
      else unpin();
      schedule();
    };

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.('a[href^="#"]');
      const id = anchor?.getAttribute("href")?.slice(1);

      if (!id || !ids.includes(id)) return;
      pinned = id;
      settled = false;
      settle();
      schedule();
    };

    const resizeObserver = new ResizeObserver(schedule);

    resizeObserver.observe(document.body);
    window.addEventListener("scroll", onScroll, {passive: true});
    window.addEventListener("wheel", unpin, {passive: true});
    window.addEventListener("touchmove", unpin, {passive: true});
    document.addEventListener("click", onClick);
    schedule();

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settleTimer);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", unpin);
      window.removeEventListener("touchmove", unpin);
      document.removeEventListener("click", onClick);
    };
  }, [toc]);

  return <ActiveHeadingContext value={active}>{children}</ActiveHeadingContext>;
}

/** Id of the heading the reader is currently in. */
export function useActiveHeading() {
  return use(ActiveHeadingContext);
}
