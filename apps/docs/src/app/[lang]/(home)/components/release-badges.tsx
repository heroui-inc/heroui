"use client";

import {ChevronRight, Globe, Smartphone} from "@gravity-ui/icons";
import LinkRoot from "fumadocs-core/link";
import {motion, useReducedMotion} from "motion/react";
import {useEffect, useMemo, useState} from "react";

import {cn} from "@/utils/cn";

interface ReleaseBadge {
  /** "web" or "native". Picks the same icon and color as the docs framework tabs. */
  framework: string;
  /** Short product name, e.g. "React" or "Native". */
  name: string;
  version: string;
  /** One-line summary of the release. */
  highlight: string;
  href: string;
  /** ISO date string (e.g. "2026-06-30") used to order badges newest-first. */
  date?: string;
}

interface ReleaseBadgesProps {
  badges: ReleaseBadge[];
  /** Time each release spends in front before the stack cycles, in milliseconds. */
  intervalMs?: number;
}

// Card geometry (px). Resting: cards behind peek PEEK px above the front card.
// Expanded: every card gets its own row, GAP px apart, fanning upward.
const CARD_HEIGHT = 32;
const PEEK = 8;
const GAP = 8;
// How much each card behind the front one shrinks while resting.
const SCALE_STEP = 0.08;
// Cards deeper than this are hidden while resting.
const MAX_VISIBLE_BEHIND = 2;

const stackSpring = {bounce: 0.15, type: "spring", visualDuration: 0.35} as const;

const frameworkStyles = {
  native: {
    Icon: Smartphone,
    iconClass: "bg-indigo-500/12 text-indigo-500 dark:text-indigo-400",
  },
  web: {
    Icon: Globe,
    iconClass: "bg-sky-400/15 text-sky-500 dark:text-sky-400",
  },
};

const toTime = (badge: ReleaseBadge): number => {
  if (!badge.date) return Number.NEGATIVE_INFINITY;

  const time = new Date(badge.date).getTime();

  return Number.isNaN(time) ? Number.NEGATIVE_INFINITY : time;
};

function BadgeCard({badge, isHidden}: {badge: ReleaseBadge; isHidden: boolean}) {
  const {Icon, iconClass} =
    badge.framework === "native" ? frameworkStyles.native : frameworkStyles.web;

  return (
    <LinkRoot
      className="group flex h-8 w-full items-center gap-2.5 rounded-full bg-surface py-1 ps-1 pe-3 text-start shadow-[0_1px_2px_rgba(24,24,27,0.06),0_8px_20px_-8px_rgba(24,24,27,0.16)] ring-1 ring-foreground/[0.07] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      href={badge.href}
    >
      <motion.span
        animate={{opacity: isHidden ? 0 : 1}}
        className="flex min-w-0 flex-1 items-center gap-2.5"
        initial={false}
        transition={{duration: 0.2}}
      >
        <span
          className={cn("flex size-6 shrink-0 items-center justify-center rounded-full", iconClass)}
        >
          <Icon aria-hidden className="size-3.5" />
        </span>
        <span className="flex shrink-0 items-baseline gap-1.5 text-[13px] leading-4 whitespace-nowrap">
          <span className="font-semibold text-foreground">{badge.name}</span>
          <span className="font-medium text-muted tabular-nums">{badge.version}</span>
        </span>
        <span aria-hidden className="h-3 w-px shrink-0 bg-border" />
        <span className="min-w-0 flex-1 truncate text-[13px] leading-4 text-foreground/70">
          {badge.highlight}
        </span>
        <ChevronRight
          aria-hidden
          className="size-3 shrink-0 text-muted/70 transition-[color,translate] duration-150 group-hover:translate-x-0.5 group-hover:text-foreground rtl:-scale-x-100"
        />
      </motion.span>
    </LinkRoot>
  );
}

export function ReleaseBadges({badges, intervalMs = 5000}: ReleaseBadgesProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusWithin, setIsFocusWithin] = useState(false);

  // Newest release first. Badges without a valid date sink to the bottom while
  // keeping their relative order (stable sort).
  const sortedBadges = useMemo(() => [...badges].sort((a, b) => toTime(b) - toTime(a)), [badges]);

  const count = sortedBadges.length;
  const isExpanded = isHovered || isFocusWithin;

  // Cycle the front card while resting; hovering or focusing the stack pauses it.
  useEffect(() => {
    if (count <= 1 || isExpanded) return;

    const id = window.setTimeout(() => setIndex((i) => (i + 1) % count), intervalMs);

    return () => window.clearTimeout(id);
  }, [index, isExpanded, count, intervalMs]);

  if (count === 0) return null;

  return (
    <div
      className="relative h-10 w-full max-w-96"
      onFocusCapture={() => setIsFocusWithin(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsFocusWithin(false);
        }
      }}
    >
      {sortedBadges.map((badge, badgeIndex) => {
        // 0 = front card, 1 = directly behind it, and so on.
        const slot = (badgeIndex - (index % count) + count) % count;
        const isHidden = !isExpanded && slot > 0;
        const isBeyondStack = !isExpanded && slot > MAX_VISIBLE_BEHIND;

        return (
          <motion.div
            key={badge.href}
            initial={false}
            style={{zIndex: count - slot}}
            transition={reduceMotion ? {duration: 0} : stackSpring}
            animate={{
              opacity: isBeyondStack ? 0 : 1,
              scale: isExpanded ? 1 : 1 - slot * SCALE_STEP,
              y: isExpanded ? -slot * (CARD_HEIGHT + GAP) : -slot * PEEK,
            }}
            className={cn(
              "absolute inset-x-0 bottom-0 origin-top",
              // Bridge the gap below each raised card so moving the pointer
              // between rows doesn't collapse the stack.
              slot > 0 && "after:absolute after:inset-x-0 after:top-full after:h-2",
            )}
          >
            <BadgeCard badge={badge} isHidden={isHidden} />
          </motion.div>
        );
      })}
    </div>
  );
}
